"use client";

import React, { useState } from "react";

type Brand = {
  name: string;
  logo: string;
  h?: string;    // optional tailwind height class, defaults to h-8
  maxW?: string; // optional max-width class, defaults to max-w-[140px]
};

const brands: Brand[] = [
  { name: "MP Birla Cement",      logo: "https://oyjhphtepgrvrbytbais.supabase.co/storage/v1/object/public/brands/MP%20Birla.jpg", h: "h-20", maxW: "max-w-[180px]" },
  { name: "Probus Insurance",     logo: "https://logo.clearbit.com/probusinsurance.com" },
  { name: "Johnson Tiles",        logo: "https://logo.clearbit.com/johnsontiles.com" },
  { name: "CEAT",                 logo: "https://logo.clearbit.com/ceat.com" },
  { name: "Bata",                 logo: "https://logo.clearbit.com/bata.com" },
  { name: "O'General",            logo: "https://logo.clearbit.com/fujitsu-general.com" },
  { name: "Havells",              logo: "https://logo.clearbit.com/havells.com" },
  { name: "UltraTech",            logo: "https://logo.clearbit.com/ultratechcement.com" },
  { name: "Ambuja Cement",        logo: "https://logo.clearbit.com/ambujacement.com" },
  { name: "Nuvoco",               logo: "https://logo.clearbit.com/nuvoco.com" },
  { name: "Elica",                logo: "https://logo.clearbit.com/elica.com" },
  { name: "Faber",                logo: "https://logo.clearbit.com/faberhome.com" },
  { name: "Eastman",              logo: "https://logo.clearbit.com/eastman.com" },
  { name: "Baidyanath",           logo: "https://logo.clearbit.com/baidyanath.com" },
  { name: "IFB",                  logo: "https://logo.clearbit.com/ifbindia.com" },
  { name: "Peter England",        logo: "https://logo.clearbit.com/peterengland.com" },
  { name: "TBZ",                  logo: "https://logo.clearbit.com/tbztheoriginal.com" },
  { name: "SKF",                  logo: "https://logo.clearbit.com/skf.com" },
  { name: "Skechers",             logo: "https://logo.clearbit.com/skechers.com" },
  { name: "Paytm",                logo: "https://logo.clearbit.com/paytm.com" },
  { name: "Nippon India MF",      logo: "https://logo.clearbit.com/nipponindiamf.com" },
  { name: "HDFC Life",            logo: "https://logo.clearbit.com/hdfclife.com" },
  { name: "RBL Bank",             logo: "https://logo.clearbit.com/rblbank.com" },
  { name: "Duroflex",             logo: "https://logo.clearbit.com/duroflex.com" },
  { name: "OAP",                  logo: "" },
  { name: "MOMS",                 logo: "" },
  { name: "Kinetic",              logo: "https://logo.clearbit.com/kineticindia.com" },
];

/** Single brand logo tile — falls back to styled text pill */
function BrandTile({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);

  const heightClass = brand.h ?? "h-8";
  const maxWClass   = brand.maxW ?? "max-w-[140px]";

  return (
    <div className="flex items-center justify-center w-36 shrink-0 px-2">
      {brand.logo && !failed ? (
        <img
          src={brand.logo}
          alt={brand.name}
          title={brand.name}
          onError={() => setFailed(true)}
          className={`${heightClass} w-auto ${maxWClass} object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300`}
          loading="lazy"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-500 whitespace-nowrap tracking-wide hover:text-gray-800 transition-colors duration-200">
          {brand.name}
        </span>
      )}
    </div>
  );
}

/** Forward-scrolling row (left → right fade mask) */
export const BrandScroller = () => (
  <div className="group flex overflow-hidden py-3 [--gap:1rem] [gap:var(--gap)] flex-row max-w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0))]">
    {Array(4)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
        >
          {brands.map((brand) => (
            <BrandTile key={brand.name} brand={brand} />
          ))}
        </div>
      ))}
  </div>
);

/** Reverse-scrolling row — visual variety */
export const BrandScrollerReverse = () => (
  <div className="group flex overflow-hidden py-3 [--gap:1rem] [gap:var(--gap)] flex-row max-w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0))]">
    {Array(4)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
        >
          {brands.map((brand) => (
            <BrandTile key={brand.name} brand={brand} />
          ))}
        </div>
      ))}
  </div>
);

/** Full section wrapper — both rows stacked */
export function BrandMarquee() {
  return (
    <section className="w-full bg-white border-y border-gray-100 py-6 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-5">
        Trusted by Leading Brands
      </p>
      <BrandScroller />
      <div className="my-2" />
      <BrandScrollerReverse />
    </section>
  );
}

export default BrandMarquee;
