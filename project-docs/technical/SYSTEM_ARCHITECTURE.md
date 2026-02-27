# Smart Motor Platform: System Architecture & Tech Stack

This document provides a comprehensive yet simplified overview of the entire technical ecosystem powering the Smart Motor platform.

## 1. Core Application Layer (The Engine)

### **Next.js 16.1.6 (App Router)**
*   **Purpose:** The primary framework used to build the website and admin panel.
*   **Why:** It allows for high-performance server-side rendering (SEO) and fast client-side interactions (Booking). We use the **App Router** for modern, file-based routing and layout management.

### **TypeScript 5+**
*   **Purpose:** The programming language used.
*   **Why:** It adds "Types" to JavaScript, preventing 90% of common coding errors before they happen. It ensures that data (like a user's booking) always follows a strict structure.

### **Tailwind CSS v4**
*   **Purpose:** The styling engine.
*   **Why:** Allows for rapid UI development with utility classes. It powers our "Gold Standard" luxury aesthetic, including carbon fiber textures and glassmorphism.

---

## 2. Intelligence & AI (The Brain)

### **Google Gemini SDK**
*   **Purpose:** Powers **Leyla**, our AI Concierge.
*   **Models:** 
    *   `gemini-2.0-flash`: General reasoning and SEO audits.
    *   `gemini-2.5-flash-native-audio-preview`: Bidirectional voice interaction on the Leyla page.
*   **Usage:** Chat, voice calls, market research, and automated content generation.

### **Perplexity Sonar-Pro API**
*   **Purpose:** Real-time web search for AI agents.
*   **Usage:** Our "Strategy Lab" agents use this to perform market reconnaissance and competitor rank tracking in Abu Dhabi.

### **Multi-Agent Swarm (Custom Orchestrator)**
*   **Purpose:** A specialized system where multiple AI "workers" (SEO Auditor, PhD Researcher, etc.) collaborate on complex business tasks.

---

## 3. Data & Storage (The Fuel Tank)

### **Firebase Firestore (NoSQL)**
*   **Purpose:** Our primary database.
*   **Storage:** Stores user profiles, service catalogs, brand details, and blog content.
*   **Why:** Real-time synchronization and effortless scaling.

### **Firebase Realtime Database (RTDB)**
*   **Purpose:** High-speed data syncing.
*   **Usage:** Powers the Newsletter subscription system and live activity streams in the Admin Dashboard.

### **Redis (Upstash)**
*   **Purpose:** Global memory and caching.
*   **Usage:** Stores AI conversation history ("Long-term memory") and caches expensive API results to save costs.

---

## 4. Integration APIs (The Connectivity)

### **Google Maps & Places API**
*   **Purpose:** Location data and social proof.
*   **Usage:** Fetches real-time Google Reviews (4.9★ rating) and provides the "Visit Workshop" directions.

### **Google Wallet API**
*   **Purpose:** Customer convenience.
*   **Usage:** Generates digital "Service Passes" that customers can add to their Android phones after booking.

### **Resend & SMTP (GreenGeeks)**
*   **Purpose:** Communication.
*   **Usage:** Sends high-end, branded HTML emails for booking confirmations and OTP verification.

### **reCAPTCHA v3**
*   **Purpose:** Security.
*   **Usage:** Protects the booking form and newsletter from bot spam without interrupting the user experience.

---

## 5. Specialized Tools

### **Framer Motion**
*   **Purpose:** Premium animations.
*   **Usage:** Smooth transitions, parallax hero effects, and interactive sliders.

### **Nano Banana Pro (Internal AI)**
*   **Purpose:** High-fidelity asset generation.
*   **Usage:** Creating the "Before/After" imagery, magazine textures, and custom icons.

### **Recharts**
*   **Purpose:** Data visualization.
*   **Usage:** Powers the Live Diagnostics graphs and Admin Dashboard analytics.

---

## 6. Infrastructure (The Garage)

*   **Hosting:** Vercel (Edge-optimized production environment).
*   **Secret Management:** Google Cloud Secret Manager (GCP) for high-security storage of API keys.
*   **Domain:** `smartmotor.ae` (Pointed via Vercel DNS).
