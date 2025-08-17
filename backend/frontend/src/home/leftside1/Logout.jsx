import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

     const handleLogout = async () => {
    setLoading(true);
    try {
       const res = await axios.post("http://localhost:5010/user/logout", {}, {
        withCredentials: true,
        });
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      // window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error in logging out");
    }
  };


  return (
      <div className="w-[4%] bg-slate-900 text-gray-300 flex flex-col justify-end">
        <div className="p-3 align-bottom">
          <button>
            <BiLogOutCircle className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" 
            onClick={handleLogout}
            />
          </button>
        </div>
      </div>
  )
}

export default Logout;
