# Terminate Session Protocol for Non-Git-Aware AI Instances

**Purpose:** This document guides the user through the process of concluding a session in a non-Git-aware environment, ensuring they manually persist any changes to the Git repository.

---

## 1. Session Termination Sequence

Upon receiving a command to terminate a session (e.g., "read and do `terminate_session_non_git_aware.md`", "end non-Git-aware session"):

1.  **Confirm Session Work Completed:** Ask the user if all relevant work for this session is complete.
2.  **User Action Required: Manual Git Push:**
    * **Important:** As this AI instance does not have direct Git access, any changes, new content, or updates to documents (especially `progress.md`) that occurred during this session are currently only in your local copy or within this chat history.
    * **Please ensure you manually use your external Git tool** (e.g., the Git app on your Android phone) to pull the latest changes, integrate your session's work, and then `add`, `commit`, and `push` all relevant updated files to your Git repository. This includes any notes you've made or modifications to `progress.md`.
    * Confirm to the AI once this manual Git synchronization is complete.

## Session Concluded

Confirm that the session is now concluded and remind the user of the importance of the manual Git sync.
