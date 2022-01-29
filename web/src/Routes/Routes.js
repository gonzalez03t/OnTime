import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import UnAuthenticatedRoute from './UnAuthenticatedRoute';
import useStore from '../store/store';
import { viewer } from '../api/user';

// TODO: we need to use lazy imports and react suspense to lower our
// overall bundle size and build time. Pages should be lazily imported like:
// const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));

// pages
import RouteLinks from '../pages/RouteLinks/RouteLinks';
import HomePage from '../pages/HomePage/HomePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ContactUsPage from '../pages/ContactUsPage/ContactUsPage';
import FourOhFourPage from '../pages/FourOhFourPage/FourOhFourPage';

import AppointmentDetail from '../pages/AppointmentDetailPage/AppointmentDetailPage';

import DashboardPage from '../pages/DashboardPage/index';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import CompanySearchPage from '../pages/CompanySearchPage/CompanySearchPage';
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

export default function Routes() {
  const { isAuthenticated, setUser } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    setUser: state.setUser,
  }));

  useEffect(() => {
    async function init() {
      const res = await viewer();

      // the store is out of sync with the session.
      // session has likely just expired.
      if ((!res || res.status === 401) && isAuthenticated()) {
        setUser(null);
      }
    }

    init();
  }, []);

  return (
    <Switch>
      <UnAuthenticatedRoute path="/" exact component={HomePage} />
      <Route path="/dev" exact component={RouteLinks} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/contact_us" exact component={ContactUsPage} />
      <Route path="/company_search" exact component={CompanySearchPage} />
      <Route path="/appointment_detail" exact component={AppointmentDetail} />
      <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
      <ProtectedRoute path="/settings" exact component={SettingsPage} />
      <Route path="/company/:name" component={CompanyProfile} />
      <Route path="*" component={FourOhFourPage} />
    </Switch>
  );
}
