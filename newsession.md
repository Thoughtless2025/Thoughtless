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

*   **File Writing Errors:** Recurring "Internal error occurred" when trying to write files in this environment. Workaround: Use the Android Git App for file creation/editing.
*   **Cloud Build Quota Issues:** Unresolved Cloud Build quota restrictions in `europe-west2` are a major concern for future deployments.
*   **Firebase Initialization:** Explicitly initialize Firebase in the web application code.
*   **Manual Git Pull:** Until `.idx/dev.nix` modification is possible, a manual `git pull` is needed at the start of each session.

## Session Initialization Command

At the start of a new session, say or type: "Read and do newsession.md."

This will instruct the AI to:

1.  Read this document and `progress.md` for context.
2.  Examine Git push logs to understand recent changes.
3.  Perform a `git pull` to synchronize the workspace.
4.  Confirm readiness to resume work.
