import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/auth/AdminLogin';
import PatientLogin from './pages/auth/PatientLogin';
import PatientRegister from './pages/auth/PatientRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';

import CreateDoctor from './pages/admin/CreateDoctor';
import ViewPatients from './pages/admin/ViewPatients';
import ViewDoctors from './pages/admin/ViewDoctors';
import ViewAppointments from './pages/admin/ViewAppointments';
import CreateSlots from './pages/admin/CreateSlots';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';



function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/patients" element={<ViewPatients />} />
        <Route path="/admin/doctors" element={<ViewDoctors />} />
        <Route path="/admin/create-doctor" element={<CreateDoctor />} />
        <Route path="/admin/create-slots" element={<CreateSlots />} />
        <Route path="/admin/view-appointments" element={<ViewAppointments />} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/book" element={<BookAppointment />} />
        <Route path="/patient/my-appointments" element={<MyAppointments />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
