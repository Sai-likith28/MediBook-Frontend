import axios from 'axios';

export interface Doctor {
    _id: string;
    name: string;
    specialization: string;
    qualification?: string;
    experience?: number;
    clinicName?: string;
    address?: string;
    isActive: boolean;
    image?: string;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Dynamic URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Slot {
    _id: string;
    doctorId: string | Doctor;
    date: string | Date;
    time: string;
    isBooked: boolean;
}

export const getDoctors = () => api.get('/patients/doctors');
export const getAllSlots = () => api.get('/admin/slots');
export const getDoctorSlots = (id: string, date: string = '') => api.get(`/patients/doctors/${id}/slots?date=${date}`);

export default api;
