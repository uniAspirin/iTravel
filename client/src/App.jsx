import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TravelLog from "./pages/TravelLog";
import JourneyPlan from "./pages/JourneyPlan";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="travel-logs"
            element={user ? <TravelLog /> : <Login />}
          />
          <Route
            path="journey-plans"
            element={user ? <JourneyPlan /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
