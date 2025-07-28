import React from 'react';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Events', href: '/events' },
  { name: 'Investor Directory', href: '/investor-directory' },
];

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
        <svg className="w-8 h-8 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        <span className="text-2xl font-bold font-poppins text-gray-800 dark:text-white">Venture Connect</span>
    </div>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);


// --- Company Logos ---

export const CompanyLogo1: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 20 L15 5 L30 20 L15 35 Z" />
        <text x="40" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">Nexus</text>
    </svg>
);
export const CompanyLogo2: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 170 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M5 5 L15 20 L5 35 Z M20 5 L30 20 L20 35 Z" />
        <text x="45" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500">Quantum</text>
    </svg>
);
export const CompanyLogo3: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} viewBox="0 0 170 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <circle cx="20" cy="20" r="15" fillOpacity="0.7" />
        <text x="45" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500">EcoVerse</text>
    </svg>
);
export const CompanyLogo4: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <rect x="0" y="5" width="30" height="30" rx="5" />
        <text x="45" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">FinSecure</text>
    </svg>
);
export const CompanyLogo5: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
         <path d="M0 0 H30 V30 H0 Z" transform="rotate(45 15 20)" fillOpacity="0.7"/>
         <text x="45" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500">Aether</text>
    </svg>
);
export const CompanyLogo6: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 190 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 35 L15 5 L30 35 Z" fillOpacity="0.7"/>
        <text x="40" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">InnovateAI</text>
    </svg>
);


export const COMPANY_LOGOS = [
  { name: 'Nexus', LogoComponent: CompanyLogo1, href: '#' },
  { name: 'Quantum', LogoComponent: CompanyLogo2, href: '#' },
  { name: 'EcoVerse', LogoComponent: CompanyLogo3, href: '#' },
  { name: 'FinSecure', LogoComponent: CompanyLogo4, href: '#' },
  { name: 'Aether', LogoComponent: CompanyLogo5, href: '#' },
  { name: 'InnovateAI', LogoComponent: CompanyLogo6, href: '#' },
];


// --- Funder Logos ---

export const FunderLogo1: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="700">CATALYST</text>
    </svg>
);
export const FunderLogo2: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 20 Q 20 0 40 20 T 80 20" stroke="currentColor" fill="none" strokeWidth="3" />
        <text x="90" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500">Meridian</text>
    </svg>
);
export const FunderLogo3: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M0 35 L20 5 L40 35 Z" />
        <text x="50" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">Apex</text>
    </svg>
);
export const FunderLogo4: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500">Insight</text>
        <text x="95" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="700">Partners</text>
    </svg>
);
export const FunderLogo5: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
         <rect x="0" y="0" width="15" height="40" rx="3" />
         <rect x="20" y="10" width="15" height="30" rx="3" />
         <rect x="40" y="20" width="15" height="20" rx="3" />
         <text x="65" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">Ascend</text>
    </svg>
);
export const FunderLogo6: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <circle cx="15" cy="20" r="12" stroke="currentColor" strokeWidth="3" fill="none" />
        <text x="40" y="28" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="600">Strive VC</text>
    </svg>
);

export const ACTIVE_FUNDERS = [
  { name: 'Catalyst Investors', LogoComponent: FunderLogo1, href: 'https://www.catalyst.com/' },
  { name: 'Meridian Capital', LogoComponent: FunderLogo2, href: 'https://www.meridiancapital.com/' },
  { name: 'Apex Partners', LogoComponent: FunderLogo3, href: 'https://www.apex-partners.com/' },
  { name: 'Insight Partners', LogoComponent: FunderLogo4, href: 'https://www.insightpartners.com/' },
  { name: 'Ascend.vc', LogoComponent: FunderLogo5, href: 'https://ascend.vc/' },
  { name: 'Strive VC', LogoComponent: FunderLogo6, href: 'https://strive.vc/' },
];