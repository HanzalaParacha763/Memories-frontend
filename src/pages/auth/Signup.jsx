import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [formDataSignup, setFormDataSignup] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleGoogleSignup = () => {
    window.open("http://localhost:5000/api/auth/google", "_self"); 
  };

  const handleChange = (e) => {
    setFormDataSignup({ ...formDataSignup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formDataSignup));
    if (result.payload?.user) navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md transition duration-300 space-y-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-purple-500">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formDataSignup.username}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formDataSignup.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formDataSignup.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200 shadow-md"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md w-full shadow-md hover:bg-gray-100 transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Sign up with Google</span>
          </button>
          <p className="text-center text-gray-600">
            Already have an account? 
            <a href="/login" className="text-purple-500 hover:underline"> Login!</a>
          </p>
      </div>
    </div>
  );
};

export default Signup;
