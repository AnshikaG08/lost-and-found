import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>✨ Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
          <button>Login</button>
        </form>

        <p>New user? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;