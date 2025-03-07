import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = () => {
    window.open("http://localhost:5000/api/auth/google", "_self"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.payload?.user) navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-lg shadow-md transition duration-300">
        <h2 className="text-3xl font-bold mb-4 text-center text-purple-500">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-200 shadow-md"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md w-full shadow-md hover:bg-gray-100 transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Sign in with Google</span>
          </button>
          <p className="text-center text-gray-600">
            Don't have an account? 
            <a href="/signup" className="text-purple-500 hover:underline"> Sign up!</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
