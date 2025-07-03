import React from "react";
import { ArrowRight, TrendingDown, Clock } from "lucide-react";
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const glowVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ExpenseTransactions = ({ transactions = [], onSeeMore, background = "bg-[#0A1628]/95" }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[90vw] sm:max-w-full md:w-[90%] lg:w-[640px] mx-auto"
    >
      <div className="relative">
        {/* Dynamic Glow Effects */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-800/20 rounded-full blur-3xl"
        />

        {/* Main Card with Dynamic Background */}
        <div className={`relative ${background} backdrop-blur-xl rounded-3xl border border-blue-500/10 shadow-2xl shadow-black/20`}>
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-blue-500/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl border border-blue-500/10"
                >
                  <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-blue-100">
                    Expense Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-300/50">Recent expenses</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeeMore}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-blue-500/10 group transition-all duration-300 w-fit self-end sm:self-auto"
              >
                <span className="text-xs sm:text-sm text-blue-400 font-medium">View All</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Transactions */}
          <div className="p-4 sm:p-6">
            {transactions && transactions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {transactions.slice(0, 6).map((expense) => (
                  <motion.div
                    key={expense._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group relative bg-white/[0.02] border border-blue-500/10 hover:border-blue-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col justify-between h-[120px] sm:h-[140px]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-md sm:rounded-lg border border-blue-500/10 text-blue-400">
                        <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                      <div>
                        <h6 className="text-sm font-semibold text-blue-100 truncate">
                          {expense.category || "Transaction"}
                        </h6>
                        <p className="text-xs text-blue-300/50">
                          {moment(expense.date).format("MMM Do, YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="text-center border border-blue-400 text-blue-400 rounded-md sm:rounded-lg py-1 text-xs sm:text-sm font-medium">
                      {expense.amount >= 0 ? `+$${expense.amount}` : `-$${Math.abs(expense.amount)}`}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 sm:py-12 text-blue-300/50"
              >
                <TrendingDown className="h-8 w-8 sm:h-12 sm:w-12 mb-3 sm:mb-4" />
                <p className="text-center text-xs sm:text-sm">No expenses found</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseTransactions;