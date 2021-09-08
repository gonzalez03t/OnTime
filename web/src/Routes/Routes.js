import { Route, Switch } from 'react-router-dom';

// Pages
import HomePage from '../Pages/HomePage/HomePage';
import SignUpPage from '../Pages/SignUpPage/SignUpPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import ContactUsPage from '../Pages/ContactUsPage/ContactUsPage';
import FourOhFourPage from '../Pages/FourOhFourPage/FourOhFourPage';
import FindUsPage from '../Pages/FindUsPage/FindUsPage';
import AccountInformationPage from '../Pages/AccountInformationPage/AccountInformationPage';
import GeneralInformationPage from '../Pages/GeneralInformationPage/GeneralInformationPage';
import NavigateToParkingPage from '../Pages/NavigateToParkingPage/NavigateToParking';
import NavigateToHospitalPage from '../Pages/NavigateToHospitalPage/NavigateToHospitalPage';
import PatientAppointmentPage from '../Pages/PatientAppointmentsPage/PatientAppointmentsPage';
import ManageAppointmentsPage from '../Pages/ManageAppointmentsPage/ManageAppointmentsPage';
import ManageRemindersPage from '../Pages/ManageRemindersPage/ManageRemindersPage';
import ManageAdminsPage from '../Pages/ManageAdminsPage/ManageAdminsPage';
import ManageNonAdminsPage from '../Pages/ManageNonAdminsPage/ManageNonAdminsPage';

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
      <Route path="/patient_appointments" exact component={PatientAppointmentPage} />
      <Route path="/manage_appts" exact component={ManageAppointmentsPage} />
      <Route path="/manage_reminders" exact component={ManageRemindersPage} />
      <Route path="/manage_admins" exact component={ManageAdminsPage} />
      <Route path="/manage_non_admins" exact component={ManageNonAdminsPage} />
      <Route path="*" component={FourOhFourPage} />
    </Switch>
  );
}
