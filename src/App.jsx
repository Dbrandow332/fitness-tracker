import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./Login";

function App() {

    const { user } = useContext(AuthContext);

    console.log("Auth User:", user); // Debug user state

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Fitness Tracker</h1>
                    <p>Track your workouts, goals, and progress with ease.</p>
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/dashboard">Dashboard</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={user ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>

                <footer>
                    <p>&copy; 2024 Fitness Tracker. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
