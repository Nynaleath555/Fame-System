/* ============================================================================
   🌟 FAME SYSTEM v1.0.0
   Hook: Output (onOutput)
   Creator: Nynaleath

   Shows a short notification once for each roll. The pending result is retained
   until the next distinct player input, allowing a Retry to reuse the same roll.
   ============================================================================ */

const modifier = (text) => {
  const fs = FAME_SYSTEM.ensureState(state);
  const pending = fs.pendingResult;

  // --------------------------------------------------------------------------
  // FAME NOTIFICATION
  // --------------------------------------------------------------------------
  if (pending && fs.notifications && fs.lastNotifiedKey !== pending.actionKey) {
    state.message = FAME_SYSTEM.formatNotification(pending, pending.uiLanguage || fs.currentUiLanguage || "English");
    fs.lastMessage = state.message;
    fs.lastNotifiedKey = pending.actionKey;
  }

  // --------------------------------------------------------------------------
  // MERGE POINT: Place other scripts' Output logic above this return statement.
  // --------------------------------------------------------------------------
  return { text };
};

// Do not modify this line.
modifier(text)
