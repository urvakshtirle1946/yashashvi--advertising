"use client";

import React from "react";

const SUPABASE_URL = 'https://oyjhphtepgrvrbytbais.supabase.co'
const BUCKET = 'brands'

// Build Supabase public URL for a file
const asset = (filename: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filename)}`

type Brand = {
  name: string;
  logo: string;
  abbr: string;
  bg: string;
};

const brands: Brand[] = [
  { name: "MP Birla Cement",  logo: asset("MP Birla.jpg"),      abbr: "MPC",  bg: "#C0392B" },
  { name: "Probus Insurance", logo: asset("probus.jpg"),         abbr: "PRO",  bg: "#2980B9" },
  { name: "Johnson Tiles",    logo: asset("Jhonson.jpg"),        abbr: "JT",   bg: "#E67E22" },
  { name: "CEAT",             logo: asset("CEAT.jpg"),           abbr: "CEAT", bg: "#E74C3C" },
  { name: "Bata",             logo: asset("Bata.jpg"),           abbr: "BATA", bg: "#CC1111" },
  { name: "O'General",        logo: asset("general.jpg"),        abbr: "OG",   bg: "#16A085" },
  { name: "Havells",          logo: asset("Havels.jpg"),         abbr: "HVL",  bg: "#8E44AD" },
  { name: "UltraTech",        logo: asset("Ultratech.jpg"),      abbr: "UTC",  bg: "#27AE60" },
  { name: "Ambuja Cement",    logo: asset("Ambuja.jpg"),         abbr: "AMB",  bg: "#F39C12" },
  { name: "Nuvoco",           logo: asset("Nuvoco.jpg"),         abbr: "NUV",  bg: "#1ABC9C" },
  { name: "Elica",            logo: asset("Elica.jpg"),          abbr: "ELC",  bg: "#2C3E50" },
  { name: "Faber",            logo: asset("Faber.jpg"),          abbr: "FAB",  bg: "#D35400" },
  { name: "Eastman",          logo: asset("Eastman.jpg"),        abbr: "EST",  bg: "#2471A3" },
  { name: "Baidyanath",       logo: asset("baidyanath.jpg"),     abbr: "BDN",  bg: "#7D6608" },
  { name: "IFB",              logo: asset("ifb.png"),            abbr: "IFB",  bg: "#1F618D" },
  { name: "Peter England",    logo: asset("Peter England.jpg"),  abbr: "PE",   bg: "#2E4057" },
  { name: "TBZ",              logo: asset("tbz.jpg"),            abbr: "TBZ",  bg: "#B7950B" },
  { name: "SKF",              logo: asset("SKF.jpg"),            abbr: "SKF",  bg: "#922B21" },
  { name: "Skechers",         logo: asset("Skecherws.jpg"),      abbr: "SKE",  bg: "#1A1A1A" },
  { name: "Paytm",            logo: asset("paytm.jpg"),          abbr: "PAY",  bg: "#00B9F5" },
  { name: "Nippon India",     logo: asset("nipon.jpg"),          abbr: "NIP",  bg: "#C0392B" },
  { name: "HDFC Life",        logo: asset("hdfc.jpg"),           abbr: "HDFC", bg: "#004C8F" },
  { name: "RBL Bank",         logo: asset("rbl.jpg"),            abbr: "RBL",  bg: "#CC0000" },
  { name: "Duroflex",         logo: asset("duroflex.jpg"),       abbr: "DRF",  bg: "#6C3483" },
  { name: "OAP",              logo: asset("oap.jpg"),            abbr: "OAP",  bg: "#117A65" },
  { name: "MOMS",             logo: asset("moms.jpg"),           abbr: "MOM",  bg: "#E91E8C" },
  { name: "Kinetic",          logo: asset("kinetic.jpg"),        abbr: "KNT",  bg: "#FF6600" },
];

function BrandItem({ brand }: { brand: Brand }) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div className="flex items-center justify-center shrink-0 px-5 py-2">
      {!failed ? (
        <img
          src={brand.logo}
          alt={brand.name}
          onError={() => setFailed(true)}
          loading="eager"
          className="h-10 w-auto max-w-[110px] object-contain"
        />
      ) : (
        <div
          className="flex h-10 min-w-[80px] items-center justify-center rounded-lg px-3"
          style={{ background: `${brand.bg}15`, border: `1px solid ${brand.bg}30` }}
        >
          <span className="text-xs font-black" style={{ color: brand.bg }}>
            {brand.abbr}
          </span>
        </div>
      )}
    </div>
  );
}

export const BrandScroller = () => (
  <div className="flex overflow-hidden py-2 flex-row max-w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_8%,rgba(0,0,0,1)_92%,rgba(0,0,0,0))]">
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="flex shrink-0 items-center animate-marquee flex-row">
        {brands.map((brand) => <BrandItem key={brand.name} brand={brand} />)}
      </div>
    ))}
  </div>
);

export const BrandScrollerReverse = () => (
  <div className="flex overflow-hidden py-2 flex-row max-w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_8%,rgba(0,0,0,1)_92%,rgba(0,0,0,0))]">
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="flex shrink-0 items-center animate-marquee-reverse flex-row">
        {brands.map((brand) => <BrandItem key={brand.name} brand={brand} />)}
      </div>
    ))}
  </div>
);

export function BrandMarqueeSection() {
  return (
    <section className="w-full bg-white border-y border-gray-100 py-6 overflow-hidden">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
        Trusted by Leading Brands
      </p>
      <BrandScroller />
      <div className="my-1" />
      <BrandScrollerReverse />
    </section>
  );
}

export default BrandMarqueeSection;
