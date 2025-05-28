# Fast Invoice

## 📁 Project Structure

```bash
FAST-INVOICE/
├── public/ # Static files (favicon, images, etc.)
├── src/ # Source code
│ ├── assets/ # Image & asset files
│ ├── components/ # Reusable React components UI
│ │ └── UI/ # Styled UI components
│ ├── Features/ # Feature Modules
│ │ └── Auth/ # Example Feature: Auth
│ │ └── Login/ # Feature for Login Page
│ │ | ├── Hook/ # Custom hooks for Auth
│ │ | ├── Components/ # UI components related to Auth
│ │ | └── Login.tsx # Root component for Auth Login
│ ├── pages/ # Page components (e.g., Login, Register)
│ ├── hooks/ # Global custom React hooks
│ ├── styles/ # Styling (CSS/Tailwind, etc.)
│ ├── libs/ # Shared libraries and utilities
│ │ ├── api/ # API call functions (e.g., Axios setup)
│ │ └── schemas/ # Validation logic (e.g., Zod, custom rules)
│ ├── routes/ # Routing configuration
│ ├── App.jsx # Root App component
│ └── main.jsx # Entry point for ReactDOM
├── .env # Environment variables
├── .gitignore # Files to be ignored by Git
├── package.json # Project metadata and dependencies
```

### 🌿 Branch Naming Example

```bash
| Type       | Utility                                              | Example                                     |
| ---------- | ---------------------------------------------------- | ------------------------------------------- |
| `feature`  | Added new features                                   | `feature/login-page`, `feature/invoice-api` |
| `fix`      | Fix bug                                              | `fix/cart-total`, `fix/login-error`         |
| `hotfix`   | Emergency repair in production                       | `hotfix/api-timeout`, `hotfix/logo-typo`    |
| `refactor` | Changes to code structure without functional changes | `refactor/auth-service`, `refactor/ui-form` |
| `chore`    | Minor routine/additional tasks                       | `chore/update-deps`, `chore/lint-config`    |
| `docs`     | Documentation changes                                | `docs/readme-update`, `docs/api-guide`      |
| `test`     | Testing additions/improvements                       | `test/login-validation`, `test/cart-flow`   |
```

### 🛠️ Example Create Branch

```bash
# 1. Move to main branch
git checkout main

# 2. Pull the latest updates
git pull origin main

# 3. Create new branch
git checkout -b feature/login-page

# 4. Push to remote
git push -u origin feature/login-page

```
