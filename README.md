# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# 🌐 Health Care Platform - Frontend

## 🚀 Overview
This is the **frontend** of the Health Care platform, built using **React**, **Tailwind CSS**, and **DaisyUI**. It allows users to **find doctors, book appointments, and manage profiles** with a seamless UI/UX.

## 📌 Features
- **Homepage**: Navbar, Hero Section, Doctor Listings, Filtering Options, and Dark/Light Mode.
- **Navbar**:
  - **Guide**: How the platform works.
  - **Find Doctors**: List of available doctors.
  - **Doctor Details**: View doctor info, specialization, and reviews.
  - **Authentication**: Login, Signup, and Profile Management.
- **Patients**:
  - **Book appointments** after authentication.
  - **Make secure payments** via SSLCommerz.
  - **View & manage appointments** in their dashboard.
  - **Review doctors** after consultations.
- **Doctors**:
  - **View patient appointments** in the dashboard.
  - **Mark appointments as completed** after service.
- **Authentication**:
  - Email verification during signup.
  - Forgot password & password reset.
  - Profile update functionality.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, DaisyUI
- **State Management**: React Context API
- **Routing**: React Router
- **API Communication**: Axios (REST API)
- **Authentication**: JWT (via Django backend)
- **Hosting**: Netlify

## 📦 Setup Instructions
1. Clone the repository:
   ```sh
   git clone <frontend-repo-url>

