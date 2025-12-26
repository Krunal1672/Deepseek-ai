import { Eye } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // stop page refresh
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/v1/user/signup",
        formData,
        { withCredentials: true }
      );

      toast.success(data?.message || "Signup successful ");
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.errors ||
        error?.response?.data?.message ||
        "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-center">Signup</h1>

        <form onSubmit={handleSignup}>
          <div className="mb-4 mt-2">
            <input
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handelChange}
            />
          </div>

          <div className="mb-4 mt-2">
            <input
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handelChange}
            />
          </div>

          <div className="mb-4 mt-2">
            <input
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handelChange}
            />
          </div>

          <div className="mb-4 mt-2 relative">
            <input
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handelChange}
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <Eye size={18} />
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-4 mb-6">
            By signing up you agree to the Terms & Privacy Policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Signing..." : "Sign Up"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <span>Already have an account?</span>
          <Link className="text-[#7a6ff6]" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
