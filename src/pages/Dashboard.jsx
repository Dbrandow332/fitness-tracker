import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2"; // Import chart components
import "chart.js/auto"; // Enables Chart.js features
import "./Dashboard.css";

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);

    // Fetch workout data from the backend API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/workouts/USER_ID");
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        fetchWorkouts();
    }, []);


    // Prepare data for charts
    const prepareChartData = () => {
        const exercises = {};
        workouts.forEach((workout) => {
            const calories = parseInt(workout.calories) || 0; // Default to 0 if invalid
            if (exercises[workout.exercise]) {
                exercises[workout.exercise] += calories;
            } else {
                exercises[workout.exercise] = calories;
            }
        });

        return {
            labels: Object.keys(exercises),
            datasets: [
                {
                    label: "Calories Burned by Exercise",
                    data: Object.values(exercises),
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Workout Dashboard</h1>
            {workouts.length > 0 ? (
                <>
                    {/* Bar Chart */}
                    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                        <h2>Calories Burned per Exercise</h2>
                        <Bar data={prepareChartData()} />
                    </div>

                    {/* Line Chart */}
                    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
                        <h2>Progress Over Time</h2>
                        <Line
                            data={{
                                labels: workouts.map((_, i) => `Workout ${i + 1}`),
                                datasets: [
                                    {
                                        label: "Calories Burned",
                                        data: workouts.map((workout) => workout.calories),
                                        fill: false,
                                        borderColor: "#36A2EB",
                                        tension: 0.3,
                                    },
                                ],
                            }}
                        />
                    </div>

                    {/* Pie Chart */}
                    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
                        <h2>Calories Distribution</h2>
                        <Pie data={prepareChartData()} />
                    </div>
                </>
            ) : (
                <p>Loading workouts...</p>
            )}
        </div>
    );
};

export default Dashboard;