import React from 'react';
import { Menu } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faUsers,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import './SettingsNav.css';
import COLORS from '../../../constants/colors';

function SettingsNavItem({ children, active }) {
  return (
    <div
      style={active ? { color: COLORS.example.active } : null}
      className="settings-nav__item"
    >
      {children}
    </div>
  );
}

export default function SettingsNav({ tab, setTab }) {
  function handleItemClick(e, { name }) {
    setTab(name);
  }

  return (
    <div className="settings-nav__container">
      <Menu fluid secondary vertical>
        <Menu.Item
          name="account"
          active={tab === 'account'}
          onClick={handleItemClick}
        >
          <SettingsNavItem active={tab === 'account'}>
            <FontAwesomeIcon
              className="settings-nav__icon"
              icon={faUserCircle}
              size="lg"
            />
            <span>Account</span>
          </SettingsNavItem>
        </Menu.Item>

        <Menu.Item
          name="password"
          active={tab === 'password'}
          onClick={handleItemClick}
        >
          <SettingsNavItem active={tab === 'password'}>
            <FontAwesomeIcon
              className="settings-nav__icon"
              icon={faLock}
              size="lg"
            />
            <span>Password</span>
          </SettingsNavItem>
        </Menu.Item>

        <Menu.Item
          name="company"
          active={tab === 'company'}
          onClick={handleItemClick}
        >
          <SettingsNavItem active={tab === 'company'}>
            <FontAwesomeIcon
              className="settings-nav__icon"
              icon={faUsers}
              size="lg"
            />
            <span>Company</span>
          </SettingsNavItem>
        </Menu.Item>
      </Menu>
    </div>
  );
}
