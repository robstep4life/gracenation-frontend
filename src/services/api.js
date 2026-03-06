const serviceTimes = [
  { day: "Sunday Celebration", time: "9:00 AM & 11:30 AM", detail: "Worship, teaching, and prayer for the whole family." },
  { day: "Midweek Recharge", time: "Wednesday • 6:30 PM", detail: "Bible study and practical life groups." },
  { day: "Morning Prayer", time: "Monday–Friday • 6:00 AM", detail: "Start your day in God’s presence." },
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

const events = [
  { name: "Community Outreach", date: "April 14", place: "City Center" },
  { name: "Couples Night", date: "April 20", place: "Main Auditorium" },
  { name: "Worship & Prayer Night", date: "April 27", place: "Sanctuary" },
];

export default function App() {
  return (
    <div className="site">
      <header className="hero" id="home">
        <nav className="nav container">
          <div className="logo">GraceNation Church</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#ministries">Ministries</a>
            <a href="#events">Events</a>
            <a href="#contact" className="btn btn-small">Visit Us</a>
          </div>
        </nav>

        <div className="hero-content container">
          <p className="eyebrow">Welcome Home</p>
          <h1>A place to grow in faith, find family, and serve with purpose.</h1>
          <p>
            Join us this Sunday and experience heartfelt worship, practical biblical teaching,
            and a loving church community for every age.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#services">Service Times</a>
            <a className="btn btn-outline" href="#contact">Plan Your Visit</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section container" id="about">
          <h2>Who We Are</h2>
          <p className="section-lead">
            GraceNation Church exists to help people know Jesus, walk in freedom, discover
            purpose, and make a lasting difference.
          </p>
        </section>

        <section className="section muted" id="services">
          <div className="container">
            <h2>Service Times</h2>
            <div className="grid three">
              {serviceTimes.map((service) => (
                <article key={service.day} className="card">
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
              {events.map((event) => (
                <div key={event.name} className="event-row">
                  <strong>{event.name}</strong>
                  <span>{event.date}</span>
                  <span>{event.place}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <h3>GraceNation Church</h3>
            <p>123 Hope Avenue, Your City</p>
            <p>hello@gracenation.org • +1 (555) 123-4567</p>
          </div>
          <div>
            <h4>Sunday Experience</h4>
            <p>Doors open at 8:30 AM</p>
            <p>Family check-in available</p>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <p>Follow us on YouTube, Instagram, and Facebook @gracenation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}