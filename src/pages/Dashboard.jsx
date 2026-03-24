import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import API, { getStoredToken, hasSessionAuth } from "../services/api";

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

const defaultOverview = {
  welcome: "Welcome back",
  title: "GRACE NATION CHURCH INTERNATIONAL",
  text: "Manage church activities, events, services, announcements, and media uploads from one place.",
};

const galleryCategories = [
  "Service",
  "Church Life",
  "Miracles",
  "Ministry",
  "Celebration",
];

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token) || hasSessionAuth();

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
  const [selectedCategory, setSelectedCategory] = useState(galleryCategories[0]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [overview, setOverview] = useState(() => {
    const saved = localStorage.getItem("church_overview");
    return saved ? JSON.parse(saved) : defaultOverview;
  });

  const saveImageLocally = () =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const savedGallery = JSON.parse(localStorage.getItem("church_gallery_images") || "[]");
          const updatedGallery = [
            {
              title: selectedImage.name,
              image: reader.result,
              category: selectedCategory,
              createdAt: Date.now(),
            },
            ...savedGallery,
          ].slice(0, 30);

          localStorage.setItem("church_gallery_images", JSON.stringify(updatedGallery));
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Could not read image file"));
      reader.readAsDataURL(selectedImage);
    });

  useEffect(() => {
    localStorage.setItem("church_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("church_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("church_announcements", JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem("church_overview", JSON.stringify(overview));
  }, [overview]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session_auth");
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

  const handleEditOverview = () => {
    const welcome = window.prompt("Enter overview welcome text:", overview.welcome);
    if (!welcome) return;

    const title = window.prompt("Enter overview heading:", overview.title);
    if (!title) return;

    const text = window.prompt("Enter overview description:", overview.text);
    if (!text) return;

    setOverview({ welcome, title, text });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    if (!getStoredToken() && !hasSessionAuth()) {
      alert("You are not logged in.");
      return;
    }

    const uploadVariants = [
      { url: "/images/upload", field: "file" },
      { url: "/images/upload", field: "image" },
      { url: "/upload", field: "file" },
      { url: "/upload", field: "image" },
    ];

    try {
      setUploadMessage("Uploading...");

      let uploaded = false;
      let lastError = null;

      for (const variant of uploadVariants) {
        const formData = new FormData();
        formData.append(variant.field, selectedImage);

        try {
          await API.post(variant.url, formData);
          uploaded = true;
          break;
        } catch (err) {
          lastError = err;

          const status = err.response?.status;
          const message = err.response?.data?.message || "";

          const isFieldMismatch =
            status === 400 &&
            /unexpected field|field/i.test(String(message));

          if (status === 404 || isFieldMismatch) {
            continue;
          }

          throw err;
        }
      }

      if (!uploaded) {
        await saveImageLocally();
        setUploadMessage("Image saved locally (backend upload unavailable)");
        alert("Image saved locally and will appear in Gallery.");
        setSelectedImage(null);
        setSelectedCategory(galleryCategories[0]);
        return;
      }

      setUploadMessage("Image uploaded successfully");
      alert("Image uploaded successfully");
      setSelectedImage(null);
      setSelectedCategory(galleryCategories[0]);
    } catch (error) {
      console.error("Upload error:", error);
      console.log("Server response:", error.response);
      setUploadMessage("Upload failed");

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("session_auth");
        alert("Your session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      if (error.response?.status === 403) {
        await saveImageLocally();
        setUploadMessage("Image saved locally (no upload permission on server)");
        alert("No upload permission on server (403). Saved locally instead.");
        setSelectedImage(null);
        setSelectedCategory(galleryCategories[0]);
        return;
      }

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
            <p className="dashboard-welcome">{overview.welcome}</p>
            <h1>{overview.title}</h1>
            <p className="dashboard-header-text">{overview.text}</p>
          </div>
        </header>

        <section className="dashboard-cards" id="overview">
          <div className="section-top" style={{ marginBottom: "18px" }}>
            <h2>Overview</h2>
            <button className="action-btn" onClick={handleEditOverview}>
              Post Overview
            </button>
          </div>

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
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              />

              <div style={{ marginTop: "10px" }}>
                <label htmlFor="gallery-category">Category:</label>{" "}
                <select
                  id="gallery-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {galleryCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {selectedImage && (
                <p style={{ marginTop: "8px" }}>
                  Selected file: <strong>{selectedImage.name}</strong>
                </p>
              )}

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