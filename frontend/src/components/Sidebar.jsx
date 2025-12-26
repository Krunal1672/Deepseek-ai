import { LogOut, X } from 'lucide-react'
import React, {  } from 'react'
import profile from "../assets/user.png"
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const  Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [,setAuthUser]=useAuth();
  const navigate = useNavigate();
  const handelLogout = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:4001/api/v1/user/logout",
        { withCredentials: true }
      )

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success(data.message || "Logout successful ");

      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed ");
    }
  }
  return ( 
    <div className="h-full flex flex-col justify-between p-4">
        {/* Header */}
        <div className="flex border-b border-gray-600 p-2 justify-between items-center mb-4">
          <div className="text-2xl font-bold text-gray-200">Deepseek</div>
          <button >
            <X className="w-6 h-6 text-gray-400 " />
          </button>
        </div>

         {/* History */}
         <div className=" flex-1 overflow-y-auto px-4 py-3 space-y-2">
          <button className=" w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4">
            + New Chat
          </button>
          <div className=" text-gray-500 text-sm mt-20 text-center">
            No chat history yet
          </div>
        </div>

          {/* Footer */}
        <div className="p-4 border-t border-gray-700">
            <div className="flex flex-col gap-3">
                <div className='flex  items-center gap-2 cursor-pointer '>
                    <img  className="rounded-full w-8 h-8" 
                          src={profile} 
                          alt="" />
                    <span className="text-gray-300 font-bold">{user ? user.firstName : "My Profile"}</span>
                </div>
                <button 
                      onClick={handelLogout}
                      className=" flex items-center text-sm gap-2 text-white px-4 py-2 
                      rounded-lg hover:bg-gray-700 duration-300 transition">
                      <LogOut className=''/>
                      Logout 
                </button>
            </div>
        </div>
 
    </div>
  ) 
}

export default Sidebar