
import React from 'react';
import { Event } from '../types';

const DUMMY_EVENTS: Event[] = [
    {
        id: 1,
        title: "Mastering Your Pitch Deck",
        date: "October 28, 2024 - 4:00 PM GMT",
        description: "Join our interactive workshop to learn the art and science of creating a compelling pitch deck that gets investors' attention.",
        type: "Workshop",
        link: "#"
    },
    {
        id: 2,
        title: "Founder Fireside Chat with Sarah Chen",
        date: "November 5, 2024 - 6:00 PM GMT",
        description: "An exclusive conversation with Sarah Chen, founder of InnovateAI, on her journey from idea to a $100M valuation.",
        type: "Webinar",
        link: "#"
    },
    {
        id: 3,
        title: "VC & Founder Speed Networking",
        date: "November 15, 2024 - 5:00 PM GMT",
        description: "Our signature event returns! Meet and greet with top-tier VCs and fellow founders in a fast-paced, virtual setting.",
        type: "Networking",
        link: "#"
    },
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const typeColor = {
        'Workshop': 'bg-soft-gold text-deep-blue',
        'Webinar': 'bg-emerald-green text-white',
        'Networking': 'bg-deep-blue text-white dark:bg-gray-700'
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">{event.title}</h3>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${typeColor[event.type]}`}>{event.type}</span>
                </div>
                <p className="text-sm text-accent-gray dark:text-gray-400 mb-4">{event.date}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{event.description}</p>
            </div>
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-auto w-full text-center bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors">
                Register Now
            </a>
        </div>
    );
}

const EventsPage: React.FC = () => {
    return (
        <div className="py-16 bg-gray-50 dark:bg-deep-blue">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 dark:text-white">Events & Webinars</h1>
                    <p className="mt-4 text-lg text-accent-gray dark:text-gray-300 max-w-3xl mx-auto">
                        Connect, learn, and grow with our curated events for the startup community.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DUMMY_EVENTS.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
