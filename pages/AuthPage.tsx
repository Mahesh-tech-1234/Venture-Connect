// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { User, UserRole } from '../types';
// import { useNavigate } from 'react-router-dom';
// import * as api from '../services/apiService';

// interface AuthPageProps {
//   defaultTab: 'login' | 'signup';
// }

// const AuthPage: React.FC<AuthPageProps> = ({ defaultTab }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Shared state for forms
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.Entrepreneur);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);


//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       const user = await api.loginUser(email, password);
//       login(user);
//       navigate('/dashboard');
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password.length < 6) {
//         setError("Password must be at least 6 characters long.");
//         return;
//     }
//     setError(null);
//     setLoading(true);
//     try {
//       const newUser: User = { name, email, role, password };
//       const savedUser = await api.signupUser(newUser);
//       login(savedUser);
//       navigate('/dashboard');
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const tabClasses = (tabName: string) => 
//     `w-full p-4 text-center font-bold cursor-pointer transition-colors duration-300 ${activeTab === tabName ? 'bg-emerald-green text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'}`;

//   return (
//     <div className="py-16 bg-gray-50 dark:bg-deep-blue flex items-center justify-center min-h-full">
//       <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
//         <div className="flex">
//           <button onClick={() => setActiveTab('login')} className={`${tabClasses('login')} rounded-tl-lg`}>Login</button>
//           <button onClick={() => setActiveTab('signup')} className={`${tabClasses('signup')} rounded-tr-lg`}>Sign Up</button>
//         </div>

//         <div className="p-8">
//           {error && <div className="mb-4 text-center p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">{error}</div>}
          
//           {activeTab === 'login' && (
//             <div>
//               <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div>
//                   <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                   <input type="email" id="login-email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>
//                 <div>
//                   <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                   <input type="password" id="login-password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
//                   {loading ? 'Logging in...' : 'Login'}
//                 </button>
//               </form>
//             </div>
//           )}

//           {activeTab === 'signup' && (
//             <div>
//               <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Join the Community</h2>
//               <form onSubmit={handleSignup} className="space-y-6">
//                  <div>
//                   <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
//                   <input type="text" id="signup-name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>
//                 <div>
//                   <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                   <input type="email" id="signup-email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>
//                 <div>
//                   <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                   <input type="password" id="signup-password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>
//                 <div>
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
//                   <select id="role" value={role} onChange={e => setRole(e.target.value as UserRole)} className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
//                     <option>{UserRole.Entrepreneur}</option>
//                     <option>{UserRole.VC}</option>
//                   </select>
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
//                   {loading ? 'Creating Account...' : 'Create Account'}
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


// -------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { User, UserRole } from '../types';
// import { useNavigate } from 'react-router-dom';
// import * as api from '../services/apiService';

// interface AuthPageProps {
//   defaultTab: 'login' | 'signup';
// }

// const AuthPage: React.FC<AuthPageProps> = ({ defaultTab }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState<UserRole>(UserRole.Entrepreneur);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);
//     try {
//       const user = await api.loginUser(email, password);
//       login(user);
//       setSuccess("Login successful!");
//       setTimeout(() => navigate('/dashboard'), 1000);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     setError(null);
//     setSuccess(null);
//     setLoading(true);
//     try {
//       const newUser: User = { name, email, role, password };
//       const savedUser = await api.signupUser(newUser);
//       login(savedUser);
//       setSuccess("Signup successful!");
//       setTimeout(() => navigate('/dashboard'), 1000);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tabClasses = (tabName: string) =>
//     `w-full p-4 text-center font-bold cursor-pointer transition-colors duration-300 ${
//       activeTab === tabName
//         ? 'bg-emerald-green text-white'
//         : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
//     }`;

//   return (
//     <div className="py-16 bg-gray-50 dark:bg-deep-blue flex items-center justify-center min-h-full">
//       <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
//         <div className="flex">
//           <button onClick={() => setActiveTab('login')} className={`${tabClasses('login')} rounded-tl-lg`}>
//             Login
//           </button>
//           <button onClick={() => setActiveTab('signup')} className={`${tabClasses('signup')} rounded-tr-lg`}>
//             Sign Up
//           </button>
//         </div>

//         <div className="p-8">
//           {error && (
//             <div className="mb-4 text-center p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 text-center p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
//               {success}
//             </div>
//           )}

//           {activeTab === 'login' && (
//             <div>
//               <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div>
//                   <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="login-email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                     className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="login-password"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="login-password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     required
//                     className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Logging in...' : 'Login'}
//                 </button>
//               </form>
//             </div>
//           )}

//           {activeTab === 'signup' && (
//             <div>
//               <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Join the Community</h2>
//               <form onSubmit={handleSignup} className="space-y-6">
//                 <div>
//                   <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="signup-name"
//                     value={name}
//                     onChange={e => setName(e.target.value)}
//                     required
//                     className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="signup-email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                     className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="signup-password"
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="signup-password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     required
//                     className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     I am a...
//                   </label>
//                   <select
//                     id="role"
//                     value={role}
//                     onChange={e => setRole(e.target.value as UserRole)}
//                     className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
//                   >
//                     <option value={UserRole.Entrepreneur}>Entrepreneur</option>
//                     <option value={UserRole.VC}>Venture Capitalist</option>
//                   </select>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Creating Account...' : 'Create Account'}
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;

// ------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/apiService';

interface AuthPageProps {
  defaultTab: 'login' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ defaultTab }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Common states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Entrepreneur);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const user = await api.loginUser(email, password);
      login(user);
      setSuccess('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError((err as Error).message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const newUser: User = { name, email, password, role };
      const savedUser = await api.signupUser(newUser);
      login(savedUser);
      setSuccess('Signup successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError((err as Error).message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const tabClasses = (tabName: string) =>
    `w-full p-4 text-center font-bold cursor-pointer transition-colors duration-300 ${
      activeTab === tabName
        ? 'bg-emerald-green text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'
    }`;

  return (
    <div className="py-16 bg-gray-50 dark:bg-deep-blue flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('login')}
            className={`${tabClasses('login')} rounded-tl-lg`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`${tabClasses('signup')} rounded-tr-lg`}
          >
            Sign Up
          </button>
        </div>

        {/* Error & Success */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 text-center text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-center text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-md">
              {success}
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Welcome Back!
              </h2>
              <div>
                <label htmlFor="login-email" className="block text-sm text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                Join the Community
              </h2>
              <div>
                <label htmlFor="signup-name" className="block text-sm text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm text-gray-700 dark:text-gray-300">
                  I am a...
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="mt-1 block w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-700 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value={UserRole.Entrepreneur}>Entrepreneur</option>
                  <option value={UserRole.VC}>Venture Capitalist</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
