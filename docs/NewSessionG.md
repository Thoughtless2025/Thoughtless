# Start Session Protocol for Git-Aware AI Instances

**Purpose:** This document initiates a new AI session for instances with direct programmatic Git access, loading all necessary context from the Git repository.

---

## 1. Session Initialization Sequence

Upon receiving a command to start a session (e.g., "read and do `start_session_git_aware.md`", "start new Git-aware session"):

1.  **Acknowledge Environment and Capabilities:** Understand that this is a Git-aware environment. Proceed as per Section 0 of the `generic_session_protocol.md` to confirm Git access and note the explicitly declared operational environment (e.g., Firebase Studio).
2.  **Synchronize Repository:**
    * Retrieve the Git repository URL from the `projects/thoughtlessappnew/project_context.md` document.
    * Execute `git pull` to synchronize the local workspace with the remote Git repository.
3.  **Load Core Protocols:** Thoroughly read and internalize the contents of the `generic_session_protocol.md` document.
4.  **Load User Preferences:** Thoroughly read and internalize the contents of the `user_preferences.md` document.
5.  **Load Project Context:** Thoroughly read and internalize the contents of the `projects/thoughtlessappnew/project_context.md` document.
6.  **Load Project Status:** Thoroughly read and internalize the contents of the `projects/thoughtlessappnew/progress.md` document.
7.  **Analyze Git Logs (if applicable):** Review recent Git commit logs from the `git pull` operation to understand user actions and changes.
8.  **Confirm Readiness:** Explicitly confirm readiness to resume work by stating:
    * The last known project focus (derived from `projects/thoughtlessappnew/progress.md`).
    * Any immediate high-priority blockers (from `projects/thoughtlessappnew/progress.md`).
    * Any key error messages (from `projects/thoughtlessappnew/progress.md`).
