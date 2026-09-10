import { useState } from 'react';
import { Building2, Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { foundation } from '../data/foundation';

export default function Contact() {
  const empty = { name: '', email: '', organisation: '', message: '', website: '' };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setForm(empty);
      setStatus('sent');
    } catch {
      setError('Could not reach the server. Please check your connection or email us directly.');
      setStatus('error');
    }
  };

  return (
    <>
      <section className="page-hero page-hero-contact">
        <div className="container page-hero-inner">
          <span className="eyebrow light">Contact & partnerships</span>
          <h1>Start a conversation that can create impact.</h1>
          <p>Connect with Sri Sai Foundation for CSR partnerships, institutional collaboration, volunteering, community initiatives or general enquiries.</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <SectionHeading eyebrow="Get in touch" title="We welcome aligned partners and supporters." text="Use the form or contact the Foundation directly using the details below." />
            <div className="contact-list">
              <a href={`mailto:${foundation.email}`}><span><Mail /></span><div><small>Email</small><strong>{foundation.email}</strong></div></a>
              <a href={`tel:${foundation.phone.replace(/\s/g, '')}`}><span><Phone /></span><div><small>Phone</small><strong>{foundation.phone}</strong></div></a>
              <div><span><MapPin /></span><div><small>Office</small><strong>{foundation.address}</strong></div></div>
              <div><span><Building2 /></span><div><small>CSR registration</small><strong>{foundation.csrNo}</strong></div></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <label>Name<input name="name" required value={form.name} onChange={update} placeholder="Your name" /></label>
              <label>Email<input name="email" type="email" required value={form.email} onChange={update} placeholder="you@example.com" /></label>
            </div>
            <label>Organisation<input name="organisation" value={form.organisation} onChange={update} placeholder="Company / Institution (optional)" /></label>
            <label>How would you like to collaborate?<textarea name="message" rows="6" required value={form.message} onChange={update} placeholder="Tell us briefly about your enquiry or partnership idea..." /></label>
            <label className="hp-field" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label>
            <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'} <Send size={17} />
            </button>
            {status === 'sent' && <p className="form-status ok">Thank you — your enquiry has been received. We will be in touch shortly.</p>}
            {status === 'error' && <p className="form-status err">{error}</p>}
            <p className="form-note">We use your details only to respond to this enquiry.</p>
          </form>
        </div>
      </section>
    </>
  );
}