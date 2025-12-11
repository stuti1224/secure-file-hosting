import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({ name, email, password });
      alert(res.data.message);  // <------- FIXED
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      <h2>REGISTER PAGE</h2>

      <form onSubmit={handleRegister}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <button type="submit">register</button>
      </form>

      <p>
        <Link to="/login">go to login</Link>
      </p>
    </div>
  );
}

export default Register;
