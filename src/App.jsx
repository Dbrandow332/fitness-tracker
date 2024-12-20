import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    return (
        <AuthProvider>
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
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />

                        {/* Private Routes */}
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>

                    <footer>
                        <p>&copy; 2024 Fitness Tracker. All rights reserved.</p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
