import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered!");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🌸 Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
          <button>Register</button>
        </form>

        <p>Already have account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;