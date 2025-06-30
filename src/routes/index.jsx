import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Library from "../pages/Library/Library.jsx";
import CreateAccountForm from "../components/Login/CreateAccount";
import ForgotPasswordForm from "../components/Login/ForgotPasswordForm";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Tryforfree from "../pages/Tryforfree.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/try_speechify" element={<Tryforfree />} />
      <Route path="/login" element={<Login />} />
      <Route path="/library" element={<Library />} />
      <Route path="/create-account" element={<CreateAccountForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
