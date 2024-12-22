import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/profile");
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const firebaseUid = userCredential.user.uid;
                navigate("/profile");

                const response = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firebaseUid,
                        name: email.split("@")[0], // Default name (or add a separate name field in the form)
                        email,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create user in the database.");
                }

                alert("Account created successfully and user added to the database!");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>
    );
};

export default Login;
