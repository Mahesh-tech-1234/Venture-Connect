import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { StartupIdea, User } from '../types';
import * as api from '../services/apiService';


interface ApplicationContextType {
  ideas: StartupIdea[];
  submitIdea: (ideaText: string, entrepreneur: User) => Promise<void>;
  updateIdeaStatus: (ideaId: string, status: 'Accepted' | 'Rejected', vc: User) => Promise<void>;
  findMatchesForIdea: (ideaId: string) => Promise<void>;
  isLoading: boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ideas, setIdeas] = useState<StartupIdea[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadIdeas = async () => {
            setIsLoading(true);
            try {
                const storedIdeas = await api.getIdeas();
                setIdeas(storedIdeas);
            } catch (error) {
                console.error("Failed to load ideas:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadIdeas();
    }, []);

    const submitIdea = useCallback(async (ideaText: string, entrepreneur: User) => {
        const newIdeaPartial = {
            idea: ideaText,
            entrepreneur: {
                name: entrepreneur.name,
                email: entrepreneur.email
            }
        };
        const savedIdea = await api.submitIdea(newIdeaPartial);
        setIdeas(prevIdeas => [savedIdea, ...prevIdeas]);
    }, []);

    const updateIdeaStatus = useCallback(async (ideaId: string, status: 'Accepted' | 'Rejected', vc: User) => {
        const ideaToUpdate = ideas.find(i => i.id === ideaId);
        if (!ideaToUpdate) return;

        const savedIdea = await api.updateIdeaStatus(ideaId, status, vc);
        setIdeas(prevIdeas => prevIdeas.map(i => (i.id === ideaId ? savedIdea : i)));
    }, [ideas]);

    const findMatchesForIdea = useCallback(async (ideaId: string) => {
        const ideaToMatch = ideas.find(i => i.id === ideaId);
        if (!ideaToMatch) {
            console.error("Idea not found");
            return;
        }

        try {
            const matches = await api.generateInvestorMatches(ideaToMatch.id, ideaToMatch.idea);
            const updatedIdea = { ...ideaToMatch, matches };
            
            // Persist the matches to the backend
            const savedIdea = await api.updateIdea(updatedIdea);
            
            setIdeas(prevIdeas =>
                prevIdeas.map(idea =>
                    idea.id === ideaId ? savedIdea : idea
                )
            );
        } catch (error) {
            console.error("Failed to fetch investor matches:", error);
        }
    }, [ideas]);

    return (
        <ApplicationContext.Provider value={{ ideas, submitIdea, updateIdeaStatus, findMatchesForIdea, isLoading }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplication = (): ApplicationContextType => {
    const context = useContext(ApplicationContext);
    if (context === undefined) {
        throw new Error('useApplication must be used within an ApplicationProvider');
    }
    return context;
};