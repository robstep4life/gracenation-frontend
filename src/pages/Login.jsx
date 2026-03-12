import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("Login error:", error);
      console.log("Server response:", error.response);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo login-logo">
          GRACE NATION CHURCH INTERNATIONAL AKA LIBERATION CITY
        </div>

        <h2>Church Admin Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}