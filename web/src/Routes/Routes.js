import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import UnAuthenticatedRoute from './UnAuthenticatedRoute';
import useStore from '../store/store';
import { viewer } from '../api/user';

// pages
import RouteLinks from '../pages/RouteLinks/RouteLinks';
import HomePage from '../pages/HomePage/HomePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ContactUsPage from '../pages/ContactUsPage/ContactUsPage';
import FourOhFourPage from '../pages/FourOhFourPage/FourOhFourPage';
import FindUsPage from '../pages/FindUsPage/FindUsPage';
import AccountInformationPage from '../pages/AccountInformationPage/AccountInformationPage';
import GeneralInformationPage from '../pages/GeneralInformationPage/GeneralInformationPage';
import NavigateToParkingPage from '../pages/NavigateToParkingPage/NavigateToParking';
import NavigateToHospitalPage from '../pages/NavigateToHospitalPage/NavigateToHospitalPage';
import PatientAppointmentPage from '../pages/PatientAppointmentsPage/PatientAppointmentsPage';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import ManageRemindersPage from '../pages/ManageRemindersPage/ManageRemindersPage';
import ManageAdminsPage from '../pages/ManageAdminsPage/ManageAdminsPage';
import ManageNonAdminsPage from '../pages/ManageNonAdminsPage/ManageNonAdminsPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import TestImageUpload from '../pages/TestImageUpload';
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ScheduleAppointmentPage from '../pages/ScheduleAppointmentPage/ScheduleAppointmentPage';

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
      <Route path="/contact_us" component={ContactUsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/contact_us" exact component={ContactUsPage} />
      <Route path="/find_us" exact component={FindUsPage} />
      <Route path="/account_info" exact component={AccountInformationPage} />
      <Route path="/general_info" exact component={GeneralInformationPage} />
      <Route path="/nav_to_parking" exact component={NavigateToParkingPage} />
      <Route path="/nav_to_hospital" exact component={NavigateToHospitalPage} />
      <Route
        path="/patient_appointments"
        exact
        component={PatientAppointmentPage}
      />
      <ProtectedRoute path="/dashboard" exact component={UserDashboard} />
      <ProtectedRoute path="/settings" exact component={SettingsPage} />
      <ProtectedRoute
        path="/company/:name/schedule"
        exact
        component={ScheduleAppointmentPage}
      />
      <Route path="/company/:name" component={CompanyProfile} />
      <Route path="/manage_reminders" exact component={ManageRemindersPage} />
      <Route path="/manage_admins" exact component={ManageAdminsPage} />
      <Route path="/manage_non_admins" exact component={ManageNonAdminsPage} />
      <Route path="/test" exact component={TestImageUpload} />
      <Route path="*" component={FourOhFourPage} />
    </Switch>
  );
}
