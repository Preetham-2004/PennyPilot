import React from "react";
import { ArrowRight, TrendingUp, TrendingDown, Clock } from "lucide-react";
import moment from "moment";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[800px] lg:w-[640px]"
    >
      <div className="relative">
        {/* Optional glow effects */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-800/20 rounded-full blur-3xl"
        />

        {/* Card container with dynamic height */}
        <div className="relative bg-[#0A1628]/95 backdrop-blur-xl rounded-3xl border border-blue-500/10 shadow-2xl shadow-black/20 w-full p-4 sm:p-6">
          {/* Header */}
          <div className="pb-4 border-b border-blue-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl border border-blue-500/10"
                >
                  <Clock className="h-6 w-6 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-100">
                    Recent Transactions
                  </h2>
                  <p className="text-sm text-blue-300/50">
                    Latest transaction records
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeeMore}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] group transition-all duration-300"
              >
                <span className="text-blue-400 text-sm font-medium">View All</span>
                <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Transactions */}
          <div className="pt-4">
            {transactions && transactions.length > 0 ? (
              <>
                {/* Mobile View - Grid Layout */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:hidden">
                  {transactions.slice(0, 6).map((transaction) => (
                    <motion.div
                      key={transaction._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <div className="relative flex flex-col justify-between h-full p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08]">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] ${
                              transaction.type === "income"
                                ? "text-blue-400"
                                : "text-blue-200"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-blue-100 truncate">
                              {transaction.source || "Transaction"}
                            </span>
                            <span className="text-[11px] text-blue-300/50">
                              {moment(transaction.date).format("MMM Do, YYYY")}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`mt-auto px-2 py-1 rounded-lg font-semibold text-center text-sm border ${
                            transaction.type === "income"
                              ? "text-blue-400"
                              : "text-blue-200"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View - List Layout */}
                <div className="hidden md:block space-y-3">
                  {transactions.slice(0, 6).map((transaction) => (
                    <motion.div
                      key={transaction._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <div className="relative flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08]">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] ${
                              transaction.type === "income"
                                ? "text-blue-400"
                                : "text-blue-200"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <TrendingUp className="h-5 w-5" />
                            ) : (
                              <TrendingDown className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold text-blue-100">
                              {transaction.source || "Transaction"}
                            </span>
                            <span className="text-sm text-blue-300/50">
                              {moment(transaction.date).format("MMM Do, YYYY")}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`text-lg font-semibold ${
                            transaction.type === "income"
                              ? "text-blue-400"
                              : "text-blue-200"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-12 text-blue-300/50"
              >
                <Clock className="h-12 w-12 mb-4" />
                <p className="text-center text-sm">No transactions found</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;