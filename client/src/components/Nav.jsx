import { useEffect } from 'react';

export default function Nav() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + entry.target.id
              ? 'var(--text)' : '';
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => navObserver.observe(s));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navObserver.disconnect();
    };
  }, []);

  return (
    <nav className="nav" id="nav">
      <div className="nav-logo">DV<span className="blink">_</span></div>
      <ul className="nav-links">
        <li><a href="#about">about</a></li>
        <li><a href="#projects">projects</a></li>
        <li><a href="#skills">skills</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
      <div className="nav-status"><span className="status-dot"></span>open to opportunities</div>
    </nav>
  );
}
