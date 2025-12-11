import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      alert("ok login");
      console.log("Login success:", res.data);

      // store token
      localStorage.setItem("token", res.data.token);

      // navigate to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert("err");
      console.log("Login error:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>LOGIN PAGE</h2>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>login</button>

      <p style={{ marginTop: "20px" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
