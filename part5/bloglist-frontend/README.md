# 📝 Bloglist Client (Frontend)

A client-side web application for publishing, discovering, and rating blogs and articles. The platform allows users to share links to insightful posts, vote on their favorite content, and keep track of trending publications.

> 🔗 **Backend Repository:** The REST API service is available at [Bloglist Backend](https://github.com/Glunomes/Fullstack-open/tree/main/part4/bloglist).

---

## ✨ Key Features

- **Authentication:** Secure user login with JWT-based session persistence and automatic token handling for authorized API requests.
- **Post Management:** Add new blog entries (title, author, URL) and delete user-owned posts.
- **Rating & Sorting:** Interactive like counter with real-time automatic sorting by popularity (likes).
- **User Feedback:** Dynamic notifications for successful operations and network/validation errors.

---

## 🛠 Tech Stack

- **[React](https://react.dev/)** — Frontend UI library
- **[Vite](https://vitejs.dev/)** — Next-generation frontend tooling and local dev server
- **[Axios](https://axios-http.com/)** — Promise-based HTTP client for REST API requests

---

## 🚀 Getting Started

### 1. Start the Backend

The client application requires a running instance of the backend API. Setup and launch instructions can be found in the [Bloglist Backend](https://github.com/Glunomes/Fullstack-open/tree/main/part4/bloglist) repository (defaults to port `3003`).

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/Glunomes/Fullstack-open.git
cd Fullstack-open/part5/bloglist-frontend
npm install
```
