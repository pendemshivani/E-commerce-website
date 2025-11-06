# 🛍️ E-Commerce Website

---

## 🚀 Overview  

**Mock E-Commerce Cart** is a full-stack shopping cart web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It simulates an online shopping platform where users can browse products, add them to a cart, manage quantities, and complete a mock checkout.  

The project emphasizes realistic e-commerce workflows, modern responsive UI, database integration, and mock user persistence — all without requiring authentication.

---

## 🧠 Tech Stack  

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, Axios, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **API Integration** | Fake Store API |
| **Version Control** | Git & GitHub |

---

## ⚙️ Features  

### 💼 Core Features  
- 🛍️ **Product Grid:** Displays all available products with image, price, and description.  
- ➕ **Cart Management:** Add, remove, and update product quantities.  
- 💵 **Dynamic Total Calculation:** Automatically updates the total price when items change.  
- 💳 **Mock Checkout:** Generates a receipt with total and timestamp.  
- 🌙 **Dark/Light Mode:** Switch between light and dark themes dynamically.  
- 📱 **Responsive UI:** Clean and responsive layout for both desktop and mobile devices.  

---

## 🎁 Advanced Features  

| Feature | Description |
|----------|--------------|
| 🧍 **Mock User Persistence** | Each user (Demo User, User A, User B, etc.) has their own cart stored separately in MongoDB using a mock `userId`. |
| ⚙️ **Error Handling** | Comprehensive backend try/catch blocks and user-friendly frontend error messages. |
| 🌍 **Fake Store API Integration** | Fetches products from the [Fake Store API](https://fakestoreapi.com) and merges them with locally seeded data for variety. |
| 💾 **Database Persistence** | All product and cart data is stored and retrieved from MongoDB for permanent storage. |

---

## 🔗 REST API Endpoints  

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/products` | Fetch all available products |
| `POST` | `/api/cart` | Add an item to the cart `{ productId, qty, userId }` |
| `PATCH` | `/api/cart/:id` | Update quantity of a specific item |
| `DELETE` | `/api/cart/:id` | Remove item from cart |
| `GET` | `/api/cart` | Retrieve all cart items + total for a user |
| `POST` | `/api/checkout` | Create mock checkout receipt (total + timestamp) |

---

## 🧰 Setup Instructions  

### 🪄 Step 1 — Clone the Repository  
```bash
git clone https://github.com/pendemshivani/E-commerce-website

