import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import "./css/Dashboard.css";
import FadeInSection from "./components/FadeInSection";

// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // State for dynamic dashboard data
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCompact, setSidebarCompact] = useState(false);

  // Helper function to safely parse JSON even if the body is empty
  const parseJSONSafely = async (response) => {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (err) {
      console.warn("Could not parse JSON:", text);
      return {};
    }
  };

  // Wrap fetchDashboardData in useCallback so that it can be included in the dependency array
  const fetchDashboardData = useCallback(async () => {
    try {
      // Optionally include authorization if needed
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/api/dashboard", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await parseJSONSafely(response);
      if (response.ok) {
        // Assuming the backend returns an object with user, services, and activities fields
        setUser(data.user);
        setServices(data.services);
        setActivities(data.activities);
        // Example: Setting up chart data using the services array
        setChartData({
          labels: data.services.map((service) => service.name),
          datasets: [
            {
              label: "Usage (%)",
              data: data.services.map((service) => service.usagePercentage || 0),
              backgroundColor: "rgba(74,144,226,0.6)",
              borderColor: "rgba(74,144,226,1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.error("Dashboard fetch error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Add scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const footerOffset = document.querySelector('.footer')?.offsetTop || Infinity;
      const scrollPosition = window.scrollY + window.innerHeight;
      setSidebarCompact(scrollPosition > footerOffset - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback static data if dynamic data is not available
  const fallbackUser = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/50",
    subscription: "Pro",
    stats: {
      activeServices: 3,
      remainingUsage: "75%",
      renewalDate: "2025-03-15",
    },
  };

  const fallbackServices = [
    { name: "Cloud Hosting", status: "Running", usage: "85%", usagePercentage: 85 },
    { name: "AI Consulting", status: "Active", usage: "60%", usagePercentage: 60 },
    { name: "Data Analytics", status: "Paused", usage: "0%", usagePercentage: 0 },
  ];

  const fallbackActivities = [
    { id: 1, activity: "Payment completed for Cloud Hosting", date: "2025-01-30" },
    { id: 2, activity: "Service upgraded: AI Consulting", date: "2025-01-28" },
    { id: 3, activity: "New support ticket submitted", date: "2025-01-27" },
  ];

  const displayUser = user || fallbackUser;
  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayActivities = activities.length > 0 ? activities : fallbackActivities;
  const displayChartData =
    chartData || {
      labels: fallbackServices.map((s) => s.name),
      datasets: [
        {
          label: "Usage (%)",
          data: fallbackServices.map((s) => parseInt(s.usage, 10)),
          backgroundColor: "rgba(74,144,226,0.6)",
          borderColor: "rgba(74,144,226,1)",
          borderWidth: 1,
        },
      ],
    };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'activity', label: 'Activity', icon: '🔔' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'support', label: 'Support', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <FadeInSection>
            <StatsSection />
            <AnalyticsSection />
            <ServicesOverview />
          </FadeInSection>
        );
      case 'services':
        return <FadeInSection><ServicesSection /></FadeInSection>;
      case 'analytics':
        return <FadeInSection><DetailedAnalytics /></FadeInSection>;
      case 'activity':
        return <FadeInSection><ActivitySection /></FadeInSection>;
      case 'billing':
        return <FadeInSection><BillingSection /></FadeInSection>;
      case 'support':
        return <FadeInSection><SupportSection /></FadeInSection>;
      case 'settings':
        return <FadeInSection><SettingsSection /></FadeInSection>;
      default:
        return <FadeInSection><StatsSection /></FadeInSection>;
    }
  };

  // Component sections
  const StatsSection = () => (
    <section className="stats-grid">
      {Object.entries(displayUser.stats).map(([key, value]) => (
        <div className="stat-card" key={key}>
          <h3>{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p className="stat-value">{value}</p>
        </div>
      ))}
    </section>
  );

  const ServicesSection = () => (
    <section className="services-content">
      <h2>Your Services</h2>
      <div className="services-grid">
        {displayServices.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.name}</h3>
            <p>Status: {service.status}</p>
            <p>Usage: {service.usage}</p>
            <button className="action-button">Manage</button>
          </div>
        ))}
      </div>
    </section>
  );

  const AnalyticsSection = () => (
    <section className="content-row">
      <h2 className="row-header">Performance Analytics</h2>
      <div className="chart-wrapper">
        <Bar data={displayChartData} options={chartOptions} />
      </div>
    </section>
  );

  const ServicesOverview = () => (
    <section className="content-row">
      <h2 className="row-header">Active Services</h2>
      <div className="scroll-section">
        {displayServices.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.name}</h3>
            <p>Status: {service.status}</p>
            <p>Usage: {service.usage}</p>
            <button className="action-button">Manage</button>
          </div>
        ))}
      </div>
    </section>
  );

  const ActivitySection = () => (
    <section className="content-row">
      <h2 className="row-header">Recent Activity</h2>
      <div className="scroll-section">
        {displayActivities.map((activity) => (
          <div className="service-card" key={activity.id}>
            <p>{activity.activity}</p>
            <small>{activity.date}</small>
          </div>
        ))}
      </div>
    </section>
  );

  const BillingSection = () => (
    <FadeInSection>
      <section className="billing-management">
        <h2>Subscription & Billing Management</h2>
        <p>Current Plan: {displayUser.subscription}</p>
        <p>
          Usage-based billing breakdown: {/* TODO: Integrate billing details from backend */}
        </p>
        <button onClick={() => { /* TODO: Implement upgrade/downgrade flow */ }}>
          Manage Subscription
        </button>
      </section>
    </FadeInSection>
  );

  const SupportSection = () => (
    <FadeInSection>
      <section className="support-help">
        <h2>Support & Help Center</h2>
        <div className="support-options">
          <button onClick={() => { /* TODO: Implement live chat integration */ }}>
            Live Chat
          </button>
          <button onClick={() => { /* TODO: Link to knowledge base */ }}>
            Knowledge Base
          </button>
          <button onClick={() => { /* TODO: Link to community forum */ }}>
            Community Forum
          </button>
          <button onClick={() => { /* TODO: Implement support ticket system */ }}>
            Submit Ticket
          </button>
        </div>
      </section>
    </FadeInSection>
  );

  const SettingsSection = () => (
    <FadeInSection>
      <section className="security-account">
        <h2>Security & Account Management</h2>
        <button onClick={() => { /* TODO: Enable Two-Factor Authentication (2FA) */ }}>
          Enable 2FA
        </button>
        <button onClick={() => { /* TODO: Implement role/access management */ }}>
          Manage Access
        </button>
        <p>
          Recent Login History: {/* TODO: Fetch dynamic login history from backend */}
        </p>
      </section>
    </FadeInSection>
  );

  const DetailedAnalytics = () => (
    <div className="detailed-analytics">
      <section className="analytics-section">
        <h2>Detailed Analytics</h2>
        <div className="chart-wrapper">
          <Bar data={displayChartData} options={chartOptions} />
        </div>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Performance Metrics</h3>
            <div className="metrics-list">
              {displayServices.map((service, index) => (
                <div key={index} className="metric-item">
                  <span>{service.name}</span>
                  <div className="metric-value">
                    <div 
                      className="progress-bar" 
                      style={{width: `${service.usagePercentage}%`}}
                    ></div>
                    <span>{service.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="analytics-card">
            <h3>Usage Trends</h3>
            <p>Historical data and trends will be displayed here</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarCompact ? 'compact' : ''}`}>
        <nav className="nav-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="profile-section">
            <img src={displayUser.profilePic} alt="Profile" className="profile-pic" />
            <div className="user-info">
              <span className="user-name">{displayUser.name}</span>
              <span className="user-plan">{displayUser.subscription}</span>
            </div>
          </div>
        </header>

        <div className="content-container">
          <div className="content-transition">
            {renderContent()}
          </div>
        </div>
        <footer className="footer">
          <div className="footer-divider"></div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;