import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    const lines = [
      { text: '$ whoami', cls: 'cmd', delay: 400 },
      { text: '  dharun_v — cse student', cls: 'val', delay: 900 },
      { text: '$ cat interests.txt', cls: 'cmd', delay: 1500 },
      { text: '  web dev, ai/ml, open source', cls: 'val', delay: 2100 },
      { text: '$ git log --oneline -3', cls: 'cmd', delay: 2800 },
      { text: '  a9f3c21 fix: auth bug in prod', cls: 'comment', delay: 3300 },
      { text: '  82b1e04 feat: add dark mode', cls: 'comment', delay: 3500 },
      { text: '  3d7a910 init: new project setup', cls: 'comment', delay: 3700 },
      { text: '$ █', cls: 'cmd', delay: 4200 },
    ];

    const termEl = document.getElementById('terminal-text');
    if (!termEl) return;
    
    // Clear in case of re-render
    termEl.innerHTML = '';

    const timeouts = [];
    lines.forEach(({ text, cls, delay }) => {
      const t = setTimeout(() => {
        const div = document.createElement('div');
        div.className = cls;
        div.textContent = text;
        const prev = termEl.querySelector('.cursor-line');
        if (prev) prev.classList.remove('cursor-line');
        termEl.appendChild(div);
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="section-label mono">// about me</div>
        <div className="about-grid">
          <div className="about-text">
            <h2>A builder who loves<br/><em>real problems.</em></h2>
            <p>I'm Dharun V, a second-year Computer Science student with a deep curiosity for how things work — and an even deeper urge to build them from scratch. From CLI tools to full-stack apps, I'm always shipping something.</p>
            <p>When I'm not coding, I'm reading about systems design, contributing to open source, or figuring out why my code worked yesterday but not today.</p>
            <div className="about-stats">
              <div className="stat"><span className="stat-num">1+</span><span className="stat-label">projects built</span></div>
              <div className="stat"><span className="stat-num">4</span><span className="stat-label">certifications</span></div>
              <div className="stat"><span className="stat-num">2nd</span><span className="stat-label">year in CSE</span></div>
            </div>
          </div>
          <div className="about-visual">
            <div className="terminal">
              <div className="terminal-bar">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                <span className="terminal-title mono">dharun@portfolio:~</span>
              </div>
              <div className="terminal-body mono" id="terminal-text"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
