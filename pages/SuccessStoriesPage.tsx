import React, { useState, useEffect, useCallback } from 'react';
import { getSuccessStories } from '../services/apiService';
import { SuccessStory } from '../types';

const StoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={story.image} alt={story.startupName} className="w-full h-48 object-cover"/>
        <div className="p-6">
            <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">{story.startupName}</h3>
            <p className="text-sm text-accent-gray dark:text-gray-400 mb-2">Founder: {story.founderName}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{story.story}</p>
            <div className="text-center bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold py-2 px-4 rounded-full">
                Funded: {story.fundingAmount}
            </div>
        </div>
    </div>
);

const SuccessStoriesPage: React.FC = () => {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const generatedStories = await getSuccessStories();
            setStories(generatedStories);
        } catch (err) {
            setError('Failed to load success stories. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    return (
        <div className="py-16 bg-gray-50 dark:bg-deep-blue">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 dark:text-white">Success Stories</h1>
                    <p className="mt-4 text-lg text-accent-gray dark:text-gray-300 max-w-3xl mx-auto">
                        Real stories from visionary founders who accelerated their journey with Venture Connect.
                    </p>
                </div>

                {loading && (
                    <div className="text-center">
                        <div className="spinner border-4 border-t-4 border-gray-200 border-t-emerald-500 rounded-full w-12 h-12 animate-spin mx-auto"></div>
                        <p className="mt-4 text-lg text-accent-gray dark:text-gray-300">Generating inspiring stories...</p>
                    </div>
                )}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story, index) => (
                            <StoryCard key={index} story={story} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessStoriesPage;