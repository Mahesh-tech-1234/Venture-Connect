import { User, StartupIdea, SuccessStory, InvestorProfile, InvestorMatch } from '../types';

// ===================================================================================
// FAKE DATABASE / LOCAL STORAGE MOCK
// In a real application, this entire section would be replaced by a backend server
// and a database (like MongoDB). The functions below simulate network calls to that server.
// ===================================================================================

const USERS_KEY = 'venture_connect_users';
const IDEAS_KEY = 'venture_connect_ideas';

const getDb = <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const saveDb = <T>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

const MOCK_API_DELAY = 300; // ms

const simulateFetch = <T>(action: () => T): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = action();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }, MOCK_API_DELAY);
    });
};

// ===================================================================================
// API SERVICE
// This is what the React components will interact with. Each function mimics
// a `fetch` call to a specific API endpoint.
// ===================================================================================

/**
 * Handles user signup.
 * POST /api/auth/signup
 */
export const signupUser = (user: User): Promise<User> => {
    return simulateFetch(() => {
        const users = getDb<User>(USERS_KEY);
        const existing = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (existing) {
            throw new Error('A user with this email already exists.');
        }
        const newUser = { ...user, id: `user-${Date.now()}` };
        users.push(newUser);
        saveDb(USERS_KEY, users);
        const { password, ...userToReturn } = newUser;
        return userToReturn;
    });
};

/**
 * Handles user login.
 * POST /api/auth/login
 */
export const loginUser = (email: string, pass: string): Promise<User> => {
    return simulateFetch(() => {
        const users = getDb<User>(USERS_KEY);
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user || user.password !== pass) {
            throw new Error('Invalid email or password.');
        }
        const { password, ...userToReturn } = user;
        return userToReturn;
    });
};

/**
 * Fetches all ideas.
 * GET /api/ideas
 */
export const getIdeas = (): Promise<StartupIdea[]> => {
    return simulateFetch(() => {
        const ideas = getDb<StartupIdea>(IDEAS_KEY);
        return ideas.sort((a, b) => b.id.localeCompare(a.id));
    });
};

/**
 * Submits a new idea.
 * POST /api/ideas
 */
export const submitIdea = (ideaData: Partial<StartupIdea>): Promise<StartupIdea> => {
    return simulateFetch(() => {
        const ideas = getDb<StartupIdea>(IDEAS_KEY);
        const newIdea: StartupIdea = {
            id: `idea-${Date.now()}`,
            status: 'Pending',
            ...ideaData,
        } as StartupIdea;
        ideas.unshift(newIdea);
        saveDb(IDEAS_KEY, ideas);
        return newIdea;
    });
};

/**
 * Updates an idea's status.
 * PUT /api/ideas/:id/status
 */
export const updateIdeaStatus = (ideaId: string, status: 'Accepted' | 'Rejected', vc: User): Promise<StartupIdea> => {
    return simulateFetch(() => {
        const ideas = getDb<StartupIdea>(IDEAS_KEY);
        const ideaIndex = ideas.findIndex(i => i.id === ideaId);
        if (ideaIndex === -1) throw new Error("Idea not found");

        const updatedIdea = { ...ideas[ideaIndex], status };
        if (status === 'Accepted') {
            updatedIdea.reviewedByVC = {
                name: vc.name,
                contact: {
                    name: vc.name,
                    email: `${vc.name.toLowerCase().replace(/\s/g, '.')}@strive.vc`,
                    linkedIn: `https://linkedin.com/in/${vc.name.toLowerCase().replace(/\s/g, '')}`
                }
            };
        } else {
            updatedIdea.reviewedByVC = { name: vc.name };
        }
        
        ideas[ideaIndex] = updatedIdea;
        saveDb(IDEAS_KEY, ideas);
        return updatedIdea;
    });
};

/**
 * Updates a full idea object (e.g., to add matches).
 * PUT /api/ideas/:id
 */
export const updateIdea = (updatedIdea: StartupIdea): Promise<StartupIdea> => {
    return simulateFetch(() => {
        let ideas = getDb<StartupIdea>(IDEAS_KEY);
        const ideaIndex = ideas.findIndex(idea => idea.id === updatedIdea.id);
        if (ideaIndex === -1) throw new Error("Idea not found for update.");
        ideas[ideaIndex] = updatedIdea;
        saveDb(IDEAS_KEY, ideas);
        return updatedIdea;
    });
};


/**
 * Generates a brief for an idea (would call Gemini on the backend).
 * POST /api/ideas/:id/brief
 */
