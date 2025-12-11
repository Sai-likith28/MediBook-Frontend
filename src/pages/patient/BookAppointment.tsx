import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import { Stethoscope, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const BookAppointment: React.FC = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null); // Store full doctor object
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [slots, setSlots] = useState<any[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Steps: 1 = Select Doctor, 2 = Select Date, 3 = Select Slot
    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await api.get('/patients/doctors');
            setDoctors(res.data);
        } catch (error) {
            toast.error('Failed to load doctors');
        }
    };

    const handleDoctorSelect = (doctor: any) => {
        setSelectedDoctor(doctor);
        setStep(2);
        setSlots([]);
        setSelectedDate('');
    };

    const handleDateSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        setSelectedDate(date);
        if (date && selectedDoctor) {
            fetchSlots(selectedDoctor._id, date);
        }
    };

    const fetchSlots = async (doctorId: string, date: string) => {
        setLoadingSlots(true);
        try {
            const res = await api.get(`/patients/doctors/${doctorId}/slots?date=${date}`);
            setSlots(res.data);
            setStep(3); // Move to slots view
        } catch (error) {
            toast.error('Failed to load slots');
            setSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleBook = async (slotId: string) => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            toast.error('Please login to book');
            return;
        }
        const user = JSON.parse(userStr);

        try {
            await api.post('/patients/bookings', {
                slotId,
                patientId: user._id
            });
            toast.success('Appointment Booked Successfully!');
            // Reset or refresh?
            // Maybe go back to dashboard or clear selection
            setSlots(prev => prev.filter(s => s._id !== slotId)); // Optimistic update
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error("This slot has just been booked. Please choose another slot.");
            } else {
                toast.error("Booking failed. Please try again.");
            }
        }
    };

    const resetSelection = () => {
        setSelectedDoctor(null);
        setSelectedDate('');
        setSlots([]);
        setStep(1);
    };

    return (
        <div className="flex bg-brand-50 min-h-screen">
            <Sidebar role="patient" />
            <div className="flex-1 md:ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
                    {step > 1 && (
                        <button onClick={resetSelection} className="text-sm text-brand-600 hover:underline">
                            Start Over
                        </button>
                    )}
                </header>

                <div className="max-w-4xl mx-auto">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between mb-8 opacity-70">
                        <div className={`flex flex-col items-center ${step >= 1 ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-brand-100' : 'bg-gray-200'}`}>1</div>
                            <span>Doctor</span>
                        </div>
                        <div className="h-1 flex-1 bg-gray-200 mx-4">
                            <div className={`h-full bg-brand-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex flex-col items-center ${step >= 2 ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-brand-100' : 'bg-gray-200'}`}>2</div>
                            <span>Date</span>
                        </div>
                        <div className="h-1 flex-1 bg-gray-200 mx-4">
                            <div className={`h-full bg-brand-500 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex flex-col items-center ${step >= 3 ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-brand-100' : 'bg-gray-200'}`}>3</div>
                            <span>Slot</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Panel: Selection Info or Doctor List */}
                        <div className="space-y-6">
                            {/* Step 1: Doctor Selection */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700">Select Doctor</h2>
                                    {doctors.map((doctor) => (
                                        <div
                                            key={doctor._id}
                                            onClick={() => handleDoctorSelect(doctor)}
                                            className="glass p-6 rounded-2xl cursor-pointer transition-all border-2 border-transparent hover:border-brand-200 hover:shadow-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                                                    <Stethoscope size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                                                    <p className="text-brand-600">{doctor.specialization}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{doctor.clinicName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Selected Context (Visible in Step 2 & 3) */}
                            {step > 1 && selectedDoctor && (
                                <div className="glass bg-brand-50 p-6 rounded-2xl border border-brand-100">
                                    <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Selected Doctor</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 rounded-full text-brand-600 shadow-sm">
                                            <Stethoscope size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{selectedDoctor.name}</h3>
                                            <p className="text-brand-600">{selectedDoctor.specialization}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(1)} className="mt-4 text-sm text-brand-600 underline">Change Doctor</button>
                                </div>
                            )}

                            {/* Step 2: Date Picker */}
                            {step >= 2 && (
                                <div className="glass bg-white p-6 rounded-2xl">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Date</h2>
                                    <input
                                        type="date"
                                        className="w-full p-4 border rounded-xl bg-gray-50 text-lg"
                                        value={selectedDate}
                                        onChange={handleDateSelect}
                                        min={new Date().toISOString().split('T')[0]} // Disable past dates
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Panel: Slots */}
                        <div className="space-y-6">
                            {step === 3 && (
                                <div className="glass bg-white p-6 rounded-2xl min-h-[400px]">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Slots</h2>

                                    {loadingSlots ? (
                                        <div className="text-center py-10 text-brand-600 animate-pulse">Finding Slots...</div>
                                    ) : slots.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500">
                                            <Clock size={48} className="mx-auto mb-4 opacity-20" />
                                            <p>No slots available for this date.</p>
                                            <p className="text-sm">Try selecting another date.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot._id}
                                                    onClick={() => handleBook(slot._id)}
                                                    className="group border border-brand-200 hover:bg-brand-600 hover:text-white text-brand-700 py-3 rounded-xl flex flex-col items-center justify-center transition-all shadow-sm"
                                                >
                                                    <span className="font-bold text-lg">{slot.time}</span>
                                                    <span className="text-xs text-gray-400 group-hover:text-brand-100">
                                                        {new Date(slot.date).toLocaleDateString(undefined, { weekday: 'short' })}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {step < 3 && (
                                <div className="hidden lg:flex items-center justify-center h-full text-gray-300">
                                    <div className="text-center">
                                        <Calendar size={64} className="mx-auto mb-4" />
                                        <p>Select details to view slots</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
