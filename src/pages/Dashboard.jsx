import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2"; // Import chart components
import { useAuth } from "../context/AuthContext"; // Use authentication context
import "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
    const { user: currentUser } = useAuth(); // Get the current user from context
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false); // Control the visibility of the form
    const [newWorkout, setNewWorkout] = useState({
        exercise: "",
        calories: "",
        duration: "",
    });

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!currentUser?.uid) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/workouts/${currentUser.uid}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError("Failed to fetch workouts.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [currentUser]);

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

    // Handle form submission for adding new workout
    const handleAddWorkout = async (e) => {
        e.preventDefault();
        if (!currentUser?.uid) {
            setError("User is not authenticated.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/workouts/${currentUser.uid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWorkout),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const addedWorkout = await response.json();
            setWorkouts([...workouts, addedWorkout]);
            setNewWorkout({ exercise: "", calories: "", duration: "" }); // Reset form
            setShowForm(false);
        } catch (error) {
            console.error("Error adding workout:", error);
            setError("Failed to add workout.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Workout Dashboard</h1>
            {loading ? (
                <p className="loading">Loading workouts...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    {/* Add Workout Button */}
                    <button className="add-workout-button" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "Add New Workout"}
                    </button>

                    {/* Add Workout Form */}
                    {showForm && (
                        <form className="add-workout-form" onSubmit={handleAddWorkout}>
                            <label>
                                Exercise:
                                <input
                                    type="text"
                                    value={newWorkout.exercise}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, exercise: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Calories Burned:
                                <input
                                    type="number"
                                    value={newWorkout.calories}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, calories: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Duration (minutes):
                                <input
                                    type="number"
                                    value={newWorkout.duration}
                                    onChange={(e) =>
                                        setNewWorkout({ ...newWorkout, duration: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <button type="submit">Save Workout</button>
                        </form>
                    )}

                    {/* Bar Chart */}
                    <div className="chart-container">
                        <h2>Calories Burned per Exercise</h2>
                        <Bar data={prepareChartData()} />
                    </div>

                    {/* Line Chart */}
                    <div className="chart-container">
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
                    <div className="chart-container">
                        <h2>Calories Distribution</h2>
                        <Pie data={prepareChartData()} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
