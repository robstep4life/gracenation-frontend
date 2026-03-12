import { Link } from "react-router-dom";

const galleryImages = [
  {
    title: "Sunday Worship Experience",
    image: "/images/pastor1.jpg",
    category: "Service",
  },
  {
    title: "First Time Guests",
    image: "/images/welcome1.jpg",
    category: "Church Life",
  },
  {
    title: "Miracle Testimony",
    image: "/images/wife1.jpg",
    category: "Miracles",
  },
  {
    title: "Word & Power Service",
    image: "/images/pastor2.jpg",
    category: "Service",
  },
  {
    title: "Women of Grace Gathering",
    image: "/images/wife2.jpg",
    category: "Ministry",
  },
  {
    title: "Church Celebration Moment",
    image: "/images/new-citizen1.jpg",
    category: "Celebration",
  },
];

const videoHighlights = [
  {
    title: "Latest Sunday Service",
    url: "https://www.youtube.com/@LiberationcityTV",
  },
  {
    title: "Miracle Testimony Highlight",
    url: "https://www.youtube.com/@LiberationcityTV",
  },
  {
    title: "Worship Session Recap",
    url: "https://www.youtube.com/@LiberationcityTV",
  },
];

export default function Gallery() {
  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <div className="gallery-topbar">
            <Link to="/" className="btn btn-small">
              Back Home
            </Link>
          </div>

          <h1>Church Gallery</h1>
          <p className="gallery-lead">
            Latest moments from our services, miracles, testimonies, worship,
            and church events.
          </p>
        </div>
      </section>

      <section className="section container">
        <h2>Latest Images</h2>

        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <article key={index} className="gallery-card">
              <div className="gallery-image-wrap">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="gallery-card-body">
                <span className="gallery-tag">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <h2>Latest Videos</h2>

          <div className="video-grid">
            {videoHighlights.map((video, index) => (
              <article key={index} className="video-card">
                <h3>{video.title}</h3>
                <p>Click below to watch this highlight.</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Watch Video
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <h2>Miracle & Testimony Moments</h2>

        <div className="gallery-grid">
          <article className="gallery-card">
            <div className="gallery-image-wrap">
              <img src="/images/pastor1.jpg" alt="Miracle moment" />
            </div>
            <div className="gallery-card-body">
              <span className="gallery-tag">Miracles</span>
              <h3>Lives Touched in Service</h3>
            </div>
          </article>

          <article className="gallery-card">
            <div className="gallery-image-wrap">
              <img src="/images/welcome1.jpg" alt="Church testimony" />
            </div>
            <div className="gallery-card-body">
              <span className="gallery-tag">Testimonies</span>
              <h3>Celebrating God&apos;s Faithfulness</h3>
            </div>
          </article>

          <article className="gallery-card">
            <div className="gallery-image-wrap">
              <img src="/images/wife2.jpg" alt="Worship moment" />
            </div>
            <div className="gallery-card-body">
              <span className="gallery-tag">Worship</span>
              <h3>Moments of Worship & Glory</h3>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}