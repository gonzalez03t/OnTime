import React from 'react';
//import NavBar from '../NavBar/NavBar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app">
      <main className="app-main">{children}</main>
      {/* TODO: footer here */}
    </div>
  );
}
