# Full Stack Task Manager Application

This is a full-stack Task Manager application built using Node.js, Express, Sequelize, and MySQL for the backend, and React, TypeScript, Vite, and Tailwind CSS for the frontend. The application allows users to sign up, log in, and manage their tasks (create, view, edit, delete) with authentication using JWT.

## Features

- User authentication (Sign Up, Login, Logout) with JWT
- Task management (Create, Read, Update, Delete)
- Protected routes for authenticated users
- Responsive design with Tailwind CSS

## Backend Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/jayant753/Task-Manager.git
    cd Task-Manager/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory and configure your environment variables:

```env
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="task"
JWT_SECRET="your_jwt_secret"
PORT=8000

### How to Use This README


- **Replace `your_jwt_secret`**: Update the JWT secret with a secure random string.
- **Clone the Repository**: Follow the instructions to clone your repository and navigate to the appropriate directories.
- **Fill in Environment Variables**: The `.env` file configuration provided is based on your specified environment variables.

This `README.md` file gives clear, structured instructions for setting up and running your Task Manager project, which will be helpful for both your development team and any future contributors.



