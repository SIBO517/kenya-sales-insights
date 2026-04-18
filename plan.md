This project will develop a comprehensive data collection and reporting application tailored for sales and marketing operations in Kenya.

**Core Functionalities:**
1.  **User Management & Authentication:**
    *   Secure login for 'SIBO AGENCY' with the password 'SIBOAGENCY@26'.
    *   Support for multiple simultaneous user sessions across different devices.
    *   Record the logged-in 'DSR Name' for each session.
2.  **Data Modules:**
    *   **Shops:** Capture Name, MSIDN, Number of Lines Given, Serial Number (1 & 2). Integrate Google Maps location capture.
    *   **Recruitment:** Capture Name, MSIDN, Number of Lines Given, Serial Number (1 & 2). Integrate Google Maps location capture.
    *   **Services Float:** Capture Name, MSIDN. Integrate Google Maps location capture. Add 'Amount'.
    *   **Branding:** Capture Shop Name, photos. Integrate Google Maps location capture.
3.  **Data Export:** Functionality to generate and export collected data into Excel format.
4.  **Admin & Reporting:**
    *   'SIBO AGENCY' admin access to view all daily activities and data.
    *   Automated daily dispatch of entered data to 'SBMSALESMARKETINGCO@GMAIL.COM'.

**Technical Implementation Plan:**
*   **Frontend Engineer:** Responsible for developing the user interface, including forms for each data module, interactive map components for location capture, login screens, and reporting views. Must ensure cross-device compatibility. **Crucially, must execute `generate_images_bulk` before writing any code files.**
*   **Supabase Engineer:** Responsible for backend setup, including database schema design (for Shops, Recruitment, Services, Branding), user authentication, and concurrent session management. Will implement Supabase Edge Functions for email notifications to 'SBMSALESMARKETINGCO@GMAIL.COM', Excel report generation, and any specific business logic.

**Workflow:**
1.  Architect creates this plan using `create_plan`.
2.  Frontend Engineer and Supabase Engineer will then proceed with their respective tasks, collaborating on integration.
3.  `validate_build` will be called upon completion to ensure the application functions as expected.