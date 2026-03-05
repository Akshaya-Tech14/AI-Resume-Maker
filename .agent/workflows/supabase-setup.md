---
description: How to set up and initialize the Supabase environment
---

# Supabase Environment Setup Guide

Follow these steps to fully initialize your Supabase environment for ResumeAI Pro.

### 1. Create a Supabase Project
1.  Go to [supabase.com](https://supabase.com) and sign in.
2.  Click **New Project** and select your organization.
3.  Name your project (e.g., `ResumeAI-Pro`) and set a secure database password.
4.  Wait for the database to provision.

### 2. Configure Environment Variables
1.  In your Supabase Dashboard, go to **Project Settings** > **API**.
2.  Copy the **Project URL** and the **anon public API Key**.
3.  Open the `.env` file in the project root.
4.  Paste the URL into `SUPABASE_URL` and the Key into `SUPABASE_ANON_KEY`.
5.  Also update `supabase-client-frontend.js` with these same values for the browser.

### 3. Initialize Database Tables
1.  In Supabase, go to the **SQL Editor** (the `>_` icon on the left sidebar).
2.  Click **New Query**.
3.  Open the file `supabase_schema.sql` from your project folder.
4.  Copy the entire content and paste it into the Supabase SQL Editor.
5.  Click **Run**. This will create your `profiles` and `resumes` tables with security policies.

### 4. Enable Authentication (Optional but Recommended)
1.  Go to **Authentication** > **Providers**.
2.  Ensure **Email** is enabled.
3.  (Optional) Enable **Google** or **GitHub** if you want social login features.

### 5. Verify Frontend Connection
1.  Start your application.
2.  Open the browser console (F12).
3.  You should see a message: `✅ Supabase Frontend Client Initialized`.

---
// turbo-all
// This workflow helps you keep track of your Supabase setup progress.
