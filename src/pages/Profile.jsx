import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "./Profile.css";

const Profile = () => {
    const [firebaseUid, setFirebaseUid] = useState(null); // State to store Firebase User ID

    // State to hold user data
    const [user, setUser] = useState({
        name: "",
        age: "",
        email: "",
        goal: "",
        calorieTarget: "",
    });

    // State to toggle edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Monitor authentication state and retrieve Firebase UID
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFirebaseUid(user.uid);
            } else {
                console.error("No user is logged in");
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch user data from backend
    useEffect(() => {
        const fetchUser = async () => {
            if (!firebaseUid) return;

            try {
                const response = await fetch(`http://localhost:5000/api/users/${firebaseUid}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        };

        fetchUser();
    }, [firebaseUid]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Save updates to backend
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${firebaseUid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-card">
                {isEditing ? (
                    <>
                        <label>
                            Name: <input type="text" name="name" value={user.name} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        </label>
                        <label>
                            Email: <input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        </label>
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
