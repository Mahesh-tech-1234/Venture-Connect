
import React from 'react';

const ValueCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-emerald-green font-poppins mb-3">{title}</h3>
        <p className="text-accent-gray dark:text-gray-400">{children}</p>
    </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-deep-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 dark:text-white">About Venture Connect</h1>
          <p className="mt-4 text-lg text-accent-gray dark:text-gray-300 max-w-3xl mx-auto">
            We are dedicated to building a more equitable and innovative future by democratizing access to capital and opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://picsum.photos/800/600?random=1" 
              alt="Diverse team collaborating" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-poppins text-gray-800 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-accent-gray dark:text-gray-400 mb-6">
              To empower underrepresented founders by providing them with direct pathways to funding, mentorship, and a community that champions their success. We believe the most brilliant ideas can come from anywhere, and we're here to ensure they get the chance to flourish.
            </p>
            <h2 className="text-3xl font-bold font-poppins text-gray-800 dark:text-white mb-4">Our Vision</h2>
            <p className="text-lg text-accent-gray dark:text-gray-400">
              To create a global startup ecosystem where a founder's potential is judged solely on their vision and execution, not their background, gender, or ethnicity. A future where innovation is truly inclusive.
            </p>
          </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center text-gray-800 dark:text-white mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <ValueCard title="Inclusivity">
                    We actively cultivate a community where everyone feels welcome, respected, and valued. Diversity is our strength.
                </ValueCard>
                <ValueCard title="Empowerment">
                    We provide founders with the tools, knowledge, and network they need to take control of their destiny and build great companies.
                </ValueCard>
                <ValueCard title="Innovation">
                    We are relentless in our pursuit of a better way, both in the startups we support and the platform we build.
                </ValueCard>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
