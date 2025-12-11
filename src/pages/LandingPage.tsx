import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, User, ShieldCheck, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex flex-col">
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 text-brand-600 font-bold text-2xl">
                    <Stethoscope size={32} />
                    <span>MediBook</span>
                </div>
                <div className="flex gap-4">
                    <Link to="/admin/login" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                        Admin Login
                    </Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 space-y-6"
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-brand-100 text-brand-700 font-medium text-sm">
                        #1 Hospital Management System
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Your Health, <br />
                        <span className="text-brand-500">Our Priority</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-lg">
                        Book appointments with top doctors, manage your health records, and skip the waiting lines.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            to="/patient/login"
                            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <User size={20} />
                            Patient Login
                        </Link>
                        <Link
                            to="/patient/register"
                            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Create Account
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 relative"
                >
                    <div className="aboslute top-0 right-0 w-full h-full bg-brand-200 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Doctors"
                        className="rounded-3xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
                    />

                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Verified Doctors</p>
                            <p className="text-xs text-gray-500">100% Trusted Services</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default LandingPage;
