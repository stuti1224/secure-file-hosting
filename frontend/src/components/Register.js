import React, { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({ name, email, password });

      alert("ok register");
      console.log("Register success:", res.data);

      navigate("/login"); // go to login after signup
    } catch (err) {
      alert("err");
      console.log("Register error:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>REGISTER PAGE</h2>

      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      /><br />

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

      <button onClick={handleRegister}>register</button>

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}