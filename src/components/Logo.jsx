import { HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="Sri Sai Foundation home">
      <span className="brand-mark"><HandHeart size={22} strokeWidth={1.8} /></span>
      <span className="brand-copy">
        <strong>Sri Sai</strong>
        <small>Foundation</small>
      </span>
    </Link>
  );
}
