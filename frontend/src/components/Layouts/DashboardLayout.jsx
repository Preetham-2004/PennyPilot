import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative transition-colors duration-300 overflow-hidden bg-[#0A1628] text-gray-200 dark:text-gray-300">
      {/* Pure Dark Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0C0C0C] to-[#050505]" />
      </div>

      {/* Navbar */}
      <Navbar
  activeMenu={activeMenu}
  menuOpen={menuOpen}
  onMenuToggle={() => setMenuOpen(!menuOpen)}
/>


      {user ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Mobile Side Menu with Backdrop */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                  onClick={() => setMenuOpen(false)}
                />

                {/* Side Menu */}
                <motion.div
                  key="sidemenu"
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -250, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="fixed inset-y-0 left-0 z-50 w-64 bg-[#1E1A2F] shadow-lg shadow-purple-900/40 border-r border-purple-900/20 backdrop-blur-xl md:hidden"
                >
                  <SideMenu activeMenu={activeMenu} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Side Menu */}
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="w-64 bg-[#1E1A2F] shadow-lg shadow-purple-900/40 border-r border-purple-900/20 backdrop-blur-xl">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg">
          Loading user data...
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
