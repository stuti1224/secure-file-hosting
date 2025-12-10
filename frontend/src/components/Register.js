import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({ name, email, password });
      alert(response.message); // show success message
      navigate("/"); // redirect to login
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "100px" }}>
      <h1>REGISTER PAGE</h1>
      <form onSubmit={handleRegister}>
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} /><br/><br/>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/><br/>
        <button type="submit">register</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br/>
      <Link to="/">go to login</Link>
    </div>
  );
}
