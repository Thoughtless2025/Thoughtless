# Session Context Initialization Protocol (SCIP)

**Author:** Gemini (Google's Large Language Model)
**Purpose:** This document serves as a foundational context primer for any Gemini (or compatible AI) instance at the commencement of a new session. It defines the stable project environment, user preferences, and operational protocols to ensure immediate and informed resumption of work. It is designed to be timeless, focusing on enduring operational principles rather than dynamic project status.

---

## 1. AI System Self-Configuration Parameters

Upon reading this document, the AI system shall:

1.  **Prioritize User Accessibility and Interaction Constraints:** All interactions and instructions shall adhere to the user's preferences and acknowledge known environmental limitations:
    * **Voice Input Preference:** The user primarily employs voice input for commands and conversation.
    * **Concise Textual Output (Android/Voice):** When interacting via voice in the Android app, responses should be concise, as the user may interject or respond quickly to the first relevant point heard.
    * **Highly Concise Textual Output (Firebase Studio):** When in Firebase Studio, textual output must be limited to **approximately 6 lines at a time**. This is critical due to screen zoom levels and the presence of UI elements (e.g., thumbs up/down, blank line) that obscure content beyond this limit, often leaving only the "run command" button visible.
    * **Command Execution:** Command execution via the "run command" button is the preferred method. Manual copying and pasting of commands into a terminal is not preferred. Commands will only be presented for user execution via the "run command" button if the AI cannot execute them directly.
    * **Manual Content Provision:** When providing code, text, or any content that the user needs to manually copy and paste (e.g., for manual file updates), always enclose the content within markdown blocks to facilitate easy single-click copying.
2.  **Acknowledge Tooling and Workflow:** Understand the distributed workflow across Gemini App (Android, for ideation/snippets), Gemini in Firebase Studio (for agent actions/file manipulation), and Android Git App (for reliable local file operations and version control). Note that the user interacts with various Gemini frontends, including the generic web browser interface and the Android app (which share a common chat history), the Git-enabled Firebase Studio instance (with lower, but now managed, chat quotas), and occasionally the Firebase Console Gemini instance (least used).
3.  **Recognize Persistence Strategy:** Internalize that the Git repository (`https://github.com/Thoughtless2025/Thoughtless.git`) functions as the primary persistent storage and central source of truth, mitigating AI instance statelessness. Automatic `git add` and `git push` operations for relevant files (as instructed by the user or inferred) are the default **if direct programmatic Git access is available to this AI instance.**
4.  **Reference Project Identifiers:** Note the Firebase Project Name: `ThoughtlessAppNew` and Project ID: `thoughtlessappnew`. Refer to [docs/PurposeAndVision.md](docs/PurposeAndVision.md) for the project's core purpose and vision.
5.  **Understand Known System Limitations:** Be aware of persistent environmental or tooling challenges. For a detailed and current list of outstanding issues, refer to the "Outstanding Issues" section in the project progress document (`progress.md`). High-level awareness includes:
    * File Writing Issues (Firebase Studio)
    * Cloud Build Quota Restrictions
    * Firebase Studio Interface Difficulties
    * Google Cloud Console Navigation Challenges
    * AI Tooling Limitations (Firebase Studio)

---

## 2. Session Initialization Protocol (SIP) Trigger

To initiate a new session and load full project context, the user will explicitly state or type: **"Initialize session with project context."**

Upon this command, the AI shall perform the following sequence:

1.  **Initiate Git Synchronization (User Confirmation):**
    *   Prompt the user: "Shall I perform a `git pull` to synchronize our local workspace with the remote repository?"
    *   Wait for user confirmation (e.g., "Yes," "Proceed," "Go ahead").
    *   If the user confirms, execute `git pull`.
    *   If the user does not confirm, skip the `git pull` and proceed to reading the local documents.

2.  **Context Document Retrieval:**
    *   Read and internalize the contents of `newsession.md` (this document) and `progress.md` from the synchronized workspace (if `git pull` was performed) or the local files (if `git pull` was skipped).

3.  **Analyze Git Logs (if applicable):** If Git operations were performed directly by the AI, review recent Git commit logs from the `git pull` operation to understand user actions and changes. If content was user-provided, rely on the provided document content itself.
4.  **Confirm Readiness:** Explicitly confirm readiness to resume work by stating:
    * The last known project focus (derived from `progress.md`).
    * Any immediate high-priority blockers (derived from the "Outstanding Issues and Challenges" section in `progress.md`).
    * Any key error messages (currently tracked in the "Outstanding Issues and Challenges" section in `progress.md`).

---

## 3. Session Continuity Troubleshooting Protocol

If, after executing the "Initialize session with project context" command, the AI does not appear to be aware of the latest project status (e.g., based on information expected from `progress.md`), it indicates a potential failure in the previous session's document updates or Git push operations.

In such cases, the AI shall prompt the user to:

1.  Explicitly state the discrepancy and briefly remind the AI of the last significant progress made.
2.  **Git Push Decision:**
    * **If direct programmatic access to Git is available to this AI instance:**
        * Instruct the AI to re-attempt the Git operations to `add`, `commit`, and `push` `progress.md` (and any other relevant updated files).
    *   **Else (if direct programmatic Git access is NOT available, or if unsure):**
        *   Prompt the user: "It seems our documents might not be synchronized. Please ensure your local `progress.md` (and any other updated files) are committed and pushed to your Git repository. Once you have done so, please confirm."
        *   Wait for the user's confirmation.
3.  Once the AI confirms successful Git operations (either direct or via user-provided confirmation), recommend ending the current session and initiating a new one using the "Initialize session with project context" command to verify full context loading.

---
