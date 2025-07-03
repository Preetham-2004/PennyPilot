import React from "react";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import moment from "moment";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[800px] lg:w-[640px]"
    >
      <div className="relative">
        {/* Background glow effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"
        />

        <div className="relative bg-[#0A1628] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/20">
          {/* Header Section - Made more compact for mobile */}
          <div className="p-4 md:p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="p-2 md:p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg md:rounded-xl border border-white/10"
                >
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-lg md:text-xl text-white font-semibold">
                    Recent Income
                  </h2>
                  <p className="text-xs md:text-sm text-white/60">
                    Latest income records
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeeMore}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-white/10 group transition-all duration-300"
              >
                <span className="text-xs md:text-sm text-blue-400 font-medium">
                  View All
                </span>
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Transactions List - Compact mobile cards */}
          <div className="p-4 md:p-6">
            {transactions && transactions.length > 0 ? (
              <div className="flex flex-col gap-3 md:gap-4">
                {transactions.slice(0, 5).map((income) => (
                  <motion.div
                    key={income._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="group relative"
                  >
                    <div className="relative flex items-center justify-between p-3 md:p-5 rounded-xl md:rounded-2xl bg-transparent border border-white/5 hover:bg-blue-100/1 hover:border-white/10 transition-all duration-300">
                      <div className="flex items-center gap-2 md:gap-3">
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-400 border border-white/10"
                        >
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                        </motion.div>
                        <div>
                          <h6 className="text-sm md:text-base font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                            {income.source || "Income"}
                          </h6>
                          <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                            <Clock className="h-3 w-3 md:h-4 md:w-4 text-white/60" />
                            <p className="text-xs md:text-sm text-white/60">
                              {moment(income.date).format("MMM Do, YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 md:px-5 md:py-2 rounded-lg md:rounded-xl font-medium bg-blue-500/10 text-blue-400 border border-white/10"
                      >
                        <span className="text-xs md:text-sm">+ ${income.amount}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 md:py-12 text-white/60"
              >
                <TrendingUp className="h-8 w-8 md:h-12 md:w-12 mb-3 md:mb-4" />
                <p className="text-center text-xs md:text-sm">
                  No income records found
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentIncome;