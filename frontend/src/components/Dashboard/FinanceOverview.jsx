import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD"];

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

const glowVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense }
  ];

  const statCards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      icon: Wallet,
      textColor: "text-blue-400"
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: DollarSign,
      textColor: "text-blue-300"
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: TrendingUp,
      textColor: "text-blue-200"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[640px] p-1 rounded-3xl shadow-lg"
    >
      <div className="relative">
        {/* Background glow effects */}
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

        <div className="relative bg-[#0A1628]/95 backdrop-blur-xl rounded-3xl border border-blue-500/10 shadow-2xl shadow-black/20">
          {/* Header Section */}
          <div className="p-6 border-b border-blue-500/10">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl border border-blue-500/10"
              >
                <PieChart className="h-6 w-6 text-blue-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-semibold text-blue-100">
                  Financial Summary
                </h2>
                <p className="text-sm text-blue-300/50">Your financial summary</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {statCards.map((stat) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="p-2 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-300">
                    <div className="flex items-center gap-1 sm:gap-3 mb-1 sm:mb-3">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-1 sm:p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.textColor}`} />
                      </motion.div>
                      <span className="text-[10px] sm:text-sm text-blue-200/70">{stat.title}</span>
                    </div>
                    <div className={`text-xs sm:text-lg font-semibold ${stat.textColor}`}>
                      ${stat.amount.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pie Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white/[0.02] rounded-2xl border border-white/[0.05] p-4 sm:p-6"
            >
              <div className="h-[240px] sm:h-[330px] flex items-center justify-center">
                <CustomPieChart
                  data={balanceData}
                  label="Total Balance"
                  totalAmount={`$${totalBalance.toLocaleString()}`}
                  colors={COLORS}
                  showTextAnchor
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 text-[10px] sm:text-sm">
                {balanceData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-1 sm:gap-2">
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-blue-200/60">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceOverview;
