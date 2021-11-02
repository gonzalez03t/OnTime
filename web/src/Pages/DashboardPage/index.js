import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store/store';
import ClientDashboardPage from './ClientDashboardPage/ClientDashboardPage';
import EmployeeDashboardPage from './EmployeeDashboardPage/EmployeeDashboardPage';
import CompanyDashboardPage from './CompanyDashboardPage/CompanyDashboardPage';
import AdminDashboardPage from './AdminDashboardPage/AdminDashboardPage';

export default function DashboardPage() {
  const { user } = useStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );
  return (
    <Route
      render={(props) =>
        user.role == 'BASE' ? (
          <ClientDashboardPage {...props} />
        ) : user.role == 'EMPLOYEE' ? (
          <EmployeeDashboardPage {...props} />
        ) : user.role == 'COMPANY_OWNER' ? (
          <CompanyDashboardPage {...props} />
        ) : (
          <AdminDashboardPage {...props} />
        )
      }
    />
  );
}
