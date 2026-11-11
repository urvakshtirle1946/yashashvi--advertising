"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

import galleryMedia from "./gallery-media.json";
import footerMedia from "./footer-media.json";
import ContactUsButton from "./contact-us-button";

const imageAssets = galleryMedia.filter((item) => item.type === "image");
const previewPhotos = imageAssets.slice(0, 6);
const imageAt = (time) => imageAssets.find((item) => item.name.includes(time)) ?? imageAssets[0];

const heroColumns = 24;
const heroTiles = Array.from({ length: heroColumns * 4 }, (_, index) => ({
  ...imageAssets[index % imageAssets.length],
  column: Math.floor(index / 4),
  row: index % 4,
}));

const cases = [
  {
    title: "LED event display",
    subtitle: "Light that holds the room",
    description: "An illuminated display gives a brand a clear, confident presence at an evening event.",
    category: "EVENT SIGNAGE",
    image: imageAt("10.00.04 PM"),
  },
  {
    title: "Outdoor campaign",
    subtitle: "A message made for the street",
    description: "Large-format print carries a campaign from the design to the roadside, where people meet it every day.",
    category: "OUTDOOR PRINT",
    image: imageAt("9.55.46 PM"),
  },
  {
    title: "Choice reception signage",
    subtitle: "A clear identity indoors",
    description: "Wall graphics and reception signage bring a company’s visual identity into its working space.",
    category: "OFFICE BRANDING",
    image: imageAt("10.02.39 PM"),
  },
  {
    title: "General storefront",
    subtitle: "Visible from the street",
    description: "Exterior fascia and window graphics make the shopfront easy to recognise from the road.",
    category: "RETAIL FACADE",
    image: imageAt("10.06.10 PM"),
  },
  {
    title: "Probus LED installation",
    subtitle: "A brighter arrival",
    description: "A lit reception sign carries the Probus identity from the entrance into the office.",
    category: "LED INSTALLATION",
    image: imageAt("9.58.49 PM"),
  },
];

const navItems = [
  { label: "Our Work", href: "/#work" },
  { label: "About", href: "/#story" },
  { label: "Gallery", href: "/gallery" },
];

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

function balancePreviewColumns(photos, dimensions, columnCount, gridWidth, gap = 20) {
  const usableWidth = gridWidth - gap * (columnCount - 1);
  const ratios = dimensions.map(({ width, height }) => height / width);
  let best = null;
  const assignment = Array(photos.length).fill(0);

  const evaluate = () => {
    const columnRatios = Array(columnCount).fill(0);
    const columnCounts = Array(columnCount).fill(0);
    assignment.forEach((column, index) => {
      columnRatios[column] += ratios[index];
      columnCounts[column] += 1;
    });
    if (columnCounts.some((count) => count === 0)) return;

    const columnGaps = columnCounts.map((count) => gap * (count - 1));
    const sharedHeight = (usableWidth + columnGaps.reduce((sum, amount, index) => sum + amount / columnRatios[index], 0))
      / columnRatios.reduce((sum, ratio) => sum + 1 / ratio, 0);
    const widths = columnRatios.map((ratio, index) => (sharedHeight - columnGaps[index]) / ratio);
    if (widths.some((width) => width <= 0)) return;

    const meanWidth = usableWidth / columnCount;
    const widthVariance = widths.reduce((sum, width) => sum + ((width - meanWidth) / meanWidth) ** 2, 0) / columnCount;
    const score = widthVariance + sharedHeight / usableWidth * 0.00001;
    if (best && score >= best.score) return;

    best = {
      score,
      widths,
      columns: Array.from({ length: columnCount }, (_, column) =>
        assignment.flatMap((assignedColumn, index) => assignedColumn === column ? [index] : []),
      ),
    };
  };

  const search = (index, highestColumn) => {
    if (index === photos.length) {
      evaluate();
      return;
    }
    const lastAllowedColumn = Math.min(columnCount - 1, highestColumn + 1);
    for (let column = 0; column <= lastAllowedColumn; column += 1) {
      assignment[index] = column;
      search(index + 1, Math.max(highestColumn, column));
    }
  };

  assignment[0] = 0;
  search(1, 0);
  return best;
}

