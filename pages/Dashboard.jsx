import { Link } from "react-router-dom";

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div>
          <h2 className="dashboard-brand">Grace Nation</h2>
          <p className="dashboard-subtitle">Church Admin Panel</p>
        </div>

        <nav className="dashboard-nav">
          <a href="#overview">Overview</a>
          <a href="#members">Members</a>
          <a href="#events">Events</a>
          <a href="#services">Services</a>
          <a href="#announcements">Announcements</a>
          <a href="#media">Media</a>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <Link to="/" className="dashboard-link-btn">
            Back to Website
          </Link>
          <button onClick={handleLogout} className="dashboard-logout">
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-welcome">Welcome back</p>
            <h1>GRACE NATION CHURCH INTERNATIONAL</h1>
            <p className="dashboard-header-text">
              Manage church activities, events, media, and announcements from one place.
            </p>
          </div>
        </header>

        <section className="dashboard-cards" id="overview">
          <div className="dashboard-card">
            <h3>Total Members</h3>
            <p>1,245</p>
          </div>

          <div className="dashboard-card">
            <h3>Upcoming Events</h3>
            <p>6</p>
          </div>

          <div className="dashboard-card">
            <h3>Weekly Services</h3>
            <p>3</p>
          </div>

          <div className="dashboard-card">
            <h3>Announcements</h3>
            <p>4</p>
          </div>
        </section>

        <section className="dashboard-section" id="members">
          <div className="section-top">
            <h2>Recent Members</h2>
            <button className="action-btn">Add Member</button>
          </div>

          <div className="dashboard-table">
            <div className="dashboard-row dashboard-row-head">
              <span>Name</span>
              <span>Department</span>
              <span>Status</span>
            </div>

            <div className="dashboard-row">
              <span>John Samuel</span>
              <span>Choir</span>
              <span>Active</span>
            </div>

            <div className="dashboard-row">
              <span>Esther Daniel</span>
              <span>Ushering</span>
              <span>Active</span>
            </div>

            <div className="dashboard-row">
              <span>Michael James</span>
              <span>Media</span>
              <span>Pending</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section" id="events">
          <div className="section-top">
            <h2>Upcoming Events</h2>
            <button className="action-btn">Add Event</button>
          </div>

          <div className="dashboard-table">
            <div className="dashboard-row dashboard-row-head">
              <span>Event</span>
              <span>Date</span>
              <span>Venue</span>
            </div>

            <div className="dashboard-row">
              <span>Community Outreach</span>
              <span>April 14</span>
              <span>City Center</span>
            </div>

            <div className="dashboard-row">
              <span>Couples Night</span>
              <span>April 20</span>
              <span>Main Auditorium</span>
            </div>

            <div className="dashboard-row">
              <span>Worship & Prayer Night</span>
              <span>April 27</span>
              <span>Sanctuary</span>
            </div>
          </div>
        </section>

        <section className="dashboard-grid-2">
          <section className="dashboard-section" id="services">
            <div className="section-top">
              <h2>Service Schedule</h2>
              <button className="action-btn">Edit</button>
            </div>

            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Sunday Celebration</strong>
                <p>8:00 AM & 02:00 PM</p>
              </div>

              <div className="dashboard-list-item">
                <strong>Midweek Service</strong>
                <p>Thursday • 8:00 PM</p>
              </div>

              <div className="dashboard-list-item">
                <strong>Morning Prayer</strong>
                <p>Monday–Friday • 6:00 AM</p>
              </div>
            </div>
          </section>

          <section className="dashboard-section" id="announcements">
            <div className="section-top">
              <h2>Announcements</h2>
              <button className="action-btn">Add</button>
            </div>

            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <strong>Workers Meeting</strong>
                <p>All department heads should meet after Sunday service.</p>
              </div>

              <div className="dashboard-list-item">
                <strong>Fasting & Prayer</strong>
                <p>Three-day fasting and prayer starts next Monday.</p>
              </div>

              <div className="dashboard-list-item">
                <strong>Youth Rally</strong>
                <p>Youth rally rehearsal begins this Friday evening.</p>
              </div>
            </div>
          </section>
        </section>

        <section className="dashboard-section" id="media">
          <div className="section-top">
            <h2>Quick Actions</h2>
          </div>

          <div className="dashboard-actions">
            <button>Upload Sermon</button>
            <button>Upload Gallery Image</button>
            <button>Create Announcement</button>
            <button>Manage Users</button>
          </div>
        </section>
      </main>
    </div>
  );
}