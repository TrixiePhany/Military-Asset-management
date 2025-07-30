
The system must facilitate:


Tracking of Opening Balances, Closing Balances, and Net Movements (Purchases + Transfers In - Transfers Out).
Recording of asset assignments and expended.
Transfers of assets between bases with a clear history of movements.
Role-based access control (RBAC) to ensure appropriate data access.




Core Features Needed:


Dashboard:

Display key metrics: Opening Balance, Closing Balance, Net Movement (Purchases + Transfer In - Transfer Out), Assigned and Expended assets.
Filters: Provide filter options for Date, Base and Equipment Type.
Pop-up Display: Clicking on "Net Movement" should show detailed views for Purchases, Transfer In, and Transfer Out. [Bonus]

Purchases Page:
Record purchases for assets (e.g., weapons, vehicles) for a specific base.
View historical purchases with date and equipment-type filters.

Transfer Page:
Facilitate asset transfers between bases.
Maintain a clear transfer history with timestamps and asset details.
Assignments & Expenditures Page:

Assign assets to personnel and track expended assets as well.

Role-Based Access Control (RBAC):
Admin: Full access to all data and operations.
Base Commander: Access to data and operations for their assigned base.
Logistics Officer: Limited access to purchases and transfers.


Non-Functional Requirements:

Frontend (React):
The mobile/ web app should be responsive and easy to navigate.
React: Develop a clean and responsive UI, providing smooth transitions and interactivity.
Backend:
Develop the backend using a tech stack of your choice, justifying your selections.
Secure RESTful APIs: The backend should expose APIs for each feature, including data access and updates.
Role-based Access Control (RBAC): Implement using middleware to ensure appropriate security levels for each role.
API Logging: All transactions (purchases, transfers, assignments, etc.) must be logged for auditing purposes.

Database: 

Choose a relational database (SQL or NoSQL). Justify your choice of database stack and design. Also include how it supports the requirements (e.g., tracking movements, assignments and purchases).
