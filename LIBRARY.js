/* ============================================================================
   🌟 FAME SYSTEM v1.0.0 
   Hook: Library
   Creator: Nynaleath

   Shared configuration, Story Card helpers, public-action detectors, and text.
   ============================================================================ */

const FAME_SYSTEM = (() => {
  // --------------------------------------------------------------------------
  // CREATOR SETTINGS — These are safe values to customize.
  // --------------------------------------------------------------------------
  const VERSION = "1.0.0";
  const CARD_KEYS = "FAME_SYSTEM_CONTROL_PANEL_9471";
  const CARD_TYPE = "Fame System";
  const CARD_TITLE = "🌟 FAME SYSTEM";
  const CARD_NOTES = "Edit the values after the colon in the Fame System panel.";

  const DEFAULTS = {
    fame: 0,
    difficulty: "Normal",
    cooldown: 0,
    language: "English",
    notifications: true
  };

  const DIFFICULTY_BASES = {
    Easy: 70,
    Normal: 55,
    Hard: 40,
    Extreme: 25
  };

  const FAME_STAGES = [
    { name: "Unknown", min: 0, max: 14, es: "Desconocido", audience: "a handful of people" },
    { name: "Local", min: 15, max: 34, es: "Local", audience: "their local community" },
    { name: "Known", min: 35, max: 54, es: "Conocido", audience: "a modest local and online audience" },
    { name: "Famous", min: 55, max: 74, es: "Famoso", audience: "the national public and media" },
    { name: "Star", min: 75, max: 89, es: "Estrella", audience: "the international press and public" },
    { name: "Superstar", min: 90, max: 100, es: "Superestrella", audience: "the whole world" }
  ];

  // --------------------------------------------------------------------------
  // PERMANENT STAGE INSTRUCTIONS 
  // --------------------------------------------------------------------------
  const STAGE_TEXT = {
    Unknown: "[Fame] The player character is a complete unknown. Nobody recognizes them in public and their work reaches almost no one. Do not invent fans, press or recognition.",
    Local: "[Fame] The player character is a local name. A few people in their area or social circle recognize them and may compliment them, but strangers elsewhere do not know them. No press, no paparazzi.",
    Known: "[Fame] The player character is a rising name with a modest following online and occasional local media mentions. Some strangers recognize them and ask for a photo or autograph, but most people still do not. Fans are friendly and few.",
    Famous: "[Fame] The player character is famous. They are widely recognized in public, have real fans, press coverage and social media buzz. Strangers approach them, photos are taken and rumors can spread. Daily life is harder but still possible.",
    Star: "[Fame] The player character is a major star, recognized almost everywhere. Fans and press follow their career closely, and interviews, sponsors and tabloid rumors are part of their life. Privacy is scarce and public places draw crowds.",
    Superstar: "[Fame] The player character is a global superstar. Paparazzi and fans follow them constantly, crowds gather wherever they go and every move becomes news. Privacy is nearly impossible, and people treat them with awe, envy or obsession."
  };

  const COMMON_STAGE_INSTRUCTION = "Show this through the world and how people react when it fits naturally. Never mention fame levels, numbers, dice or this note.";

  // --------------------------------------------------------------------------
  // CREATOR-EDITABLE DETECTORS — Add or remove patterns as needed.
  // The input must describe a public-facing activity; a bare mention of a
  // concert, album, video, or celebrity is not intended to trigger a roll.
  // --------------------------------------------------------------------------
  const PUBLIC_ACTION_PATTERNS = [
    // Releasing music or a public entertainment project (English).
    /\b(?:release|releases|released|releasing|drop|drops|dropped|dropping|launch|launches|launched|put out|puts out|publish|publishes|published)\b[\s\S]{0,55}\b(?:album|single|song|record|ep|track|music video|debut record)\b/i,

    // Publishing or uploading online content (English).
    /\b(?:upload|uploads|uploaded|uploading|post|posts|posted|posting|publish|publishes|published|publishing|share|shares|shared|sharing)\b[\s\S]{0,50}\b(?:video|clip|post|photo|picture|song|music|content|vlog|reel|stream|online|internet|social media|youtube|tiktok|instagram|twitter|facebook)\b/i,
    /\b(?:upload|post|publish|share|put)\b[\s\S]{0,35}\b(?:online|to youtube|to tiktok|to instagram|on social media|on the internet|a livestream|a live stream)\b/i,

    // Concerts and performances (English).
    /\b(?:give|gives|gave|giving|perform|performs|performed|performing|play|plays|played|playing|do|does|did)\b[\s\S]{0,35}\b(?:a\s+)?(?:concert|gig|show|live show|set|performance|recital)\b/i,
    /\b(?:sing|sings|sang|singing|perform|performs|performed|performing|play|plays|played|playing)\b[\s\S]{0,55}\b(?:on stage|for an audience|for the audience|in public|at a concert|at the festival|live|for a crowd|in front of (?:an? )?(?:audience|crowd)|at a bar|at a club|in the street|at a wedding|at an event)\b/i,
    /\b(?:concert|gig|festival|stage|audience|crowd|live show)\b[\s\S]{0,45}\b(?:sing|sang|singing|perform|performed|performing|play|played|playing)\b/i,

    // Acting or appearing in public entertainment (English).
    /\b(?:act|acts|acted|acting|star|stars|starred|starring|perform|performs|performed)\b[\s\S]{0,50}\b(?:film|movie|series|tv show|television|play|production|commercial|advertisement|role|theater|theatre)\b/i,

    // Live streaming (English).
    /\b(?:start|starts|started|starting|do|does|did|host|hosts|hosted|hosting|begin|begins|began|stream|streams|streamed|streaming)\b[\s\S]{0,45}\b(?:a livestream|a live stream|a stream|streaming live|live on (?:youtube|twitch|tiktok|instagram))\b/i,

    // Releasing music or a public entertainment project (Spanish).
    /\b(?:lanzar|lanzo|lanzas|lanza|lanzamos|lanzan|lancé|lanzó|lanzaron|sacar|saco|sacas|saca|saqué|sacó|publicar|publico|publicas|publica|publiqué|publicó)\b[\s\S]{0,55}\b(?:álbum|album|disco|single|sencillo|canción|tema|ep|videoclip|video musical)\b/i,

    // Publishing or uploading online content (Spanish).
    /\b(?:subir|subo|subes|sube|subimos|suben|subí|subió|subieron|subiendo|publicar|publico|publicas|publica|publicamos|publican|publiqué|publicó|compartir|comparto|compartes|comparte|compartimos|compartí|compartió|colgar|cuelgo|cuelgas|cuelga|colgué|colgó)\b[\s\S]{0,55}\b(?:video|vídeo|videoclip|publicación|post|foto|imagen|canción|tema|música|reel|historia|stream|directo|internet|redes sociales)\b/i,
    /\b(?:subir|subo|sube|publicar|publico|publica|compartir|comparto|comparte)\b[\s\S]{0,40}\b(?:a internet|a youtube|a tiktok|a instagram|a las redes|en redes sociales|en internet|un directo|una transmisión en vivo)\b/i,

    // Concerts and performances (Spanish).
    /\b(?:dar|doy|das|da|damos|di|dio|ofrecer|ofrezco|ofrece|ofrecí|ofreció|hacer|hago|hace|hice|hizo|tocar|toco|tocas|toca|toqué|tocó|interpretar|interpreto|interpretó|cantar|canto|cantas|canta|canté|cantó)\b[\s\S]{0,50}\b(?:un concierto|concierto|recital|espectáculo|actuación|en directo|festival|escenario|público|audiencia|multitud|bar|club|calle|evento|boda)\b/i,
    /\b(?:cantar|canto|cantas|canta|canté|cantó|actuar|actúo|actúa|actué|actuó|tocar|toco|toca|interpretar|interpreto|interpreta)\b[\s\S]{0,50}\b(?:en público|ante el público|frente al público|ante una multitud|frente a una audiencia|en el escenario|en un concierto|en un festival|en directo|en la calle|en un bar|en un club)\b/i,
    /\b(?:concierto|festival|escenario|público|audiencia|multitud|en directo)\b[\s\S]{0,45}\b(?:cantar|cantó|canto|actuar|actuó|actuando|tocar|interpretar)\b/i,

    // Acting or appearing in public entertainment (Spanish).
    /\b(?:actuar|actúo|actúa|actué|actuó|actuando|interpretar|interpreto|interpreta|protagonizar|protagonizo|protagonizó)\b[\s\S]{0,50}\b(?:película|serie|obra|teatro|televisión|anuncio|producción|papel|cortometraje)\b/i,

    // Live streaming (Spanish).
    /\b(?:hacer|hago|hace|iniciar|inicio|inicia|empezar|empiezo|empieza|transmitir|transmito|transmite|emitir|emito|emite|streamear|streameo|streamea)\b[\s\S]{0,45}\b(?:un directo|una transmisión en vivo|un streaming|un stream|en vivo|en twitch|en youtube|en tiktok|en instagram)\b/i
  ];

  // --------------------------------------------------------------------------
  // BASIC VALUE HELPERS
  // --------------------------------------------------------------------------
  function clamp(value, minimum, maximum) {
    const number = Number(value);
    if (!Number.isFinite(number)) return minimum;
    return Math.min(maximum, Math.max(minimum, Math.round(number)));
  }

  function normalizeDifficulty(value) {
    const clean = String(value == null ? "" : value).split("(")[0].trim().toLowerCase();
    if (["easy", "fácil", "facil", "facilmente"].includes(clean)) return "Easy";
    if (["hard", "difícil", "dificil"].includes(clean)) return "Hard";
    if (["extreme", "extrema", "extremo"].includes(clean)) return "Extreme";
    return "Normal";
  }

  function normalizeLanguage(value) {
    const clean = String(value == null ? "" : value).split("(")[0].trim().toLowerCase();
    if (["english", "inglés", "ingles", "en"].includes(clean)) return "English";
    if (["español", "espanol", "spanish", "es"].includes(clean)) return "Español";
    return "Auto";
  }

  function normalizeNotifications(value) {
    const clean = String(value == null ? "" : value).split("(")[0].trim().toLowerCase();
    return !["off", "false", "no", "0", "desactivado", "desactivada"].includes(clean);
  }

  function normalizeText(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim().toLowerCase();
  }

  function detectLanguage(text, preference) {
    if (preference === "English") return "English";
    if (preference === "Español") return "Español";
    const sample = String(text == null ? "" : text).toLowerCase();
    const spanishClues = /[áéíóúñ¿¡]/i.test(sample) || /\b(?:el|la|los|las|un|una|yo|mi|mis|quiero|subo|publico|canto|concierto|vídeo|video|disco|álbum|actúo|actuar|canción|redes|hacer|voy|para|que|del|por)\b/i.test(sample);
    return spanishClues ? "Español" : "English";
  }

  function stageForFame(fame) {
    const value = clamp(fame, 0, 100);
    for (let index = 0; index < FAME_STAGES.length; index += 1) {
      if (value >= FAME_STAGES[index].min && value <= FAME_STAGES[index].max) return FAME_STAGES[index].name;
    }
    return "Unknown";
  }

  function stageData(stageName) {
    return FAME_STAGES.find(stage => stage.name === stageName) || FAME_STAGES[0];
  }

  function localizedStage(stageName, language) {
    const stage = stageData(stageName);
    return language === "Español" ? stage.es : stage.name;
  }

  function getSuccessChance(fame, difficulty) {
    const base = DIFFICULTY_BASES[normalizeDifficulty(difficulty)] || DIFFICULTY_BASES.Normal;
    return Math.min(95, Math.max(5, base + (clamp(fame, 0, 100) * 0.30)));
  }

  function randomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  // --------------------------------------------------------------------------
  // PUBLIC-ACTION DETECTION
  // --------------------------------------------------------------------------
  function detectPublicAction(text) {
    const input = String(text == null ? "" : text);
    return PUBLIC_ACTION_PATTERNS.some(pattern => pattern.test(input));
  }

  // --------------------------------------------------------------------------
  // STORY CARD PARSING AND RENDERING
  // --------------------------------------------------------------------------
  function extractField(entry, fieldName) {
    const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = String(entry == null ? "" : entry).match(new RegExp("^\\s*" + escaped + "\\s*:\\s*(.*?)\\s*$", "im"));
    if (!match) return null;
    return match[1].split(/\s+\(/)[0].trim();
  }

  function parseCardEntry(entry) {
    const rawFame = extractField(entry, "Fame");
    const rawDifficulty = extractField(entry, "Difficulty");
    const rawCooldown = extractField(entry, "Cooldown");
    const rawLanguage = extractField(entry, "Language");
    const rawNotifications = extractField(entry, "Notifications");
    return {
      fame: rawFame === null || rawFame === "" ? null : clamp(rawFame, 0, 100),
      difficulty: rawDifficulty === null ? null : normalizeDifficulty(rawDifficulty),
      cooldown: rawCooldown === null || rawCooldown === "" ? null : clamp(rawCooldown, 0, 9999),
      language: rawLanguage === null ? null : normalizeLanguage(rawLanguage),
      notifications: rawNotifications === null ? null : normalizeNotifications(rawNotifications)
    };
  }

  function editableValues(fs) {
    return {
      fame: clamp(fs.fame, 0, 100),
      difficulty: normalizeDifficulty(fs.difficulty),
      cooldown: clamp(fs.cooldown, 0, 9999),
      language: normalizeLanguage(fs.language),
      notifications: Boolean(fs.notifications)
    };
  }

  function copyEditableValues(values) {
    if (!values) return null;
    return {
      fame: values.fame,
      difficulty: values.difficulty,
      cooldown: values.cooldown,
      language: values.language,
      notifications: values.notifications
    };
  }

  function localizedLastRoll(fs, language) {
    if (!fs.lastRoll) return language === "Español" ? "ninguna" : "none";
    const roll = fs.lastRoll;
    const sign = roll.delta > 0 ? "+" : "";
    const amount = sign + String(roll.delta);
    const stageName = localizedStage(roll.stage, language);
    if (language === "Español") {
      const outcome = roll.success ? "Éxito" : "Fracaso";
      return outcome + " (" + amount + ") → Fama " + roll.fame + " · " + stageName;
    }
    const outcome = roll.success ? "Success" : "Failure";
    return outcome + " (" + amount + ") → Fame " + roll.fame + " · " + stageName;
  }

  function renderCardEntry(fs, language) {
    const spanish = language === "Español";
    const difficultyOptions = spanish ? "Fácil / Normal / Difícil / Extrema" : "Easy / Normal / Hard / Extreme";
    const cooldownHint = spanish ? "acciones entre tiradas, 0 = desactivado" : "actions between rolls, 0 = off";
    const languageHint = "Auto / English / Español";
    const notificationHint = spanish ? "Activado / Desactivado" : "On / Off";
    const stageHint = spanish ? "automático, no editar" : "automatic, do not edit";
    const header = spanish
      ? "🌟 FAME SYSTEM — edita solo los valores después de los dos puntos"
      : "🌟 FAME SYSTEM — edit only the values after the colon";

    return [
      header,
      "Fame: " + clamp(fs.fame, 0, 100),
      "Difficulty: " + normalizeDifficulty(fs.difficulty) + "  (" + difficultyOptions + ")",
      "Cooldown: " + clamp(fs.cooldown, 0, 9999) + "  (" + cooldownHint + ")",
      "Language: " + normalizeLanguage(fs.language) + "  (" + languageHint + ")",
      "Notifications: " + (fs.notifications ? "On" : "Off") + "  (" + notificationHint + ")",
      "Stage: " + localizedStage(stageForFame(fs.fame), language) + "  (" + stageHint + ")",
      "Last roll: " + localizedLastRoll(fs, language) + "  (" + stageHint + ")"
    ].join("\n");
  }

  function findCardIndex(cards) {
    if (!Array.isArray(cards)) return -1;
    return cards.findIndex(card => {
      const keys = String(card && card.keys != null ? card.keys : "");
      const title = String(card && card.title != null ? card.title : "");
      const type = String(card && card.type != null ? card.type : "");
      return keys.indexOf(CARD_KEYS) >= 0 || (type === CARD_TYPE && (title === CARD_TITLE || /Fame:\s*\d+/i.test(String(card.entry || ""))));
    });
  }

  function writeCard(fs, cards) {
    const displayLanguage = fs.currentUiLanguage || detectLanguage("", fs.language);
    const entry = renderCardEntry(fs, displayLanguage);
    const index = findCardIndex(cards);

    if (index >= 0) {
      updateStoryCard(index, CARD_KEYS, entry, CARD_TYPE, CARD_TITLE, CARD_NOTES);
    } else {
      addStoryCard(CARD_KEYS, entry, CARD_TYPE, CARD_TITLE, CARD_NOTES);
    }

    fs.lastRendered = editableValues(fs);
  }

  // --------------------------------------------------------------------------
  // STATE AND RETRY/UNDO SNAPSHOTS
  // --------------------------------------------------------------------------
  function ensureState(stateObject) {
    if (!stateObject.fameSystem || typeof stateObject.fameSystem !== "object") {
      stateObject.fameSystem = {
        version: VERSION,
        initialized: false,
        fame: DEFAULTS.fame,
        difficulty: DEFAULTS.difficulty,
        cooldown: DEFAULTS.cooldown,
        language: DEFAULTS.language,
        notifications: DEFAULTS.notifications,
        lastRoll: null,
        pendingResult: null,
        playerInputCount: 0,
        lastRollInputCount: null,
        lastSeenActionCount: null,
        lastInputText: "",
        lastInputKey: "",
        lastNotifiedKey: "",
        lastMessage: "",
        lastRendered: null,
        currentUiLanguage: "English",
        snapshots: [],
        processedActions: []
      };
    }

    const fs = stateObject.fameSystem;
    if (typeof fs.initialized !== "boolean") fs.initialized = false;
    if (!Number.isFinite(Number(fs.fame))) fs.fame = DEFAULTS.fame;
    if (!fs.difficulty) fs.difficulty = DEFAULTS.difficulty;
    if (!Number.isFinite(Number(fs.cooldown))) fs.cooldown = DEFAULTS.cooldown;
    if (!fs.language) fs.language = DEFAULTS.language;
    if (typeof fs.notifications !== "boolean") fs.notifications = DEFAULTS.notifications;
    if (!Array.isArray(fs.snapshots)) fs.snapshots = [];
    if (!Array.isArray(fs.processedActions)) fs.processedActions = [];
    if (!Number.isFinite(Number(fs.playerInputCount))) fs.playerInputCount = 0;
    if (!Object.prototype.hasOwnProperty.call(fs, "lastRoll")) fs.lastRoll = null;
    if (!Object.prototype.hasOwnProperty.call(fs, "pendingResult")) fs.pendingResult = null;
    if (!Object.prototype.hasOwnProperty.call(fs, "lastRendered")) fs.lastRendered = null;
    if (!Object.prototype.hasOwnProperty.call(fs, "lastNotifiedKey")) fs.lastNotifiedKey = "";
    if (!Object.prototype.hasOwnProperty.call(fs, "lastMessage")) fs.lastMessage = "";
    if (!Object.prototype.hasOwnProperty.call(fs, "lastRollInputCount")) fs.lastRollInputCount = null;
    return fs;
  }

  function makeSnapshot(fs, actionCount) {
    return {
      actionCount: actionCount,
      initialized: fs.initialized,
      fame: fs.fame,
      difficulty: fs.difficulty,
      cooldown: fs.cooldown,
      language: fs.language,
      notifications: fs.notifications,
      lastRoll: fs.lastRoll ? Object.assign({}, fs.lastRoll) : null,
      pendingResult: fs.pendingResult ? Object.assign({}, fs.pendingResult) : null,
      playerInputCount: fs.playerInputCount,
      lastRollInputCount: fs.lastRollInputCount,
      lastInputText: fs.lastInputText,
      lastInputKey: fs.lastInputKey,
      lastNotifiedKey: fs.lastNotifiedKey,
      lastMessage: fs.lastMessage,
      lastRendered: copyEditableValues(fs.lastRendered),
      currentUiLanguage: fs.currentUiLanguage
    };
  }

  function restoreSnapshot(fs, snapshot) {
    if (!snapshot) return false;
    fs.initialized = snapshot.initialized;
    fs.fame = snapshot.fame;
    fs.difficulty = snapshot.difficulty;
    fs.cooldown = snapshot.cooldown;
    fs.language = snapshot.language;
    fs.notifications = snapshot.notifications;
    fs.lastRoll = snapshot.lastRoll ? Object.assign({}, snapshot.lastRoll) : null;
    fs.pendingResult = snapshot.pendingResult ? Object.assign({}, snapshot.pendingResult) : null;
    fs.playerInputCount = snapshot.playerInputCount;
    fs.lastRollInputCount = snapshot.lastRollInputCount;
    fs.lastInputText = snapshot.lastInputText;
    fs.lastInputKey = snapshot.lastInputKey;
    fs.lastNotifiedKey = snapshot.lastNotifiedKey;
    fs.lastMessage = snapshot.lastMessage || "";
    fs.lastRendered = copyEditableValues(snapshot.lastRendered);
    fs.currentUiLanguage = snapshot.currentUiLanguage || "English";
    return true;
  }

  function addSnapshotIfMissing(fs, actionCount) {
    if (!fs.snapshots.some(snapshot => snapshot.actionCount === actionCount)) {
      fs.snapshots.push(makeSnapshot(fs, actionCount));
      if (fs.snapshots.length > 80) fs.snapshots = fs.snapshots.slice(-80);
    }
  }

  // --------------------------------------------------------------------------
  // NOTIFICATIONS
  // --------------------------------------------------------------------------
  function formatNotification(result, language) {
    const spanish = language === "Español";
    const amount = (result.delta > 0 ? "+" : "") + String(result.delta);
    const stageName = localizedStage(result.stage, language);
    if (spanish) {
      return "🎲 " + (result.success ? "Éxito" : "Fracaso") + " (" + amount + ") → Fama " + result.fame + " · " + stageName;
    }
    return "🎲 " + (result.success ? "Success" : "Failure") + " (" + amount + ") → Fame " + result.fame + " · " + stageName;
  }

  // --------------------------------------------------------------------------
  // CONTEXT INJECTION
  // --------------------------------------------------------------------------
  function buildContextInstructions(fs) {
    const stage = stageForFame(fs.fame);
    const lines = [STAGE_TEXT[stage], COMMON_STAGE_INSTRUCTION];
    const result = fs.pendingResult;

    if (result) {
      const audience = stageData(result.stage).audience;
      if (result.success) {
        lines.push("The player character's latest public action was a SUCCESS. Show " + audience + " reacting positively: praise, applause, shares, growing attention.");
      } else {
        lines.push("The player character's latest public action was a FAILURE. Show it falling flat with " + audience + ": indifference, criticism, mockery or embarrassment.");
      }

      if (result.stageChange === "up") {
        lines.push("The player character has just reached the " + result.stage + " level of fame. Show a moment that marks this change.");
      } else if (result.stageChange === "down") {
        lines.push("The player character has just fallen to the " + result.stage + " level of fame. Show their attention and recognition fading.");
      }
    }

    return lines.join("\n");
  }

  function appendContextSafely(text, injection, contextInfo) {
    const original = String(text == null ? "" : text);
    const suffix = "\n\n" + injection;
    const maxChars = contextInfo && Number.isFinite(Number(contextInfo.maxChars)) ? Number(contextInfo.maxChars) : 0;
    if (!maxChars || original.length + suffix.length <= maxChars) return original + suffix;

    // Preserve the memory section and keep the newest history plus the new instructions.
    const requestedMemoryLength = contextInfo && Number.isFinite(Number(contextInfo.memoryLength)) ? Number(contextInfo.memoryLength) : 0;
    const memoryLength = Math.max(0, Math.min(original.length, requestedMemoryLength));
    const memory = memoryLength > 0 ? original.slice(0, memoryLength) : "";
    const remainder = original.slice(memoryLength);
    const remainingBudget = Math.max(0, maxChars - memory.length - suffix.length);
    const recentRemainder = remainingBudget >= remainder.length ? remainder : remainder.slice(-remainingBudget);
    return memory + recentRemainder + suffix;
  }

  // --------------------------------------------------------------------------
  // MERGE POINT: Place shared helpers from other scripts below this comment.
  // --------------------------------------------------------------------------

  return {
    VERSION,
    CARD_KEYS,
    CARD_TYPE,
    CARD_TITLE,
    CARD_NOTES,
    DEFAULTS,
    DIFFICULTY_BASES,
    FAME_STAGES,
    STAGE_TEXT,
    COMMON_STAGE_INSTRUCTION,
    PUBLIC_ACTION_PATTERNS,
    clamp,
    normalizeDifficulty,
    normalizeLanguage,
    normalizeNotifications,
    normalizeText,
    detectLanguage,
    stageForFame,
    stageData,
    localizedStage,
    getSuccessChance,
    randomInt,
    detectPublicAction,
    extractField,
    parseCardEntry,
    editableValues,
    copyEditableValues,
    renderCardEntry,
    findCardIndex,
    writeCard,
    ensureState,
    makeSnapshot,
    restoreSnapshot,
    addSnapshotIfMissing,
    formatNotification,
    buildContextInstructions,
    appendContextSafely
  };
})();
