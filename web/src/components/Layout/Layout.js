import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app">
      <NavBar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}
