
# 🌟 Fame System (FS)

A dynamic fame system for AI Dungeon designed for scenarios where the player can build a public identity, grow an audience, and potentially become a well-known personality.

---

## ✨ What is this?

I designed Fame System for AI Dungeon scenarios where becoming publicly known is part of the player's journey.

In many AI-driven stories, a character can upload a video, perform a song, stream online, launch a project, or make a public appearance without those actions having consistent consequences. The AI may treat an unknown character as if they already have a large fanbase, make them famous after a single success, or overlook the difference between a small local audience and worldwide recognition.

Fame System provides a persistent fame value and gives the AI additional context about what that level of fame means in the story.

It is especially suited for **slice-of-life scenarios** in which the player has the opportunity to start from the beginning and work toward becoming a public personality, such as:

- 🎥 A streamer or content creator
- 📱 An influencer or online personality
- 🎤 A singer or solo artist
- 🎸 A member of a band
- 🎭 An actor, performer, or entertainer
- 🌐 Anyone trying to build a public presence

The system is not tied to a particular character, career, or setting. The scenario defines the player's path; Fame System helps the AI reflect the consequences of that path.

---

## 💡 How it works

Fame System uses AI Dungeon's scripting hooks:

**Library → Input → Context → Output**

The system maintains a fame value from **0 to 100**. When it detects an eligible public action in the player's input, it can make a success/failure roll, update the fame value, and pass the result to the AI as additional context.

The system does more than display a number. **Fame affects both the probability of success for detected public actions and the way the AI is instructed to portray the consequences of the player's current public status.**

### 🌟 1. Fame and public recognition

The player's fame score corresponds to a descriptive stage:

| Fame | Stage | General meaning |
| --- | --- | --- |
| 0–14 | Unknown | Almost no public recognition |
| 15–34 | Local | Some recognition within a local area or social circle |
| 35–54 | Known | A modest following and occasional recognition |
| 55–74 | Famous | Broad recognition, fans, and media attention |
| 75–89 | Star | Major public visibility and limited privacy |
| 90–100 | Superstar | Global recognition and intense public attention |

These stages are used to provide the AI with a clear description of the player's public status. The intention is for fame to influence the world and people's reactions when it is relevant, without forcing every scene to revolve around celebrity.

For example, an unknown musician should not automatically have crowds of fans or paparazzi following them. A superstar, on the other hand, should face a very different level of public attention.

### 🎲 2. Public action detection and success rolls

When the Input hook detects a supported public action, the system calculates the chance of success based on the configured difficulty and the player's current fame.

| Difficulty | Base success chance |
| --- | ---: |
| Easy | 70% |
| Normal | 55% |
| Hard | 40% |
| Extreme | 25% |

The player's fame adds **0.30 percentage points per fame point** to the base chance. The final chance is limited to a minimum of 5% and a maximum of 95%.

In simplified form:

`Success chance = difficulty base + (fame × 0.30 percentage points)`

A higher fame score can therefore improve the odds of success, but it never guarantees success.

After a successful roll, fame increases by a random amount between **+4 and +8**. After a failed roll, fame decreases by a random amount between **−3 and −6**. Fame is always kept within the 0–100 range.

The system's public-action detector uses text patterns and is designed to recognize supported actions described by the player. Detection is experimental and may not recognize every possible phrasing or interpretation. The detector can be expanded in future updates.

### 🧠 3. Context injection and narrative consequences

The Context hook injects an English-language description of the player's current fame stage. It also injects the result of a public-action roll when there is a new result to communicate.

This distinction is important:

- **Fame stage context** gives the AI a continuing understanding of the player's public status.
- **Action result context** tells the AI whether the latest detected public action succeeded or failed and what kind of audience reaction fits the situation.
- **Stage-change context** is added when a roll moves the player into a different fame stage.

For example, if an unknown character successfully uploads a video, the AI is instructed to portray a positive response from a small audience. That success does not automatically mean the character has become famous. If the character later reaches a much higher fame stage, the AI receives different context describing the increased recognition and its consequences.

The system does not simply tell the AI that the player's fame is a number. It provides guidance about what that level of fame means for public recognition, audience reactions, media attention, and privacy.

The AI remains responsible for writing the actual scene. The script supplies relevant state and instructions rather than forcing a fixed narrative outcome.

### 🔔 4. Notifications

When notifications are enabled, the Output hook can display a concise notification about a completed roll, including whether it succeeded or failed and how the fame value changed.

Notifications can be turned off through the configuration card without disabling the underlying fame system.

---

## 🌍 English and Spanish compatibility

Fame System is designed for adventures played in **English or Spanish**.

The public-action detector includes patterns for both languages, and the configuration card allows the player to choose `Auto`, `English`, or `Español` for the language used by the card and notifications.

