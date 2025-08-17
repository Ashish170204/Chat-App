import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; 
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Use a consistent name for the password field
    const password = watch("password", "");

    // The validate function should compare the confirm password value with the password value
    const validatePasswordMatch = (value) => {
        return value === password || "Passwords do not match";
    };

   const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios.post("http://localhost:5010/user/signup", userInfo,{
        withCredentials: true,
    })
      .then((response) => {
          console.log("Signup successful");
           if (response.data) {
           toast.success("Signup Successful! ");
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) =>{
        if(error.response){
            toast.error("Error: " + error.response.data.error);
        }
      });
};
    return (
        <div className="flex h-screen items-center justify-center bg-slate-700">
            <form 
            onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-6 w-96 space-y-4 border">
                <h1 className="text-3xl font-bold text-center text-blue-600">Messenger</h1>
                <h2 className="text-xl text-center text-blue-600">Create a new Account</h2>

                {/* Full Name */}
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500 text-sm font-semibold">
                        This field is required
                    </span>
                )}

                {/* Email */}
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

                {/* Password (now with a consistent name: "password") */}
                <input
                    type="password"
                    placeholder="Create Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <span className="text-red-500 text-sm font-semibold">
                        This field is required
                    </span>
                )}

                {/* Confirm Password (now with a consistent name: "confirmPassword") */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("confirmPassword", {
                        required: "This field is required",
                        validate: validatePasswordMatch,
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm font-semibold">
                        {errors.confirmPassword.message}
                    </span>
                )}

                {/* Text and button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Sign Up
                </button>
                <p>
                    Have any Account?{" "}
                    {/* Use the Link component for navigation */}
                    <Link to="/login" className='text-blue-500 underline cursor-pointer ml-1'>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;