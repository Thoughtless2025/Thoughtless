# Bridge Document Protocol

**Purpose:** This document defines the standard operating procedure for creating "Bridge Documents" that facilitate the transfer of design decisions and development instructions from a conversational AI session (e.g., Gemini Web UI, Android App) to a Git-enabled AI instance (e.g., Firebase Studio Gemini). This protocol ensures clarity, minimizes errors, and leverages the Git-enabled AI's capability for targeted file modifications.

---

## 1. Bridge Document Naming Convention

Bridge documents shall be named `[Topic] YYYY-MM-DD.md` (e.g., `Android Chat 2025-07-22.md`). This allows for clear chronological tracking of design sessions.

## 2. Structure of a Bridge Document

A Bridge Document will consist of:

* **Preamble:** A brief introduction stating its purpose and primary recipient (the Git-enabled AI).
* **Per-File Instruction Sections:** For each target file in the repository that requires modification or creation, a dedicated section will be included.

## 3. Types of File Modification Instructions

Each per-file instruction section will use one of the following precise action types:

### A. **REPLACE ENTIRE CONTENTS (WITH EXTREME CAUTION)**

* **Action:** `REPLACE ENTIRE CONTENTS` of `[file_path]`.
* **Usage:** This instruction is used **only** when a document's entire conceptual structure, purpose, or content has been fundamentally re-architected, making incremental modification impractical or illogical.
* **WARNING:** This action carries a high risk of data loss if misapplied. The generating AI MUST provide strong justification for this action and, for critical documents (e.g., `newsession.md`, `progress.md`, architecture overviews), should accompany it with a separate "review document" (see Section 4) for manual user approval.
* **Content:** The full new content for the file will be provided within a markdown code block after the instruction.

### B. **APPEND CONTENT**

* **Action:** `APPEND CONTENT` to `[file_path]`.
* **Usage:** This instruction is used to add new sections or content to the end of an existing file.
* **Content:** The content to be appended will be provided within a markdown code block.

### C. **INSERT CONTENT AT SPECIFIC MARKER**

* **Action:** `INSERT CONTENT AT MARKER "[marker_text]"` in `[file_path]`.
* **Usage:** This instruction is used to insert new content at a precise, pre-defined location within an existing file. The marker text must be unique and clearly identifiable within the target file.
* **Content:** The content to be inserted will be provided within a markdown code block.

### D. **MODIFY CONTENT (LINE-BY-LINE or REGEX)**

* **Action:** `MODIFY CONTENT` in `[file_path]`.
* **Usage:** This instruction is used for specific line changes or replacements using pattern matching (e.g., regex). This is for fine-grained edits.
* **Content:** Instructions will detail the specific lines or patterns to find and their replacements. Example: `Find line: "old line text", Replace with: "new line text"`.

### E. **CREATE NEW FILE**

* **Action:** `CREATE NEW FILE` at `[file_path]`.
* **Usage:** This instruction is used to create a brand new file in the repository.
* **Content:** The full content for the new file will be provided within a markdown code block.

## 4. Handling Critical Document Updates (e.g., `newsession.md`, `progress.md`)

For updates to critical, frequently referenced documents that underpin the AI's context (`newsession.md`, `progress.md`, and core architecture documents), the following protocol applies:

* **No Direct Automated Full Rewrites:** The primary Bridge Document will **NOT** contain direct `REPLACE ENTIRE CONTENTS` instructions for these critical files.
* **Separate Review Document:** If a significant conceptual change *does* necessitate a near-full rewrite of such a critical document, a **separate review document** named `[original_filename]-review-YYYY-MM-DD.md` (e.g., `newsession-review-2025-07-22.md`) will be created.
* **Manual User Action for Review Documents:** The Bridge Document will only *reference* these review documents. The Git-enabled AI will **NOT** automatically apply changes from review documents. The user must manually review the content of the `*-review-YYYY-MM-DD.md` file and perform the update themselves (e.g., by copying its content into the original file and committing).
* **Incremental Instructions in Bridge:** If the changes to critical documents are incremental, the Bridge Document will use `APPEND`, `INSERT`, or `MODIFY` instructions for them, as per Section 3.

## 5. Git Operations by the Git-Enabled AI

After processing all instructions within a Bridge Document, the Git-enabled AI shall perform the following Git sequence:

1.  `git add .` (to stage all modified and new files)
2.  `git commit -m "[Descriptive Commit Message]"` (Commit message should reflect the session's work)
3.  `git push`

---
