import { createContext, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice"; // ✅ Use setUser
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Check user state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
        console.log("🟢 User fetched:", data.user);
        dispatch(setUser(data.user)); // ✅ Save user in Redux
      } catch (error) {
        console.log("🔴 No authenticated user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ loading, user }}>
      {!loading ? children : (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="p-8">
          <h1 className="text-6xl font-extrabold text-purple-500">
            MEMORIES
          </h1>
        </div>
      </div>           
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
