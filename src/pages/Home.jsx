import { Link } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, Building2, CircleCheck,
  MoveRight, ShieldCheck, Sparkles, UsersRound
} from 'lucide-react';
import HeroSlideshow from '../components/HeroSlideshow';
import SectionHeading from '../components/SectionHeading';
import { compliance, foundation } from '../data/foundation';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-noise" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={15} /> Community-led service since 2016</span>
            <h1>Creating pathways to <em>dignity, opportunity</em> and a better tomorrow.</h1>
            <p>Sri Sai Foundation is a Chennai-based charitable trust working across education, women empowerment, healthcare, community welfare and sustainable livelihoods.</p>
            <div className="hero-actions">
              <Link className="btn btn-accent" to="/programs">Explore our work <ArrowRight size={18} /></Link>
              <Link className="text-link" to="/about">Know our story <MoveRight size={18} /></Link>
            </div>
            <div className="hero-proof">
              <span><CircleCheck /> Registered charitable trust</span>
              <span><CircleCheck /> CSR registered entity</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Sri Sai Foundation impact visual">
            <div className="orb orb-a" /><div className="orb orb-b" />
            <div className="hero-card hero-card-main">
              <HeroSlideshow />
            </div>
            <div className="floating-card card-year">
              <strong>2016</strong><span>Established</span>
            </div>
            <div className="floating-card card-focus">
              <UsersRound size={20} /><span>Women & community empowerment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><strong>2016</strong><span>Trust established</span></div>
          <div><strong>{foundation.darpanId}</strong><span>NGO Darpan ID</span></div>
          <div><strong>{foundation.csrNo}</strong><span>CSR registration</span></div>
          <div><strong>12A & 80G</strong><span>Tax registrations</span></div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container split-intro">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>Purpose built around people, not programmes alone.</h2>
          </div>
          <div>
            <p>Our trust deed sets out a broad charitable mission: educational support, skill development, women’s empowerment, medical relief, welfare for vulnerable people, food and nutrition, village development, environmental awareness and livelihoods.</p>
            <Link className="text-link dark" to="/about">Read about the foundation <MoveRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section impact-section">
        <div className="container impact-grid">
          <div className="impact-visual">
            <div className="impact-panel">
              <span>Skills into livelihoods</span>
              <h3>Learning that can become income.</h3>
              <p>NGO Darpan records Foundation activity in basic sewing-machine operator training, beautician training and tailoring-related initiatives.</p>
            </div>
            <div className="impact-badge"><BadgeCheck size={22} /><span>Documented program history</span></div>
          </div>
          <div className="impact-copy">
            <SectionHeading eyebrow="From intent to action" title="A practical foundation for community progress." text="We prioritise interventions that can strengthen independence—education, vocational skills, health support and pathways to self-employment." />
            <div className="check-list">
              <p><CircleCheck /> Vocational training and self-employment orientation</p>
              <p><CircleCheck /> Women-centred skills and entrepreneurship support</p>
              <p><CircleCheck /> Education for economically weaker communities</p>
              <p><CircleCheck /> Community health and welfare objectives</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHeading eyebrow="Trust & governance" title="Registered. Accountable. Ready to collaborate." text="Key registrations from the Foundation’s official records are presented here for institutional and CSR partners." />
          <div className="compliance-grid">
            {compliance.map((item, i) => (
              <div className="compliance-card" key={item.label}>
                <div className="compliance-icon">{i === 2 ? <Building2 /> : <ShieldCheck />}</div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.meta}</p>
              </div>
            ))}
          </div>
          <div className="center-action"><Link className="btn btn-dark" to="/compliance">View compliance details <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="section cta-wrap">
        <div className="container">
          <div className="cta-card">
            <div>
              <span className="eyebrow light">Partnerships that create possibility</span>
              <h2>Work with us to expand meaningful community impact.</h2>
              <p>We welcome conversations with CSR teams, institutions, donors, volunteers and community partners aligned with our charitable objectives.</p>
            </div>
            <Link className="btn btn-accent" to="/contact">Start a conversation <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}