export const generateIdeaBrief = (ideaId: string, ideaText: string): Promise<string> => {
    console.log(`Simulating backend call to Gemini for idea: ${ideaId}`);
    return simulateFetch(() => {
        // This is where your backend would call the actual Gemini API.
        // We simulate a successful response here.
        return `This startup aims to solve [Problem] with a [Solution]. It targets the [Market] and has potential due to its [Unique Aspect].`;
    });
};

/**
 * Generates investor matches for an idea (would call Gemini on the backend).
 * POST /api/ideas/:id/matches
 */
export const generateInvestorMatches = (ideaId: string, ideaText: string): Promise<InvestorMatch[]> => {
     console.log(`Simulating backend call to Gemini for matches for idea: ${ideaId}`);
     return simulateFetch(() => {
        // This is where your backend would call the actual Gemini API.
        return [
            { vcName: 'Future Ventures', investmentFocus: 'AI & Machine Learning', reason: 'Their portfolio is heavy in AI, matching your core technology.'},
            { vcName: 'GreenGrowth Capital', investmentFocus: 'Sustainability Tech', reason: 'They focus on eco-friendly solutions, aligning with your market.'},
            { vcName: 'Connective Capital', investmentFocus: 'Marketplace & Network Effects', reason: 'Your platform model is a perfect fit for their investment thesis.'},
        ];
     });
};


/**
 * Fetches success stories (would call Gemini on the backend).
 * GET /api/success-stories
 */
export const getSuccessStories = (): Promise<SuccessStory[]> => {
    return simulateFetch(() => {
        return [
            { startupName: "AquaSense", founderName: "Javier Solis", story: "AquaSense developed smart irrigation systems, reducing water waste by 40%.", fundingAmount: "$2.5M Seed", image: "https://picsum.photos/400/300?random=story1" },
            { startupName: "CodeNest", founderName: "Priya Sharma", story: "CodeNest created a collaborative platform for developers, now used by over 50,000 coders.", fundingAmount: "$4M Series A", image: "https://picsum.photos/400/300?random=story2" },
            { startupName: "HealthHub", founderName: "Emily Carter", story: "HealthHub connects patients with specialists, improving access to healthcare in rural areas.", fundingAmount: "$3.2M Seed", image: "https://picsum.photos/400/300?random=story3" }
        ];
    });
};

/**
 * Fetches dashboard stats (would be calculated on the backend).
 * GET /api/dashboard-stats
 */
export const getDashboardStats = (): Promise<{lineData: any[], pieData: any[]}> => {
    return simulateFetch(() => {
        return {
            lineData: [
                { month: 'Jan', users: 150 }, { month: 'Feb', users: 220 }, { month: 'Mar', users: 300 },
                { month: 'Apr', users: 450 }, { month: 'May', users: 600 }, { month: 'Jun', users: 800 }
            ],
            pieData: [
                { name: 'Fintech', value: 400 }, { name: 'Health', value: 300 },
                { name: 'SaaS', value: 300 }, { name: 'AI', value: 200 }, { name: 'Other', value: 100 }
            ]
        };
    });
};

/**
 * Fetches investor profiles (from a database on the backend).
 * GET /api/investors
 */
export const fetchInvestors = (): Promise<InvestorProfile[]> => {
    return simulateFetch(() => {
       return [
            { id: 'vc-001', firmName: 'Catalyst Investors', description: 'A growth equity firm that invests in technology-enabled services.', investmentFocus: ['B2B SaaS', 'AI/ML', 'Future of Work'], stage: 'All Stages', website: 'https://www.catalyst.com/' },
            { id: 'vc-002', firmName: 'Meridian Capital', description: 'Providing financing and capital solutions for commercial real estate.', investmentFocus: ['Fintech', 'Real Estate Tech'], stage: 'Series A', website: 'https://www.meridiancapital.com/' },
            { id: 'vc-003', firmName: 'Apex Partners', description: 'Backing ambitious founders in deep tech and climate solutions.', investmentFocus: ['Deep Tech', 'Climate Tech', 'Robotics'], stage: 'All Stages', website: 'https://www.apex-partners.com/' },
            { id: 'vc-004', firmName: 'Strive VC', description: 'Specializing in consumer mobile, gaming, and creator economy startups.', investmentFocus: ['Consumer Social', 'Gaming'], stage: 'Seed', website: 'https://strive.vc/' },
            { id: 'vc-005', firmName: 'Ascend.vc', description: 'Investing in pre-seed & seed stage Nordic & Baltic B2B SaaS startups.', investmentFocus: ['B2B SaaS', 'Enterprise Software'], stage: 'Seed', website: 'https://ascend.vc/' },
            { id: 'vc-006', firmName: 'Insight Partners', description: 'A global VC investing in high-growth technology and software ScaleUp companies.', investmentFocus: ['Software', 'Internet'], stage: 'All Stages', website: 'https://www.insightpartners.com/' }
        ];
    });
};


