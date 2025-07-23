# Session Context Initialization Protocol (SCIP) - Generic Template

**Author:** Gemini (Google's Large Language Model)
**Purpose:** This document defines a foundational protocol for any Gemini (or compatible AI) instance at the commencement of a new session. It outlines how the AI should discover and internalize the stable environment, user-specific preferences, and project-specific details to ensure immediate and informed resumption of work across *any project for any user*.

---

## 1. AI System Self-Configuration Protocol

Upon reading this document and initiating a session, the AI system shall:

1.  **Prioritize Contextual Document Retrieval and Internalization:**
    * **If direct programmatic access to Git is available to this AI instance:**
        * Execute `git pull` to synchronize the local workspace with the remote Git repository.
        * Then, thoroughly read and internalize the contents of the following files (relative to the current repository root). The AI should process these files in the order listed, with later files potentially refining context from earlier ones:
            * `docs/user_config/UserPreferences.md` (for user-specific interaction constraints, output verbosity, input methods, command execution preferences).
            * `docs/system_info/GeneralToolLimitations.md` (for known, generic limitations of the AI tooling or the overall platform, *independent of specific user setups or projects*).
            * `docs/project_info/ProjectOverview.md` (for project purpose, vision, high-level goals).
            * `docs/project_info/ProjectIdentifiers.md` (for Firebase Project Name, ID, Git repository URL, etc.).
            * `docs/project_info/CurrentPhaseGoals.md` (for current development phase objectives).
            * `docs/project_info/ProjectSpecificAccessibility.md` (if any accessibility requirements are unique to *this specific project's UI/UX*).
            * `progress.md` (for current project progress, outstanding issues, and immediate blockers specific to this project).
    * **Else (if direct programmatic Git access is NOT available, or if unsure):**
        * *Expect the user to have provided the concatenated version of this context (`newsessionconcat.md`).* Acknowledge that all necessary context (user preferences, project specifics, general limitations, and current progress) has been provided in the initial paste, **including content from all recursively linked Markdown files**. The AI shall internalize these details as if read from individual linked files.
2.  **Acknowledge Distributed Workflow:** Understand that the user may interact with various Gemini frontends (e.g., generic web, Android app, Firebase Studio, Firebase Console), each with potentially different capabilities regarding chat history and direct file access.
3.  **Recognize Persistence Strategy:** Internalize that the project's Git repository functions as the primary persistent storage and central source of truth, mitigating AI instance statelessness. Automatic `git add` and `git push` operations for relevant files (as instructed by the user or inferred) are the default **if direct programmatic Git access is available to this AI instance.**

---

## 2. Session Initialization Protocol (SIP) Trigger

A new session is initiated when the user provides initial context (e.g., by pasting `newsessionconcat.md` content) or issues a command that implies the desire to begin project work or set up the session. Examples of such commands include "read and do new session," "start session," or "do setup." It is important to note that the AI is designed to infer this intent from natural language, so various informal phrases may also trigger this protocol.

Upon recognizing an intent to begin a new session, the AI shall perform the following sequence:

1.  **Context Document Retrieval Decision:** (As detailed in Section 1.1 above)
    * Perform Git operations and read linked files OR confirm concatenated context has been processed.
2.  **Analyze Git Logs (if applicable):** If Git operations were performed directly by the AI, review recent Git commit logs from the `git pull` operation to understand user actions and changes. If content was user-provided, rely on the provided document content itself.
3.  **Confirm Readiness:** Explicitly confirm readiness to resume work by stating:
    * The last known project focus (derived from `progress.md`).
    * Any immediate high-priority blockers (derived from the "Outstanding Issues and Challenges" section in `progress.md`).
    * Any key error messages (currently tracked in the "Outstanding Issues and Challenges" section in `progress.md`).
    * Acknowledge user-specific interaction preferences (derived from `UserPreferences.md`).

---

## 3. Session Continuity Troubleshooting Protocol

If, after executing the "Initialize session with project context" command (or equivalent trigger), the AI does not appear to be aware of the latest project status (e.g., based on information expected from `progress.md`), it indicates a potential failure in the previous session's document updates or Git push operations.

In such cases, the AI shall prompt the user to:

1.  Explicitly state the discrepancy and briefly remind the AI of the last significant progress made.
2.  **Git Push Decision:**
    * **If direct programmatic access to Git is available to this AI instance:**
        * Instruct the AI to re-attempt the Git operations to `add`, `commit`, and `push` `progress.md` (and any other relevant updated files, *including `newsessionconcat.md`*).
    * **Else (if direct programmatic Git access is NOT available, or if unsure):**
        * Prompt the user: "It seems our documents might not be synchronized. Please ensure your local `progress.md` (and any other updated files) are committed and pushed to your Git repository. Once you have done so, please confirm."
        * Wait for the user's confirmation.
3.  Once the AI confirms successful Git operations (either direct or via user-provided confirmation), recommend ending the current session and initiating a new one using the "Initialize session with project context" command to verify full context loading.
