import { Route, Switch } from 'react-router-dom';

// pages
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
import ManageAppointmentsPage from '../pages/ManageAppointmentsPage/ManageAppointmentsPage';
import ManageRemindersPage from '../pages/ManageRemindersPage/ManageRemindersPage';
import ManageAdminsPage from '../pages/ManageAdminsPage/ManageAdminsPage';
import ManageNonAdminsPage from '../pages/ManageNonAdminsPage/ManageNonAdminsPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/contact_us" component={ContactUsPage} />
      <Route path="/login" component={LoginPage} />
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
      <Route path="/manage_appts" exact component={ManageAppointmentsPage} />
      <Route path="/manage_reminders" exact component={ManageRemindersPage} />
      <Route path="/manage_admins" exact component={ManageAdminsPage} />
      <Route path="/manage_non_admins" exact component={ManageNonAdminsPage} />
      <Route path="*" component={FourOhFourPage} />
    </Switch>
  );
}
