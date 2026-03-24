import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";

const defaultServiceTimes = [
  {
    day: "Sunday Celebration",
    time: "8:00 AM & 02:00 PM",
    detail: "Worship, teaching, and prayer for the whole family.",
  },
  {
    day: "Midweek Service",
    time: "Thursday • 8:00 PM",
    detail: "Bible study and practical life groups.",
  },
  {
    day: "Morning Prayer",
    time: "Monday–Friday • 6:00 AM",
    detail: "Start your day in God’s presence.",
  },
];

const ministries = [
  {
    title: "Kids Ministry",
    text: "Safe, joyful, Bible-centered classes where children learn to love Jesus.",
  },
  {
    title: "Youth & Young Adults",
    text: "Real conversations, mentorship, and purpose-driven community.",
  },
  {
    title: "Care & Counseling",
    text: "Pastoral support, prayer, and counseling through every season of life.",
  },
];

const defaultEvents = [
  { name: "Community Outreach", date: "April 14", place: "City Center" },
  { name: "Couples Night", date: "April 20", place: "Main Auditorium" },
  { name: "Worship & Prayer Night", date: "April 27", place: "Sanctuary" },
];

const defaultOverview = {
  welcome: "Welcome Home",
  title: "A place to grow in faith, find family, and serve with purpose.",
  text: "Join us this Sunday and experience heartfelt worship, practical biblical teaching, and a loving church community for every age.",
};

const defaultAnnouncements = [
  { title: "Workers Meeting", text: "All department heads should meet after Sunday service." },
  { title: "Fasting & Prayer", text: "Three-day fasting and prayer starts next Monday." },
  { title: "Youth Rally", text: "Youth rally rehearsal begins this Friday evening." },
];

function HomePage() {
  const serviceTimes =
    JSON.parse(localStorage.getItem("church_services")) || defaultServiceTimes;

  const storedEvents = JSON.parse(localStorage.getItem("church_events")) || [];
  const events = storedEvents.map((event) => ({
    name: event.name,
    date: event.date,
    place: event.place || event.venue || "",
  }));

  const displayEvents = events.length ? events : defaultEvents;

  const overview = JSON.parse(localStorage.getItem("church_overview")) || defaultOverview;
  const announcements =
    JSON.parse(localStorage.getItem("church_announcements")) || defaultAnnouncements;
  const uploadedImages = JSON.parse(localStorage.getItem("church_gallery_images")) || [];

  return (
    <div className="site">
      <header className="hero" id="home">
        <nav className="nav container">
          <div className="logo">
            GRACE NATION CHURCH INTERNATIONAL AKA LIBERATION CITY
          </div>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#ministries">Ministries</a>
            <a href="#events">Events</a>
            <a href="#announcements">Announcements</a>
            <a href="#media">Media Uploads</a>
            <Link to="/gallery">Gallery</Link>
            <Link to="/login" className="btn btn-small">
              Login
            </Link>
          </div>
        </nav>

        <div className="hero-content container">
          <p className="eyebrow">{overview.welcome}</p>
          <h1>{overview.title}</h1>

          <p>{overview.text}</p>

          <div className="hero-actions">
            <a className="btn" href="#services">
              Service Times
            </a>
            <Link className="btn btn-outline" to="/gallery">
              View Gallery
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section container" id="about">
          <h2>Who We Are</h2>
          <p className="section-lead">
            Grace Nation Church exists to help people know Jesus, walk in
            freedom, discover purpose, and make a lasting difference.
          </p>
        </section>

        <section className="section muted" id="services">
          <div className="container">
            <h2>Service Times</h2>

            <div className="grid three">
              {serviceTimes.map((service, index) => (
                <article key={`${service.day}-${index}`} className="card">
                  <h3>{service.day}</h3>
                  <p className="time">{service.time}</p>
                  <p>{service.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="ministries">
          <h2>Ministries</h2>

          <div className="grid three">
            {ministries.map((ministry) => (
              <article key={ministry.title} className="card">
                <h3>{ministry.title}</h3>
                <p>{ministry.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="events">
          <div className="container">
            <h2>Upcoming Events</h2>

            <div className="events-list">
              {displayEvents.map((event, index) => (
                <div key={`${event.name}-${index}`} className="event-row">
                  <strong>{event.name}</strong>
                  <span>{event.date}</span>
                  <span>{event.place}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="announcements">
          <h2>Latest Announcements</h2>
          <div className="grid three">
            {announcements.map((announcement, index) => (
              <article key={`${announcement.title}-${index}`} className="card">
                <h3>{announcement.title}</h3>
                <p>{announcement.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="media">
          <div className="container">
            <h2>Latest Media Uploads</h2>
            {uploadedImages.length ? (
              <div className="grid three">
                {uploadedImages.slice(0, 3).map((item, index) => (
                  <article key={`${item.title}-${index}`} className="card">
                    <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: "12px" }} />
                    <h3 style={{ marginTop: "12px" }}>{item.title}</h3>
                    <p>{item.category}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p>No media uploads yet. Use Admin Dashboard &gt; Media Upload.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <h3>Grace Nation Church</h3>
            <p>
              Venue: Grace Nation Int&apos;l, Plot 9-12 Oshofisan Street, Off
              Odozi Street by Ereke Bus-Stop, Ojodu Berger, Lagos - Nigeria
            </p>
            <p>For more info, call: +234 803 272 9060, +234 807 337 5176</p>
          </div>

          <div>
            <h4>Sunday Experience</h4>
            <p>Doors open at 8:00 AM</p>
            <p>Family check-in available</p>
          </div>

          <div>
            <h4>Stay Connected</h4>
            <p>
              Follow us on{" "}
              <a
                href="https://www.facebook.com/chrisokaforministries"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>{" "}
              and{" "}
              <a
                href="https://www.instagram.com/chrisokaforministries/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}