import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Fitness Tracker</h1>
            <p>Track your workouts, monitor your goals, and achieve results!</p>

            {!user && (
                <div
                    style={{
                        backgroundColor: "#f9f9f9",
                        padding: "20px",
                        margin: "20px auto",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        maxWidth: "500px",
                    }}
                >
                    <h2>Track Your Workouts</h2>
                    <p>Log your exercises and see your progress over time.</p>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            padding: "10px 15px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            border: "none",
                        }}
                    >
                        Get Started
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
