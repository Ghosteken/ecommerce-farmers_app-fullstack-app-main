"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const CropAnalysis = () => {
  const [cropData, setCropData] = useState([
    { name: "Tomatoes", sold: 120, revenue: 2400 },
    { name: "Onions", sold: 95, revenue: 1800 },
    { name: "Maize", sold: 80, revenue: 1600 },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredData = cropData.filter((crop) => {
    if (filter === "all") return true;
    return filter === "high" ? crop.sold >= 100 : crop.sold < 100;
  });

  const chartData = {
    labels: filteredData.map((crop) => crop.name),
    datasets: [
      {
        label: "Crops Sold",
        data: filteredData.map((crop) => crop.sold),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Crop Prediction & Analysis</h1>
      <p className="mt-2">Best crops to sell based on demand and sales trends.</p>

      {/* Filter Options */}
      <div className="mt-4 flex space-x-4">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>All Crops</button>
        <button onClick={() => setFilter("high")} className={`px-4 py-2 rounded ${filter === "high" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>High Sales</button>
        <button onClick={() => setFilter("low")} className={`px-4 py-2 rounded ${filter === "low" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Low Sales</button>
      </div>

      {/* Sales Chart */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
        <Bar data={chartData} />
      </div>

      {/* Detailed Table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Detailed Sales Data</h2>
        <table className="w-full mt-2 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Crop</th>
              <th className="border p-2">Units Sold</th>
              <th className="border p-2">Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((crop, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{crop.name}</td>
                <td className="border p-2">{crop.sold}</td>
                <td className="border p-2">${crop.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropAnalysis;
