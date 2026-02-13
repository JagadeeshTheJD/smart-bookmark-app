# 📌 Smart Bookmark App

A secure, real-time bookmark management application built using **Next.js (App Router)** and **Supabase**.

This application allows users to authenticate via **Google OAuth**, manage private bookmarks, and experience real-time synchronization across browser tabs.

---

## 🚀 Live Demo

🔗 **Production URL:**  
https://smart-bookmark-app-pi-five.vercel.app/

---

## 🧠 Overview

Smart Bookmark is a full-stack web application that demonstrates:

- Secure OAuth authentication
- Row-Level Security (RLS)
- Real-time database updates
- Modern SaaS-style UI
- Production deployment using Vercel

Each user can:

- Sign in with Google
- Add bookmarks
- View only their own bookmarks
- Delete bookmarks
- See real-time updates across tabs

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Supabase
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Row-Level Security (RLS)
  - Realtime Subscriptions

### Deployment
- Vercel

---

## 🔐 Authentication Flow

- Google OAuth is used exclusively.
- No email/password authentication is enabled.
- Upon login, Supabase handles session management.
- Users are redirected to `/dashboard` after authentication.

Security is enforced at the database level using Row-Level Security policies.

---

## 🗄️ Database Design

### Table: `bookmarks`

| Column      | Type      | Description |
|-------------|-----------|------------|
| id          | uuid      | Primary key |
| user_id     | uuid      | References `auth.users(id)` |
| url         | text      | Bookmark URL |
| title       | text      | Bookmark title |
| created_at  | timestamp | Auto-generated |

---

## 🔒 Row-Level Security (RLS)

RLS ensures strict user-level isolation.

Policies implemented:

- Users can only SELECT their own bookmarks
- Users can only INSERT bookmarks with their own `user_id`
- Users can only DELETE their own bookmarks

All access control is enforced at the database level — not just in frontend logic.

---

## ⚡ Real-Time Updates

Supabase Realtime is configured using PostgreSQL replication.

When a bookmark is:
- Added
- Deleted
- Modified

All active sessions automatically update without page refresh.

This is implemented using Supabase `channel()` subscriptions.

---

## 🧩 Application Structure

app/

├── page.tsx → Landing page

├── login/page.tsx → Google OAuth login

├── dashboard/page.tsx → Protected dashboard
lib/

├── supabaseClient.ts → Supabase initialization


The application uses the **Next.js App Router architecture**.

---

## 🎨 UI Design

The interface follows a **Dark SaaS Theme**:

- Slate-based dark background
- Indigo accent color
- Minimal modern card layout
- Clean spacing and typography
- Responsive design

Design philosophy: clean, production-ready, not over-designed.

---

## ⚙️ Environment Variables

The following environment variables are required:

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=


These must be configured in:

- `.env.local` (local development)
- Vercel project settings (production)

---

## 🚀 Deployment

The project is deployed using Vercel.

Deployment steps:

1. Push to GitHub
2. Import project into Vercel
3. Configure environment variables
4. Update Supabase allowed redirect URLs
5. Update Google OAuth authorized redirect URIs

---

## 🧪 Testing Checklist

- [x] Google OAuth login works
- [x] Redirects to dashboard after login
- [x] Bookmarks are private per user
- [x] Add bookmark
- [x] Delete bookmark
- [x] Real-time updates across tabs
- [x] Production deployment verified

---

## ⚠️ Challenges Faced

### 1. OAuth Redirect Handling
Handling redirect URLs across:
- Localhost
- Production (Vercel)

Required correct configuration in:
- Google Cloud Console
- Supabase URL configuration

### 2. Realtime Table Replication
Supabase required manual addition of the `bookmarks` table to the `supabase_realtime` publication.

### 3. Session Timing & Hash-Based Tokens
Supabase attaches tokens using URL hash fragments during OAuth.
Care was taken not to interfere with session initialization timing.

---

## 📌 Key Design Decisions

- Chose App Router for modern Next.js architecture
- Used database-level security instead of frontend filtering
- Used real-time subscriptions instead of polling
- Focused on minimal and clean SaaS UI
- Avoided overengineering unnecessary features

---

## 📈 Future Improvements

- Bookmark editing support
- Tagging system
- Search functionality
- Pagination
- Optimistic UI updates
- User avatar display
- Improved loading animations

---

## 🏁 Conclusion

This project demonstrates:

- Secure full-stack architecture
- Proper OAuth integration
- Database-level access control
- Real-time data synchronization
- Clean production deployment workflow

The application is stable, secure, and production-ready.
