# 💧 Society Water Management System

A React Native mobile application designed to provide transparency and tracking for residential society water tanker deliveries. Built to replace manual logbooks with a secure, real-time digital ledger.

## 🚀 The Problem & Solution
In residential societies without municipal pipelines, tracking daily water tanker deliveries is prone to human error and lack of transparency. This application acts as a digital ledger, allowing authorized users to log tanker arrivals with photographic proof, exact timestamps, and volume metrics, visible instantly to all residents.

## 🧠 Architectural Decisions (Why I Built It This Way)

### 1. Pre-Provisioned Authentication (Invite-Only)
Instead of building a public "Sign Up" screen, I implemented a strict **B2B / Internal Tool Architecture**. 
* **The "Why":** A residential building has a fixed, known number of flats (e.g., 45 units). An open registration form introduces security risks (ghost accounts, unauthorized access) and requires a complex manual-approval flow.
* **The Solution:** User accounts are pre-provisioned via the Firebase Console by the administrator. Residents are handed secure credentials, guaranteeing 100% data integrity and preventing outsiders from viewing society data.

### 2. Separation of State and UI
Utilized React Native's `<Modal>` for full-screen image previews to avoid unnecessary re-renders. The modal is lifted out of the individual list items to prevent performance degradation when scrolling through hundreds of database logs.

## ✨ Key Features
* **Real-Time Database Sync:** Powered by Firebase Firestore, ensuring all residents see new tanker entries the second they are logged.
* **Image Capture & Storage:** Integrates Expo Camera/ImagePicker to attach visual proof of every delivery.
* **Smart Timestamps:** Automatically converts UTC database timestamps into localized, human-readable formats.
* **Secure Environment:** Environment variables (`.env`) strictly implemented to protect Firebase API configurations.

## 🛠️ Tech Stack
* **Frontend:** React Native, Expo, React Navigation
* **Backend:** Firebase (Authentication & Cloud Firestore)
* **Language:** JavaScript / TypeScript

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yashhshah12/water-management.git](https://github.com/yashhshah12/water-management.git)
   cd water-management

Yash Shah

GitHub: @yashhshah12

LinkedIn: https://www.linkedin.com/in/yash-shah-2b8a0a2b7/