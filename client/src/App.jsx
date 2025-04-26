import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    </QueryClientProvider>
  );
}
