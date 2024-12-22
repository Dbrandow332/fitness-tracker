import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const { user: currentUser } = useAuth(); // Get user from AuthContext
    const [user, setUser] = useState({
        name: "",
        age: "",
        email: "",
        goal: "",
        calorieTarget: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!currentUser?.uid) {
                console.error("User is not logged in or UID is missing");
                return;
            }

            try {
                const response = await fetch(`${ process.env.REACT_APP_API_BASE_URL } / api / users / ${ currentUser.uid }`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        };

        fetchUser();
    }, [currentUser]);

    const handleSave = async () => {
        if (!currentUser?.uid) {
            console.error("User UID is missing");
            return;
        }

        try {
            const response = await fetch(`${ process.env.REACT_APP_API_BASE_URL } / api / users / ${ currentUser.uid }`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-card">
                {isEditing ? (
                    <>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                type="number"
                                name="age"
                                value={user.age}
                                onChange={(e) => setUser({ ...user, age: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </label>
                        <label>
                            Fitness Goal:
                            <input
                                type="text"
                                name="goal"
                                value={user.goal}
                                onChange={(e) => setUser({ ...user, goal: e.target.value })}
                            />
                        </label>
                        <label>
                            Daily Calorie Target:
                            <input
                                type="number"
                                name="calorieTarget"
                                value={user.calorieTarget}
                                onChange={(e) => setUser({ ...user, calorieTarget: e.target.value })}
                            />
                        </label>
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Fitness Goal:</strong> {user.goal}</p>
                        <p><strong>Calorie Target:</strong> {user.calorieTarget} kcal</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
