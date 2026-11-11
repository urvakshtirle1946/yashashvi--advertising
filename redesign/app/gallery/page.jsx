import galleryMedia from "../gallery-media.json";
import ContactUsButton from "../contact-us-button";

export const metadata = {
  title: "Gallery — Yashashvi Advertising",
  description: "A complete gallery of Yashashvi Advertising's signage, print and campaign work.",
};

export default function GalleryPage() {
  const photoCount = galleryMedia.filter((item) => item.type === "image").length;
  const videoCount = galleryMedia.filter((item) => item.type === "video").length;
  return (
    <>
    <ContactUsButton />
    <main className="full-gallery-page">
      <div className="full-gallery-sticky-nav">
        <div className="full-gallery-topbar">
          <a className="full-gallery-home-link" href="/">← Back to homepage</a>
          <nav className="full-gallery-nav" aria-label="Homepage navigation">
            <a href="/#work">Our Work</a>
            <a href="/#story">About</a>
            <a href="/gallery" aria-current="page">Gallery</a>
          </nav>
        </div>
      </div>
      <header className="full-gallery-header">
        <p className="full-gallery-eyebrow">YASHASHVI ADVERTISING · INDORE</p>
        <h1>Gallery</h1>
        <p className="full-gallery-count">{photoCount} photos · {videoCount} videos</p>
      </header>
      <section className="full-gallery-grid" aria-label="All Yashashvi Advertising gallery media">
        {galleryMedia.map((item, index) => (
          <figure className={`full-gallery-item ${item.type === "video" ? "is-video" : "is-image"}`} key={item.relativePath}>
            {item.type === "video" ? (
              <video controls playsInline preload="metadata" aria-label={item.alt}>
                <source src={item.src} type={item.mimeType} />
                Your browser does not support this video format.
              </video>
            ) : (
              <img src={item.src} alt={item.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
            )}
          </figure>
        ))}
      </section>
    </main>
    </>
  );
}
