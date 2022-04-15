import "./App.css";
import SideBar from "./components/SideBar2/SideBar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useState } from "react";
import AddTransactionCard from "./components/Expenses/AddTransactionCard";
import Form from "./components/Expenses/AddTransactionCard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import Incomes from "./pages/Incomes";
import Logout from "./components/Logout";
import Categories from "./pages/Categories"

function App() {
  console.log(process.env)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
