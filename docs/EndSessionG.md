# Terminate Session Protocol for Git-Aware AI Instances

**Purpose:** This document guides the AI through the process of concluding a session in a Git-aware environment, ensuring all changes are persisted and a fresh context document is prepared for non-Git-aware instances.

---

## 1. Session Termination Sequence

Upon receiving a command to terminate a session (e.g., "read and do `terminate_session_git_aware.md`", "end Git-aware session"):

1.  **Confirm Session Work Completed:** Ask the user if all relevant work for this session is complete and if any new files or major modifications have occurred that require special attention before committing.
2.  **Generate Non-Git-Aware Start Document:**
    * **Crucial Step:** Generate the complete content for the `start_session_non_git_aware.md` document. This involves consolidating the current, latest content of the `generic_session_protocol.md`, `user_preferences.md`, `projects/thoughtlessappnew/project_context.md`, and `projects/thoughtlessappnew/progress.md` into a single text block.
    * The generated `start_session_non_git_aware.md` will contain a header indicating its purpose and generation time.
    * Write this consolidated content to a file named `start_session_non_git_aware.md` in the appropriate repository location (e.g., the root of the Git repo, or a dedicated `session_docs` folder).

---

## Final Step: Add, Commit, and Push to Git

After all other termination actions are complete, the AI shall perform the following Git operations to ensure the latest state is persisted:

1.  **Add all relevant modified and newly created files** (including the newly generated `start_session_non_git_aware.md`, and `projects/thoughtlessappnew/progress.md` if updated) to the Git staging area.
2.  **Commit the staged changes** with a descriptive message summarizing the session's work. A suggested commit message format: "Session End: [Date] - [Brief summary of key changes/progress]."
3.  **Push the committed changes** to the remote Git repository.
4.  **Confirm Git Operations:** Report on the success or failure of the Git operations.

## Session Concluded

Confirm that the session is now concluded and the context has been saved/updated in Git.
