import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CreateSlots: React.FC = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [mode, setMode] = useState<'manual' | 'smart'>('smart');
    const [formData, setFormData] = useState({
        doctorId: '',
        date: '',
        endDate: '', // For smart gen
        slotCount: 10, // For manual
        slotDuration: 30
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await api.get('/admin/doctors');
            setDoctors(res.data);
            if (res.data.length > 0) {
                setFormData(prev => ({ ...prev, doctorId: res.data[0]._id }));
            }
        } catch (error) {
            toast.error('Failed to load doctors');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = mode === 'smart' ? '/admin/slots/smart-generate' : '/admin/slots/auto-generate';
            // payload differs slightly
            const payload = mode === 'smart'
                ? { doctorId: formData.doctorId, startDate: formData.date, endDate: formData.endDate }
                : formData;

            const res = await api.post(endpoint, payload);
            toast.success(`Generated ${res.data.count} slots successfully!`);
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to generate slots');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="admin" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Generate Slots</h1>
                </header>

                <div className="glass bg-white p-8 rounded-2xl max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                            <select
                                className="w-full p-3 border rounded-xl bg-white"
                                value={formData.doctorId}
                                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                            >
                                {doctors.map(doc => (
                                    <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization})</option>
                                ))}
                            </select>
                        </div>

                        {/* Mode Selection */}
                        <div className="flex gap-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setMode('smart')}
                                className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'smart' ? 'bg-brand-100 text-brand-700 border-brand-300 border' : 'bg-gray-100 text-gray-600'}`}
                            >
                                Smart Generate (Weekly)
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('manual')}
                                className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'manual' ? 'bg-brand-100 text-brand-700 border-brand-300 border' : 'bg-gray-100 text-gray-600'}`}
                            >
                                Auto/Manual Generate
                            </button>
                        </div>

                        {mode === 'smart' ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border rounded-xl"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border rounded-xl"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 border rounded-xl"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Slots</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 border rounded-xl"
                                            value={formData.slotCount}
                                            onChange={(e) => setFormData({ ...formData, slotCount: Number(e.target.value) })}
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 border rounded-xl"
                                            value={formData.slotDuration}
                                            onChange={(e) => setFormData({ ...formData, slotDuration: Number(e.target.value) })}
                                            step="5"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-brand-600 text-white px-8 py-3 rounded-xl hover:bg-brand-700 transition w-full font-bold shadow-lg shadow-brand-500/30"
                        >
                            {loading ? 'Generating...' : (mode === 'smart' ? 'Generate Smart Slots' : 'Auto-Generate Slots')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSlots;
