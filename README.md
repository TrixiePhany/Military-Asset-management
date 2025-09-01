
# The Milllitary Asset Management system must facilitate:
Tracking of Opening Balances, Closing Balances, and Net Movements (Purchases + Transfers In - Transfers Out).
Recording of asset assignments and expended.
Transfers of assets between bases with a clear history of movements.
Role-based access control (RBAC) to ensure appropriate data access.




# Core Features:
1. Dashboard:
Display key metrics: Opening Balance, Closing Balance, Net Movement (Purchases + Transfer In - Transfer Out), Assigned and Expended assets.
Filters: Provide filter options for Date, Base and Equipment Type.
Pop-up Display: Clicking on "Net Movement" should show detailed views for Purchases, Transfer In, and Transfer Out. [Bonus]

2. Purchases Page:
Record purchases for assets (e.g., weapons, vehicles) for a specific base.
View historical purchases with date and equipment-type filters.

3. Transfer Page:
Facilitate asset transfers between bases.
Maintain a clear transfer history with timestamps and asset details.

4. Assignments & Expenditures Page:
Assign assets to personnel and track expended assets as well.

5. Role-Based Access Control (RBAC):
Admin: Full access to all data and operations.
Base Commander: Access to data and operations for their assigned base.
Logistics Officer: Limited access to purchases and transfers.

# Non-Functional Requirements:
1. Frontend:
React: The web app is responsive and easy to navigate. A clean and responsive UI, providing smooth transitions and interactivity.

3. Backend:
Secure RESTful APIs: Includes data access and updates.
Role-based Access Control (RBAC): Implement using middleware to ensure appropriate security levels for each role.
API Logging: All transactions (purchases, transfers, assignments, etc.) must be logged for auditing purposes.

Database: 
A relational database SQL. Used Postgres SQL
