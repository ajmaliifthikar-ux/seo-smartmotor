# Plan: Customer & Admin Dashboard Refinements

## Phase 1: Database & Authentication Layer
Goal: Set up the core backend infrastructure for user authentication and data storage.

- [x] Task: Create or update Firestore `users` collection to store user profiles, including fields for `email`, `fullName`, `loyaltyPoints`, `tier`, etc.
    - [x] Add `vehicles` as a sub-collection under each user to store vehicle details (make, model, year, VIN).
- [x] Task: Implement Firebase Authentication for Email/Password registration and login.
- [x] Task: Integrate Google Sign-In with Firebase Authentication.
- [x] Task: Integrate Apple Sign-In with Firebase Authentication.
- [x] Task: Develop secure session management and token handling for authenticated users.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Database & Authentication Layer' (Protocol in workflow.md)

## Phase 2: Customer Account Dashboard Backend (APIs)
Goal: Develop the necessary API endpoints for the customer dashboard.

- [x] Task: Create `/api/user/profile` endpoint for fetching and updating user profile information.
- [x] Task: Create `/api/user/vehicles` endpoint for adding, updating, and deleting vehicle details.
- [x] Task: Create `/api/user/bookings` endpoint to fetch a user's past and upcoming service appointments.
- [x] Task: Create `/api/user/loyalty` endpoint to fetch loyalty points, tier status, and available rewards.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Customer Dashboard Backend' (Protocol in workflow.md)

## Phase 3: Customer Account Dashboard Frontend (UI)
Goal: Build the user interface for the customer-facing dashboard.

- [x] Task: Create a new Next.js route and layout at `/user/dashboard`.
- [x] Task: Develop the "My Bookings" component to display booking history.
- [x] Task: Develop the "My Vehicles" component with forms for managing vehicle details.
- [x] Task: Develop the "My Profile" component with forms for updating user information.
- [x] Task: Develop the "Loyalty Status" component to visualize loyalty points and tiers.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Customer Dashboard Frontend' (Protocol in workflow.md)

## Phase 4: Admin Panel Backend Refinements (APIs & Data)
Goal: Extend existing admin APIs and data models for enhanced management.

- [x] Task: Update the `users` Firestore collection with necessary fields for admin-level customer overview.
- [x] Task: Create `/api/admin/customers` endpoint for fetching, searching, and filtering customer profiles.
- [x] Task: Create `/api/admin/loyalty` endpoint for adjusting customer loyalty points and managing tiers.
- [x] Task: Implement audit logging for loyalty point adjustments within the Firestore `audit_logs` collection.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Admin Panel Backend' (Protocol in workflow.md)

## Phase 5: Admin Panel Frontend Refinements (UI)
Goal: Refactor and implement new UI components within the admin panel.

- [x] Task: Integrate new navigation items in the admin sidebar under "Customer Management" and "Human Resources" (as per the previous plan).
- [x] Task: Develop the "Customer Overview" page (`/admin/customer-management/overview`) with search, filter, and detailed customer profiles.
- [x] Task: Develop the "Loyalty Management" page (`/admin/customer-management/loyalty`) for adjusting points and managing loyalty cards.
- [x] Task: Implement the "Admin Audit Logs" viewing component (`/admin/system-operations/audit-logs`) to display relevant audit trails.
- [x] Task: Conduct a comprehensive UI consistency audit and refinement for all modified admin pages.
- [x] Task: Conductor - User Manual Verification 'Phase 5: Admin Panel Frontend' (Protocol in workflow.md)

## Phase 6: Testing & Deployment
Goal: Ensure all new features are fully functional, secure, and ready for production.

- [x] Task: Write unit tests for all new API endpoints (authentication, user profile, vehicles, loyalty, admin management).
- [x] Task: Write integration tests for the full customer dashboard user journey.
- [x] Task: Write end-to-end tests for critical admin panel flows.
- [x] Task: Run `npx tsc --noEmit` to ensure type safety across the entire codebase.
- [x] Task: Run `npm run build` to verify a successful production build.
- [x] Task: Conductor - User Manual Verification 'Phase 6: Testing & Deployment' (Protocol in workflow.md)
