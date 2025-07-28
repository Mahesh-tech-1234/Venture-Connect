import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, StartupIdea, InvestorMatch } from '../types';
import { useApplication } from '../contexts/ApplicationContext';
import { generateIdeaBrief } from '../services/apiService';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';

// --- Entrepreneur Dashboard ---
const EntrepreneurDashboard: React.FC = () => {
    const { user } = useAuth();
    const { ideas, submitIdea } = useApplication();
    const [idea, setIdea] = useState('');

    const handleSubmitIdea = (e: React.FormEvent) => {
        e.preventDefault();
        if (!idea.trim() || !user) return;
        submitIdea(idea, user);
        setIdea('');
    };

    const myIdeas = useMemo(() => {
        if (!user) return [];
        return ideas.filter(i => i.entrepreneur.email === user.email);
    }, [ideas, user]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Ideas Submitted" value={myIdeas.length.toString()} />
                <StatCard title="Mentor Sessions" value="2" />
                <StatCard title="Network Connections" value="47" />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold font-poppins mb-4">Submit Your Idea for Review</h3>
                <form onSubmit={handleSubmitIdea} className="space-y-4">
                    <textarea
                        value={idea}
                        onChange={e => setIdea(e.target.value)}
                        placeholder="Describe your startup idea, the problem you're solving, your target market, and any traction you have..."
                        className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                    <button type="submit" className="px-6 py-2 bg-emerald-green text-white font-bold rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Submit for Review
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                 <h3 className="text-2xl font-bold font-poppins">My Submissions</h3>
                 {myIdeas.length > 0 ? (
                    myIdeas.map(i => <IdeaStatusCard key={i.id} idea={i} />)
                 ) : (
                    <p className="text-accent-gray dark:text-gray-400">You haven't submitted any ideas yet.</p>
                 )}
            </div>
        </div>
    );
};

const InvestorMatchCard: React.FC<{ match: InvestorMatch }> = ({ match }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h5 className="font-bold text-gray-800 dark:text-gray-100">{match.vcName}</h5>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{match.investmentFocus}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{match.reason}</p>
    </div>
);

const IdeaStatusCard: React.FC<{ idea: StartupIdea }> = ({ idea }) => {
    const { findMatchesForIdea } = useApplication();
    const [loadingMatches, setLoadingMatches] = useState(false);

    const handleFindMatches = async () => {
        setLoadingMatches(true);
        await findMatchesForIdea(idea.id);
        setLoadingMatches(false);
    };

    const getStatusInfo = () => {
        switch (idea.status) {
            case 'Accepted':
                return {
                    className: 'bg-emerald-100 dark:bg-emerald-900 border-l-4 border-emerald-500',
                    title: `Congratulations! Your idea was accepted by ${idea.reviewedByVC?.name}.`,
                    text: 'text-emerald-800 dark:text-emerald-200'
                };
            case 'Rejected':
                return {
                    className: 'bg-red-100 dark:bg-red-900 border-l-4 border-red-500',
                    title: `Update: ${idea.reviewedByVC?.name} has reviewed your submission.`,
                    text: 'text-red-800 dark:text-red-200'
                };
            default: // Pending
                return {
                    className: 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500',
                    title: 'Your idea is pending review.',
                    text: 'text-blue-800 dark:text-blue-200'
                };
        }
    };
    const statusInfo = getStatusInfo();

    return (
        <div className={`p-4 rounded-lg shadow-md ${statusInfo.className}`}>
            <p className="font-bold text-gray-800 dark:text-gray-200">Your Idea:</p>
            <p className="italic text-gray-600 dark:text-gray-400 mb-4 truncate">"{idea.idea}"</p>
            <p className={`font-semibold ${statusInfo.text}`}>{statusInfo.title}</p>
            {idea.status === 'Accepted' && idea.reviewedByVC?.contact && (
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-bold">Next Steps:</p>
                    <p>You can reach out to {idea.reviewedByVC.contact.name} to schedule a meeting:</p>
                    <ul className="list-disc list-inside ml-2 mt-1">
                        <li>Email: <a href={`mailto:${idea.reviewedByVC.contact.email}`} className="text-emerald-600 hover:underline">{idea.reviewedByVC.contact.email}</a></li>
                        <li>LinkedIn: <a href={idea.reviewedByVC.contact.linkedIn} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">{idea.reviewedByVC.contact.linkedIn}</a></li>
                    </ul>
                </div>
            )}
            
            {idea.status !== 'Rejected' && (
                <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                    {idea.matches ? (
                        <div className="space-y-3">
                           <h4 className="font-bold text-gray-800 dark:text-gray-200">Potential Investor Matches:</h4>
                           {idea.matches.map((match, index) => <InvestorMatchCard key={index} match={match} />)}
                        </div>
                    ) : (
                         <button onClick={handleFindMatches} disabled={loadingMatches} className="px-4 py-2 text-sm font-semibold text-white bg-soft-gold rounded-md hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed">
                             {loadingMatches ? 'Finding Matches...' : 'Find Investor Matches'}
                         </button>
                    )}
                </div>
            )}
        </div>
    );
};


