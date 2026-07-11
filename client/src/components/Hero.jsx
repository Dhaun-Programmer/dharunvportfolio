import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    
    const resizeCanvas = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dots = [];
    for (let i = 0; i < 80; i++) {
      dots.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    let animationFrameId;
    const drawGrid = () => {
      ctx.clearRect(0, 0, W, H);

      // grid lines
      ctx.strokeStyle = 'rgba(124,111,205,0.07)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // animated dots
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0;
        if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${d.opacity})`;
        ctx.fill();
      });

      // connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = (dots[i].x - dots[j].x) * W;
          const dy = (dots[i].y - dots[j].y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x * W, dots[i].y * H);
            ctx.lineTo(dots[j].x * W, dots[j].y * H);
            ctx.strokeStyle = `rgba(124,111,205,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <canvas id="grid-canvas" ref={canvasRef}></canvas>
      </div>
      <div className="hero-content">
        <div className="hero-profile">
          <img src="img/profile.jpg" alt="Dharun V" className="hero-avatar" />
        </div>
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="mono">CSE · 2nd Year · India</span>
          </div>
          <h1 className="hero-name">
            <span className="line" data-text="Dharun">Dharun</span>
            <span className="line accent" data-text="V.">V.</span>
          </h1>
          <p className="hero-tagline">I build things for the web<br/>and occasionally break them.</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See my work</a>
            <a href="Dharun_V_Resume.pdf" className="btn btn-ghost" download>Download Resume ↓</a>
            <a href="#contact" className="btn btn-ghost">Get in touch →</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="mono small">scroll</span>
      </div>
    </section>
  );
}
