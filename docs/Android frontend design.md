# Android Frontend Design: Minimum Viable Product (MVP)

**Purpose:** This document outlines the functional design for the Android mobile application's user interface, focusing on the Minimum Viable Product (MVP) scope. It details the core user experience for both chat contribution and chat viewing/commenting.

---

## 1. Core Principles

* **Platform Focus:** Android Native (Kotlin/Java), aiming for a UI that mirrors the familiar Gemini app front end.
* **User Tiers:** Designed to support Anonymous, Authenticated (Free), and Contributor users within a single app.
* **Backend Integration:** Relies heavily on Firebase Authentication, Firestore, Cloud Functions, and Remote Config for robust, scalable, and secure operations.

## 2. Main Screen / Chat List View

* **Objective:** Display existing chats and provide an entry point for new ones. Default landing page for all users.
* **Header Bar:**
    * Title: "Thoughtless Chats" (or "My Chats").
    * **Search Capability:** Search icon which reveals/expands a search input field to filter chats by title.
    * **Sort Capability:** Sort icon displaying options:
        * "Sort by Date (Newest First)" (Default)
        * "Sort by Date (Oldest First)"
        * "Sort by Title (A-Z)" (Sorts by currently displayed title: `userTitle`)
        * "Sort by Title (Z-A)" (Sorts by currently displayed title: `userTitle`)
* **Chat List (`RecyclerView`):**
    * Displays `CardView` items for each chat.
    * Each item shows:
        * **Displayed Title:** Defaults to `userTitle` (initially same as `chatbotTitle`, editable by contributors).
        * Last Message Snippet.
        * Last Activity Timestamp.
* **Floating Action Button (FAB) for "New Chat":**
    * Prominently placed (e.g., bottom right).
    * **Visibility:** Only visible/active for **Contributor** users. For Authenticated (Free) users, it might be greyed out or replaced by a "Become a Contributor" prompt. Not visible for Anonymous users.

## 3. New Chat Creation Flow (Contributor-Only)

* **Trigger:** Tapping the "New Chat" FAB.
* **"Choose Chatbot" Dialog:**
    * A dialog/bottom sheet appears.
    * Title: "Choose a Chatbot".
    * List of Chatbots: For MVP, only "Gemini" will be listed.
    * Selection proceeds to the Chat Conversation View for a new chat.
* **Implicit API Key Handling (MVP):** API keys are managed securely in Firebase Cloud Functions; no UI for credentials here.

## 4. Chat Conversation View (for Both Viewing and Contributing)

* **Objective:** Display conversation history and allow interaction.
* **Header Bar:**
    * Back Arrow.
    * Chat Title: Displays the `userTitle` of the current chat.
* **Main Content Area - Chat Transcript (`RecyclerView`):**
    * **Visual Distinction:** Clear differentiation between "User Prompts" and "Gemini Responses" (e.g., different bubble colors, alignment).
    * **Text-to-Speech (TTS) - Global:** A prominent speaker icon in the **header bar** to read out the *entire chat transcript*. If activated, it pauses/stops if a user initiates a contextual action.
    * **Text-to-Speech (TTS) - Contextual:** **No direct speaker icons on individual message bubbles.** Instead, a speaker icon (Listen to this bit) appears only within the **contextual action bar** that emerges on a **single tap/click** of any message bubble.
    * Smooth Scrolling and Paging for long chats.
* **Contextual Action Bar (on Single Tap/Click of Message Bubble):**
    * A small pop-up or overlay appearing near the tapped message.
    * Contains:
        * **"Comment" Icon:** To initiate commenting on *this specific message*.
        * **"Copy" Icon:** To copy the message text.
        * **"Listen to this bit" (TTS) Icon:** To read only this message.
* **Input Area (Bottom):**
    * **For Contributors (Active Chat):** `EditText` for typing prompts, "Send" button. Supports system voice-to-text.
    * **For Viewers (Comments):** This section dynamically changes to the "Comment Input Area" (see below).

## 5. Commenting Section (Below Chat Transcript)

* **Placement:** Directly below the chat transcript, separated by a clear visual divider.
* **"Comments" Header:** "Comments (Count)".
* **Comment List (`RecyclerView`):**
    * Displays comments in **Newest First** order.
    * Each comment item shows: User's Display Name/Avatar, Comment Text, Timestamp.
    * For comments targeting a specific message, the comment card will visually indicate which message is being commented on (e.g., "Replying to [Gemini]: 'First few words...'").
* **Comment Input Area (Conditional Display & Context):**
    * **General Chat Comment Input (Always Visible for Authenticated Users):** At the very bottom of the screen. For comments about the *entire chat*.
    * **Contextual Message Comment Input (Modal/Dialog):** Triggered by tapping the "Comment" icon from a message's contextual action bar. This is a dedicated modal with the referenced message clearly displayed, its own `EditText`, and a "Post" button.
    * **Anonymous Users:** This entire comment input area is replaced by a "Sign in to leave a comment!" prompt.

## 6. Data Structure Considerations (Firestore)

* **Chat Document:** Each chat will have:
    * `userTitle: String`
    * `chatbotTitle: String`
    * `messages: Array of Map` (each message has `id`, `type`, `content`).
* **Comments Sub-collection:** Each chat document will have a `comments` sub-collection.
    * Each comment document will include: `userId`, `userName`, `content`, `timestamp`.
    * **Crucial Comment Targeting Fields:**
        * `targetType: "chat" | "message"` (indicates if comment is for whole chat or specific message)
        * `targetMessageId: String | null` (ID of the message if `targetType` is "message")

---
