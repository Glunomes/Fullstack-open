# ⚙️ Bloglist API (Backend)

A RESTful API service for publishing, cataloging, and rating blog posts and articles. The backend provides secure endpoints for user authentication, data persistence, post ownership verification, and serves data to the client application.

> 🔗 **Frontend Repository:** The client application is available at [Bloglist Frontend](https://github.com/Glunomes/Fullstack-open/tree/main/part5/bloglist-frontend).

---

## ✨ Key Features

- **Authentication & Security:** User registration and login with bcrypt password hashing and token-based (JWT) route protection.
- **Resource Management:** Full CRUD operations for blog posts and user profiles with MongoDB persistence.
- **Access Control:** User-specific ownership validation ensuring only authors can delete their own entries.
- **Automated Testing:** Integration and unit test suite covering API endpoints and authentication flows.

---

## 🛠 Tech Stack

- **[Express](https://expressjs.com/)** — Web framework for Node.js REST API
- **[MongoDB & Mongoose](https://mongoosejs.com/)** — Document database and object data modeling (ODM)
- **[JSON Web Tokens (JWT)](https://jwt.io/)** — Stateless token-based authentication

---

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Glunomes/Fullstack-open.git
cd Fullstack-open/part4/bloglist
npm install
```
