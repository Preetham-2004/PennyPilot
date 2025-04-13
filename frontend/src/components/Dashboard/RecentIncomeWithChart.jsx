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
        className="p-6 rounded-2xl bg-[#0A1628]/95 border border-blue-400/10 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              variants={iconHover}
              whileHover="hover"
              className="p-3 bg-blue-800/30 rounded-xl shadow-lg cursor-pointer"
            >
              <PieChart className="h-7 w-7 text-blue-200" />
            </motion.div>
            <h5 className="text-xl font-bold text-white">Income Insights</h5>
            
            
          </div>
        </div>

        {/* Stat Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group p-4 rounded-2xl bg-blue-600/10 border border-blue-400/10 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  variants={iconHover}
                  whileHover="hover"
                  className="p-3 rounded-xl bg-blue-800 border border-blue-400/10"
                >
                  <stat.icon className="h-5 w-5 text-blue-400" />
                </motion.div>

                <div>
                  <h6 className="text-white">{stat.title}</h6>
                  <p className="text-xs text-blue-300/50">Income Source</p>
                </div>
              </div>
              <div className="mt-4 text-blue-300 font-semibold">${stat.amount.toLocaleString()}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          className="h-[330px] flex items-center justify-center mt-6"
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
