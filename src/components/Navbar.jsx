import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { FaUser, FaHome, FaSearch, FaVideo, FaEnvelope, FaBell, FaPlus } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <aside className="h-screen w-72 bg-purple-500 text-white flex flex-col p-6">
            {/* Sidebar Logo */}
            <h1 className="text-5xl font-semibold pb-12">Memories</h1>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-8 flex-1 text-xl">
                <Link to="/" className="flex items-center gap-3">
                    <FaHome className="w-8" /> Home
                </Link>
                <Link to="/search" className="flex items-center gap-3">
                    <FaSearch className="w-8" /> Search
                </Link>
                <Link to="/videos" className="flex items-center gap-3">
                    <FaVideo className="w-8" /> Videos
                </Link>
                <Link to="/messages" className="flex items-center gap-3">
                    <FaEnvelope className="w-8" /> Messages
                </Link>
                <Link to="/notifications" className="flex items-center gap-3">
                    <FaBell className="w-8" /> Notifications
                </Link>
                <Link to="/create" className="flex items-center gap-3">
                    <FaPlus className="w-8" /> Create
                </Link>

                {/* Profile Link */}
                <Link to="/profile" className="flex items-center gap-3">
                    {user && user.profilePic ? (
                        <img 
                            src={user.profilePic} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <FaUser className="w-8" />
                    )}
                    Profile
                </Link>
            </nav>

            {/* Profile & Logout Button at Bottom */}
            <div className="mt-auto flex flex-col gap-2">
                {user && (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white w-full">
                        Logout
                    </button>
                )}
            </div>
        </aside>
    );
};

export default Navbar;
