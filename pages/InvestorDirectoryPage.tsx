import React, { useState, useEffect, useCallback } from 'react';
import { InvestorProfile } from '../types';
import { fetchInvestors } from '../services/apiService';

const InvestorProfileCard: React.FC<{ profile: InvestorProfile }> = ({ profile }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex-grow">
            <h3 className="text-2xl font-bold font-poppins text-emerald-green">{profile.firmName}</h3>
            <p className="text-sm font-semibold text-accent-gray dark:text-gray-400 mb-3">Stage: {profile.stage}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{profile.description}</p>
            <div className="mb-4">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Investment Focus:</h4>
                <div className="flex flex-wrap gap-2">
                    {profile.investmentFocus.map(focus => (
                        <span key={focus} className="text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">{focus}</span>
                    ))}
                </div>
            </div>
        </div>
        <a 
            href={profile.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto w-full text-center bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
        >
            Visit Website
        </a>
    </div>
);

const InvestorDirectoryPage: React.FC = () => {
    const [investors, setInvestors] = useState<InvestorProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadInvestors = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchInvestors();
            setInvestors(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to load investor data: ${errorMessage}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInvestors();
    }, [loadInvestors]);

    return (
        <div className="py-16 bg-gray-50 dark:bg-deep-blue">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 dark:text-white">Investor Directory</h1>
                    <p className="mt-4 text-lg text-accent-gray dark:text-gray-300 max-w-3xl mx-auto">
                        Explore our curated network of venture capitalists and investment firms.
                    </p>
                </div>

                {loading && (
                    <div className="text-center">
                        <div className="spinner border-4 border-t-4 border-gray-200 border-t-emerald-500 rounded-full w-12 h-12 animate-spin mx-auto"></div>
                        <p className="mt-4 text-lg text-accent-gray dark:text-gray-300">Fetching live market data...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {investors.map((profile) => (
                            <InvestorProfileCard key={profile.id} profile={profile} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestorDirectoryPage;