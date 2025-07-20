# End Session Checklist and Actions

This document outlines the recommended steps and actions to perform at the end of each development session to ensure progress is recorded, the repository is synchronized, and the environment is ready for the next session.

When ending a session, use a command like "read and do endsession" or similar to trigger the execution of these steps.

## 1. Summarize Session Progress

Briefly reflect on the key accomplishments, challenges, and learnings from the current session. This summary will be used to update the project progress document.

## 2. Update Project Progress Document

Trigger the AI assistant to update the main project progress document (`progress.md`) with the summary from Step 1, including a timestamp for the session's end.

*   **AI Action:** Read current `progress.md`, add a timestamped summary of the session, and write the updated content back to `progress.md`.
*   **User Action (if AI write fails):** Be prepared to manually update `progress.md` using an accessible Git tool (e.g., GitHub web editor) if the AI's write operation fails.

## 3. Ensure Repository Synchronization

Verify that all local changes made during the session are committed and pushed to the remote repository (`origin/main`).

*   **AI Action:** Run `git status` to check for uncommitted changes. If changes exist, run `git add .` (or stage specific files) and `git commit -m "End session commit - <timestamp>"` to commit.
*   **User Action (if AI commit/push fails or automatic sync is used):** Confirm through your Git tools (Firebase Studio Git panel, GitHub web, or Android app) that all local changes are synchronized with the remote repository. If not, manually commit and push pending changes.

## 4. Note Pending Items / Next Session Focus

Briefly note any tasks that were not completed or any specific areas that should be the focus of the next development session. This helps maintain continuity.

## 5. Final Repository Check (Optional but recommended)

Before concluding, quickly check the remote repository on GitHub (via web or app) to visually confirm that the latest changes, including the updated `progress.md`, are reflected.

---

By following this end-of-session checklist, we can ensure that our development progress is accurately tracked, the repository remains consistent across environments, and we can seamlessly resume work in the next session.
