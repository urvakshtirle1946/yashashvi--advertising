"use client";

import React from 'react';
import InteractiveImageBentoGallery from './ui/bento-gallery';

const SUPABASE_URL = 'https://oyjhphtepgrvrbytbais.supabase.co'
const BUCKET = 'gallery'

/** Returns the Supabase public storage URL for a gallery file */
const asset = (filename) =>
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filename)}`

const galleryItems = [
  // ── Images ──
  { id: 1,  title: "Signage Project",       desc: "Premium outdoor signage installation.",      url: asset("WhatsApp Image 2026-04-21 at 9.49.51 PM.jpeg"),  span: "md:col-span-2 md:row-span-2", type: "image" },
  { id: 2,  title: "Brand Display",          desc: "Eye-catching brand display solution.",        url: asset("WhatsApp Image 2026-04-21 at 9.50.05 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 3,  title: "LED Signage",            desc: "Vibrant LED signage for night visibility.",   url: asset("WhatsApp Image 2026-04-21 at 9.52.01 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 4,  title: "Glow Board",             desc: "Custom glow board fabrication.",              url: asset("WhatsApp Image 2026-04-21 at 9.53.29 PM.jpeg"),  span: "md:row-span-2",              type: "image" },
  { id: 5,  title: "3D Letters",             desc: "Bold 3D letter branding.",                   url: asset("WhatsApp Image 2026-04-21 at 9.53.46 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 6,  title: "Shop Facade",            desc: "Complete shop facade branding.",              url: asset("WhatsApp Image 2026-04-21 at 9.54.30 PM.jpeg"),  span: "md:col-span-2 md:row-span-1",type: "image" },
  { id: 7,  title: "Billboard Campaign",     desc: "Large-format outdoor advertising.",           url: asset("WhatsApp Image 2026-04-21 at 9.55.01 PM.jpeg"),  span: "md:col-span-2 md:row-span-2",type: "image" },
  { id: 8,  title: "Retail Branding",        desc: "In-shop retail branding execution.",          url: asset("WhatsApp Image 2026-04-21 at 9.55.46 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 9,  title: "Neon Sign",              desc: "Custom neon signage fabrication.",            url: asset("WhatsApp Image 2026-04-21 at 9.56.20 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 10, title: "Corporate Branding",     desc: "Office branding and signage.",                url: asset("WhatsApp Image 2026-04-21 at 9.56.37 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 11, title: "Hoarding Design",        desc: "Large hoarding design and installation.",     url: asset("WhatsApp Image 2026-04-21 at 9.57.22 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 12, title: "Flex Board",             desc: "High-quality flex board printing.",           url: asset("WhatsApp Image 2026-04-21 at 9.57.50 PM.jpeg"),  span: "md:row-span-2",              type: "image" },
  { id: 13, title: "Outdoor Signage",        desc: "Weather-resistant outdoor display.",          url: asset("WhatsApp Image 2026-04-21 at 9.58.49 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 14, title: "Shop Name Board",        desc: "Elegant name board with lighting.",           url: asset("WhatsApp Image 2026-04-21 at 9.59.30 PM.jpeg"),  span: "md:row-span-1",              type: "image" },
  { id: 15, title: "Acrylic Letters",        desc: "Premium acrylic letter installation.",        url: asset("WhatsApp Image 2026-04-21 at 10.00.04 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 16, title: "Brand Identity",         desc: "Full brand identity on-site execution.",      url: asset("WhatsApp Image 2026-04-21 at 10.00.30 PM.jpeg"), span: "md:col-span-2 md:row-span-1",type: "image" },
  { id: 17, title: "Wall Branding",          desc: "Creative wall branding design.",              url: asset("WhatsApp Image 2026-04-21 at 10.00.47 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 18, title: "Digital Display",        desc: "Digital signage display setup.",              url: asset("WhatsApp Image 2026-04-21 at 10.01.29 PM.jpeg"), span: "md:row-span-2",              type: "image" },
  { id: 19, title: "Entrance Branding",      desc: "Impactful entrance display design.",          url: asset("WhatsApp Image 2026-04-21 at 10.02.08 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 20, title: "Channel Letters",        desc: "Illuminated channel letter signage.",         url: asset("WhatsApp Image 2026-04-21 at 10.02.39 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 21, title: "Commercial Signage",     desc: "Commercial-grade signage project.",           url: asset("WhatsApp Image 2026-04-21 at 10.03.00 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 22, title: "Food Outlet Branding",   desc: "Complete branding for food outlet.",          url: asset("WhatsApp Image 2026-04-21 at 10.05.18 PM.jpeg"), span: "md:col-span-2 md:row-span-1",type: "image" },
  { id: 23, title: "Backlit Signage",        desc: "Premium backlit signage solution.",           url: asset("WhatsApp Image 2026-04-21 at 10.06.10 PM.jpeg"), span: "md:row-span-2",              type: "image" },
  { id: 24, title: "Interior Branding",      desc: "Interior branding and wayfinding.",           url: asset("WhatsApp Image 2026-04-21 at 10.06.25 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 25, title: "Pylon Sign",             desc: "Tall pylon sign for road visibility.",        url: asset("WhatsApp Image 2026-04-21 at 10.06.40 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 26, title: "Stall Branding",         desc: "Exhibition stall branding setup.",            url: asset("WhatsApp Image 2026-04-21 at 10.07.11 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 27, title: "Vinyl Wrap",             desc: "Custom vinyl wrap installation.",             url: asset("WhatsApp Image 2026-04-21 at 10.07.33 PM.jpeg"), span: "md:row-span-1",              type: "image" },
  { id: 28, title: "Signage Installation",   desc: "On-site professional installation.",          url: asset("WhatsApp Image 2026-04-21 at 10.07.48 PM.jpeg"), span: "md:row-span-1",              type: "image" },

  // ── Videos ──
  { id: 29, title: "Project Showcase",       desc: "Watch our team in action.",                  url: asset("WhatsApp Video 2026-04-21 at 9.41.59 PM.mp4"),  span: "md:col-span-2 md:row-span-2",type: "video" },
  { id: 30, title: "Installation Timelapse", desc: "Full installation walkthrough.",              url: asset("WhatsApp Video 2026-04-21 at 9.49.38 PM.mp4"),  span: "md:row-span-2",              type: "video" },
  { id: 31, title: "Signage Reveal",         desc: "Before & after signage reveal.",              url: asset("WhatsApp Video 2026-04-21 at 10.04.09 PM.mp4"), span: "md:col-span-2 md:row-span-1",type: "video" },
  { id: 32, title: "Branding in Action",     desc: "Live branding execution.",                   url: asset("WhatsApp Video 2026-04-21 at 10.04.26 PM.mp4"), span: "md:row-span-1",              type: "video" },
  { id: 33, title: "LED Installation",       desc: "LED sign fabrication and fitting.",           url: asset("WhatsApp Video 2026-04-21 at 10.04.48 PM.mp4"), span: "md:row-span-1",              type: "video" },
]

const Portfolio = () => {
  return (
    <section id="portfolio">
      <InteractiveImageBentoGallery
        imageItems={galleryItems}
        title="Our Portfolio"
        description="Real projects from our team — signage, branding, and large-format advertising. Drag to explore, click to expand."
      />
    </section>
  )
}

export default Portfolio
