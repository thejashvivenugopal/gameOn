import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../../styles/userStats/UserStats.css'; // Import the CSS file for styles

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data
// const servicesData = [
//   {
//     serviceName: 'Court A',
//     usageData: [12, 19, 3, 5, 2, 3, 8, 10, 15, 20, 18, 5, 4, 6, 10, 15, 25, 30, 40, 22, 15, 10, 8, 5],
//   },
//   {
//     serviceName: 'Court B',
//     usageData: [5, 10, 12, 18, 20, 25, 30, 35, 40, 45, 40, 30, 25, 20, 18, 10, 8, 6, 5, 3, 2, 1, 0, 2],
//   },
// ];


interface UserStatsResponse {
  serviceName: string;
  usageData: number[];
}



export default function UserStats() {
  const [servicesData, setServicesData] = useState<UserStatsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Labels for hours of the day
  const getDaysInMonth = (month: number, year: number): string[] => {
    const days = new Date(year, month, 0).getDate(); // Get the number of days in the month
    return Array.from({ length: days }, (_, i) => `${i + 1}`); // Create an array of day labels (1, 2, ..., days)
  };

  const today = new Date();
  const labels = getDaysInMonth(today.getMonth() + 1, today.getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId: any = localStorage.getItem('userHashId');
        const response = await fetch('http://localhost:3002/userstats', {
          headers: {
            'Content-Type': 'application/json',
            'id': userId,
            'Authorization' :`Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: UserStatsResponse[] = await response.json();
        setServicesData(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setServicesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(servicesData);
  }, []);
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Statistics</h1>
      <div className="charts-container">
        {servicesData.map((service, index) => (
          <div key={index} className="chart-card">
            <h3 className="chart-title">{service.serviceName}</h3>
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: `${service.serviceName} - Users per day`,
                    data: service.usageData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Day of the Month',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Users',
                    },
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
