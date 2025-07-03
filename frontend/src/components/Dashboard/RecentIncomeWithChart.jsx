import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, PieChart } from "lucide-react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#1E3A8A", "#3B82F6", "#60A5FA", "#93C5FD"];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.15,
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
      damping: 10,
      stiffness: 100,
    },
  },
};

const iconHover = {
  hover: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  const statCards = data?.map((item, index) => ({
    title: item?.source,
    amount: item?.amount,
    icon: index % 2 === 0 ? DollarSign : TrendingUp,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[620px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#0A1628]/95 border border-blue-400/10 shadow-xl"
      >
        {/* Header - Compact for mobile */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div
              variants={iconHover}
              whileHover="hover"
              className="p-2 md:p-3 bg-blue-800/30 rounded-lg md:rounded-xl shadow-lg cursor-pointer"
            >
              <PieChart className="h-5 w-5 md:h-7 md:w-7 text-blue-200" />
            </motion.div>
            <h5 className="text-lg md:text-xl font-bold text-white">Income Insights</h5>
          </div>
        </div>

        {/* Stat Cards - Horizontal scroll on mobile */}
        <motion.div
          className="overflow-x-auto md:overflow-visible pb-2" // Added pb-2 for scrollbar space
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 w-max md:w-full">
            {statCards?.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[180px] md:min-w-0 group p-3 md:p-4 rounded-xl md:rounded-2xl bg-blue-600/10 border border-blue-400/10 cursor-pointer"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.div
                    variants={iconHover}
                    whileHover="hover"
                    className="p-2 md:p-3 rounded-lg md:rounded-xl bg-blue-800 border border-blue-400/10"
                  >
                    <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                  </motion.div>

                  <div>
                    <h6 className="text-sm md:text-base text-white truncate">{stat.title}</h6>
                    <p className="text-xs text-blue-300/50 hidden md:block">Income Source</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 text-sm md:text-base text-blue-300 font-semibold">
                  ${stat.amount.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pie Chart - Slightly smaller on mobile */}
        <motion.div
          variants={itemVariants}
          className="h-[280px] md:h-[330px] flex items-center justify-center mt-4 md:mt-6"
        >
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome.toLocaleString()}`}
            colors={COLORS}
            showTextAnchor
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecentIncomeWithChart;