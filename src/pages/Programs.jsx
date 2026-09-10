import { CircleCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { programs } from '../data/foundation';

export default function Programs() {
  return (
    <>
      <section className="page-hero page-hero-programs">
        <div className="container page-hero-inner">
          <span className="eyebrow light">Our programs</span>
          <h1>Practical pathways from support to self-reliance.</h1>
          <p>Our program areas reflect the charitable objectives set out in the Foundation’s trust deed and public registrations.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Focus areas" title="Designed around real community needs." text="From education to healthcare and livelihoods, our framework allows the Foundation to work across interconnected challenges." />
          <div className="program-detail-list">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <article className="program-detail" key={program.title}>
                  <div className="program-detail-head">
                    <span>0{index + 1}</span>
                    <div className="program-icon large"><Icon size={28} /></div>
                  </div>
                  <div className="program-detail-copy">
                    <h2>{program.title}</h2>
                    <p>{program.short}</p>
                  </div>
                  <div className="program-detail-points">
                    {program.bullets.map(item => <p key={item}><CircleCheck size={17} /> {item}</p>)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container program-note">
          <span className="eyebrow">Documented training activity</span>
          <h2>Skills development has already formed part of the Foundation’s work.</h2>
          <p>NGO Darpan records achievements including a Basic Sewing Machine Operator course and Beautician course, with historical funding entries related to garment-making, beautician training and tailoring.</p>
        </div>
      </section>
    </>
  );
}