// --- VC Dashboard ---
const PortfolioCard: React.FC<{ idea: StartupIdea }> = ({ idea }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{idea.idea}</p>
        <p className="text-sm text-accent-gray dark:text-gray-400">
            Founder: {idea.entrepreneur.name} ({idea.entrepreneur.email})
        </p>
    </div>
);

const VCDashboard: React.FC = () => {
    const { user } = useAuth();
    const { ideas, updateIdeaStatus } = useApplication();

    const pendingIdeas = useMemo(() => ideas.filter(i => i.status === 'Pending'), [ideas]);
    const portfolioIdeas = useMemo(() => {
        if (!user) return [];
        return ideas.filter(i => i.status === 'Accepted' && i.reviewedByVC?.name === user.name);
    }, [ideas, user]);


    const handleUpdateStatus = (ideaId: string, status: 'Accepted' | 'Rejected') => {
        if (!user) return;
        updateIdeaStatus(ideaId, status, user);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="New Submissions" value={pendingIdeas.length.toString()} />
                <StatCard title="Matches Accepted" value={portfolioIdeas.length.toString()} />
                <StatCard title="Deals in Pipeline" value="2" />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <h3 className="text-2xl font-bold font-poppins mb-4">Pending Submissions</h3>
                 <div className="space-y-6">
                    {pendingIdeas.length > 0 ? (
                        pendingIdeas.map(idea => (
                            <VCIdeaCard key={idea.id} idea={idea} onUpdateStatus={handleUpdateStatus} />
                        ))
                    ) : (
                        <p className="text-accent-gray dark:text-gray-400">No pending submissions at the moment.</p>
                    )}
                 </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold font-poppins mb-4">My Portfolio</h3>
                <div className="space-y-4">
                    {portfolioIdeas.length > 0 ? (
                        portfolioIdeas.map(idea => <PortfolioCard key={idea.id} idea={idea} />)
                    ) : (
                        <p className="text-accent-gray dark:text-gray-400">You haven't accepted any ideas yet.</p>
                    )}
                </div>
            </div>
            
            <DashboardChart />
        </div>
    );
};

const VCIdeaCard: React.FC<{ idea: StartupIdea, onUpdateStatus: (id: string, status: 'Accepted' | 'Rejected') => void }> = ({ idea, onUpdateStatus }) => {
    const [brief, setBrief] = useState('');
    const [loadingBrief, setLoadingBrief] = useState(false);
    const [error, setError] = useState('');

    const getBrief = async () => {
        setLoadingBrief(true);
        setError('');
        try {
            const generatedBrief = await generateIdeaBrief(idea.id, idea.idea);
            setBrief(generatedBrief);
        } catch (err) {
            setError('Could not generate brief.');
        } finally {
            setLoadingBrief(false);
        }
    };
    
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-sm text-accent-gray dark:text-gray-400">From: <span className="font-medium text-gray-700 dark:text-gray-300">{idea.entrepreneur.name}</span></p>
            <p className="mt-2 text-gray-800 dark:text-gray-200">{idea.idea}</p>
            
            {brief && (
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/50 rounded-md">
                    <p className="font-bold text-emerald-800 dark:text-emerald-200">AI Brief:</p>
                    <p className="italic text-emerald-700 dark:text-emerald-300">{brief}</p>
                </div>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            
            <div className="flex items-center gap-4 mt-4">
                <button
                    onClick={getBrief}
                    disabled={loadingBrief}
                    className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-md hover:bg-emerald-200 disabled:opacity-50"
                >
                    {loadingBrief ? 'Generating...' : 'Generate Brief'}
                </button>
                <div className="flex-grow" />
                <button
                    onClick={() => onUpdateStatus(idea.id, 'Rejected')}
                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    Reject
                </button>
                 <button
                    onClick={() => onUpdateStatus(idea.id, 'Accepted')}
                    className="px-4 py-2 text-sm font-bold text-white bg-emerald-green rounded-md hover:bg-emerald-600"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

// --- Main Dashboard Page ---
const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="bg-gray-50 dark:bg-deep-blue min-h-full py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900 dark:text-white mb-2">
            Welcome, {user.name}!
        </h1>
        <p className="text-lg text-accent-gray dark:text-gray-300 mb-8">
            You are logged in as a <span className="font-bold text-emerald-green">{user.role}</span>.
        </p>
        
        {user.role === UserRole.Entrepreneur ? <EntrepreneurDashboard /> : <VCDashboard />}

      </div>
    </div>
  );
};

export default DashboardPage;