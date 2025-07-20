# Session Context Initialization Protocol (SCIP)

**Author:** Gemini (Google's Large Language Model)
**Purpose:** This document serves as a foundational context primer for any Gemini (or compatible AI) instance at the commencement of a new session. It defines the stable project environment, user preferences, and operational protocols to ensure immediate and informed resumption of work. It is designed to be timeless, focusing on enduring operational principles rather than dynamic project status.

---

## 1. AI System Self-Configuration Parameters

Upon reading this document, the AI system shall:

1.  **Prioritize User Accessibility:** All interactions and instructions shall adhere to the user's preference for voice input, clear textual output, and command-line focused operations, accommodating visual impairment.
2.  **Acknowledge Tooling and Workflow:** Understand the distributed workflow across Gemini App (Android, for ideation/snippets), Gemini in Firebase Studio (for agent actions/file manipulation), and Android Git App (for reliable local file operations and version control).
3.  **Recognize Persistence Strategy:** Internalize that the Git repository (`Thoughtless2025/Thoughtless`) functions as the primary persistent storage and central source of truth, mitigating AI instance statelessness. Automatic `git add` and `git push` operations for relevant files (as instructed by the user or inferred) are the default.
4.  **Reference Project Identifiers:** Note the Firebase Project Name: `ThoughtlessAppNew` and Project ID: `thoughtlessappnew`.
5.  **Understand Known System Limitations:** Be aware of the following persistent environmental or tooling challenges:
    * **File Writing Error (Firebase Studio):** Recurring "Internal error occurred" when attempting file writes. The prescribed workaround is to guide the user to utilize the Android Git App for direct file creation/editing.
    * **Cloud Build Quota Restrictions:** Unresolved 'due to quota restrictions, cannot run builds in this region' error, specifically tied to `e2-standard-4` machine type in `europe-west2`. This remains a critical concern for future deployments.
    * **Firebase Studio Interface Issues:** Persistent challenges with the Firebase Studio interface (e.g., window resizing, copy-paste, scrolling). The AI should anticipate these and offer explicit, precise instructions to mitigate frustration.
    * **Firebase Console Navigation:** User experiences difficulty navigating the Firebase Console to find specific information (e.g., quotas). The AI should provide direct paths or query instructions where possible.
    * **AI Tooling Limitations (Firebase Studio):** Acknowledge inherent limitations within Firebase Studio's AI capabilities, such as restricted interactive terminal commands or direct project configuration querying.

---

## 2. Session Initialization Protocol (SIP) Trigger

To initiate a new session and load full project context, the user will explicitly state or type: **"Initialize session with project context."**

Upon this command, the AI shall perform the following sequence:

1.  **Execute `git pull`:** Synchronize the local workspace with the remote Git repository. This is critical to ensure all dynamic context documents (`progress.md`, `current_blockers.md`, `current_error_logs.md`) are the absolute latest versions.
2.  **Read Context Documents:** Thoroughly read and internalize the contents of:
    * `newsession.md` (this document, for static protocol and environment setup)
    * `progress.md` (for the overall project status and completed tasks)
    * `current_blockers.md` (for active technical challenges and pending issues)
    * `current_error_logs.md` (for detailed error messages related to current blockers)
3.  **Analyze Git Logs:** Review recent Git commit logs (from the `git pull` operation) to understand recent user actions and changes.
4.  **Confirm Readiness:** Explicitly confirm readiness to resume work by stating:
    * The last known project focus (derived from `progress.md`).
    * Any immediate high-priority blockers (derived from `current_blockers.md`).
    * Any key error messages from `current_error_logs.md`.

---

## 3. Session Continuity Troubleshooting Protocol

If, after executing the "Initialize session with project context" command, the AI does not appear to be aware of the latest project status (e.g., based on information expected from `progress.md`), it indicates a potential failure in the previous session's document updates or Git push operations.

In such cases, the AI shall prompt the user to:

1.  Explicitly state the discrepancy and briefly remind the AI of the last significant progress made.
2.  Instruct the AI to re-attempt the Git operations to `add`, `commit`, and `push` `progress.md` (and any other relevant updated files).
3.  Once the AI confirms successful Git operations, recommend ending the current session and initiating a new one using the "Initialize session with project context" command to verify full context loading.

---
