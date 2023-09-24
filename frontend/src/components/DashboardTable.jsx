import { useEffect, useState } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Table from "react-bootstrap/Table";
import CanvasJSReact from "@canvasjs/react-charts";

const DashboardTable = () => {
  const { userId, token } = useUserId();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userId && !token) {
      if (storedUserId && storedToken) {
        fetchDashboardData(storedUserId, storedToken);
      }
    } else {
      fetchDashboardData(userId, token);
    }
  }, [userId, token, storedUserId, storedToken]);

  const fetchDashboardData = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/dashboard/lastFive/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  // Calculate the sum of income and expenses
  const totalIncome = dashboardData
    .filter((record) => record.transactionType === "Income")
    .reduce((sum, record) => sum + record.transactionAmount, 0);

  const totalExpense = dashboardData
    .filter((record) => record.transactionType === "Expense")
    .reduce((sum, record) => sum + record.transactionAmount, 0);

  // Create data for the pie chart
  const pieChartData = [
    { y: totalIncome, label: "Income" },
    { y: totalExpense, label: "Expense" },
  ];

  // Configure options for the pie chart
  const pieChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    title: {
      text: "Income vs. Expense",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: pieChartData,
      },
    ],
  };

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="table-container">
        <Table striped bordered hover>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.map((record, index) => (
                <tr key={index}>
                  <td>{record.transactionCategory}</td>
                  <td>{record.transactionDescription}</td>
                  <td>${record.transactionAmount.toFixed(2)}</td>
                  <td>
                    {new Date(record.transactionDate).toLocaleDateString()}
                  </td>
                  <td>{record.transactionType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Table>
      </div>
      <div className="chart-container">
        <CanvasJSReact.CanvasJSChart options={pieChartOptions} />
      </div>
    </div>
  );
};

export default DashboardTable;
