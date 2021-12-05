import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import navIcon from './navIcon.png';
import './NavBar.css';
import UserDropdown from '../UserDropdown/UserDropdown';
import clsx from 'clsx';
import useStore from '../../store/store';
import shallow from 'zustand/shallow';

const authenticatedLinks = [
  {
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    label: 'Dev Links',
    to: '/dev',
  },
];

const unAuthenticatedLinks = [
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/sign_up' },
];

function NavLink({ label, to }) {
  const location = useLocation();

  function isActive() {
    return location.pathname === to;
  }

  return (
    <Link className={clsx('nav__link', isActive() && 'active')} to={to}>
      {label}
    </Link>
  );
}

export default function NavBar() {
  const user = useStore((state) => state.user, shallow);

  function isAuthenticated() {
    return !!user;
  }

  return (
    <nav className="nav">
      <div className="nav__container">
        {/* LEFT */}
        <div className="nav__left-container">
          <Link to="/">
            <img className="nav__icon" src={navIcon} alt="OnTime Logo" /> 
          </Link>

          <div className="nav__links">
            {isAuthenticated()
              ? authenticatedLinks.map((link) => (
                  <NavLink key={link.to} {...link} />
                ))
              : unAuthenticatedLinks.map((link) => (
                  <NavLink key={link.to} {...link} />
                ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>{isAuthenticated() && <UserDropdown />}</div>
      </div>
    </nav>
  );
}