function BrandMark({ className = "", cutout = false }) {
  return <img className={className} src={cutout ? "/assets/yashashvi-logo-hero.png" : "/assets/yashashvi-logo.png"} alt="Yashashvi Advertising" />;
}

function SiteNav({ compact, heroActive, mobile, logoStyle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => {
    if (!compact && menuOpen) setMenuOpen(false);
  }, [compact, menuOpen]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const lenis = window.__yashashviLenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (lenis && !lenis.isStopped) return;
      lenis?.start();
    };
  }, [menuOpen]);
  return (
    <header className={`site-nav ${compact ? "is-compact" : ""} ${heroActive ? "has-hero-surface" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <a className="hero-brand-lockup" href="/" aria-label="Yashashvi Advertising home" style={logoStyle}>
        <BrandMark cutout />
      </a>
      <div className="nav-full" aria-hidden={compact} inert={compact}>
        <div className="nav-links-window">
          <nav aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
        </div>
        <div className="nav-location" aria-hidden={compact || mobile}>INDORE · INDIA</div>
      </div>
      <div className={`nav-menu-shell ${compact ? "is-visible" : ""} ${menuOpen ? "is-open" : ""}`} aria-hidden={!compact} inert={!compact}>
        <div className="nav-menu-toprow">
          <a className="nav-menu-home" href="/" aria-label="Yashashvi Advertising home">HOME</a>
          <button
            ref={toggleRef}
            className="nav-menu-toggle"
            type="button"
            aria-controls="site-navigation-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "CLOSE" : "MENU"}</span><span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
          </button>
        </div>
        <nav className="nav-menu-links" id="site-navigation-menu" aria-label="Expanded navigation" inert={!menuOpen}>
          {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
      </div>
      <div className="nav-compact" aria-hidden={!compact || mobile}>
        <div className="nav-location">INDORE · INDIA</div>
      </div>
      {compact && menuOpen && <button className="nav-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [navCompact, setNavCompact] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);
  const [logoStyle, setLogoStyle] = useState(null);
  const [heroLoopDuration, setHeroLoopDuration] = useState(729.15);
  const [statementProgress, setStatementProgress] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hover, setHover] = useState({ index: -1, x: 0, y: 0 });
  const [previewPacking, setPreviewPacking] = useState(null);
  const heroRef = useRef(null);
  const statementRef = useRef(null);
  const workRef = useRef(null);
  const previewGridRef = useRef(null);
  const projectRefs = useRef([]);
  const navCompactRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      setMobile(media.matches);
      setReducedMotion(motion.matches);
      const y = window.scrollY;
      setScrollY(y);
      const nextNavCompact = navCompactRef.current ? y >= 64 : y >= 320;
      if (nextNavCompact !== navCompactRef.current) {
        navCompactRef.current = nextNavCompact;
        setNavCompact(nextNavCompact);
      }
      const vh = window.innerHeight;
      setHeroLoopDuration((Math.min(window.innerWidth * 0.2109375, 303.75) * heroColumns) / 10);
      setHeroProgress(clamp(y / (vh * 2)));
      const isMobile = media.matches;
      const logoProgress = isMobile || motion.matches ? 1 : clamp(y / (vh * 1.15));
      const logoStartWidth = Math.min(window.innerWidth * 0.4, 576);
      const logoWidth = isMobile ? 150 : logoStartWidth + (156 - logoStartWidth) * logoProgress;
      const logoCenterY = isMobile ? 36 : vh / 2 + (60 - vh / 2) * logoProgress;
      setLogoStyle({ width: `${logoWidth}px`, top: `${logoCenterY}px` });
      setHeroActive(Boolean(heroRef.current && heroRef.current.getBoundingClientRect().bottom > 0));
      const statementTop = statementRef.current?.offsetTop ?? vh * 2;
      setStatementProgress(clamp((y - statementTop) / (vh * (isMobile ? 0.9 : 1.32))));
      const section = workRef.current?.getBoundingClientRect();
      if (section && section.top < vh * 0.7 && section.bottom > 0) {
        let active = 0;
        projectRefs.current.forEach((node, index) => {
          if (node && node.getBoundingClientRect().top <= vh * 0.4) active = index;
        });
        setActiveCase(active);
      }
    };
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.14,
      respectReducedMotion: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    });
    window.__yashashviLenis = lenis;
    const onAnchorClick = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || !destination.hash) return;
      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      if (destination.hash !== window.location.hash) window.history.pushState(window.history.state, "", destination.hash);
      window.requestAnimationFrame(() => {
        if (lenis.isStopped) lenis.start();
        lenis.scrollTo(target);
      });
    };
    const onPopState = () => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        lenis.reset();
        measure();
      }));
    };
    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("popstate", onPopState);
    lenis.on("scroll", measure);
    measure();
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    motion.addEventListener("change", measure);
    return () => {
      lenis.destroy();
      if (window.__yashashviLenis === lenis) delete window.__yashashviLenis;
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      motion.removeEventListener("change", measure);
    };
  }, []);

  useEffect(() => {
    const images = [...(previewGridRef.current?.querySelectorAll(".photo-card img") ?? [])];
    if (images.length !== previewPhotos.length) return;

    let active = true;
    let cleanup = () => {};
    Promise.all(images.map(async (image) => {
      try {
        await image.decode();
        return { width: image.naturalWidth, height: image.naturalHeight };
      } catch {
        return null;
      }
    })).then((dimensions) => {
      if (!active || dimensions.some((size) => !size)) return;

      const updatePacking = () => {
        const grid = previewGridRef.current;
        if (!grid || !active) return;
        const columnCount = window.innerWidth <= 767 ? 1 : window.innerWidth <= 1000 ? 2 : 3;
        const packed = balancePreviewColumns(previewPhotos, dimensions, columnCount, grid.clientWidth);
        if (packed) setPreviewPacking(packed);
      };

      updatePacking();
      window.addEventListener("resize", updatePacking);
      cleanup = () => window.removeEventListener("resize", updatePacking);
    });

    return () => {
      active = false;
      cleanup();
    };
  }, []);

  const statementStyle = {
    "--statement-progress": statementProgress,
    "--statement-fade-start": `${(1 - statementProgress) * 100}%`,
  };
  const heroStyle = {
    "--hero-progress": heroProgress,
    "--hero-loop-duration": `${heroLoopDuration}s`,
  };

  return (
    <div className={`homepage ${mobile ? "is-mobile" : ""} ${reducedMotion ? "reduce-motion" : ""}`}>
      <SiteNav compact={navCompact} heroActive={heroActive} mobile={mobile} logoStyle={logoStyle} />
      <ContactUsButton />
      <main id="main">
        <section id="home" ref={heroRef} className="ogilvy-hero" style={heroStyle} aria-label="Yashashvi Advertising">
          <div className="hero-sticky desktop-hero">
            <div className="hero-image-field" aria-hidden="true">
              <div className="hero-image-track">
                {[0, 1].map((setIndex) => (
                  <div className="hero-image-set" key={setIndex}>
                    {heroTiles.map((item, index) => (
                      <div className="hero-tile" key={`${setIndex}-${index}`} style={{ "--tile-column": item.column, "--tile-row": item.row }}>
                        <img src={item.src} alt="" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="hero-caption">SIGNAGE · PRINT · LARGE FORMAT</p>
          </div>
          <div className="mobile-hero-sequence" aria-label="Selected Yashashvi Advertising work">
            {imageAssets.slice(0, 4).map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} />
              </figure>
            ))}
          </div>
        </section>

        <section id="story" ref={statementRef} className="ogilvy-statement" style={statementStyle} aria-label="About Yashashvi Advertising">
          <div className="statement-sticky">
            <p>From Indore outward, we bring brands into view. We design, produce and install signage and printed campaigns that turn a good idea into a clear, confident presence across streets, storefronts and shared spaces.</p>
          </div>
        </section>

        <section id="work" ref={workRef} className="koto-work" aria-labelledby="work-title">
          <div className="work-layout">
            <aside className="work-rail" aria-label="Selected project details">
              <div className="rail-heading">
                <h1 id="work-title">Our work</h1>
                <p className="active-case-title" aria-live="polite">{cases[activeCase].title}</p>
              </div>
              <p className="active-case-description">{cases[activeCase].description}</p>
              <div className="active-case-meta">
                <img src={cases[activeCase].image.src} alt="" />
                <div><strong>{cases[activeCase].subtitle}</strong><span>INDORE · {cases[activeCase].category}</span></div>
              </div>
            </aside>
            <div className="work-media-list">
              {cases.map((item, index) => (
                <a
                  className="work-card"
                  href="/gallery"
                  key={item.title}
                  ref={(node) => { projectRefs.current[index] = node; }}
                  aria-label={`View project photos: ${item.title}`}
                  onMouseEnter={() => setHover((current) => ({ ...current, index }))}
                  onMouseLeave={() => setHover((current) => ({ ...current, index: -1 }))}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    setHover({ index, x: event.clientX - rect.left, y: event.clientY - rect.top });
                  }}
                  onFocus={() => setHover({ index, x: 28, y: 28 })}
                  onBlur={() => setHover((current) => ({ ...current, index: -1 }))}
                >
                  <img src={item.image.src} alt={item.image.alt} />
                  <span className="work-card-caption"><strong>{item.title}</strong><span>{item.subtitle}</span></span>
                  <span className={`work-card-cursor ${hover.index === index ? "is-visible" : ""}`} style={{ left: hover.index === index ? hover.x : 0, top: hover.index === index ? hover.y : 0 }} aria-hidden="true">↗ VIEW PROJECT</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="photos" className="ogilvy-photos" aria-label="Yashashvi Advertising project gallery">
          <div
            className={`photos-grid ${previewPacking ? "is-packed" : ""}`}
            ref={previewGridRef}
            style={previewPacking ? { "--preview-columns": previewPacking.widths.map((width) => `${width}px`).join(" ") } : undefined}
          >
            {previewPacking ? previewPacking.columns.map((column, index) => (
              <div className="photos-column" key={`preview-column-${index}`}>
                {column.map((photoIndex) => {
                  const item = previewPhotos[photoIndex];
                  return (
                    <a href="/gallery" className="photo-card" key={item.src} aria-label={`Open full gallery: ${item.title}`}>
                      <img src={item.src} alt={item.alt} loading="eager" />
                    </a>
                  );
                })}
              </div>
            )) : previewPhotos.map((item) => (
              <a href="/gallery" className="photo-card" key={item.src} aria-label={`Open full gallery: ${item.title}`}>
                <img src={item.src} alt={item.alt} loading="eager" />
              </a>
            ))}
          </div>
          <div className="gallery-more-wrap">
            <a className="gallery-more-link" href="/gallery">View More</a>
          </div>
        </section>
      </main>
      <footer
        id="contact"
        className="site-footer"
        style={{ "--footer-artwork": `url("${footerMedia.src}")`, "--footer-art-height": footerMedia.heightVw }}
      >
        <div className="site-footer-details">
          <section aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact</h2>
            <address>
              <span>792, A-Sector, Sudama Nagar, Indore, MP-452009</span>
            </address>
            <p className="site-footer-contact-links">
              <a href="tel:+919907239991">+919907239991</a>
              <a href="tel:+919109110033">+919109110033</a>
            </p>
            <p className="site-footer-contact-links">
              <a href="mailto:yashasvi.advt.indore@gmail.com">yashasvi.advt.indore@gmail.com</a>
            </p>
          </section>
          <nav className="site-footer-links" aria-label="Footer links">
            <a href="https://www.yashasviadvertising.works/privacy">Privacy Policy</a>
            <a href="https://www.yashasviadvertising.works/terms">Terms of Service</a>
          </nav>
          <div className="site-footer-cta">
            <ContactUsButton placement="footer" />
          </div>
          <p className="site-footer-copyright">© 2026 Yashashvi Advertising.</p>
        </div>
      </footer>
    </div>
  );
}
