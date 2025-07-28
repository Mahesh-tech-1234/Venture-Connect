
import React from 'react';

const ServiceSection: React.FC<{ icon: string; title: string; children: React.ReactNode; image: string; reverse?: boolean }> = ({ icon, title, children, image, reverse = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
            <img src={image} alt={title} className="rounded-lg shadow-xl w-full" />
        </div>
        <div className="md:w-1/2">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-3xl font-bold font-poppins text-gray-800 dark:text-white mb-4">{title}</h3>
            <p className="text-lg text-accent-gray dark:text-gray-400">{children}</p>
        </div>
    </div>
);


const ServicesPage: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-deep-blue">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-gray-900 dark:text-white">Our Services</h1>
          <p className="mt-4 text-lg text-accent-gray dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive suite of tools and programs designed to accelerate your growth at every stage.
          </p>
        </div>

        <div className="space-y-24">
            <ServiceSection icon="🚀" title="Startup-Investor Matching Engine" image="https://picsum.photos/800/600?random=2">
                Our intelligent, data-driven platform goes beyond simple introductions. We analyze your business model, traction, and goals to connect you with VCs actively seeking opportunities in your space, ensuring every connection is meaningful.
            </ServiceSection>

            <ServiceSection icon="👩‍🏫" title="Mentorship Programs" image="https://picsum.photos/800/600?random=3" reverse>
                Gain invaluable insights from those who have been there before. Our mentorship program pairs you with experienced founders, C-level executives, and domain experts for one-on-one guidance tailored to your specific challenges.
            </ServiceSection>

            <ServiceSection icon="🎓" title="Educational Courses & Workshops" image="https://picsum.photos/800/600?random=4">
                Stay ahead of the curve with our library of on-demand courses and live workshops. From mastering go-to-market strategies to navigating the complexities of fundraising, our content is designed to be practical and actionable.
            </ServiceSection>

            <ServiceSection icon="💼" title="Legal & Funding Guidance" image="https://picsum.photos/800/600?random=5" reverse>
                Demystify the legal and financial aspects of building a startup. We provide access to templates, expert-led sessions on cap tables and term sheets, and connections to trusted legal and financial advisors.
            </ServiceSection>
            
             <ServiceSection icon="🤝" title="Community & Support" image="https://picsum.photos/800/600?random=6">
                You're not alone on this journey. Join exclusive peer groups, attend networking events, and engage in a supportive online community where you can share wins, ask for help, and build lasting relationships with fellow founders.
            </ServiceSection>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
