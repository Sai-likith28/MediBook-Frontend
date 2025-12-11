import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewPatients: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await api.get('/admin/patients');
            setPatients(res.data);
        } catch (error) {
            toast.error('Failed to load patients');
        }
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
                </header>

                <div className="glass bg-white rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Age/Gender</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {patients.map((patient) => (
                                    <tr key={patient._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-brand-100 p-2 rounded-full text-brand-600">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-medium text-gray-800">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{patient.age} / {patient.gender}</td>
                                        <td className="px-6 py-4 text-gray-600">{patient.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {patients.length === 0 && <div className="p-8 text-center text-gray-500">No patients found.</div>}
                </div>
            </div>
        </div>
    );
};

export default ViewPatients;