// ---------------------------------------------------------------------------------------------------
// import { User, StartupIdea, SuccessStory, InvestorProfile, InvestorMatch } from '../types';

// const API_BASE_URL = 'http://localhost:3001/api'; // The address of your backend server

// // ===================================================================================
// // API SERVICE - PRODUCTION READY
// // This service now makes real HTTP requests to your backend server.
// // ===================================================================================

// const handleResponse = async (response: Response) => {
//     const data = await response.json();
//     if (!response.ok) {
//         // If the server returns an error (e.g., status 400, 401, 500),
//         // throw an error with the message from the server's JSON response.
//         throw new Error(data.message || 'An unknown error occurred.');
//     }
//     return data;
// };

// /**
//  * Handles user signup.
//  * POST /api/auth/signup
//  */
// export const signupUser = async (user: User): Promise<User> => {
//     const response = await fetch(`${API_BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user),
//     });
//     return handleResponse(response);
// };

// /**
//  * Handles user login.
//  * POST /api/auth/login
//  */
// export const loginUser = async (email: string, pass: string): Promise<User> => {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password: pass }),
//     });
//     return handleResponse(response);
// };

// /**
//  * Fetches all ideas.
//  * GET /api/ideas
//  */
// export const getIdeas = async (): Promise<StartupIdea[]> => {
//     const response = await fetch(`${API_BASE_URL}/ideas`);
//     return handleResponse(response);
// };

// /**
//  * Submits a new idea.
//  * POST /api/ideas
//  */
// export const submitIdea = async (ideaData: Partial<StartupIdea>): Promise<StartupIdea> => {
//     const response = await fetch(`${API_BASE_URL}/ideas`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(ideaData),
//     });
//     return handleResponse(response);
// };

// /**
//  * Updates an idea's status.
//  * PUT /api/ideas/:id/status
//  */
// export const updateIdeaStatus = async (ideaId: string, status: 'Accepted' | 'Rejected', vc: User): Promise<StartupIdea> => {
//     const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/status`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status, vc }),
//     });
//     return handleResponse(response);
// };

// /**
//  * Updates a full idea object (e.g., to add matches).
//  * PUT /api/ideas/:id
//  */
// export const updateIdea = async (updatedIdea: StartupIdea): Promise<StartupIdea> => {
//     const response = await fetch(`${API_BASE_URL}/ideas/${updatedIdea.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedIdea),
//     });
//     return handleResponse(response);
// };


// /**
//  * Generates a brief for an idea by calling the backend.
//  * POST /api/ideas/:id/brief
//  */
// export const generateIdeaBrief = async (ideaId: string, ideaText: string): Promise<string> => {
//     const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/brief`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ideaText }),
//     });
//     const data = await handleResponse(response);
//     return data.brief;
// };

// /**
//  * Generates investor matches for an idea by calling the backend.
//  * POST /api/ideas/:id/matches
//  */
// export const generateInvestorMatches = async (ideaId: string, ideaText: string): Promise<InvestorMatch[]> => {
//      const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/matches`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ideaText }),
//      });
//      const data = await handleResponse(response);
//      return data.matches;
// };


// /**
//  * Fetches success stories from the backend.
//  * GET /api/success-stories
//  */
// export const getSuccessStories = async (): Promise<SuccessStory[]> => {
//     const response = await fetch(`${API_BASE_URL}/success-stories`);
//     return handleResponse(response);
// };

// /**
//  * Fetches dashboard stats from the backend.
//  * GET /api/dashboard-stats
//  */
// export const getDashboardStats = async (): Promise<{lineData: any[], pieData: any[]}> => {
//     const response = await fetch(`${API_BASE_URL}/dashboard-stats`);
//     return handleResponse(response);
// };

// /**
//  * Fetches investor profiles from the backend.
//  * GET /api/investors
//  */
// export const fetchInvestors = async (): Promise<InvestorProfile[]> => {
//     const response = await fetch(`${API_BASE_URL}/investors`);
//     return handleResponse(response);
// };

// ------------------------------------------------------------------------------

// import {
//   User,
//   StartupIdea,
//   SuccessStory,
//   InvestorProfile,
//   InvestorMatch
// } from '../types';

// // Keys used for localStorage
// const USERS_KEY = 'venture_connect_users';
// const IDEAS_KEY = 'venture_connect_ideas';

