import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", data);
      console.log("Register successfully", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mt-5 rounded-xl border border-gray-200 px-5 py-5 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-3 mb-8 text-center text-2xl font-bold">
          ✈️ Register for an account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              className={`mb-1 w-full rounded border px-2 py-1 focus:outline-none ${errors.username ? "border-red-500 bg-red-50" : "border-gray-300"}`}
              id="username"
              type="text"
              {...register("username", {
                required: "Username cannot be empty",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 letters long",
                },
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="address"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              className={`mb-1 w-full rounded border px-2 py-1 focus:outline-none ${errors.address ? "border-red-500 bg-red-50" : "border-gray-300"}`}
              id="address"
              type="text"
              {...register("address", {
                required: "Address cannot be empty",
              })}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              className={`mb-1 w-full rounded border px-2 py-1 focus:outline-none ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"}`}
              type="email"
              id="email"
              {...register("email", {
                required: "Email must be valid",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              className={`mb-1 w-full rounded border px-2 py-1 focus:outline-none ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"}`}
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 letters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition duration-175 hover:bg-blue-600"
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
