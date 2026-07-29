import { type ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MatchRegistrationPage from '../pages/MatchRegistrationPage';
import PaymentPage from '../pages/PaymentPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import UserDashboard from '../pages/UserDashboard';
import MatchModesPage from '../pages/MatchModesPage';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <RegisterPage />
          </MainLayout>
        }
      />
      <Route
        path="/match/:matchId"
        element={
          <MainLayout>
            <MatchRegistrationPage />
          </MainLayout>
        }
      />
      <Route
        path="/payment/:registrationId"
        element={
          <MainLayout>
            <PaymentPage />
          </MainLayout>
        }
      />
      <Route
        path="/payment"
        element={
          <MainLayout>
            <PaymentPage />
          </MainLayout>
        }
      />
      <Route
        path="/confirmation"
        element={
          <MainLayout>
            <ConfirmationPage />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <UserDashboard />
          </MainLayout>
        }
      />
      <Route
        path="/modes"
        element={
          <MainLayout>
            <MatchModesPage />
          </MainLayout>
        }
      />
      <Route
        path="/admin/login"
        element={
          <AdminLayout>
            <AdminLogin />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