// const MOCK_API_DELAY = 300; // milliseconds

// // Utility: Read from localStorage
// const getDb = <T>(key: string): T[] => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : [];
// };

// // Utility: Write to localStorage
// const saveDb = <T>(key: string, data: T[]): void => {
//   localStorage.setItem(key, JSON.stringify(data));
// };

// // Simulate network latency and backend processing
// const simulateFetch = <T>(action: () => T): Promise<T> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         const result = action();
//         resolve(result);
//       } catch (error) {
//         reject(error);
//       }
//     }, MOCK_API_DELAY);
//   });
// };

// // ==========================================
// // =============== AUTH =====================
// // ==========================================

// // Signup user
// export const signupUser = (user: User): Promise<User> => {
//   return simulateFetch(() => {
//     const users = getDb<User>(USERS_KEY);
//     const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
//     if (exists) throw new Error('A user with this email already exists.');

//     const newUser = { ...user, id: `user-${Date.now()}` };
//     users.push(newUser);
//     saveDb(USERS_KEY, users);

//     const { password, ...userWithoutPassword } = newUser;
//     return userWithoutPassword;
//   });
// };

// // Login user
// export const loginUser = (email: string, password: string): Promise<User> => {
//   return simulateFetch(() => {
//     const users = getDb<User>(USERS_KEY);
//     const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
//     if (!user || user.password !== password) {
//       throw new Error('Invalid email or password.');
//     }
//     const { password: _, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   });
// };

// // ==========================================
// // ============ STARTUP IDEAS ==============
// // ==========================================

// // Get all ideas
// export const getIdeas = (): Promise<StartupIdea[]> => {
//   return simulateFetch(() => {
//     const ideas = getDb<StartupIdea>(IDEAS_KEY);
//     return ideas.sort((a, b) => b.id.localeCompare(a.id));
//   });
// };

// // Submit a new idea
// export const submitIdea = (ideaData: Partial<StartupIdea>): Promise<StartupIdea> => {
//   return simulateFetch(() => {
//     const ideas = getDb<StartupIdea>(IDEAS_KEY);
//     const newIdea: StartupIdea = {
//       id: `idea-${Date.now()}`,
//       status: 'Pending',
//       ...ideaData
//     } as StartupIdea;
//     ideas.unshift(newIdea);
//     saveDb(IDEAS_KEY, ideas);
//     return newIdea;
//   });
// };

// // Update idea status (Accepted or Rejected)
// export const updateIdeaStatus = (
//   ideaId: string,
//   status: 'Accepted' | 'Rejected',
//   vc: User
// ): Promise<StartupIdea> => {
//   return simulateFetch(() => {
//     const ideas = getDb<StartupIdea>(IDEAS_KEY);
//     const index = ideas.findIndex(i => i.id === ideaId);
//     if (index === -1) throw new Error('Idea not found');

//     const updatedIdea = { ...ideas[index], status };
//     updatedIdea.reviewedByVC = {
//       name: vc.name,
//       contact: status === 'Accepted'
//         ? {
//             name: vc.name,
//             email: `${vc.name.toLowerCase().replace(/\s/g, '.') }@strive.vc`,
//             linkedIn: `https://linkedin.com/in/${vc.name.toLowerCase().replace(/\s/g, '')}`
//           }
//         : undefined
//     };

//     ideas[index] = updatedIdea;
//     saveDb(IDEAS_KEY, ideas);
//     return updatedIdea;
//   });
// };

// // Full update of an idea
// export const updateIdea = (updated: StartupIdea): Promise<StartupIdea> => {
//   return simulateFetch(() => {
//     const ideas = getDb<StartupIdea>(IDEAS_KEY);
//     const index = ideas.findIndex(i => i.id === updated.id);
//     if (index === -1) throw new Error('Idea not found for update');
//     ideas[index] = updated;
//     saveDb(IDEAS_KEY, ideas);
//     return updated;
//   });
// };

// // ==========================================
// // ============ GEMINI SIMULATIONS =========
// // ==========================================

// // Generate idea brief (simulated Gemini API)
// export const generateIdeaBrief = (
//   ideaId: string,
//   ideaText: string
// ): Promise<string> => {
//   console.log(`Simulating Gemini brief for idea ${ideaId}`);
//   return simulateFetch(() => {
//     return `This startup aims to solve [Problem] with a [Solution]. It targets the [Market] and has potential due to its [Unique Aspect].`;
//   });
// };

