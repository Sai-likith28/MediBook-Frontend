import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    LogOut,
    PlusCircle,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
    role: 'admin' | 'patient';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // If used
        localStorage.removeItem('role');
        navigate('/');
    };

    const adminLinks = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/patients', label: 'Patients', icon: Users },
        { path: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
        { path: '/admin/view-appointments', label: 'Appointments', icon: Calendar },
        { path: '/admin/create-slots', label: 'Generate Slots', icon: Clock },
    ];

    const patientLinks = [
        { path: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/patient/book', label: 'Book Appointment', icon: PlusCircle },
        { path: '/patient/my-appointments', label: 'My Appointments', icon: Calendar },
    ];

    const links = role === 'admin' ? adminLinks : patientLinks;

    return (
        <aside className="w-64 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 fixed left-0 top-0 flex flex-col z-10 hidden md:flex">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-brand-600 flex items-center gap-2">
                    <Stethoscope className="text-brand-500" />
                    MediBook
                </h1>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-8">
                    {role} Portal
                </span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-brand-50 text-brand-600 shadow-sm font-medium'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <link.icon size={20} />
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
