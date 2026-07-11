export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-label mono">// projects</div>
        <h2 className="section-title">Things I've built</h2>
        <div className="projects-grid">
          <div className="project-card featured">
            <div className="project-number mono">01</div>
            <div className="project-meta">
              <span className="project-tag">Full Stack</span>
            </div>
            <h3 className="project-title">Personal Portfolio Website</h3>
            <p className="project-desc">Built a responsive personal portfolio using React, Node.js, and Express.js, featuring an animated hero section, project showcase, and a working contact form.</p>
            <div className="project-stack">
              <span>React</span><span>CSS</span><span>Node.js</span><span>Express.js</span>
            </div>
            <a href="#" className="project-link mono">view project →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
