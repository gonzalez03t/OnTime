import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../../store/store';
import ClientDashboardPage from './ClientDashboardPage/ClientDashboardPage';
import EmployeeDashboardPage from './EmployeeDashboardPage/EmployeeDashboardPage';
import CompanyDashboardPage from './CompanyDashboardPage/CompanyDashboardPage';
import AdminDashboardPage from './AdminDashboardPage/AdminDashboardPage';

export default function DashboardPage() {
  const history = useHistory();

  const { user } = useStore(
    (state) => ({
      user: state.user,
    }),
    shallow
  );

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user]);

  const renderPage = (props) => {
    switch (user?.role) {
      case 'BASE':
        return <ClientDashboardPage {...props} />;
      case 'EMPLOYEE':
        return <EmployeeDashboardPage {...props} />;
      case 'COMPANY_OWNER':
        return <CompanyDashboardPage {...props} />;
      case 'ADMIN':
        return <AdminDashboardPage {...props} />;
      default:
        return null;
    }
  };

  return <Route render={renderPage} />;
}
