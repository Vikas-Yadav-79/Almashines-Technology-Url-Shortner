import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; 
import { getURLAnalytics } from '../service/api';

Chart.register(...registerables);

const Analytics = () => {
    const { shortUrl } = useParams();
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getURLAnalytics(shortUrl);
                console.log('Analytics Data:', data);
                setAnalyticsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [shortUrl]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!analyticsData || !Array.isArray(analyticsData.clickDetails)) {
        return <div>No analytics data available.</div>;
    }

    const clickData = {
        labels: ['Total Clicks', 'Unique Clicks'],
        datasets: [
            {
                label: 'Clicks',
                data: [analyticsData.totalClicks, analyticsData.uniqueClicks],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderWidth: 1,
            },
        ],
    };

    const locationData = {};
    analyticsData.clickDetails.forEach(detail => {
        locationData[detail.location] = (locationData[detail.location] || 0) + 1;
    });

    const geoLabels = Object.keys(locationData);
    const geoData = Object.values(locationData);

    const locationChartData = {
        labels: geoLabels,
        datasets: [
            {
                label: 'Clicks by Location',
                data: geoData,
                backgroundColor: geoLabels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
            },
        ],
    };

    const timeData = {};
    analyticsData.clickDetails.forEach(detail => {
        const date = new Date(detail.timestamp).toLocaleDateString();
        timeData[date] = (timeData[date] || 0) + 1;
    });

    const timeLabels = Object.keys(timeData);
    const timeClicks = Object.values(timeData);

    const lineChartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'Clicks Over Time',
                data: timeClicks,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };
    return (
        <div>
            <h1>Analytics for {shortUrl}</h1>
            <br />
            <br />

            <div style={{ width: '50%', height: '400px' }}>
            <h3>Total and Unique Clicks</h3>

                <Bar data={clickData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <div style={{ width: '50%', height: '400px' }}>
                <h3>Clicks by Location</h3>
                <Pie data={locationChartData} options={{ responsive: true }} />
            </div>
            <div style={{ width: '50%', height: '400px' }}>
                <h3>Clicks Over Time</h3>
                <Line data={lineChartData} options={{ responsive: true }} size={100} />

            </div>

            <h3>Click Details:</h3>
            <ul>
                {analyticsData.clickDetails.map((detail, index) => (
                    <li key={index}>
                        IP: {detail.ip}, Location: {detail.location}, Time: {new Date(detail.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Analytics;
