# Specification: Implementing User Login and Dashboard Panels

## Overview:
This track focuses on implementing a robust user authentication system supporting traditional email/password, Google, and Apple sign-in methods. It will also involve creating a comprehensive customer account dashboard and refining the existing admin panel with new customer and loyalty management features, along with UI consistency audits.

## Functional Requirements:

1.  **User Authentication:**
    *   Support for Email/Password login and registration.
    *   Integration with Google Sign-In.
    *   Integration with Apple Sign-In.
    *   Secure password handling and session management.

2.  **Customer Account Dashboard (`/user/dashboard`):**
    *   **Booking History:** Users can view their past and upcoming service appointments.
    *   **Vehicle Management:** Users can add, edit, and view details of their vehicles (make, model, year, VIN).
    *   **Loyalty Program:** Users can track their loyalty points, tier status, and available rewards.
    *   **Profile Management:** Users can update their personal information, contact details, and preferences.

3.  **Admin Panel Refinements:**
    *   **Customer Overview:** Admins will have a centralized view of customer profiles and their activities.
    *   **Loyalty Adjustments:** Tools for admins to manage and adjust customer loyalty points.
    *   **Admin Audit Logs:** Implement audit logging for significant admin actions (e.g., loyalty point adjustments).
    *   **UI Consistency Audit:** Conduct a thorough audit of the admin UI to ensure consistency with project guidelines and refine as needed.

## Non-Functional Requirements:

*   **Security:** All authentication methods must be secure and follow industry best practices.
*   **Performance:** Dashboards should load quickly and efficiently.
*   **Maintainability:** Code should be clean, well-documented, and easy to extend.
*   **UI/UX:** User interfaces should be intuitive, visually appealing, and consistent with the existing luxury brand identity.

## Acceptance Criteria:

*   Users can successfully register and log in using all specified authentication methods.
*   Authenticated users can access their customer dashboard and view/manage all listed features.
*   Admins can access the refined admin panel, view customer overviews, manage loyalty, and view audit logs.
*   The UI of both customer and admin dashboards is consistent with the Smart Motor design system.

## Out of Scope:

*   Real-time chat support within the dashboard (this is handled by the existing floating AI agent).
*   Complex notification systems beyond basic toasts for actions.
*   Any external payment gateway integrations beyond the existing booking flow.