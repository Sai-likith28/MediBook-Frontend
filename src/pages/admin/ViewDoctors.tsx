import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Stethoscope, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewDoctors: React.FC = () => {
    const [doctors, setDoctors] = useState<any[]>([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await api.get('/admin/doctors');
            setDoctors(res.data);
        } catch (error) {
            toast.error('Failed to load doctors');
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await api.delete(`/admin/doctors/${id}`);
            toast.success(`Doctor ${currentStatus ? 'Deactivated' : 'Activated'}`);
            fetchDoctors();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
                    <Link
                        to="/admin/create-doctor"
                        className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/30 transition-all"
                    >
                        <Plus size={20} />
                        Add Doctor
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div key={doctor._id} className="glass bg-white p-6 rounded-2xl flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div className="bg-brand-100 p-3 rounded-xl text-brand-600">
                                    <Stethoscope size={24} />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${doctor.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {doctor.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                                <p className="text-brand-600 font-medium">{doctor.specialization}</p>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>🎓 {doctor.qualification}</p>
                                <p>🏥 {doctor.clinicName}</p>
                                <p>⭐ {doctor.experience} years exp.</p>
                            </div>

                            <button
                                onClick={() => toggleStatus(doctor._id, doctor.isActive)}
                                className={`w-full py-2 rounded-xl text-sm font-semibold transition ${doctor.isActive
                                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                    }`}
                            >
                                {doctor.isActive ? 'Remove (Soft Delete)' : 'Re-Activate'}
                            </button>
                        </div>
                    ))}
                </div>
                {doctors.length === 0 && <div className="text-center text-gray-500 mt-12">No doctors found.</div>}
            </div>
        </div>
    );
};

export default ViewDoctors;