// // Generate investor matches (simulated Gemini)
// export const generateInvestorMatches = (
//   ideaId: string,
//   ideaText: string
// ): Promise<InvestorMatch[]> => {
//   console.log(`Simulating investor matches for idea ${ideaId}`);
//   return simulateFetch(() => [
//     {
//       vcName: 'Future Ventures',
//       investmentFocus: 'AI & Machine Learning',
//       reason: 'Their portfolio is strong in AI, matching your core technology.'
//     },
//     {
//       vcName: 'GreenGrowth Capital',
//       investmentFocus: 'Sustainability Tech',
//       reason: 'They focus on eco solutions, aligned with your market.'
//     },
//     {
//       vcName: 'Connective Capital',
//       investmentFocus: 'Marketplace & Network Effects',
//       reason: 'Your platform model fits their investment thesis.'
//     }
//   ]);
// };

// // ==========================================
// // ============ DASHBOARD DATA =============
// // ==========================================

// export const getDashboardStats = (): Promise<{ lineData: any[]; pieData: any[] }> => {
//   return simulateFetch(() => ({
//     lineData: [
//       { month: 'Jan', users: 150 },
//       { month: 'Feb', users: 220 },
//       { month: 'Mar', users: 300 },
//       { month: 'Apr', users: 450 },
//       { month: 'May', users: 600 },
//       { month: 'Jun', users: 800 }
//     ],
//     pieData: [
//       { name: 'Fintech', value: 400 },
//       { name: 'Health', value: 300 },
//       { name: 'SaaS', value: 300 },
//       { name: 'AI', value: 200 },
//       { name: 'Other', value: 100 }
//     ]
//   }));
// };

// // ==========================================
// // ============= SUCCESS STORIES ===========
// // ==========================================

// export const getSuccessStories = (): Promise<SuccessStory[]> => {
//   return simulateFetch(() => [
//     {
//       startupName: 'AquaSense',
//       founderName: 'Javier Solis',
//       story: 'Smart irrigation systems reducing water waste by 40%.',
//       fundingAmount: '$2.5M Seed',
//       image: 'https://picsum.photos/400/300?random=story1'
//     },
//     {
//       startupName: 'CodeNest',
//       founderName: 'Priya Sharma',
//       story: 'Collaborative platform for developers with 50k+ users.',
//       fundingAmount: '$4M Series A',
//       image: 'https://picsum.photos/400/300?random=story2'
//     },
//     {
//       startupName: 'HealthHub',
//       founderName: 'Emily Carter',
//       story: 'Connecting rural patients with doctors online.',
//       fundingAmount: '$3.2M Seed',
//       image: 'https://picsum.photos/400/300?random=story3'
//     }
//   ]);
// };

// // ==========================================
// // ============ INVESTOR LIST ==============
// // ==========================================

// export const fetchInvestors = (): Promise<InvestorProfile[]> => {
//   return simulateFetch(() => [
//     {
//       id: 'vc-001',
//       firmName: 'Catalyst Investors',
//       description: 'Invests in tech-enabled services.',
//       investmentFocus: ['B2B SaaS', 'AI/ML', 'Future of Work'],
//       stage: 'All Stages',
//       website: 'https://www.catalyst.com/'
//     },
//     {
//       id: 'vc-002',
//       firmName: 'Meridian Capital',
//       description: 'Financing commercial real estate tech.',
//       investmentFocus: ['Fintech', 'Real Estate Tech'],
//       stage: 'Series A',
//       website: 'https://www.meridiancapital.com/'
//     },
//     {
//       id: 'vc-003',
//       firmName: 'Apex Partners',
//       description: 'Deep tech and climate solutions.',
//       investmentFocus: ['Deep Tech', 'Climate Tech', 'Robotics'],
//       stage: 'All Stages',
//       website: 'https://www.apex-partners.com/'
//     },
//     {
//       id: 'vc-004',
//       firmName: 'Strive VC',
//       description: 'Mobile, gaming, and creator economy.',
//       investmentFocus: ['Consumer Social', 'Gaming'],
//       stage: 'Seed',
//       website: 'https://strive.vc/'
//     },
//     {
//       id: 'vc-005',
//       firmName: 'Ascend.vc',
//       description: 'Nordic & Baltic B2B SaaS investments.',
//       investmentFocus: ['B2B SaaS', 'Enterprise Software'],
//       stage: 'Seed',
//       website: 'https://ascend.vc/'
//     },
//     {
//       id: 'vc-006',
//       firmName: 'Insight Partners',
//       description: 'Global VC in high-growth software.',
//       investmentFocus: ['Software', 'Internet'],
//       stage: 'All Stages',
//       website: 'https://www.insightpartners.com/'
//     }
//   ]);
// };
