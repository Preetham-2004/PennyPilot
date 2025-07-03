import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => navigate(route);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="w-64 h-full bg-gradient-to-b from-[#1E293B] via-[#1E2A3C] to-[#334155] 
        border-r border-blue-900/30 p-5 sticky top-0 z-40 
        shadow-lg overflow-y-auto backdrop-blur-md"
    >
      {/* User Info with spacing */}
      <div className="pt-8 pb-6 px-2">
        <div className="flex flex-col items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="relative group"
          >
            {user?.profileImageUrl ? (
              <img
                src={user?.profileImageUrl || ""}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover 
                  shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName}
                width="w-24"
                height="h-24"
                style="text-2xl"
              />
            )}

            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r 
                from-blue-400 to-blue-600 blur-2xl scale-110 z-[-1]"
            />
          </motion.div>

          <motion.h5
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-200 font-semibold text-lg text-center"
          >
            {user?.fullName || "User"}
          </motion.h5>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        {SIDE_MENU_DATA.filter((item) => item.path !== "logout").map(
          (item, index) => {
            const isActive = activeMenu === item.label;

            return (
              <motion.button
                key={`menu_${index}`}
                onClick={() => handleClick(item.path)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                }}
                className={`flex items-center gap-4 py-3 px-5 rounded-xl transition-all duration-300 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-[#1E293B] text-gray-300 hover:bg-blue-600/10"
                  }`}
              >
                <item.icon
                  className={`text-2xl transition-transform ${
                    isActive ? "text-white scale-110" : "text-blue-400"
                  }`}
                />
                <span className="font-medium tracking-wide text-[1rem]">
                  {item.label}
                </span>
              </motion.button>
            );
          }
        )}
      </div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-10"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 4px 20px rgba(29, 78, 216, 0.4)",
          }}
          onClick={handleLogout}
          className="flex items-center justify-center w-full gap-3 py-3 px-5 rounded-xl 
            bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold 
            transition-all duration-300"
        >
          <span className="text-md">Logout</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SideMenu;
