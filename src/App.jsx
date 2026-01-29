import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      // Safely decode the token payload (middle part of the JWT)
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      role = payload.role;
    } catch (e) {
      console.error("Failed to decode token:", e);
      localStorage.removeItem("token"); // Clear bad token
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={token && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user"
        element={token && role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
