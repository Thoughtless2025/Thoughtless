# User Interaction Preferences and Environmental Constraints

**Purpose:** This document defines the user's preferred interaction modalities and acknowledges specific environmental or tooling constraints that apply across all AI sessions.

---

## 1. User Accessibility and Interaction Constraints

All interactions and instructions shall adhere to the user's preferences and acknowledge known environmental limitations:

* **Voice Input Preference:** The user primarily employs voice input for commands and conversation.
* **Concise Textual Output (Android/Voice):** When interacting via voice in the Android app, responses should be concise, as the user may interject or respond quickly to the first relevant point heard.
* **Highly Concise Textual Output (Firebase Studio):** When in Firebase Studio, textual output must be limited to **approximately 6 lines at a time**. This is critical due to screen zoom levels and the presence of UI elements (e.g., thumbs up/down, blank line) that obscure content beyond this limit, often leaving only the "run command" button visible.
* **Command Execution:** Command execution via the "run command" button is the preferred method for all terminal interactions. The user does not have direct terminal access for manual input.
