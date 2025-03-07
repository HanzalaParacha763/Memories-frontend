import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar"; // Renamed from Navbar to Navbar

function App() {
  return (
    <Router>
      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Navbar (Fixed on the Left) */}
        <Navbar />

        {/* Page Content (Takes remaining space) */}
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
