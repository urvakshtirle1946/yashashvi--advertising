import React from 'react';
import { Store, Palette, Megaphone, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Store,
    title: 'Retail Signage Solutions',
    description: 'Custom-designed signage that makes your brand stand out in any retail environment.'
  },
  {
    icon: Palette,
    title: 'In-shop Branding Mastery',
    description: 'Transform your space with cohesive branding elements that create memorable experiences.'
  },
  {
    icon: Megaphone,
    title: 'Custom Advertising Strategies',
    description: 'Tailored advertising solutions that amplify your brand message and drive engagement.'
  },
  {
    icon: Users,
    title: 'Brand Visibility Consultation',
    description: "Expert guidance to maximize your brand’s impact and reach your target audience effectively."
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive signage and branding solutions to help your business make a lasting impression.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon; // Fix for JSX compatibility
            return (
              <motion.div 
                key={index} 
                className="group p-8 bg-gray-50 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  backgroundColor: "#fff",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="mb-6 transform transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <IconComponent className="w-12 h-12 text-[#FF3D00]" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
