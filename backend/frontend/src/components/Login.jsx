import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
   const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post("http://localhost:5010/user/login", userInfo,{
        withCredentials: true,
      })
      toast.success("Login Successful! ");
      localStorage.setItem("messenger", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-96 space-y-4 border"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600">Messenger</h1>
        <h2 className="text-xl text-center text-blue-600">Login with your Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline cursor-pointer ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
