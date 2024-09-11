// Dashboard.tsx
"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJSBase,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

import ApexChart from './candle'; // For chart

// Register necessary components for line, bar, and pie charts
ChartJSBase.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// Define types for line, bar, and pie charts
interface ChartData {
  labels: string[];
  data: number[];
}

// Define types for candlestick chart
interface CandlestickItem {
  x: string; // Date in string format
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
}

interface DashboardData {
  lineChartData: ChartData | null;
  barChartData: ChartData | null;
  pieChartData: ChartData | null;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    lineChartData: null,
    barChartData: null,
    pieChartData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lineRes, barRes, pieRes, candleRes] = await Promise.all([
          axios.get<ChartData>('http://localhost:8000/api/line-chart-data/'),
          axios.get<ChartData>('http://localhost:8000/api/bar-chart-data/'),
          axios.get<ChartData>('http://localhost:8000/api/pie-chart-data/'),
          axios.get<{ candlestick: CandlestickItem[] }>('http://localhost:8000/api/candlestick-data/')
        ]);

        setData({
          lineChartData: lineRes.data,
          barChartData: barRes.data,
          pieChartData: pieRes.data,
        });

        // Extract the candlestick data from the nested structure
        setCandlestickData(candleRes.data.candlestick);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const [candlestickData, setCandlestickData] = useState<CandlestickItem[]>([]);

  // Allocates data in respective chart
  const { lineChartData, barChartData, pieChartData } = data;

  // Prepare data for the charts
  const lineData = {
    labels: lineChartData?.labels || [],
    datasets: [{
      label: 'Line Chart',
      data: lineChartData?.data || [],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: 'rgba(75,192,192,1)',
    }]
  };

  const barData = {
    labels: barChartData?.labels || [],
    datasets: [{
      label: 'Bar Chart',
      data: barChartData?.data || [],
      backgroundColor: 'rgba(153,102,255,0.2)',
      borderColor: 'rgba(153,102,255,1)',
    }]
  };

  const pieData = {
    labels: pieChartData?.labels || [],
    datasets: [{
      label: 'Pie Chart',
      data: pieChartData?.data || [],
      backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)', 'rgba(75,192,192,0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(75,192,192,1)'],
    }]
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-700">
      <h1 className="text-2xl font-bold mb-8 text-white">Dashboard Data</h1>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Line Chart</h2>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <Line data={lineData} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Bar Chart</h2>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <Bar data={barData} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Pie Chart</h2>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <Pie data={pieData} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Candlestick Chart</h2>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <ApexChart candlestickData={candlestickData} />
          </div>
        </section>
        <Link href="/" passHref>
          <span className="inline-block px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:bg-white hover:text-black hover:outline-1 transition-colors cursor-pointer">
            Back
          </span>
        </Link>
      </div>
    </main>
  );
}
