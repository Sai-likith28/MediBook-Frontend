import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

const PatientLogin: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/patients/login', { phone });
            localStorage.setItem('user', JSON.stringify({ ...res.data.patient, role: 'patient' }));
            localStorage.setItem('role', 'patient');
            toast.success('Login Successful!');
            navigate('/patient/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass bg-white p-8 rounded-2xl w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Patient Login</h2>
                    <p className="text-gray-500">Enter your phone number to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        New here? <Link to="/patient/register" className="text-brand-600 font-semibold hover:underline">Create an account</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default PatientLogin;
