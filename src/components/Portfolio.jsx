import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { title: 'Retail Store Signage', category: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80' },
  { title: 'Shopping Mall Directory', category: 'Wayfinding', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80' },
  { title: 'Restaurant Branding', category: 'Food & Beverage', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80' },
];

const allCategories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(12);
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 12, filteredProjects.length));
  };

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our diverse collection of signage and branding projects.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allCategories.map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleProjects(12);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#FF3D00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto -ml-4"
              columnClassName="pl-4 bg-clip-padding"
            >
              {displayedProjects.map((project, index) => (
                <motion.div key={index} className="mb-4">
                  <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="aspect-w-3 aspect-h-4">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <div>
                        <div className="text-sm text-[#FF3D00] font-medium mb-2">{project.category}</div>
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>
        
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <button onClick={loadMore} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200">
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
