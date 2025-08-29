import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserPanel from "./pages/user/UserPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import ForgotPassword from "./pages/admin/ForgotPassword";

import ResetPasswordOTP from "./pages/admin/ResetPasswordOTP";
import ResetPasswordForm from "./pages/admin/ResetPasswordForm";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserPanel />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}
          <Route path="/admin/forgetpassword" element={<ForgotPassword />} />

          <Route path="/admin/reset-password" element={<ResetPasswordOTP />} />
          <Route
            path="/admin/reset-password-form"
            element={<ResetPasswordForm />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
