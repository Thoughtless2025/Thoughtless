# Bridge Document Protocol

**Purpose:** This document defines the structure, purpose, and usage of "Bridge Documents" within the Thoughtless App project. Bridge documents serve as a mechanism to transfer context, instructions, and design decisions between different Gemini instances or development environments.

**What are Bridge Documents?**

Bridge documents are markdown files (e.g., `docs/Android chat 20250722`) created to consolidate information and directives from one session or environment for execution in another. They are particularly useful when transitioning between different Gemini frontends (e.g., Android app for ideation, Firebase Studio for code/file manipulation) or when a session is interrupted.

**Key Principles:**

*   **Self-Contained:** A bridge document should contain all necessary information and instructions for the receiving AI instance to understand the context and execute the required tasks without external dependencies (other than the project files themselves).
*   **Actionable:** The document should clearly specify the actions the receiving AI instance needs to perform (e.g., modify a specific file, create a new file, run a command).
*   **Unambiguous:** Instructions should be clear, concise, and leave no room for mis interpretation.
*   **Versioned:** Bridge documents are stored in the Git repository, providing a history of changes and decisions.

**Structure of a Bridge Document:**

A typical bridge document should include:

1.  **Header:** Title, purpose, and creation date.
2.  **Important Notes (Optional but Recommended):** Any crucial information or caveats for the receiving AI (e.g., specific files NOT to modify).
3.  **Sections for Actions:** The core of the document, with each section detailing a specific task or set of tasks. Each section should specify:
    *   **Target File(s):** The file(s) to be affected.
    *   **Action:** The type of operation (e.g., MODIFY CONTENT, APPEND CONTENT, CREATE FILE).
    *   **Rationale (Optional):** The reason for the change or action.
    *   **Instructions for AI:** Clear, step-by-step instructions for the receiving AI to perform the action, including the exact content to be added or replaced where applicable.

**Workflow:**

1.  A bridge document is created in one environment (e.g., drafted during an ideation session in the Android app).
2.  The document is saved to the project's `docs/` directory.
3.  The changes are committed and pushed to the Git repository.
4.  In the target environment (e.g., Firebase Studio), the AI performs a `git pull` to retrieve the latest changes, including the new bridge document.
5.  The AI reads the bridge document.
6.  The AI executes the instructions contained within the bridge document.
7.  After executing all instructions, the AI performs a `git add`, `git commit`, and `git push` to save the changes made based on the bridge document.

**Example Usage:**

*   Transferring design decisions for a specific feature from a planning session to the development environment.
*   Providing a set of file modifications to be applied by an AI instance with file-writing capabilities.
*   Documenting a troubleshooting process to be followed in a different environment.

**Note:** Bridge documents complement, but do not replace, other project documentation such as architecture overviews, design specifications, and progress updates. They are specifically for conveying actionable instructions between AI instances or environments.