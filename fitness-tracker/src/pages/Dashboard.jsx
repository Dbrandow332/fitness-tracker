// src/pages/Dashboard.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Workouts Per Day",
                data: [3, 2, 1, 4, 2, 5, 0],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <h2>Your Weekly Progress</h2>
            <Bar data={data} />
        </div>
    );
};

export default Dashboard;
