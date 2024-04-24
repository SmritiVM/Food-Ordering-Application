import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);

      const response = await axios.post(
        "http://localhost:4000/plateform/login",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      console.log("Data", data);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Could not log in");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="link">
        <a onClick={() => {
            navigate("/register")
          }}>Do not have an account? Sign Up right now!!</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
