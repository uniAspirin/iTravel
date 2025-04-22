import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      console.log("Register successfully", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="rounded-xl shadow-2xl mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-200 px-5 py-5">
        <h1 className="text-2xl font-bold mb-8 mt-3 text-center">
          ✈️ Register for an account
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            className="w-full border border-gray-300 rounded focus:outline-none mb-4 px-2 py-1"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            className="w-full border border-gray-300 rounded focus:outline-none mb-4 px-2 py-1"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded focus:outline-none mb-4 px-2 py-1"
            type="email"
            id="email"
            name="email"
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
            className="w-full border border-gray-300 rounded focus:outline-none mb-4 px-2 py-1"
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold py-2 rounded-lg mt-3"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-500 hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
