# Thoughtless App: Overall Architecture Overview

This document provides a high-level overview of the technical architecture and key decisions made for the Thoughtless App, leveraging Google Cloud Platform (GCP) and Firebase services.

## Current Setup:

The Thoughtless App leverages a modern, serverless architecture on Google Cloud Platform (GCP) and Firebase, designed for scalability, low maintenance, and cost-efficiency.

*   **Frontend (User Interface):**
    *   **Technology:** Planned as a React.js application.
    *   **Hosting:** Deployed on **Firebase Hosting**. This provides a global Content Delivery Network (CDN) for fast, secure content delivery, automatic SSL certificates, and custom domain support. It's ideal for serving static assets and single-page applications.

*   **Backend (API & Logic):**
    *   **Technology:** Python (Flask framework for REST API).
    *   **Hosting:** Deployed as a serverless container on **Cloud Run**. Cloud Run automatically scales based on demand, from zero instances to many, meaning you only pay for the compute time consumed by requests. This provides high scalability and cost-efficiency.

### Monetization and Access Strategy

* **Policy on Advertising:**
    * **Free/Publicly Available Sections:** May include advertising to support hosting and operational costs.
    * **Signed-Up Contributor Functionality (Paid/Value-Add Components):** Explicitly **ad-free**. Users interacting with these features will not be exposed to advertising.

### Platform Strategy / Cross-Platform Unity

* **Cross-Platform Unity:** The core user account, data, permissions (contributor status), and monetization policies are universally applied via Firebase backend services (Authentication, Firestore, Cloud Functions, Remote Config), ensuring a consistent experience whether accessing Thoughtless via Android, iOS, or web. A single sign-in grants access across all platforms.
* **Dedicated Web-Only Admin Interface:** Administrative functionality (e.g., user management, advanced content moderation, system settings) will be **exclusively** accessible through a **separate, web-only administration interface**. This dedicated interface will leverage the Firebase Admin SDK and will **not** be available on mobile applications (Android or iOS), ensuring the highest level of security and control for privileged operations.

### User Tiers and Access Control

**Four distinct user tiers are defined with specific access levels:**

* **1. Anonymous Users:**
    * **Authentication Status:** Not authenticated with Firebase.
    * **Access:** View Chats (Yes), Comment on Chats (No), Create New Chats (No), Admin Access (No).
    * **Monetization:** See Advertisements.
* **2. Authenticated Users (Free Tier):**
    * **Authentication Status:** Authenticated with Firebase. No specific custom claims.
    * **Access:** View Chats (Yes), Comment on Chats (Yes), Create New Chats (No), Admin Access (No).
    * **Monetization:** See Advertisements.
* **3. Contributors:**
    * **Authentication Status:** Authenticated with Firebase. Has `contributor: true` custom claim.
    * **Access:** View Chats (Yes), Comment on Chats (Yes), Create New Chats (Yes), Admin Access (No).
    * **Monetization:** Ad-Free.
* **4. Admin Users:**
    *   **Authentication Status:** Authenticated with Firebase. Has `admin: true` custom claim.
    *   **Access:** **Only** through dedicated Web-Only Admin Frontend. Will function as a Contributor in user-facing apps if they access them.
    *   **Monetization:** Ad-Free (on user-facing apps).