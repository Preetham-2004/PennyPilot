import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Calendar } from 'lucide-react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

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
      type: 'spring',
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
      ease: 'easeInOut'
    }
  }
};

const Last30DaysExpense = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(prepareExpenseBarChartData(data));
    } else {
      setChartData([]);
    }
  }, [data]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full sm:w-full md:w-[640px] h-auto md:h-[590px] p-1 rounded-3xl shadow-lg"
    >
      <div className="relative h-full">
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -top-20 -left-20 w-32 h-32 sm:w-40 sm:h-40 bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -right-20 w-32 h-32 sm:w-40 sm:h-40 bg-blue-800/20 rounded-full blur-3xl"
        />

        <div className="relative h-full bg-[#0A1628]/95 backdrop-blur-xl rounded-3xl border border-blue-500/10 shadow-2xl shadow-black/20">
          <div className="p-4 sm:p-6 border-b border-blue-500/10">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="p-2 sm:p-3 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl border border-blue-500/10"
              >
                <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </motion.div>
              <div>
                <h2 className="text-base sm:text-xl font-semibold text-blue-100">
                  This Month's Expenses
                </h2>
                <p className="text-xs sm:text-sm text-blue-300/50">Track your spending activity</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 h-auto md:h-[80%]">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 w-fit px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] text-blue-400 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">30 Days</span>
            </motion.div>

            {chartData.length > 0 ? (
              <motion.div
                variants={itemVariants}
                className="bg-white/[0.02] rounded-2xl border border-white/[0.05] p-4 sm:p-6 h-[300px] sm:h-[340px]"
              >
                <div className="h-full flex items-center justify-center">
                  <CustomBarChart data={chartData} />
                </div>
                <div className="mt-2 text-center text-xs sm:text-sm text-blue-300/50">
                  Expenses over the past month
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center h-[280px] px-4"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-lg"
                >
                  <BarChart2 className="h-6 w-6 text-blue-400" />
                </motion.div>
                <p className="text-blue-300/50 text-sm mt-3 text-center">
                  No data available for the last 30 days
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Last30DaysExpense;
