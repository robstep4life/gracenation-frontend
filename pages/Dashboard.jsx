import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Grace Nation Admin Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;