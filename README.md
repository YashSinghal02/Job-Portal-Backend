# HireBase – Job Portal Backend

Backend API for HireBase, a job portal application where employers can post jobs and candidates can browse, apply, and save jobs.

This project is built using Node.js, Express.js, and MongoDB, following a structured and scalable REST API architecture.

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication  
- Secure login and signup  
- Role-Based Access Control (Employer & Candidate)  
- Protected API routes  

---

### 💼 Job Management
- Employers can create and manage job postings  
- Candidates can browse available jobs  
- Apply to jobs  
- Save jobs for later  

---

### ⚙️ System Design
- RESTful API architecture  
- Modular folder structure (Controller, Service, Routes, etc.)  
- Centralized error handling middleware  
- API rate limiting for security and abuse prevention  

---

## 📁 Folder Structure

```bash
src/
├── Controllers
├── Database
├── Middlewares
├── Model
├── Routes
├── Service
├── Templates
└── Utils

```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YashSinghal02/Job-Portal-Backend.git
```

### 2. Navigate into the project folder

```bash
cd Job-Portal-Backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add required environment variables such as:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Run the server

```bash
npm run dev
```

The server should now be running on:

```
http://localhost:5000
```

---

## API Capabilities

* Create Job
* View Jobs
* Apply for Jobs
* Save Jobs
* Manage Job Posts
* Authentication (Login / Signup)

---

## License

This project is licensed under the **MIT License**.

Copyright (c) 2026 Yash Singhal

---

## Author

**Yash Singhal**

Aspiring Full Stack Developer passionate about building modern web applications using the MERN stack.
