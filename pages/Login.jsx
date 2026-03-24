import { useState, useContext } from "react";
import API from "../services/api"; // <-- corrected path
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      const token =
        res.data?.token ||
        res.data?.jwt ||
        res.data?.accessToken;

      if (!token) {
        alert("Login response did not include a token.");
        console.log("Login response payload:", res.data);
        return;
      }

      login(token); // stores token in AuthContext + localStorage
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err);
      console.log("Server response:", err.response);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
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
  );
}

export default Login;