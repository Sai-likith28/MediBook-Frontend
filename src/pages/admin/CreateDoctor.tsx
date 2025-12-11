import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CreateDoctor: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        email: '',
        qualification: '',
        experience: '',
        clinicName: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/admin/doctors', {
                ...formData,
                experience: Number(formData.experience)
            });
            toast.success('Doctor Created Successfully');
            navigate('/admin/doctors');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create doctor');
        }
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Doctor</h1>
                </header>

                <div className="glass bg-white p-8 rounded-2xl max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                                <input name="name" onChange={handleChange} className="w-full p-2 border rounded-xl" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                <input name="specialization" onChange={handleChange} className="w-full p-2 border rounded-xl" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input name="email" type="email" onChange={handleChange} className="w-full p-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                <input name="experience" type="number" onChange={handleChange} className="w-full p-2 border rounded-xl" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                                <input name="qualification" onChange={handleChange} className="w-full p-2 border rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                                <input name="clinicName" onChange={handleChange} className="w-full p-2 border rounded-xl" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input name="address" onChange={handleChange} className="w-full p-2 border rounded-xl" />
                        </div>
                        <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-xl hover:bg-brand-700 transition">Create Doctor</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDoctor;
