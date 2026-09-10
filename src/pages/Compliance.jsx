import { ArrowUpRight, BadgeCheck, Building2, FileCheck2, Landmark, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { compliance, foundation } from '../data/foundation';

export default function Compliance() {
  const rows = [
    ['Legal Name', foundation.legalName],
    ['Trust Registration', foundation.registrationNo],
    ['Registration Date', foundation.established],
    ['NGO Darpan ID', foundation.darpanId],
    ['Darpan Registration Date', foundation.darpanDate],
    ['CSR Registration No.', foundation.csrNo],
    ['PAN', foundation.pan],
    ['Registered / Current Office', foundation.address],
  ];

  return (
    <>
      <section className="page-hero page-hero-compliance">
        <div className="container page-hero-inner">
          <span className="eyebrow light">Compliance & credibility</span>
          <h1>Institutional details, presented clearly.</h1>
          <p>Key information below is taken from the official registration and trust documents supplied by Sri Sai Foundation.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Registrations" title="A registered platform for charitable and CSR-aligned work." />
          <div className="compliance-grid large-cards">
            {compliance.map((item, i) => {
              const icons = [Landmark, ShieldCheck, Building2, FileCheck2];
              const Icon = icons[i];
              return (
                <div className="compliance-card" key={item.label}>
                  <div className="compliance-icon"><Icon /></div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.meta}</p>
                  {item.docs?.length > 0 && (
                    <div className="doc-links">
                      {item.docs.map((doc) => (
                        <a
                          className="doc-link"
                          key={doc.file}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.label} <ArrowUpRight size={15} />
                          <span className="visually-hidden"> {item.label} document (opens a PDF in a new tab)</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container compliance-table-wrap">
          <div>
            <span className="eyebrow">Foundation record</span>
            <h2>Core registration profile</h2>
            <p>For CSR due diligence or institutional partnerships, supporting certificates can be shared directly by the Foundation.</p>
            <div className="verified-note"><BadgeCheck /><span>Details are based on the documents provided for this website build.</span></div>
          </div>
          <div className="data-table">
            {rows.map(([label, value]) => <div className="data-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
        </div>
      </section>
    </>
  );
}