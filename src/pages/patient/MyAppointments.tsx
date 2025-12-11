import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Calendar, User } from 'lucide-react';

const MyAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        fetchAppointments();
        // Refresh timer every minute
        const interval = setInterval(() => setAppointments(prev => [...prev]), 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchAppointments = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);

        try {
            const res = await api.get(`/patients/my-appointments/${user._id}`);
            setAppointments(res.data);
        } catch (error) {
            toast.error('Failed to load appointments');
        }
    };

    // Helper to get time text
    const getTimeRemaining = (dateStr: string, timeStr: string) => {
        const dateTime = new Date(`${dateStr.split('T')[0]}T${timeStr}`);
        const now = new Date();
        const diff = dateTime.getTime() - now.getTime();

        if (diff < 0) return { text: 'Started / Passed', color: 'bg-gray-100 text-gray-500' };

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        let color = 'bg-green-100 text-green-700';
        if (hours === 0 && minutes < 60) color = 'bg-yellow-100 text-yellow-700'; // < 1 hour
        if (hours === 0 && minutes < 10) color = 'bg-red-100 text-red-700 animate-pulse'; // < 10 mins

        return { text: `Starts in: ${hours}h ${minutes}m`, color };
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="patient" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.map((appt) => {
                        const timer = appt.status === 'CONFIRMED'
                            ? getTimeRemaining(appt.slotId?.date, appt.slotId?.time)
                            : null;

                        return (
                            <div key={appt._id} className="glass bg-white p-6 rounded-2xl border-l-4 border-brand-500 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{appt.doctorId?.name}</h3>
                                        <p className="text-brand-600 text-sm">{appt.doctorId?.specialization}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                appt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {appt.status}
                                        </span>
                                        {timer && (
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${timer.color}`}>
                                                {timer.text}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{new Date(appt.slotId?.date).toLocaleDateString()} at {appt.slotId?.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>{appt.doctorId?.clinicName}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {appointments.length === 0 && <p className="text-gray-500">You have no appointments yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default MyAppointments;
