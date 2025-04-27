import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TravelLog from "./features/travelLog/TravelLog";
import JourneyPlan from "./features/journeyPlan/JourneyPlan";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={user ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="travel-logs"
              element={user ? <TravelLog /> : <Navigate to="/login" replace />}
            />
            <Route
              path="journey-plans"
              element={
                user ? <JourneyPlan /> : <Navigate to="/login" replace />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
