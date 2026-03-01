# Business Requirement Document (BRD)
**Project Name:** Kurtastore E-Commerce Platform

## 1. Project Overview & Objective
Kurtastore is a full-stack e-commerce web application designed to sell clothing items (specifically Kurtas) online. The objective of the platform is to provide a seamless shopping experience for customers while offering a robust administrative dashboard for store owners to manage products, orders, and users effectively.

## 2. Problem Statement
Traditional retail or basic online storefronts lack end-to-end automation for order tracking, secure payments, and inventory management. Kurtastore aims to bridge this gap by providing an integrated solution with secure authentication, real-time payment processing, and efficient order management.

## 3. Scope of the Project
The scope of Kurtastore encompasses two main interfaces:
1. **User Storefront (Client):** A responsive web application where customers can browse products, add them to a cart, securely checkout using Razorpay, track orders, and report issues.
2. **Admin Dashboard (Admin):** A secure portal for store administrators to manage the product catalog (add, update, delete products and colors), view and update order statuses, manage user accounts, and track reported issues.
3. **Backend API (Server):** A RESTful API handling business logic, database operations, email notifications, authentication, and third-party integrations (payments and image hosting).

## 4. Target Audience
- **Customers:** Individuals looking to purchase ethnic wear/kurtas online.
- **Administrators:** Store owners or managers responsible for inventory, order fulfillment, and customer support.

## 5. Key Business Features

### 5.1 Customer Features
- **Account Management:** Registration and secure login. OTP-based email verification for account recovery or sensitive actions.
- **Product Catalog:** Browse products, view detailed descriptions, images, available sizes, and colors.
- **Shopping Cart:** Add items to cart, update quantities, and remove items. Prices dynamically calculate based on quantity and discounts.
- **Checkout & Payments:** Integrated secure payment gateway (Razorpay) for processing orders.
- **Order Tracking:** View order history, track current order statuses, and receive email confirmations.
- **Customer Support:** Report issues with specific orders directly to the administration team.

### 5.2 Admin Features
- **Secure Portal:** Dedicated login mechanism using an Admin Key and password.
- **Product Management:** Add new products, upload images (via Cloudinary), update existing details (price, stock, colors), and remove discontinued products.
- **Order Management:** View all customer orders, update order status (e.g., Processing, Shipped, Delivered), and manage related issues.
- **User Management:** View registered users and basic details.

## 6. Assumptions and Dependencies
- Users will have access to a modern web browser and active internet connection.
- Third-party services (Razorpay, Cloudinary, Email SMTP) will maintain their expected uptime and API stability.
- The platform operates primarily in INR currency.

## 7. Out of Scope (For current phase)
- Multi-vendor support (marketplace model).
- International shipping and multi-currency support.
- Advanced AI-based product recommendations.
- Mobile Application (iOS/Android native apps).

---

# System Requirement Specification (SRS)
**Project Name:** Kurtastore E-Commerce Platform

## 1. Introduction
### 1.1 Purpose
This document specifies the software requirements for the Kurtastore E-Commerce Platform. It covers both the User Interface (Client), Admin Dashboard (Admin), and the Backend API (Server).

### 1.2 Tech Stack Overview
- **Frontend (Client & Admin):** React.js (Vite), TailwindCSS, Material UI (MUI), GSAP (Animations), Formik & Yup (Form Validation), Axios.
- **Backend (Server):** Node.js, Express.js.
- **Database:** MongoDB (using Mongoose ODM).
- **Authentication:** JSON Web Tokens (JWT), bcryptjs (password hashing).
- **Third-Party Integrations:** Razorpay (Payments), Cloudinary (Image Hosting), Nodemailer (Email services).

## 2. Overall Description
### 2.1 Product Perspective
Kurtastore is an independent, responsive web application utilizing a modern MERN stack architecture. It separates concerns into a RESTful backend API and distinct React-based frontend clients for standard users and administrators.

### 2.2 User Classes
- **Guest User:** Can browse products but cannot add to cart or checkout.
- **Registered User:** Can manage cart, place orders, and report issues.
- **Super Admin:** Full access to inventory, orders, and user data.

## 3. Functional Requirements

### 3.1 User Module (Client)
1.  **Authentication & Profile Management**
    *   `REQ-U1`: The system shall allow users to register with First Name, Last Name, Email, Mobile, and Password.
    *   `REQ-U2`: The system shall securely hash passwords before storing them.
    *   `REQ-U3`: The system shall issue a JWT upon successful login.
    *   `REQ-U4`: The system shall support OTP-based verification for specific actions via email.
2.  **Product Browsing**
    *   `REQ-U5`: The system shall display a list of available products with active pricing, discounts, and images.
    *   `REQ-U6`: The system shall provide a detailed view of a product, including selectable sizes and color variants.
3.  **Cart & Checkout**
    *   `REQ-U7`: The system shall allow authenticated users to add specified product variants to a persistent cart.
    *   `REQ-U8`: The system shall allow users to update item quantities or remove items from the cart.
    *   `REQ-U9`: The system shall calculate the total payable amount dynamically.
    *   `REQ-U10`: The system shall process payments securely via the Razorpay gateway.
    *   `REQ-U11`: Upon successful payment, the system shall clear the cart, generate an Order, and send a confirmation email.
4.  **Order Tracking & Support**
    *   `REQ-U12`: The system shall allow users to view their order history and current status.
    *   `REQ-U13`: The system shall allow users to submit issue reports linked to specific Order IDs.

### 3.2 Admin Module (Admin)
1.  **Admin Authentication**
    *   `REQ-A1`: The system shall authenticate admins using an Email, Password, and a specific Admin Key.
2.  **Inventory Management**
    *   `REQ-A2`: The system shall allow admins to add new products, uploading images directly to Cloudinary.
    *   `REQ-A3`: The system shall allow admins to add color variants to existing products.
    *   `REQ-A4`: The system shall allow admins to update product pricing and stock details (mark out of stock).
3.  **Order & User Management**
    *   `REQ-A5`: The system shall list all customer orders.
    *   `REQ-A6`: The system shall allow admins to update the fulfillment status of orders (e.g., Shipped).
    *   `REQ-A7`: The system shall provide a list of all registered users (excluding sensitive password data).

## 4. Database Schema Requirements
- `UserAuthModel`: Manages user credentials, contact details.
- `ProductModel`: Stores product specs, prices, multiple color variants (with image URLs), and stock status.
- `UserCartModel`: Links to a User ID, containing an array of selected products and calculated totals.
- `UserOrderModel`: Stores final order details, linked cart snapshot, shipping info, Razorpay transaction ID, and fulfillment status.
- `OTPModel`: Temporary storage for unverified OTPs.
- `IssueModel`: Stores user-reported issues linked to orders.
- `adminDB`: Admin credentials and authorization flags.

## 5. Non-Functional Requirements
- **Security:** API endpoints must be protected. Only requests with valid JWT headers in `Authorization` should access protected routes. Passwords must never be stored in plaintext.
- **Performance:** Images must be optimized and served via a CDN (Cloudinary) to ensure fast load times.
- **Usability:** The UI must be fully responsive, catering to mobile, tablet, and desktop viewports using Tailwind CSS.
- **Reliability:** The system must gracefully handle external API failures (e.g., if Razorpay or Cloudinary goes down) by returning appropriate 500-level errors to the client without crashing the server.
