import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { foundation } from '../data/foundation';

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Compliance', '/compliance'],
  ['Contact', '/contact'],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="topbar">
          <div className="container topbar-inner">
            <span>Registered charitable trust • Chennai, Tamil Nadu</span>
            <div className="topbar-links">
              <a href={`mailto:${foundation.email}`}><Mail size={14} /> {foundation.email}</a>
              <a href={`tel:${foundation.phone.replace(/\s/g, '')}`}><Phone size={14} /> {foundation.phone}</a>
            </div>
          </div>
        </div>
        <div className="nav-wrap">
          <div className="container nav-inner">
            <Logo />
            <nav className="desktop-nav" aria-label="Primary navigation">
              {nav.map(([label, to]) => (
                <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
              ))}
            </nav>
            <Link to="/contact" className="btn btn-dark nav-cta">Partner with us <ArrowUpRight size={17} /></Link>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
          {open && (
            <div className="mobile-nav container">
              {nav.map(([label, to]) => <NavLink key={to} to={to}>{label}</NavLink>)}
              <Link className="btn btn-dark" to="/contact">Partner with us</Link>
            </div>
          )}
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Logo light />
            <p className="footer-intro">Advancing education, women empowerment, healthcare, community welfare and sustainable livelihoods with dignity at the centre.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about">About the Foundation</Link>
            <Link to="/programs">Our Programs</Link>
            <Link to="/compliance">Compliance</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p><MapPin size={16} /> {foundation.address}</p>
            <a href={`tel:${foundation.phone.replace(/\s/g, '')}`}><Phone size={16} /> {foundation.phone}</a>
            <a href={`mailto:${foundation.email}`}><Mail size={16} /> {foundation.email}</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Sri Sai Foundation. All rights reserved.</span>
          <span>Trust Reg. No. {foundation.registrationNo} • CSR {foundation.csrNo}</span>
        </div>
      </footer>
    </div>
  );
}
