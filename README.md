# 🛍️ E-Commerce Website  

---

## 🚀 Overview  

**E-Commerce Website** is a full-stack shopping cart web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It simulates an online shopping platform where users can browse products, add them to a cart, manage quantities, and complete a mock checkout.  

The project demonstrates realistic e-commerce workflows, a modern responsive UI, MongoDB persistence, and mock user sessions — all without requiring authentication.

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
- 💵 **Dynamic Total Calculation:** Automatically updates the total when items change.  
- 💳 **Mock Checkout:** Generates a receipt with total and timestamp.  
- 🌙 **Dark/Light Mode:** Switch between light and dark themes dynamically.  
- 📱 **Responsive UI:** Works seamlessly across desktop, tablet, and mobile devices.  

---

## 🎁 Advanced Features  

| Feature | Description |
|----------|--------------|
| 🧍 **Mock User Persistence** | Each user (Demo User, User A, etc.) has their own cart stored separately in MongoDB using a mock `userId`. |
| ⚙️ **Error Handling** | Comprehensive backend error handling with proper responses. |
| 🌍 **Fake Store API Integration** | Fetches products from [Fake Store API](https://fakestoreapi.com) and merges with local data. |
| 💾 **Database Persistence** | All data is stored and retrieved from MongoDB for consistency. |

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

Follow these steps to run the project locally 👇  

---

## 🪄 Step 1 — Clone the Repository  

```bash
git clone https://github.com/pendemshivani/E-commerce-website.git
cd E-commerce-website
⚙️ Step 2 — Backend Setup
1️⃣ Navigate to backend folder

cd backend
2️⃣ Install backend dependencies
npm install

3️⃣ Create a .env file inside the backend folder and add the following:
MONGO_URI=mongodb://localhost:27017/mock_cart
PORT=5000

4️⃣ Seed the database with mock products
node seed/seed.js

5️⃣ Start the backend server
npm run dev
🟢 Backend will run at: http://localhost:5000

💻 Step 3 — Frontend Setup

1️⃣ Open a new terminal and navigate to the frontend folder
cd ../frontend

2️⃣ Install frontend dependencies
npm install

3️⃣ Start the React development server
npm start
🟢 Frontend will run at: http://localhost:3000
