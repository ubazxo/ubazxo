import React, { useState } from 'react';
import BackToTop from './components/BackToTop';
import './css/Careers.css';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      description: 'Join our core team to architect and build scalable applications using React, Node.js, and cloud technologies.',
      requirements: [
        '5+ years of full stack development experience',
        'Expert in React.js and Node.js ecosystem',
        'Strong experience with cloud services (AWS/Azure)',
        'Experience with microservices architecture'
      ]
    },
    {
      id: 2,
      title: 'Lead React Developer',
      department: 'Engineering',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      description: 'Lead our frontend development initiatives and mentor junior developers while building exceptional user experiences.',
      requirements: [
        '6+ years of React.js experience',
        'Experience with state management (Redux/Context)',
        'Strong TypeScript skills',
        'Team leadership experience'
      ]
    },
    {
      id: 3,
      title: 'Senior Cloud Architect',
      department: 'Engineering',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      description: 'Design and implement cloud-native solutions while optimizing our infrastructure for scale and performance.',
      requirements: [
        'AWS/Azure certification required',
        'Experience with Kubernetes and Docker',
        'Infrastructure as Code expertise',
        'Security best practices knowledge'
      ]
    },
    {
      id: 4,
      title: 'React Native Developer',
      department: 'Engineering',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      description: 'Build cross-platform mobile applications that deliver exceptional user experiences.',
      requirements: [
        '3+ years React Native experience',
        'iOS and Android development knowledge',
        'Performance optimization skills',
        'Experience with native modules'
      ]
    },
    {
      id: 5,
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      description: 'Design and implement scalable APIs and microservices architecture.',
      requirements: [
        '5+ years Node.js experience',
        'Expert in database design (SQL/NoSQL)',
        'API design and documentation',
        'Experience with message queues'
      ]
    }
  ];

  const filteredJobs = jobs.filter(job => 
    selectedDepartment === 'all' || job.department.toLowerCase() === selectedDepartment
  );

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="careers-container">
      <div className="careers-hero">
        <h1>Join Our Remote-First Team</h1>
        <p className="hero-subtitle">Build the Future of Technology from Anywhere</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Remote</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Flexible</span>
            <span className="stat-label">Hours</span>
          </div>
        </div>
        <div className="social-link">
          <a 
            href="https://www.linkedin.com/company/coreloom/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            Follow us on LinkedIn <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://www.instagram.com/coreloom/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link"
          >
            Follow us on Instagram <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="careers-filter">
        <select 
          onChange={(e) => setSelectedDepartment(e.target.value)}
          value={selectedDepartment}
        >
          <option value="all">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <span className="job-type">{job.type}</span>
            </div>
            <div className="job-details">
              <span><i className="fas fa-globe-americas"></i> {job.location}</span>
            </div>
            <p className="job-description">{job.description}</p>
            <ul className="requirements-list">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <button onClick={() => handleApply(job)} className="apply-button">
              Apply Now <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Apply for {selectedJob.title}</h2>
            <form className="application-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone Number" />
              <textarea placeholder="Why would you like to join us?" required />
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default Careers;
