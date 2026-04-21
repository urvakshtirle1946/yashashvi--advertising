"use client";

import React from 'react';
import InteractiveImageBentoGallery from './ui/bento-gallery';

const imageItems = [
  {
    id: 1,
    title: "Retail Store Signage",
    desc: "High-impact facade signage for retail brands.",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Glow Sign Board",
    desc: "Vibrant illuminated boards for night visibility.",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 3,
    title: "3D Letter Branding",
    desc: "Dimensional letters that make a bold statement.",
    url: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 4,
    title: "Billboard Campaign",
    desc: "Large-format outdoor advertising that dominates.",
    url: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=800&q=80",
    span: "md:row-span-2",
  },
  {
    id: 5,
    title: "Restaurant Branding",
    desc: "Complete visual identity for food & beverage outlets.",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    span: "md:row-span-1",
  },
  {
    id: 6,
    title: "Shopping Mall Directory",
    desc: "Wayfinding systems for large commercial spaces.",
    url: "https://images.unsplash.com/photo-1519566335030-5c96e4d4129f?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-2 md:row-span-1",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio">
      <InteractiveImageBentoGallery
        imageItems={imageItems}
        title="Our Portfolio"
        description="Explore our work across signage, branding, and large-format advertising. Drag to explore, click to expand."
      />
    </section>
  );
};

export default Portfolio;
