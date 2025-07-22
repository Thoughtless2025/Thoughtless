# Thoughtless App – MVP Specification

A public platform for sharing and exploring AI chatbot conversations (initially Gemini). This document outlines the minimum viable product (MVP) design for the **Android frontend**, integrated with **Firebase** backend services.

---

## 🔥 Core Purpose

Enable users to:
- View and comment on AI-generated chats
- Contribute their own chats (contributors)
- Support and discover others (likes, donations, comments)

---

## 👥 User Roles

| Role          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Anonymous     | Can view chats, but cannot comment or contribute                            |
| Authenticated | Can comment, like, and subscribe                                             |
| Contributor   | Can record or import chats, publish them, and earn support                  |
| Admin         | Approves contributors, manages users, handles reports/flags                 |

---

## 📱 Android Frontend Features

### 1. 🏠 Main Screen: Chat List View

**View Type:** `RecyclerView` of `CardView` items

**Visible To:** All users

**Features:**
- **Header bar**:
  - App title: *Thoughtless Chats*
  - 🔍 Search icon → expands to filter by title
  - ↕️ Sort icon → options:
    - Date (Newest First) *(default)*
    - Date (Oldest First)
    - Title A-Z / Z-A
    - Most Liked / Most Viewed *(optional enhancement)*

- **Each Chat Card Shows:**
  - `userTitle`
  - Contributor name (if available)
  - Last message snippet
  - Last activity timestamp
  - ❤️ Like count
  - 👁 View count
  - 🔖 Tags *(if available)*

- **FAB: "New Chat"**
  - Only visible to **Contributors**
  - Disabled/blurred for Auth users → “Become a Contributor”
  - Hidden for Anonymous users

---

### 2. ✍️ New Chat Creation (Contributor Only)

- **Trigger:** FAB tap
- **Dialog: Choose Chatbot**
  - MVP: Only "Gemini"
- **Redirect:** Goes to chat view
- **Backend:** No visible API keys — handled via Firebase Functions

---

### 3. 💬 Chat Transcript View

**View Type:** `RecyclerView` with bubble-style messages

**Features:**
- Back button + Chat Title (`userTitle`)
- Messages visually styled by role:
  - Left-aligned = user
  - Right-aligned = Gemini

- **TTS (Text-to-Speech) Options:**
  - Global speaker icon in header to read full chat
  - Contextual TTS on message tap (via action bar)

- **Contextual Message Actions:**
  - Single tap opens contextual bar:
    - 💬 Comment on message
    - 🔊 "Listen to this"
    - 📋 Copy

---

### 4. 📝 Comments Section

- **Header:** “Comments (Count)”
- **List:** `RecyclerView` showing:
  - Avatar, display name, comment text, timestamp
  - If message-specific: “Replying to [Gemini]: *first few words...*”

- **Comment Input Modes:**
  - General Comment (bottom input box for Auth users)
  - Message-specific comment (triggered by contextual bar)

- **Anonymous users:** Input replaced by “Sign in to leave a comment!”

---

### 5. 🧠 Contributor Dashboard