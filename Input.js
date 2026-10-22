/* ============================================================================
   🌟 FAME SYSTEM v1.0.0
   Hook: Input (onInput)
   Creator: Nynaleath

   Reads the player's Fame System panel, detects public activities, rolls once,
   updates Fame and the Story Card, and records snapshots for Retry/Undo handling.
   ============================================================================ */

const modifier = (text) => {
  const fs = FAME_SYSTEM.ensureState(state);
  const cards = typeof storyCards !== "undefined" && Array.isArray(storyCards) ? storyCards : [];
  const currentInfo = typeof info !== "undefined" && info ? info : {};
  const hasActionCount = Number.isFinite(Number(currentInfo.actionCount));
  const actionCount = hasActionCount ? Number(currentInfo.actionCount) : (Number(fs.lastSeenActionCount) || 0) + 1;
  const normalizedInput = FAME_SYSTEM.normalizeText(text);
  const actionKey = String(actionCount) + "|" + normalizedInput;

  const cardIndexBeforeSync = FAME_SYSTEM.findCardIndex(cards);
  const currentCard = cardIndexBeforeSync >= 0 ? cards[cardIndexBeforeSync] : null;
  const parsedCard = currentCard ? FAME_SYSTEM.parseCardEntry(currentCard.entry) : null;
  const renderedBeforeUndo = FAME_SYSTEM.copyEditableValues(fs.lastRendered);
  const isUndo = fs.lastSeenActionCount !== null && hasActionCount && actionCount < Number(fs.lastSeenActionCount);
  const isRetry = !isUndo && fs.processedActions.some(item => item.key === actionKey);

  // Restore the most recent saved state at or before the adventure's current action count.
  if (isUndo) {
    const availableSnapshots = fs.snapshots.filter(snapshot => snapshot.actionCount <= actionCount);
    const restorePoint = availableSnapshots.length ? availableSnapshots[availableSnapshots.length - 1] : null;
    if (restorePoint) FAME_SYSTEM.restoreSnapshot(fs, restorePoint);
    fs.snapshots = fs.snapshots.filter(snapshot => snapshot.actionCount <= actionCount);
    fs.processedActions = fs.processedActions.filter(item => item.actionCount < actionCount);
  }

  // Apply only panel values that differ from the values the script last wrote.
  // This lets manual edits take effect without mistaking the script's own updates for edits.
  if (parsedCard) {
    const comparisonBase = isUndo ? renderedBeforeUndo : fs.lastRendered;
    const fields = ["fame", "difficulty", "cooldown", "language", "notifications"];
    fields.forEach(field => {
      const parsedValue = parsedCard[field];
      if (parsedValue === null || parsedValue === undefined) return;
      const previouslyRendered = comparisonBase ? comparisonBase[field] : undefined;
      const isFirstRead = !fs.initialized || !comparisonBase || previouslyRendered === undefined;
      if (isFirstRead || parsedValue !== previouslyRendered) fs[field] = parsedValue;
    });
  }

  // Normalize all editable values before running the game logic.
  fs.fame = FAME_SYSTEM.clamp(fs.fame, 0, 100);
  fs.difficulty = FAME_SYSTEM.normalizeDifficulty(fs.difficulty);
  fs.cooldown = FAME_SYSTEM.clamp(fs.cooldown, 0, 9999);
  fs.language = FAME_SYSTEM.normalizeLanguage(fs.language);
  fs.notifications = Boolean(fs.notifications);
  fs.currentUiLanguage = FAME_SYSTEM.detectLanguage(text, fs.language);

  // A retry of the exact same action keeps its original roll and pending injection.
  if (isRetry) {
    fs.lastSeenActionCount = hasActionCount ? actionCount : fs.lastSeenActionCount;
    FAME_SYSTEM.writeCard(fs, cards);
    fs.initialized = true;
    return { text };
  }

  // Clear only this script's previous notification, if another script has not replaced it.
  if (fs.lastMessage && state.message === fs.lastMessage) delete state.message;
  fs.lastMessage = "";

  // A new player action ends the previous action's one-turn result injection.
  fs.pendingResult = null;

  // Save the pre-roll values once per action count, so an Undo can restore them.
  FAME_SYSTEM.addSnapshotIfMissing(fs, actionCount);
  fs.playerInputCount = Number(fs.playerInputCount || 0) + 1;

  // --------------------------------------------------------------------------
  // PUBLIC ACTION ROLL
  // --------------------------------------------------------------------------
  const isPublicAction = FAME_SYSTEM.detectPublicAction(text);
  const cooldownPassed = fs.cooldown <= 0 || fs.lastRollInputCount === null ||
    (fs.playerInputCount - Number(fs.lastRollInputCount)) > fs.cooldown;

  if (isPublicAction && cooldownPassed) {
    const fameBefore = FAME_SYSTEM.clamp(fs.fame, 0, 100);
    const stageBefore = FAME_SYSTEM.stageForFame(fameBefore);
    const chance = FAME_SYSTEM.getSuccessChance(fameBefore, fs.difficulty);
    const success = Math.random() * 100 < chance;
    const rawChange = success ? FAME_SYSTEM.randomInt(4, 8) : -FAME_SYSTEM.randomInt(3, 6);
    const fameAfter = FAME_SYSTEM.clamp(fameBefore + rawChange, 0, 100);
    const actualChange = fameAfter - fameBefore;
    const stageAfter = FAME_SYSTEM.stageForFame(fameAfter);

    let stageChange = null;
    if (stageAfter !== stageBefore) stageChange = fameAfter > fameBefore ? "up" : "down";

    const result = {
      actionKey,
      success,
      delta: actualChange,
      fame: fameAfter,
      stage: stageAfter,
      chance: chance,
      stageChange,
      uiLanguage: fs.currentUiLanguage
    };

    fs.fame = fameAfter;
    fs.lastRoll = {
      success,
      delta: actualChange,
      fame: fameAfter,
      stage: stageAfter,
      chance
    };
    fs.pendingResult = result;
    fs.lastRollInputCount = fs.playerInputCount;
  }

  // --------------------------------------------------------------------------
  // STATE BOOKKEEPING AND STORY CARD UPDATE
  // --------------------------------------------------------------------------
  fs.lastInputText = normalizedInput;
  fs.lastInputKey = actionKey;
  fs.lastSeenActionCount = hasActionCount ? actionCount : fs.lastSeenActionCount;
  fs.initialized = true;
  fs.processedActions.push({ key: actionKey, actionCount });
  if (fs.processedActions.length > 100) fs.processedActions = fs.processedActions.slice(-100);
  fs.snapshots = fs.snapshots.slice(-80);
  FAME_SYSTEM.writeCard(fs, cards);

  // --------------------------------------------------------------------------
  // MERGE POINT: Place other scripts' Input logic above this return statement.
  // --------------------------------------------------------------------------
  return { text };
};

// Do not modify this line.
modifier(text)
