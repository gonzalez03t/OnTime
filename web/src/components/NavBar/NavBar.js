import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="NavBar">
      <p>Mock Nav</p>
      <nav>
        <ul>
          <li>
            <Link to="/login">Test Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact_us">Contact Us</Link>
          </li>
          <li>
            <Link to="/find_us">Find Us</Link>
          </li>
          <li>
            <Link to="/account_info">Account Information</Link>
          </li>
          <li>
            <Link to="/general_info">General Information</Link>
          </li>
          <li>
            <Link to="/nav_to_parking">Navigate to Parking</Link>
          </li>
          <li>
            <Link to="/nav_to_hospital">Navigate to Hospital</Link>
          </li>
          <li>
            <Link to="/patient_appointments">Patient Appointments</Link>
          </li>
          <li>
            <Link to="/manage_appts">Manage Appointments</Link>
          </li>
          <li>
            <Link to="/manage_reminders">Manage Reminders</Link>
          </li>
          <li>
            <Link to="/manage_admins">Manage Admins</Link>
          </li>
          <li>
            <Link to="/manage_non_admins">Manage Non-Admins</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
