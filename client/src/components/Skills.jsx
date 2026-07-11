export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="section-label mono">// skills</div>
        <h2 className="section-title">What I work with</h2>
        <div className="skills-marquee-wrap">
          <div className="skills-marquee">
            <div className="skills-track" id="skills-track">
              <span>C</span><span>C++</span><span>Java</span>
              <span>Python</span><span>SQL</span><span>React</span>
              <span>Node.js</span><span>Express.js</span><span>NumPy</span>
              <span>Pandas</span><span>Matplotlib</span>
              {/* duplicate for infinite scroll */}
              <span>C</span><span>C++</span><span>Java</span>
              <span>Python</span><span>SQL</span><span>React</span>
              <span>Node.js</span><span>Express.js</span><span>NumPy</span>
              <span>Pandas</span><span>Matplotlib</span>
            </div>
          </div>
        </div>
        <div className="skills-categories">
          <div className="skill-group">
            <div className="skill-group-label mono">languages</div>
            <div className="skill-pills">
              <span className="pill">C</span>
              <span className="pill">C++</span>
              <span className="pill">Java</span>
              <span className="pill">Python</span>
              <span className="pill">SQL</span>
            </div>
          </div>
          <div className="skill-group">
            <div className="skill-group-label mono">frameworks & libs</div>
            <div className="skill-pills">
              <span className="pill">React</span>
              <span className="pill">Node.js</span>
              <span className="pill">Express.js</span>
              <span className="pill">NumPy</span>
              <span className="pill">Pandas</span>
              <span className="pill">Matplotlib</span>
            </div>
          </div>
          <div className="skill-group">
            <div className="skill-group-label mono">tools & databases</div>
            <div className="skill-pills">
              <span className="pill">VS Code</span>
              <span className="pill">GitHub</span>
              <span className="pill">MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
