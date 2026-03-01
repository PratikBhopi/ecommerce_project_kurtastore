# High Level Design (HLD)
**Project Name:** Kurtastore E-Commerce Platform

## 1. Introduction
This document outlines the High Level Design (HLD) for the Kurtastore platform. It provides an architectural overview of the system, describing the main components, their interactions, database design, and external integrations to serve as a comprehensive blueprint for further development and maintenance.

## 2. System Architecture
Kurtastore follows a standard 3-tier Client-Server architecture utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js).

### 2.1 Architecture Tiers
1.  **Presentation Tier (Frontend):**
    *   **Client App:** A React application (built with Vite) that serves end-users (customers). It handles UI rendering, local state management, and client-side routing.
    *   **Admin App:** A separate React application for administrators to manage the store.
    *   *Technologies:* React, React Router, TailwindCSS, MUI, GSAP (animations), Axios.

2.  **Logic Tier (Backend API):**
    *   **Node/Express Server:** Acts as the central hub linking the frontend to the database and third-party services. It exposes RESTful endpoints, handles business logic (cart calculations, checkout processes), middleware (authentication, error handling), and routing.
    *   *Technologies:* Node.js, Express.js, JSON Web Tokens (JWT), bcrypt.

3.  **Data Tier (Database):**
    *   **MongoDB:** A NoSQL database storing all application data in JSON-like documents. Accessed via Mongoose ODM for schema validation and query building.
    *   *Technologies:* MongoDB, Mongoose.

### 2.2 External Services Integration
*   **Razorpay:** Integrated for secure payment processing. The flow involves order creation on the server, payment capture on the client, and payment verification via Razorpay webhooks/callbacks on the server.
*   **Cloudinary:** Used as a Content Delivery Network (CDN) and cloud storage for product images. Images are uploaded from the Admin panel directly, and Cloudinary URLs are stored in MongoDB.
*   **Nodemailer / SMTP provider:** Plugs into the backend to send transactional emails (OTPs, order confirmations, issue reports).

## 3. Component Interaction Diagram (Conceptual)
```mermaid
graph TD
    ClientApp[Client Web App (React)] <--> |HTTPS / REST API| Backend[Node.js / Express Server]
    AdminApp[Admin Web App (React)] <--> |HTTPS / REST API| Backend
    
    Backend <--> |Mongoose ODM| Database[(MongoDB)]
    
    Backend --> |API Calls| Razorpay[Razorpay Gateway]
    ClientApp --> |Checkout Script| Razorpay
    
    Backend --> |SMTP| Email[Nodemailer Services]
    
    AdminApp --> |Image Upload| Backend
    Backend --> |Upload/Transform| Cloudinary[Cloudinary Image CDN]
    ClientApp --> |Fetch Images| Cloudinary
```

## 4. Database Design Schema (Data Model)
The database comprises several distinct collections, managed by Mongoose models:

1.  **Users (`USER_DATA`)**:
    *   `_id`, `First_Name`, `Last_Name`, `email`, `Mobile_No`, `password` (hashed).
2.  **Admins (`adminDB`)**:
    *   `ADMIN_ID`, `First_Name`, `Last_Name`, `email`, `password`, `isAdmin`.
3.  **Products (`PRODUCTS_DB`)**:
    *   `PRODUCT_id`, `Product_name`, `Price`, `Discounted_Price`, `Status`, `Product_img_url`.
    *   `Colors`: Array of subdocuments containing `img_url`, `color`, `hexcode`, `stocks`.
    *   `outofstock` (boolean).
4.  **Cart (`USER_CART`)**:
    *   `USER_CART_id` (Refs User `_id`).
    *   `Products`: Array of cart items (`product_id`, `Quantity`, `Size`, `Color`, `payable_amount`, etc.).
    *   `Total_Quantity`, `Total_Price`.
5.  **Orders (`ORDER_DB`)**:
    *   `USER_ORDER_ID` (UUID), `USER_ID`, `CART_ID`.
    *   `USER_DETAILS`: Snapshot of user info at checkout.
    *   `ITEMS`: Snapshot of purchased products.
    *   `TRANSACTION`: Razorpay details (`orderId`, `paymentId`, `signature`, `status`).
    *   `orderStatus` (e.g., Processing, Shipped).
6.  **OTPs (`TEMP_OTP`)**:
    *   `USER_ID`, `Request_Mail`, `OTP`, `token` (Temporary storage with TTL).
7.  **Issues (`ISSUES_DB`)**:
    *   `USER_ID`, `ORDER_ID`, `Subject`, `Main` (description), `Contact`.

## 5. API Design Overview
The backend exposes RESTful API endpoints categorized by functionality and protected by JWT authentication middleware where appropriate.

### 5.1 Route Prefixes
*   `/api/user`: Customer-facing endpoints.
*   `/api/admin`: Administrator-facing endpoints.

### 5.2 Key Endpoints
**User Module:**
*   `POST /auth/register`, `POST /auth/login`, `GET /auth/authorisation`
*   `GET /product/getproducts`, `GET /product/getproductstobuy/:params_productID`
*   `POST /cart/addtocart`, `POST /cart/updatecart`, `GET /cart/getcartproducts`, `DELETE /cart/deleteitem/:product`
*   `POST /order/submitOrderDetails`, `POST /order/createOrder` (Razorpay order init), `POST /order/payment-success` (verify signature).

**Admin Module:**
*   `POST /auth/admin_login`, `POST /auth/register_admin`
*   `POST /product/addproduct`, `POST /product/updateProducts`, `POST /product/addcolor`
*   `GET /order/getusersorders`, `POST /order/updateOrder` (Status change)
*   `GET /users/getusers`

## 6. System Flows

### 6.1 Authentication Flow (JWT)
1.  Client submits credentials to `/login`.
2.  Server verifies hash and signs a JWT containing `userId` and `email`.
3.  Token is returned and stored in local or session storage on the client.
4.  Subsequent protected requests include `Authorization: Bearer <token>`.
5.  Backend middleware `jwt.verify` decodes the token. If valid, request proceeds; if invalid/expired, `401 Unauthorized` is returned.

### 6.2 Checkout & Payment Flow (Razorpay)
1.  User initiates checkout. Frontend calls `/createOrder` with total amount.
2.  Backend talks to Razorpay API `razorpay.orders.create()` generating a unique Razorpay `order_id`.
3.  Backend responds to Client with `order_id`.
4.  Client opens Razorpay checkout widget using the `order_id`. User completes payment.
5.  Razorpay returns `payment_id`, `order_id`, and `signature` to the Client.
6.  Client sends these details to backend `/payment-success`.
7.  Backend verifies the cryptographic signature to ensure payment legitimacy.
8.  On success, Backend moves Cart data to Order collection, empties Cart, and fires confirmation email.

## 7. Security and Error Handling Considerations
*   **Input Validation:** Ensure Frontend validation (Yup) is backed up by Backend validation to prevent injection or bad data.
*   **Error Responses:** Standardized JSON error responses (e.g., `res.status(500).json(...)`) to allow graceful degradation and UI error state rendering on the frontend.
*   **Environment Variables:** Sensitive keys (JWT Secret, Razorpay keys, Database URI, Email passwords) must be securely managed via `.env` files and never committed to source control.
