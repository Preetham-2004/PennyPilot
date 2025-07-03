import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  KeyRound,
  Mail,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Stars,
  Zap,
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Looks like your keyboard sneezed—try a real email! 🤧📧");
      return;
    }
    if (!password) {
      setError("Password, please! Or are you a mind reader? 🔮😆");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Oops! Something went wrong. Try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#312E81] relative overflow-hidden">
      {/* Floating background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, scale: 0.5 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating icons */}
      <motion.div
        variants={floatingIconVariants}
        animate="animate"
        className="absolute top-20 left-[15%] text-indigo-300/30"
      >
        <Stars className="w-12 h-12 sm:w-16 sm:h-16" />
      </motion.div>
      <motion.div
        variants={floatingIconVariants}
        animate="animate"
        className="absolute bottom-40 right-[20%] text-purple-300/30"
      >
        <Zap className="w-16 h-16 sm:w-20 sm:h-20" />
      </motion.div>

      <div className="min-h-screen w-full flex items-center justify-center px-4 z-10 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg"
        >
          <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(192,132,252,0.15)]" />

          <div className="relative p-6 sm:p-8 md:p-10">
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center mb-10"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="relative mb-6">
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-lg opacity-50"
                />
                <div className="relative p-4 bg-gradient-to-br from-violet-600/80 to-fuchsia-600/80 rounded-2xl backdrop-blur-xl border border-white/10">
                  <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent mb-2"
              >
                Welcome Back
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-indigo-200/80 text-center text-sm"
              >
                Your digital journey awaits ✨
              </motion.p>
            </motion.div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cosmic.user@galaxy.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 text-white placeholder:text-indigo-300/50"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your secret spell"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 text-white placeholder:text-indigo-300/50"
                  />
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-3 px-6 rounded-xl font-medium text-white overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#2563EB] group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/50 to-[#2563EB]/50 blur-xl group-hover:scale-110 transition-all duration-300" />
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <span>Enter the Matrix</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex justify-center text-sm gap-1"
              >
                <span className="text-indigo-200/80">New to the universe?</span>
                <Link
                  to="/signup"
                  className="relative font-medium text-blue-400 hover:text-blue-300 group"
                >
                  <span>Create Account</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
