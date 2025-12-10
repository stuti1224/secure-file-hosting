import React, { useState } from "react";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      alert("ok login");
      console.log("Login success:", res.data);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {
      alert("err");
      console.log("Login error:", err);
    }
  };

  return (
    <div>
      <h2>LOGIN PAGE</h2>

      <input type="email" placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/>

      <input type="password" placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/>

      <button onClick={handleLogin}>login</button>
    </div>
  );
}
