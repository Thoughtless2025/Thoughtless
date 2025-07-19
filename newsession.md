# New Session Context

This document provides context for new sessions, summarizing key information about the user, workflow, and project setup.

## User Context

The user has a visual impairment and prefers voice input, clear textual output, and command-line focused interactions. This should be kept in mind when providing instructions and interacting with the user.

## Workflow

The development workflow involves using:

*   **Gemini App (Android):** For initial brainstorming, ideation, and generating quick code/text snippets.
*   **Gemini in Firebase Studio:** For agent-mode actions, understanding project context, and direct file manipulation.
*   **Android Git App:** For local Git repository management, file creation/editing, committing, and pushing changes.

## Persistence Challenge and Git Solution

A key challenge is the lack of persistence across and within different Gemini instances and platforms. To address this, the Git repository (`Thoughtless2025/Thoughtless`) is used as the central source of truth and for persistence, in addition to maintaining project code and configuration files.

## Current Status

Significant progress has been made in setting up the development environment. The current focus is on building the foundational application functionality for chat data storage.

## Firebase Project Details

*   **Project Name:** ThoughtlessAppNew
*   **Project ID:** thoughtlessappnew

## Lessons Learned / Known Issues

*   **File Writing Error:** Recurring "Internal error occurred" when trying to write files in this environment. Workaround: Use the Android Git App for file creation/editing.
*   **Cloud Build Quota Restrictions:** Unresolved Cloud Build quota restrictions in `europe-west2` are a major concern for future deployments.
*   **Firebase Studio Interface Issues:** Challenges with the Firebase Studio interface (window resizing, copy-paste, scrolling) persist.
*   **Firebase Console Navigation:** Difficulty navigating the Firebase Console, particularly for finding specific information like quotas.
*   **AI Tooling Limitations:** Recognition of limitations in AI tooling within Firebase Studio (e.g., interactive terminal commands, direct project configuration querying).

## Session Initialization Command

At the start of a new session, say or type: "Read and do newsession.md."

This will instruct the AI to:

1.  Read this document and `progress.md` for context.
2.  Examine Git push logs to understand recent changes.
3.  Perform a `git pull` to synchronize the workspace.
4.  Confirm readiness to resume work.

## Troubleshooting Session Continuity

If, after using the "Read and do newsession.md" command, the AI does not appear to be aware of the latest progress (e.g., based on the status in `progress.md`), it may indicate that the document updates or Git push in the previous session were unsuccessful.

In such cases, please:

1.  Explicitly inform the AI that you believe the documents were not updated and provide a brief reminder of the last significant progress made.
2.  Ask the AI to re-attempt the Git operations to add, commit, and push `progress.md`.
3.  After the AI confirms the Git operations are complete, try ending and starting a new session again and repeat the "Read and do newsession.md" command to verify.
