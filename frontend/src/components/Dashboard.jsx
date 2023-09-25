import "../styles/Dashboard.css";
import DashboardTable from "./DashboardTable";
import { useUserId } from "../UserIdContext";
function Dashboard() {
  const { userId } = useUserId();

  return (
    <>
      <div className="placement">
        <div className="table">
          <DashboardTable userId={userId} />
        </div>
        <div>
          <h3>Expense Tracker</h3>
          <p>
            1. Backend Setup: ○ Set up a Spring Boot application with Spring
            Data JPA to manage expense data. ○ Define entities for expenses and
            users. 2. RESTful API Development: ○ Implement RESTful endpoints for
            adding, retrieving, updating, and deleting expenses. ○ Implement
            pagination for displaying a list of expenses. 3. Frontend
            Development (React): ○ Create a React application for the frontend.
            ○ Design user interfaces for adding expenses, viewing expense
            history, and generating reports. 4. User Authentication: ○ Implement
            user registration and login functionality. ○ Secure relevant
            endpoints using Spring Security and JWT. 5. Expense Categorization:
            ○ Allow users to categorize expenses and assign tags. ○ Provide the
            ability to filter and sort expenses based on categories and dates.
            6. Expense Reports and Visualization: ○ Generate and display expense
            reports and visualizations (e.g., pie charts, bar graphs). ○ Provide
            insights into spending patterns and trends.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
