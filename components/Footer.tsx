
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">Connecting Visionaries. Fueling Innovation.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-emerald-green">About</Link></li>
              <li><Link to="/services" className="hover:text-emerald-green">Services</Link></li>
              <li><Link to="/success-stories" className="hover:text-emerald-green">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="hover:text-emerald-green">Events</Link></li>
              <li><Link to="/join" className="hover:text-emerald-green">Join</Link></li>
              <li><a href="#" className="hover:text-emerald-green">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-green">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-green">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Venture Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
