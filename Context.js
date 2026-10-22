/* ============================================================================
   🌟 FAME SYSTEM v1.0.0
   Hook: Context (onModelContext)
   Creator: Nynaleath

   Always injects the current Fame stage in English. A roll result and a stage
   transition are injected only for the public action that produced that roll.
   ============================================================================ */

const modifier = (text) => {
  const fs = FAME_SYSTEM.ensureState(state);
  const contextInfo = typeof info !== "undefined" && info ? info : {};

  // --------------------------------------------------------------------------
  // FAME CONTEXT INJECTION
  // --------------------------------------------------------------------------
  const instructions = FAME_SYSTEM.buildContextInstructions(fs);
  const modifiedText = FAME_SYSTEM.appendContextSafely(text, instructions, contextInfo);

  // --------------------------------------------------------------------------
  // MERGE POINT: Place other scripts' Context logic above this return statement.
  // --------------------------------------------------------------------------
  return { text: modifiedText };
};

// Do not modify this line.
modifier(text)
