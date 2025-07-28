
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, Logo } from '../constants';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-deep-blue/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-green dark:hover:text-emerald-green transition-colors duration-300 ${isActive ? 'text-emerald-green dark:text-emerald-green' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-emerald-green rounded-md hover:bg-emerald-600 transition-colors">
                  Dashboard
                </Link>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-emerald-green rounded-md hover:bg-emerald-600 transition-colors">
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
