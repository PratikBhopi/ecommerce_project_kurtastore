# Karma Threads
A full-stack e-commerce platform designed specifically for selling kurtas. This application allows users to browse through various kurtas, add them to their cart, and complete their purchase. It features user authentication, product management, and order processing.

## Features
- User registration and login
- Browse and search kurtas
- Add kurtas to cart and checkout
- Order history and management
- Admin panel for product management
- Secure payment integration

## Technologies Used
- **[React](https://reactjs.org/):** Frontend library for building user interfaces.
- **[Node.js](https://nodejs.org/):** Backend runtime environment.
- **[Express](https://expressjs.com/):** Web application framework for Node.js.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database for storing user and product data.
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas):** Cloud-based NoSQL database for storing user and product data.
- **[Cloudinary](https://cloudinary.com):** Content Delivery Network for Products.
- **[Razorpay](https://razorpayr.com/):** Payment processing.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PratikBhopi/ecommerce_project_kurtastore.git
   ```
2. Navigate to Project directory:
   ```bash
   cd ecommerce_project_kurtastore
   ```
3. Set up frontend:
   ```bash
   cd client
   npm install
   ```
4. Set up backend:
    ```bash
    cd backend
    npm install
    ```
5. Create a .env file in the backend directory with the following environment variables:
   ```bash
   MONGODV_URI=<your cluster uri>
   JWT_KEY=<your secret key>j
   CLOUD_NAME=<cloudinary>
   CLOUD_API_KEY =<cloudinary api key>
   CLOUD_API_SECRET=<cloudinary api secret>
   RAZORPAY_KEY_ID=<razorpay key>
   RAZORPAY_KEY_SECRET=<razorpay secret>
   ```
6. Create a .env file in the client & admin directory with the following variables:
   ```bash
   VITE_SERVER_URL=<your server url>
   VITE_WEB_URL=<frontend url>
   ```
7. Run the server(./server):
   ```bash
   node server.js
   ```
8. Run the frontend(./client):
   ```bash
   npm run dev
   ```

  
