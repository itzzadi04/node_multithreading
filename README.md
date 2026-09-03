# Multi-Threaded Number Summation API

A Node.js and Express application demonstrating how to handle high-CPU blocking operations using **Worker Threads** (`worker_threads`). This architecture allows the server to process massive math calculations simultaneously across multiple CPU cores without freezing or blocking incoming requests.

---

## 🛠 Architecture Overview

When a user triggers a heavy calculation, the workload is distributed split-by-range across **5 background worker threads** running in parallel:

* **Thread 1:** 1 to 10,000,000,000
* **Thread 2:** 10,000,000,001 to 20,000,000,000
* **Thread 3:** 20,000,000,001 to 30,000,000,000
* **Thread 4:** 30,000,000,001 to 40,000,000,000
* **Thread 5:** 40,000,000,001 to 50,000,000,000

The main thread uses `Promise.all()` to wait for all threads to finish, aggregates their respective sums, and outputs the grand total.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have **Node.js** (v12+ recommended) installed on your system.

### 2. Project File Structure
Ensure your files are named correctly and stored in the exact same directory:
```text
├── server.js          # The Express application source code
├── four_worker.js     # The worker thread logic
└── README.md          # This file
```

### 3. Installation
Initialize your project and install **Express**:
```bash
npm init -y
npm install express
```

### 4. Running the Server
Start the Express server using:
```bash
node server.js
```
*The console will log: `the site is live at port 5000`*

---

## 🛣 API Endpoints

### 1. Non-Blocking Endpoint
* **URL:** `http://localhost:5000/non_blocking`
* **Method:** `GET`
* **Description:** Instant response testing endpoint. You can ping this continuously even while the heavy computation endpoint below is running.
* **Response:** `this page is non_blocking`

### 2. Heavy Blocking (Multi-Threaded) Endpoint
* **URL:** `http://localhost:5000/blocking`
* **Method:** `GET`
* **Description:** Triggers 5 worker threads to run loop computations up to 50 billion. Thanks to worker threads, this computation runs in the background.
* **Response:** `[Total Sum] this page is blocking`

---

## 💡 Code Details

### Worker Logic (`four_worker.js`)
Extracts the bounds (`start` and `end`) from `workerData`, runs a high-iteration `for` loop to compute the chunk sum, and broadcasts the value back to the application thread.

### Main Server (`server.js`)
Wraps each initialized `Worker` instance in a JavaScript `Promise` to neatly handle async operations via lifecycle events (`message`, `error`). 
