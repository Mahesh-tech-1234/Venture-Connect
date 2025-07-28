import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_LOGOS, ACTIVE_FUNDERS } from '../constants';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="text-emerald-green text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold font-poppins mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-accent-gray dark:text-gray-400">{description}</p>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-deep-blue text-center py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-200 dark:bg-grid-gray-700 [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]"></div>
        <div className="container mx-auto px-6 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold font-poppins text-gray-900 dark:text-white leading-tight">
            Connecting <span className="text-emerald-green">Visionaries</span>.
            <br />
            Fueling <span className="text-soft-gold">Innovation</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-accent-gray dark:text-gray-300">
            Venture Connect is the launchpad for diverse startups, enabling founders from all backgrounds to connect with the right investors, mentors, and resources to thrive.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/join"
              className="bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-transform duration-300 transform hover:scale-105"
            >
              Join as a Founder
            </Link>
            <Link
              to="/join"
              className="bg-soft-gold text-deep-blue font-bold py-3 px-8 rounded-full hover:bg-amber-400 transition-transform duration-300 transform hover:scale-105"
            >
              Join as an Investor
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-deep-blue">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 dark:text-white">A Platform Built for Growth</h2>
            <p className="mt-4 text-lg text-accent-gray dark:text-gray-400 max-w-2xl mx-auto">
              We provide the tools, network, and support system to turn ambitious ideas into market-leading companies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🚀"
              title="Startup-Investor Matching"
              description="Our AI-powered engine connects you with VCs whose investment thesis aligns with your vision."
            />
            <FeatureCard
              icon="👩‍🏫"
              title="Expert Mentorship"
              description="Access a curated network of seasoned entrepreneurs and industry experts ready to guide you."
            />
            <FeatureCard
              icon="🎓"
              title="Educational Resources"
              description="From pitch deck workshops to term sheet negotiations, our courses cover every stage of your journey."
            />
            <FeatureCard
              icon="🤝"
              title="Vibrant Community"
              description="Join a diverse and inclusive community of peers for support, collaboration, and networking."
            />
          </div>
        </div>
      </section>

      {/* Active Funders Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 dark:text-white mb-4">
            Backed By Leading Investors
          </h2>
          <p className="mt-4 text-lg text-accent-gray dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Our network includes some of the most respected and active venture capitalists in the industry.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center">
            {ACTIVE_FUNDERS.map((funder) => (
              <a
                key={funder.name}
                href={funder.href}
                target={funder.href === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={funder.name}
                className="text-gray-500 dark:text-gray-400 hover:text-emerald-green dark:hover:text-emerald-green transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2"
              >
                <funder.LogoComponent className="h-10 w-auto mx-auto" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white dark:bg-deep-blue">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-sm font-bold uppercase text-accent-gray dark:text-gray-400 tracking-wider mb-10">
            Powering the next wave of innovators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 items-center">
            {COMPANY_LOGOS.map((company) => (
              <a
                key={company.name}
                href={company.href}
                target={company.href === '#' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={company.name}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2"
              >
                <company.LogoComponent className="h-8 w-auto mx-auto" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-emerald-green">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white font-poppins">Ready to build the future?</h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">Join Venture Connect today and get the support you need to make your vision a reality.</p>
            <Link
              to="/join"
              className="mt-8 inline-block bg-white text-emerald-green font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;