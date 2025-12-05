# Task Management App

## A. Description

This is a Task Management application built with **Laravel (API)** and **Vue 3 + Pinia (Frontend)**.  
It allows users to:

- Create, edit, and delete tasks
- Mark tasks as done or pending
- View a list of all their tasks
- Handle authentication and authorization securely

Each task contains the following fields:

- **title** (string)
- **description** (text, optional)

# Task Management App

## A. Description

This is a Task Management application built with **Laravel (API)** and **Vue 3 + Pinia (Frontend)**.

It allows users to:

- Create, edit, and delete tasks
- Mark tasks as done or pending
- View a list of all their tasks
- Handle authentication and authorization securely

Each task contains the following fields:

- **title** (string)
- **description** (text, optional)
- **status** (`pending` or `done`)
- **created_at**
- **updated_at**

The frontend uses the Vue 3 Composition API, Pinia for state management, and Axios for API calls.
The backend is a RESTful API built with Laravel and includes authentication and resource policies.

---

## B. AI Usage Log

AI was used professionally during development to assist with architecture, code generation, debugging, and security reviews. Outputs were reviewed and adapted before being committed.

Summary of notable AI-assisted tasks:

- **Refactoring controllers**: Improved TaskController to avoid pitfalls with `Auth::user()->tasks()` and to include proper authorization checks.
- **Vue components**: Generated `TaskForm`, `TaskItem`, and `TaskList` components (Composition API) with added loading states and optimistic updates.
- **Pinia store**: Implemented task store with CRUD actions, error handling, and optimistic UI updates.
- **Routing & guards**: Implemented Vue Router guards to protect authenticated routes and prevent logged-in users accessing auth pages.
- **UI & styling**: Tailwind-based styles with accessibility adjustments for status badges and spacing.
- **Error handling**: Converted Laravel validation errors into multi-line messages for the frontend and improved Axios 401 handling on logout.

Notes on AI usage:

- Prompts were specific and constrained; AI output was reviewed and adapted by the development team.
- Snyk and other security tools were used to scan and remediate issues introduced by new code.
- AI supported development and was not the sole author of final code — manual review and testing were applied.

---

## C. Setup Instructions

Follow these steps to set up the project locally.

### Backend (Laravel API)

```powershell
git clone <repo-url>
cd task-manager-api
composer install
cp .env.example .env
# Update DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend

```powershell
cd task-manager-frontend
npm install
# Ensure Axios baseURL points to your Laravel API, for example:
# axios.defaults.baseURL = "http://127.0.0.1:8000/api"
npm run dev
```

---

## D. AI Tools Used During Development

1. **ChatGPT** — architecture, debugging, and design suggestions.
2. **GitHub Copilot** — in-editor code generation for Vue components and store scaffolding.
3. **Snyk (VS Code / CLI)** — security scanning and remediation guidance.
4. **GitLens** — code review and history tracking to separate AI suggestions from manual edits.

---

## E. Examples of Prompts Used with AI

Examples of real prompts used during development:

- "Design a clean folder structure for a Vue 3 + Pinia project that communicates with a Laravel API."
- "Implement a 'Continue as Guest' flow using `guestTaskService` with localStorage CRUD that matches API responses."
- "Create a reusable TaskForm component using the Composition API with validation and emits for submit."
- "Explain why Axios returns 401 after logout and recommend safe Pinia store clearing behavior."

---

## F. How AI Output Was Corrected and Improved

AI-generated suggestions were refined by:

- Clarifying constraints and requesting smaller, focused outputs.
- Enforcing consistency in naming and structure.
- Applying Snyk recommendations and re-scanning after fixes.
- Validating changes via code review and tests before merging.

---

## G. Contact / Contributing

If you'd like to contribute, please open an issue or a pull request. For questions or help running the project locally, contact the repository owner.

---

_Last updated: December 2025_
