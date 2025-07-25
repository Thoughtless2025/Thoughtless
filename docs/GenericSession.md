# Session Context Initialization Protocol (SCIP)

**Purpose:** This document serves as a foundational context primer for any Gemini (or compatible AI) instance at the commencement of a new session. It defines the stable operational protocols and the overall strategy for context management, designed to be timeless and independent of specific projects or users.

---

## 0. AI's Awareness of its Operational Context and Capabilities

For reliable operation, this AI instance will understand its context and capabilities as follows:

* **Operational Environment (e.g., Firebase Studio, Android App, Web):**
    The user will explicitly state the current operating environment at the beginning of each session. For example, the initial prompt might be: "I'm currently using you in Firebase Studio, let's start a new session," or "From the Android app, please prepare for a new session." This explicit declaration is crucial for the AI to apply the specific interaction preferences and constraints outlined in the user's preference document correctly.

* **Programmatic Git Access:**
    This AI instance will determine if it has direct programmatic Git access (i.e., the ability to execute `git` commands directly, such as `git pull`, `git add`, `git push` via an available tool or integrated terminal). This determination will be made by attempting a non-destructive Git command (e.g., `git status` or `git config user.name`) as part of the initialization sequence.
    * If the execution of this test command succeeds and returns valid Git output (as text from the tool), it indicates direct programmatic Git access is available.
    * If the command fails (e.g., returns an error message like "command not found," "permission denied," or indicates no tool response via text), it signifies that direct Git access is not available, and the system will then prompt the user for manual content provision for necessary files.

---

## 1. AI System Self-Configuration Parameters

Upon recognizing a session initiation command, having been explicitly informed of its environment, and having determined its Git capabilities, the AI system shall:

* **Reference User Preferences:** Internalize the user's specific interaction preferences and environmental constraints. These are detailed in the `user_preferences.md` document.
    *(The AI will apply preferences based on the environment explicitly stated by the user, e.g., "Highly Concise Textual Output (Firebase Studio)" if the user declared the Firebase Studio environment.)*
* **Acknowledge Tooling and Workflow:** Understand the distributed workflow across Gemini App (Android, for ideation/snippets), Gemini in Firebase Studio (for agent actions/file manipulation), and Android Git App (for reliable local file operations and version control). Note that the user interacts with various Gemini frontends, including the generic web browser interface and the Android app (which share a common chat history), the Git-enabled Firebase Studio instance (with lower, but now managed, chat quotas), and occasionally the Firebase Console Gemini instance (least used).
* **Recognize Persistence Strategy:** Internalize that a designated Git repository functions as the primary persistent storage and central source of truth for the current project, mitigating AI instance statelessness. Automatic `git add` and `git push` operations for relevant files (as instructed by the user or inferred) are the default if direct programmatic Git access is available to this AI instance. **The specific repository URL will be provided in the project-specific context document.**
* **Reference Project Identifiers (Placeholder):** Project-specific identifiers (e.g., project name, ID) and core purpose will be provided in the project-specific context document.
* **Understand Known System Limitations (Generic Reference):** Be aware of persistent environmental or tooling challenges. For project-specific and current limitations, refer to the designated 'Project Status' or 'Current Issues' document for the active project.

---

## 2. Initiating a New Session and Loading Context

To initiate a new session and load the necessary context, simply instruct me to **"read and process [this document's filename]"** (e.g., "read and process generic_session_protocol.md") or use a clear prompt like **"start a new session"** or **"load project context."**

Upon recognizing such a command, the AI shall perform the following sequence:

1.  **Context Document Retrieval Decision:**
    * **If direct programmatic Git access (as determined in Section 0) is available to this AI instance, and after retrieving the Git URL from the `projects/thoughtlessappnew/project_context.md`:**
        * Execute `git pull` to synchronize the local workspace with the remote Git repository.
        * Then, thoroughly read and internalize the contents of the `user_preferences.md` document, the `projects/thoughtlessappnew/project_context.md` document, and the `projects/thoughtlessappnew/progress.md` document from the synchronized workspace.
    * **Else (if direct programmatic Git access is NOT available as determined in Section 0):**
        * Prompt the user: "I do not have direct access to your Git repository. To get the latest context, please provide the contents of the following files. Once you have pasted the content of one file, indicate the next file you are pasting (e.g., 'Now pasting `progress.md`'):"
        * "First, please paste the entire content of the `user_preferences.md` document."
        * "Next, please paste the entire content of the `projects/thoughtlessappnew/project_context.md` document."
        * "Finally, please paste the entire content of the `projects/thoughtlessappnew/progress.md` document."
        * Wait for the user's input for each document before proceeding to the next logical step.
2.  **Analyze Git Logs (if applicable):** If Git operations were performed directly by the AI, review recent Git commit logs from the `git pull` operation to understand user actions and changes. If content was user-provided, rely on the provided document content itself.
3.  **Confirm Readiness:** Explicitly confirm readiness to resume work by stating:
    * The last known project focus (derived from the `projects/thoughtlessappnew/progress.md` document).
    * Any immediate high-priority blockers (derived from the "Outstanding Issues and Challenges" section in the `projects/thoughtlessappnew/progress.md` document).
    * Any key error messages (currently tracked in the "Outstanding Issues and Challenges" section in the `projects/thoughtlessappnew/progress.md` document).

---

## 3. Session Continuity Troubleshooting Protocol

If, after executing the session initiation command, the AI does not appear to be aware of the latest project status (e.g., based on information expected from the `projects/thoughtlessappnew/progress.md` document), it indicates a potential failure in the previous session's document updates or Git push operations.

In such cases, the AI shall prompt the user to:

1.  Explicitly state the discrepancy and briefly remind the AI of the last significant progress made.
2.  **Git Push Decision:**
    * **If direct programmatic access to Git is available to this AI instance:**
        * Instruct the AI to re-attempt the Git operations to `add`, `commit`, and `push` `projects/thoughtlessappnew/progress.md` (and any other relevant updated files).
    * **Else (if direct programmatic Git access is NOT available, or if unsure):**
        * Prompt the user: "It seems our documents might not be synchronized. Please ensure your local `projects/thoughtlessappnew/progress.md` (and any other updated files) are committed and pushed to your Git repository. Once you have done so, please confirm."
        * Wait for the user's confirmation.
3.  Once the AI confirms successful Git operations (either direct or via user-provided confirmation), recommend ending the current session and initiating a new one using a session initiation command to verify full context loading.GenericGener
