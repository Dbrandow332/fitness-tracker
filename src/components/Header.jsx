// src/components/Header.jsx
import React from "react";

const Header = () => (
    <header>
        <h1>Fitness Tracker</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/tracker">Tracker</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/profile">Profile</a>
        </nav>
    </header>
);

export default Header;