# Frontend Setup Guide (AWS EC2 + React + Vite + Nginx)

## Project Structure

```text
registration-system/
└── frontend/
```

---

# Requirements

* Ubuntu 24.04 LTS
* Node.js
* npm
* Git
* Nginx
* AWS EC2 Instance
* Backend API Running

---

# Step 1 : Update Ubuntu

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 2 : Install Git

```bash
sudo apt install git -y
```

Verify

```bash
git --version
```

---

# Step 3 : Clone Repository

```bash
git clone https://github.com/SauravBagade/registration-system.git
```

Go to frontend

```bash
cd registration-system/frontend
```

---

# Step 4 : Install Node.js & npm

```bash
sudo apt install nodejs -y
sudo apt install npm -y
```

Verify

```bash
node -v
npm -v
```

---

# Step 5 : Install Project Dependencies

```bash
npm install
```

---

# Step 6 : Configure Backend API

Open the Axios configuration file.

```text
src/services/api.js
```

Example

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://YOUR_EC2_PUBLIC_IP:8080/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

Replace:

```text
YOUR_EC2_PUBLIC_IP
```

with your EC2 Public IP or Domain Name.

---

# Step 7 : Build React Project

```bash
npm run build
```

This creates a production build inside:

```text
dist/
```

---

# Step 8 : Install Nginx

```bash
sudo apt install nginx -y
```

Start Nginx

```bash
sudo systemctl start nginx
```

Enable on boot

```bash
sudo systemctl enable nginx
```

Check status

```bash
sudo systemctl status nginx
```

---

# Step 9 : Deploy Frontend

Remove default files

```bash
sudo rm -rf /var/www/html/*
```

Copy build files

```bash
sudo cp -r dist/* /var/www/html/
```

---

# Step 10 : Restart Nginx

```bash
sudo systemctl restart nginx
```

---

# Step 11 : Open Browser

```text
http://EC2_PUBLIC_IP
```

The React application should load successfully.

---

# Development Mode

Run the Vite development server.

```bash
npm run dev
```

Default URL

```text
http://localhost:5173
```

---

# Useful Commands

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Nginx Commands

Start

```bash
sudo systemctl start nginx
```

Stop

```bash
sudo systemctl stop nginx
```

Restart

```bash
sudo systemctl restart nginx
```

Reload configuration

```bash
sudo systemctl reload nginx
```

Status

```bash
sudo systemctl status nginx
```

---

# Troubleshooting

### dist folder not found

Run:

```bash
npm run build
```

---

### API Connection Error

Verify the backend is running on port **8080** and check the API URL in:

```text
src/services/api.js
```

---

### CORS Error

Ensure:

* Backend is running.
* Spring Boot CORS configuration allows the frontend origin.
* Port **8080** is open in the EC2 Security Group if the frontend accesses it directly.

---

### Nginx Default Page Appears

Copy the latest build again:

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---

# Technologies Used

* React
* Vite
* Axios
* Bootstrap 5
* HTML5
* CSS3
* JavaScript (ES6)
* Nginx
* AWS EC2

---

# Author

**Saurav Bagade**

GitHub

https://github.com/SauravBagade
