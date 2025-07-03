import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, CreditCard } from "lucide-react";

const AuthLayout = ({ children }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#111] text-white overflow-hidden">
      {/* Left Panel - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-3/5 lg:w-[55%] p-8"
      >
        <div className="relative flex flex-col justify-center items-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PennyPilot
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-[420px] mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Stats & Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-2/5 lg:w-[45%] bg-[#5F9EA0] p-8 flex-col justify-center items-center"
      >
        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-[380px] p-6 rounded-2xl bg-[#222] border border-gray-700 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="text-white text-lg font-semibold">
                Track Your Finances
              </h3>
              <p className="text-gray-400 text-sm">Real-time monitoring</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Monthly Income</span>
              <span className="text-white font-semibold">$12,750</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ delay: 1, duration: 1 }}
                className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Credit Card with Flip Animation */}
        <motion.div
          className="relative w-full max-w-[380px] aspect-[1.6/1] mt-8 cursor-pointer"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="w-full h-full rounded-2xl shadow-2xl overflow-hidden relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
              transition: "transform 0.6s",
            }}
          >
            {/* Front Side */}
            <div
              className="absolute w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-gray-800 to-gray-600 text-white rounded-2xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="flex justify-between items-start">
                <CreditCard className="h-8 w-8 text-white" />
                <span className="font-bold text-xl">PennyPilot</span>
              </div>
              <p className="text-lg tracking-widest">**** **** **** 4242</p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-400">Card Holder</p>
                  <p className="font-medium">Mark Cummins</p>
                </div>
                <div>
                  <p className="text-gray-400">Expires</p>
                  <p className="font-medium">12/25</p>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute w-full h-full flex flex-col justify-center items-center p-6 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-lg font-semibold">PennyPilot Rewards</p>
              <p className="text-sm mt-2">Membership ID: 1234-5678</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
