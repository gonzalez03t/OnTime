import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import { logout } from '../../api/auth';
import useStore from '../../store/store';
import './UserDropdown.css';

function UserImage() {
  const imageSrc = useStore((state) => state.getUserImage());

  return (
    <span className="user-dropdown-image__container">
      {imageSrc ? (
        <Image style={{ objectFit: 'cover' }} src={imageSrc} />
      ) : (
        <svg
          className="user-dropdown-image__placeholder"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </span>
  );
}

export default function UserDropdown() {
  const location = useLocation();
  const history = useHistory();

  const setUser = useStore((state) => state.setUser);

  async function handleLogout() {
    const res = await logout();

    if (res?.status === 200) {
      setUser(null);
      history.push('/login');
    }
  }

  return (
    <Dropdown basic icon={<UserImage />} direction="left">
      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to="/settings"
          active={location.pathname === '/settings'}
        >
          Settings
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
