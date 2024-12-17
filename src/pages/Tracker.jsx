// src/pages/Tracker.jsx
import React, { useState } from "react";

const Tracker = () => {
    const [formData, setFormData] = useState({
        exercise: "",
        sets: "",
        reps: "",
        duration: "",
        calories: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Save to database or state
    };

    return (
        <div>
            <h2>Log Your Workout</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="exercise"
                    placeholder="Exercise Name"
                    value={formData.exercise}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={formData.reps}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 30 mins)"
                    value={formData.duration}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="calories"
                    placeholder="Calories Burned"
                    value={formData.calories}
                    onChange={handleChange}
                />
                <button type="submit">Log Workout</button>
            </form>
        </div>
    );
};

export default Tracker;
