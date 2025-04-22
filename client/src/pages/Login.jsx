import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      login(res.data.token);
      console.log("Successfully login", res.data);
      navigate("/journey-plans");
    } catch (error) {
      console.error("Error login", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-100 border border-gray-200 shadow-2xl rounded-xl p-5">
        <h1 className="text-2xl font-bold mt-2 mb-8 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded focus:outline-none px-2 py-1 mb-3"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded focus:outline-none px-2 py-1 mb-8"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="w-full bg-blue-500 py-2 text-white hover:bg-blue-600 font-bold rounded-md">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Do not have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-500 hover:text-indigo-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
