"use client";

import React from 'react';
import { Store, Palette, Megaphone, Users, TriangleAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Store,
    title: 'Retail Signage Solutions',
    description: 'Custom-designed signage that makes your brand stand out in any retail environment.',
    items: [],
  },
  {
    icon: Palette,
    title: 'In-shop Branding Mastery',
    description: 'Transform your space with cohesive branding elements that create memorable experiences.',
    items: [],
  },
  {
    icon: Megaphone,
    title: 'Custom Advertising Strategies',
    description: 'Tailored advertising solutions that amplify your brand message and drive engagement.',
    items: [],
  },
  {
    icon: Users,
    title: 'Brand Visibility Consultation',
    description: "Expert guidance to maximize your brand's impact and reach your target audience effectively.",
    items: [],
  },
];

const highwayService = {
  icon: TriangleAlert,
  title: 'Highway Radium Signage',
  description: 'High-visibility radium signage solutions designed for highway safety and compliance — engineered to perform in all conditions, day and night.',
  items: [
    'Information Sign Boards',
    'Cautionary Sign Boards',
    'Gantry',
    'Delineator',
    'Road Studs / Solar Studs / Cats Eye',
    'Traffic Cones',
    'Spring Posts',
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive signage and branding solutions to help your business make a lasting impression.
          </p>
        </motion.div>

        {/* Core Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="group p-6 sm:p-8 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  backgroundColor: '#fff',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                }}
              >
                <motion.div
                  className="mb-5 transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF3D00]" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Highway Radium Signage — Full-width featured card */}
        <motion.div
          className="mt-8 sm:mt-10 rounded-2xl overflow-hidden border border-[#FF3D00]/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Card top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF3D00] via-orange-400 to-[#FF3D00]" />

          <div className="bg-gray-50 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Left: Title + Description */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF3D00]/10 border border-[#FF3D00]/20">
                  <TriangleAlert className="w-7 h-7 text-[#FF3D00]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF3D00]">
                    Category D
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                    {highwayService.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {highwayService.description}
              </p>
            </div>

            {/* Right: Bullet list */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Products &amp; Solutions
              </p>
              <ul className="space-y-2.5">
                {highwayService.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3D00] text-white text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
