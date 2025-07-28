export enum UserRole {
  Entrepreneur = 'Entrepreneur',
  VC = 'Venture Capitalist',
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
  password?: string; // For login/signup simulation
}

export interface SuccessStory {
  startupName: string;
  founderName: string;
  story: string;
  fundingAmount: string;
  image: string;
}

export interface Event {
    id: number;
    title: string;
    date: string;
    description: string;
    type: 'Webinar' | 'Workshop' | 'Networking';
    link: string;
}

export interface InvestorMatch {
  vcName: string;
  investmentFocus: string;
  reason: string;
}

export interface VCContact {
    name: string;
    email: string;
    linkedIn: string;
}

export interface StartupIdea {
    id: string;
    idea: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    entrepreneur: {
        name: string;
        email: string;
    };
    reviewedByVC?: {
        name: string;
        contact?: VCContact;
    };
    matches?: InvestorMatch[];
}

export interface InvestorProfile {
  id: string;
  firmName: string;
  description: string;
  investmentFocus: string[];
  stage: 'Seed' | 'Series A' | 'Series B' | 'All Stages';
  website: string;
}