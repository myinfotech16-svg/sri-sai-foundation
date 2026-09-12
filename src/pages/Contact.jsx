import { useState } from 'react';
import { Building2, Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { foundation } from '../data/foundation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 1500;

// Strips formatting and an optional +91 / 0 prefix, leaving the 10-digit number.
function normalisePhone(value) {
  let d = (value || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d;
}

// Mirrors the checks in server/src/routes/contact.js so the browser and the
// API agree on what counts as valid.
function validateField(name, value) {
  const v = (value || '').trim();

  switch (name) {
    case 'name':
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'Name is too short.';
      if (v.length > 120) return 'Name must be under 120 characters.';
      return '';
    case 'email':
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_RE.test(v)) return 'Enter a valid email, e.g. name@example.com';
      if (v.length > 180) return 'Email address is too long.';
      return '';
    case 'phone': {
      if (!v) return 'Please enter a phone number.';
      if (normalisePhone(v).length !== 10) return 'Enter a 10-digit phone number.';
      return '';
    }
    case 'organisation':
      if (v.length > 180) return 'Organisation name must be under 180 characters.';
      return '';
    case 'message':
      if (!v) return 'Please tell us about your enquiry.';
      if (v.length < 10) return 'Please add a little more detail (at least 10 characters).';
      if (v.length > MESSAGE_MAX) return `Please keep this under ${MESSAGE_MAX} characters.`;
      return '';
    default:
      return '';
  }
}

const FIELDS = ['name', 'email', 'phone', 'organisation', 'message'];

export default function Contact() {
  const empty = { name: '', email: '', phone: '', organisation: '', message: '', website: '' };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    // Phone accepts digits only and stops accepting them at 10, so nothing
    // beyond the tenth digit can be typed or pasted in.
    if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 10);

    setForm((prev) => ({ ...prev, [name]: value }));

    // Only re-validate while typing once the field has been blurred, so errors
    // don't appear when someone is halfway through entering their email.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const blur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const found = {};
    FIELDS.forEach((field) => {
      const msg = validateField(field, form[field]);
      if (msg) found[field] = msg;
    });

    setErrors(found);
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));

    if (Object.keys(found).length > 0) {
      setStatus('idle');
      setError('');
      const first = FIELDS.find((f) => found[f]);
      document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

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
      setErrors({});
      setTouched({});
      setStatus('sent');
    } catch {
      setError('Could not reach the server. Please check your connection or email us directly.');
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    name,
    value: form[name],
    onChange: update,
    onBlur: blur,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? 'has-error' : undefined,
  });

  const FieldError = ({ name }) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`} role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <>
      <section className="page-hero page-hero-contact">
        <div className="container page-hero-inner">
          <span className="eyebrow light">Contact &amp; partnerships</span>
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

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <label>
                Name
                <input {...fieldProps('name')} placeholder="Your name" maxLength={120} autoComplete="name" />
                <FieldError name="name" />
              </label>
              <label>
                Email
                <input {...fieldProps('email')} type="email" placeholder="you@example.com" maxLength={180} autoComplete="email" />
                <FieldError name="email" />
              </label>
            </div>

            <div className="form-row">
              <label>
                Phone
                <input {...fieldProps('phone')} type="tel" placeholder="+91 98765 43210" maxLength={20} autoComplete="tel" inputMode="tel" />
                <FieldError name="phone" />
              </label>
              <label>
                Organisation
                <input {...fieldProps('organisation')} placeholder="Company / Institution (optional)" maxLength={180} autoComplete="organization" />
                <FieldError name="organisation" />
              </label>
            </div>

            <label>
              How would you like to collaborate?
              <textarea {...fieldProps('message')} rows="6" maxLength={MESSAGE_MAX} placeholder="Tell us briefly about your enquiry or partnership idea..." />
              <span className="field-foot">
                <FieldError name="message" />
                <span className="char-count">{form.message.length}/{MESSAGE_MAX}</span>
              </span>
            </label>

            <label className="hp-field" aria-hidden="true">
              <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
            </label>

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