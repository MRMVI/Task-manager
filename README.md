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

The frontend uses **Composition API**, **Pinia** for state management, and **Axios** for API calls.  
The backend is a **RESTful API** with Laravel, including proper authentication and resource policies.

---

## B. AI Usage Log

AI was used professionally to assist development, debug issues, and follow best practices. Each prompt was **structured, detailed, and specific**, ensuring the generated code could be adapted safely.

| Task | AI Prompt                                                                                                       | AI Output                                                                  | Modifications / Notes                                                             |
| ---- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1    | Refactor Laravel TaskController to avoid `Auth::user()->tasks()` errors and include proper authorization checks | Generated controller using `Auth::user()->tasks()` and `authorize` methods | Adjusted code to use `Auth::id()` for safer retrieval and included error handling |
| 2    | Create Vue 3 components for Task Management using Composition API                                               | Generated TaskForm, TaskItem, TaskList components                          | Added loading state, optimistic updates, and multi-line error handling            |
| 3    | Design Pinia store for tasks with CRUD actions and Axios                                                        | Provided store with fetch, add, edit, remove actions                       | Added `loading` and `error` flags, implemented optimistic updates for UX          |
| 4    | Set up Vue Router with authentication guards                                                                    | Basic navigation guard example                                             | Enhanced to prevent logged-in users from accessing login/register pages           |
| 5    | Write CSS for Task components using Tailwind                                                                    | Tailwind-based layout                                                      | Adjusted colors, spacing, and status badges for accessibility and readability     |
| 6    | Convert Laravel API validation errors to multi-line messages in Vue 3                                           | Suggested `join("\n")`                                                     | Implemented `v-html` for proper line breaks in the UI                             |
| 7    | Handle multi-tab login/logout synchronization in Vue 3                                                          | Provided code for storage events                                           | Updated Pinia store safely, handle token invalidation                             |
| 8    | Debug Axios 401 Unauthorized errors on logout                                                                   | Explained cause and suggested catch handling                               | Implemented token check and cleared store on invalid token                        |
| 9    | Optimize adding new tasks in Pinia store; is `unshift` acceptable?                                              | Confirmed `unshift` is acceptable for small lists                          | No modification needed                                                            |
| 10   | Compose professional README with AI logs                                                                        | Drafted structure                                                          | Customized to project, added detailed AI usage log                                |

**Notes on AI Usage**

- Prompts were precise, specifying functionality, naming, and expected behavior.
- AI-generated code was reviewed, modified, and tested for security, UX, and coding standards.
- AI was used for **debugging, optimization, and professional guidance**, not just code generation.

---

## C. Setup Instructions

Follow these steps to set up the project locally:

### Backend (Laravel API)

```bash
git clone <repo-url>
cd project-backend
composer install
cp .env.example .env
# Update DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan key:generate
php artisan migrate
php artisan serve
```

2.Frontend:

```bash
cd project-frontend
npm install
# Make sure axios baseURL points to your Laravel API
# e.g., axios.defaults.baseURL = "http://127.0.0.1:8000/api"
npm run dev
```
