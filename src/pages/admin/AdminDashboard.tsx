import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalBookings: 0,
        confirmedCount: 0,
        pendingCount: 0,
        failedCount: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass bg-white p-6 rounded-2xl">
                        <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
                        <p className="text-3xl font-bold text-brand-600 mt-2">{stats.totalPatients}</p>
                    </div>
                    <div className="glass bg-white p-6 rounded-2xl">
                        <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
                        <p className="text-3xl font-bold text-brand-600 mt-2">{stats.totalDoctors}</p>
                    </div>
                    <div className="glass bg-white p-6 rounded-2xl">
                        <h3 className="text-gray-500 text-sm font-medium">Total Appointments</h3>
                        <p className="text-3xl font-bold text-brand-600 mt-2">{stats.totalBookings}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="glass bg-white p-6 rounded-2xl border-l-4 border-yellow-400">
                        <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
                        <p className="text-2xl font-bold text-gray-700 mt-2">{stats.pendingCount}</p>
                    </div>
                    <div className="glass bg-white p-6 rounded-2xl border-l-4 border-green-500">
                        <h3 className="text-gray-500 text-sm font-medium">Confirmed</h3>
                        <p className="text-2xl font-bold text-gray-700 mt-2">{stats.confirmedCount}</p>
                    </div>
                    <div className="glass bg-white p-6 rounded-2xl border-l-4 border-red-400">
                        <h3 className="text-gray-500 text-sm font-medium">Failed/Cancelled</h3>
                        <p className="text-2xl font-bold text-gray-700 mt-2">{stats.failedCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
