import React from 'react';
import { Award, Users, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { icon: Award, label: 'Years of Experience', value: '10+' },
    { icon: Users, label: 'Happy Clients', value: '200+' },
    { icon: Target, label: 'Projects Completed', value: '500+' },
    { icon: Zap, label: 'Cities Covered', value: '25+' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-delay="100">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Transforming Spaces with
              <motion.span 
                className="text-[#FF3D00]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              > Innovative Signage</motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Founded with a vision to redefine visual branding, Yashashvi Advertising 
              started as a small team of passionate designers and has now grown into a 
              leader in signage solutions, serving over 200 clients nationwide.
            </motion.p>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {['Innovation First', 'Quality Commitment', 'Customer Success'].map((title, i) => (
                <motion.div 
                  key={i}
                  className="flex items-start space-x-4"
                  data-aos="fade-up" 
                  data-aos-delay={200 + i * 100} 
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#FF3D00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600">
                      {title === 'Innovation First' && 'Pushing boundaries with cutting-edge signage solutions.'}
                      {title === 'Quality Commitment' && 'Uncompromising standards in every project we deliver.'}
                      {title === 'Customer Success' && 'Your vision, amplified through our expertise.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  data-aos="zoom-in"
                  data-aos-delay={150 * (index + 1)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="w-10 h-10 text-[#FF3D00] mb-4" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
