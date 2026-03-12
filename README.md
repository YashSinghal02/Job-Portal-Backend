# Job Portal Backend

Backend API for a Job Portal application where **employers can post jobs** and **employees can browse, apply, and save jobs**.
This project provides a structured REST API using Node.js, Express.js, and MongoDB.

---

## Tech Stack
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API Architecture

---

## Features

* User Authentication
* Employer can create job postings
* Employees can apply for jobs
* Save jobs functionality
* RESTful API structure
* Error handling middleware
* Modular folder structure

---

## Folder Structure

```
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
npm start
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

---

## License

This project is licensed under the **MIT License**.

Copyright (c) 2026 Yash Singhal

---

## Author

**Yash Singhal**

Aspiring Full Stack Developer passionate about building modern web applications using the MERN stack.
