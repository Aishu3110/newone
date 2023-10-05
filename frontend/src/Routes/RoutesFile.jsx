import React from "react";
import { Routes, Route } from "react-router-dom";
import IncomeDashboard from "../Income/IncomeDashboard";
import ExpenseDashboard from "../Expense/ExpenseDashboard";
import Layout from "../Components/Layout/Layout";
import Login from "../Components/Login/Login";
import RegistrationForm from "../Components/RegistrationForm";

export default function RoutesFile() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/income" element={<IncomeDashboard />} />
      <Route path="/expense" element={<ExpenseDashboard />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
