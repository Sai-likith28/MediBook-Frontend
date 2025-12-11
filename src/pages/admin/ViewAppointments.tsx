import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get('/admin/appointments');
            setAppointments(res.data);
        } catch (error) {
            toast.error('Failed to load appointments');
        }
    };

    const handleCancel = async (id: string) => {
        try {
            await api.patch(`/admin/appointments/cancel/${id}`);
            toast.success('Appointment Cancelled');
            fetchAppointments();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to cancel');
        }
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">All Appointments</h1>
                </header>

                <div className="glass bg-white rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Doctor</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date/Time</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments.map((appt) => (
                                <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{appt.patientId?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-gray-600">{appt.doctorId?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {appt.slotId?.date ? new Date(appt.slotId.date).toLocaleDateString() : 'N/A'} at {appt.slotId?.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                appt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {appt.status !== 'FAILED' && (
                                            <button
                                                onClick={() => handleCancel(appt._id)}
                                                className="text-red-500 hover:text-red-700 text-xs font-bold underline"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {appointments.length === 0 && <div className="p-8 text-center text-gray-500">No appointments found.</div>}
                </div>
            </div>
        </div>
    );
};

export default ViewAppointments;