The context instructions sent to the AI are written in English regardless of the selected interface language. This keeps the injected instructions consistent while allowing the visible configuration and notifications to use the player's preferred language.

As with any pattern-based detector, language support does not guarantee recognition of every possible phrase. Unusual wording, ambiguous actions, or new activity types may require additional detector patterns.

---

## ⚙️ Configuration

Fame System automatically creates a configuration Story Card if one does not exist. The card is intended to be edited by the player during an adventure.

Example:

```text
🌟 FAME SYSTEM — edit only the values after the colon
Fame: 0
Difficulty: Normal  (Easy / Normal / Hard / Extreme)
Cooldown: 0  (actions between rolls, 0 = off)
Language: Auto  (Auto / English / Español)
Notifications: On  (On / Off)
Stage: Unknown  (automatic, do not edit)
Last roll: none  (automatic, do not edit)
```

### Editable values

| Setting | Description |
| --- | --- |
| `Fame` | The player's fame score, from 0 to 100. |
| `Difficulty` | The base difficulty used for public-action success rolls: Easy, Normal, Hard, or Extreme. |
| `Cooldown` | Number of player actions required between eligible rolls. `0` disables the cooldown. |
| `Language` | Language used for the visible card and notifications: Auto, English, or Español. |
| `Notifications` | Enables or disables roll notifications. |

`Stage` and `Last roll` are maintained automatically. They are displayed for reference and should not normally be edited manually.

The default fame value is **0**, but creators can change it to fit the scenario. For example, a scenario that begins with the player already having an online following can start with a higher fame score.

---

## 📦 Installation

Fame System is a creator tool for AI Dungeon and is installed through the script editor.

### Requirements

- AI Dungeon script edit mode
- Basic familiarity with copying and pasting scripts into AI Dungeon

### Setup

The system uses four script blocks:

1. **Library**
2. **Input**
3. **Context**
4. **Output**

Copy each Fame System block into its corresponding AI Dungeon hook. Keep the complete Library code available to the other hooks, and make sure each block is placed in the matching section.

Start an adventure and check that the Fame System configuration Story Card is created. You can then edit the card's supported values as needed.

---

## 🎯 Recommended use

Fame System is particularly suited for:

- 🏠 Slice-of-life scenarios
- 🎥 Streamer and content-creator simulations
- 📱 Influencer and social-media stories
- 🎤 Musician and singer career scenarios
- 🎸 Band and touring scenarios
- 🎭 Acting and entertainment careers
- 🌆 Contemporary sandbox adventures
- 📈 Stories where the player can build a public identity over time

It is most useful when public actions can have uncertain outcomes and the player's growing or declining recognition should affect how the world responds.

It may be less useful for scenarios where the player is already universally famous and fame progression is not part of the experience, unless the creator sets an appropriate starting value and still wants public actions to have variable outcomes.

---

## ⚠️ Important notes

- Fame System does not guarantee that the AI will narrate every consequence exactly as intended. It supplies context to guide the AI's interpretation.
- Public-action detection is pattern-based and remains experimental. Some actions or phrasings may not be recognized, and ordinary mentions should not be treated as public actions unless the detector matches them.
- Fame is not intended to force the story into a celebrity narrative during every turn. The injected context asks the AI to show relevant reactions when they fit naturally.
- The system's compatibility with other community-created AI Dungeon scripts has not been comprehensively tested. Since scripts may share or modify the same hooks and state, test combinations in your own scenario before relying on them.
- The scenario and its AI Instructions still matter. Fame System provides a framework for fame progression and its consequences; the scenario establishes the character, career, world, and narrative tone.

---

## 🛠️ Current status

**Version:** 1.0.0  
**Status:** Functional / Active Development

The core system supports:

- Fame tracking from 0 to 100
- Six descriptive fame stages
- Configurable public-action difficulty
- Fame-adjusted success probability
- Fame gains and losses following rolls
- Configurable cooldown
- English and Spanish interface language options
- Dynamic Context instructions for fame stage, action results, and stage changes
- Optional roll notifications
- Automatic creation of the configuration Story Card

Future updates may expand the public-action detector, especially for activities related to music, singers, bands, live performances, releases, streaming platforms, and contemporary music promotion.

---
## 🔌 Compatibility
Fame System wasn't tested in 1.0 with my other scripts or other community scripts, but the way it was designed, it shouldn't affect other scripts.

## ❤️ Credits

Created for AI Dungeon by **Nynaleath**.

Fame System was designed to help creators build more dynamic stories where a player's public actions, growing audience, successes, failures, and changing level of recognition can have meaningful consequences. So, feel free to modify it or putting on your scenarios, including the public ones.

If you use the system in one of your scenarios, credit is appreciated. A link to this repository is always welcome.

Thank you for giving Fame System a try!
