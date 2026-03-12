import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API from "../services/api";

const defaultEvents = [
  { name: "Community Outreach", date: "April 14", venue: "City Center" },
  { name: "Couples Night", date: "April 20", venue: "Main Auditorium" },
  { name: "Worship & Prayer Night", date: "April 27", venue: "Sanctuary" },
];

const defaultServices = [
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

const defaultAnnouncements = [
  {
    title: "Workers Meeting",
    text: "All department heads should meet after Sunday service.",
  },
  {
    title: "Fasting & Prayer",
    text: "Three-day fasting and prayer starts next Monday.",
  },
  {
    title: "Youth Rally",
    text: "Youth rally rehearsal begins this Friday evening.",
  },
];

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("church_events");
    return saved ? JSON.parse(saved) : defaultEvents;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem("church_services");
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("church_announcements");
    return saved ? JSON.parse(saved) : defaultAnnouncements;
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("church_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("church_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("church_announcements", JSON.stringify(announcements));
  }, [announcements]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAddEvent = () => {
    const name = window.prompt("Enter event name:");
    if (!name) return;

    const date = window.prompt("Enter event date:");
    if (!date) return;

    const venue = window.prompt("Enter event venue:");
    if (!venue) return;

    setEvents((prev) => [...prev, { name, date, venue }]);
  };

  const handleAddService = () => {
    const day = window.prompt("Enter service title:");
    if (!day) return;

    const time = window.prompt("Enter service time:");
    if (!time) return;

    const detail = window.prompt("Enter service detail:") || "Church service";

    setServices((prev) => [...prev, { day, time, detail }]);
  };

  const handleAddAnnouncement = () => {
    const title = window.prompt("Enter announcement title:");
    if (!title) return;

    const text = window.prompt("Enter announcement details:");
    if (!text) return;

    setAnnouncements((prev) => [...prev, { title, text }]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      alert("You are not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setUploadMessage("Uploading...");

      await API.post("/images/upload", formData, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      setUploadMessage("Image uploaded successfully");
      alert("Image uploaded successfully");
      setSelectedImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      console.log("Server response:", error.response);
      setUploadMessage("Upload failed");
      alert(error.response?.data?.message || "Image upload failed");
    }
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
          <a href="#events">Events</a>
          <a href="#services">Services</a>
          <a href="#announcements">Announcements</a>
          <a href="#media">Media Upload</a>
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
              Manage church activities, events, services, announcements, and media uploads from one place.
            </p>
          </div>
        </header>

        <section className="dashboard-cards" id="overview">
          <div className="dashboard-card">
            <h3>Upcoming Events</h3>
            <p>{events.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>Weekly Services</h3>
            <p>{services.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>Announcements</h3>
            <p>{announcements.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>Status</h3>
            <p>Live</p>
          </div>
        </section>

        <section className="dashboard-section" id="events">
          <div className="section-top">
            <h2>Upcoming Events</h2>
            <button className="action-btn" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>

          <div className="dashboard-table">
            <div className="dashboard-row dashboard-row-head">
              <span>Event</span>
              <span>Date</span>
              <span>Venue</span>
            </div>

            {events.map((event, index) => (
              <div className="dashboard-row" key={index}>
                <span>{event.name}</span>
                <span>{event.date}</span>
                <span>{event.venue}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-grid-2">
          <section className="dashboard-section" id="services">
            <div className="section-top">
              <h2>Service Schedule</h2>
              <button className="action-btn" onClick={handleAddService}>
                Add Service
              </button>
            </div>

            <div className="dashboard-list">
              {services.map((service, index) => (
                <div className="dashboard-list-item" key={index}>
                  <strong>{service.day}</strong>
                  <p>{service.time}</p>
                  <p>{service.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section" id="announcements">
            <div className="section-top">
              <h2>Announcements</h2>
              <button className="action-btn" onClick={handleAddAnnouncement}>
                Add Announcement
              </button>
            </div>

            <div className="dashboard-list">
              {announcements.map((announcement, index) => (
                <div className="dashboard-list-item" key={index}>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.text}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="dashboard-section" id="media">
          <div className="section-top">
            <h2>Gallery Upload</h2>
          </div>

          <div className="dashboard-list">
            <div className="dashboard-list-item">
              <strong>Upload New Image</strong>
              <p>Select an image and upload it to your website gallery.</p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />

              <br />
              <br />

              <button className="action-btn" onClick={handleImageUpload}>
                Upload Image
              </button>

              {uploadMessage && (
                <p style={{ marginTop: "12px" }}>{uploadMessage}</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}