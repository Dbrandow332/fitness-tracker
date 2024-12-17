import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
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
                alert("Logged in successfully!");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
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
