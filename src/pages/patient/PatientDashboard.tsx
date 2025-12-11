import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ComingSoonPopup from '../../components/ComingSoonPopup';
import { Calendar, Clock, Activity, Pill, Video } from 'lucide-react';

const PatientDashboard: React.FC = () => {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
    const [userName, setUserName] = useState('Patient');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.name) setUserName(user.name);
            } catch (e) {
                // ignore
            }
        }
    }, []);

    const cards = [
        { title: 'Book Appointment', icon: Calendar, link: '/patient/book', color: 'bg-blue-500' },
        { title: 'My Appointments', icon: Clock, link: '/patient/my-appointments', color: 'bg-green-500' },
        { title: 'Lab Reports', icon: Activity, onClick: () => setSelectedFeature('Lab Reports'), color: 'bg-purple-500' },
        { title: 'Buy Medicines', icon: Pill, onClick: () => setSelectedFeature('Buy Medicines'), color: 'bg-yellow-500' },
        { title: 'Video Consult', icon: Video, onClick: () => setSelectedFeature('Video Consult'), color: 'bg-red-500' },
    ];

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="patient" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {userName}</h1>
                    <p className="text-gray-500">Manage your health with MediBook</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        card.link ? (
                            <Link key={index} to={card.link} className="glass bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col items-center text-center gap-4 group">
                                <div className={`p-6 rounded-2xl text-white ${card.color} shadow-lg group-hover:scale-110 transition`}>
                                    <card.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                            </Link>
                        ) : (
                            <button key={index} onClick={card.onClick} className="glass bg-white p-8 rounded-3xl hover:shadow-xl transition flex flex-col items-center text-center gap-4 group w-full">
                                <div className={`p-6 rounded-2xl text-white ${card.color} shadow-lg group-hover:scale-110 transition`}>
                                    <card.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                            </button>
                        )
                    ))}
                </div>

                <ComingSoonPopup
                    isOpen={!!selectedFeature}
                    onClose={() => setSelectedFeature(null)}
                    feature={selectedFeature || ''}
                />
            </div>
        </div>
    );
};

export default PatientDashboard;
