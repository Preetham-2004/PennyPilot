import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import PennyPilotLogo from "./PennyPilotLogo";

const Navbar = ({ menuOpen, onMenuToggle }) => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="relative flex items-center justify-between gap-5
        bg-[#0F172A]/90 backdrop-blur-lg
        border border-blue-600/30
        rounded-b-2xl
        shadow-[0_8px_32px_0_rgba(15,23,42,0.7)] 
        ring-1 ring-blue-500/10
        sticky top-0 z-[100]
        px-8 py-4
        transition-all duration-500
        hover:shadow-blue-600/60
        hover:ring-blue-500/30"
    >
      {/* Menu Button */}
      <motion.button
        id="menu-btn"
        whileHover={{
          scale: 1.1,
          rotate: 2,
          boxShadow: "0px 0px 10px rgba(70, 128, 220, 0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-white p-3 rounded-full 
          bg-gradient-to-br from-blue-500 to-blue-700/80
          hover:from-blue-600 hover:to-blue-800/80
          transition-all duration-300"
        onClick={onMenuToggle}
      >
        {menuOpen ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </motion.button>

      {/* Logo */}
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
      >
        <PennyPilotLogo />
      </motion.div>

      {/* Glowing Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 blur-sm opacity-70"></div>
    </motion.div>
  );
};

export default Navbar;
