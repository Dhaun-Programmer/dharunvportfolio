import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        e.target.reset();
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('An error occurred.');
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-label mono">// contact</div>
        <h2 className="section-title">Let's build something.</h2>
        <p className="contact-sub">Have a project, opportunity, or just want to talk tech? I'm always open.</p>
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="mono" htmlFor="name">name</label>
              <input type="text" id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label className="mono" htmlFor="email">email</label>
              <input type="email" id="email" name="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="form-group">
            <label className="mono" htmlFor="message">message</label>
            <textarea id="message" name="message" rows="5" placeholder="What's on your mind?" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" id="submit-btn">Send message →</button>
          {status && <div className="form-status" id="form-status">{status}</div>}
        </form>
        <div className="contact-links">
          <a href="mailto:dharun09112005@gmail.com" className="contact-link mono">dharun09112005@gmail.com</a>
          <a href="https://github.com/Dhaun-Programmer" target="_blank" rel="noreferrer" className="contact-link mono">github</a>
          <a href="https://www.linkedin.com/in/dharun-v-92249432a/" target="_blank" rel="noreferrer" className="contact-link mono">linkedin</a>
        </div>
      </div>
    </section>
  );
}
