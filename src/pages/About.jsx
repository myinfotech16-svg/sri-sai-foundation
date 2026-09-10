import { Award, CircleCheck, Compass, HeartHandshake, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { foundation, principles } from '../data/foundation';

export default function About() {
  return (
    <>
      <section className="page-hero page-hero-about">
        <div className="container page-hero-inner">
          <span className="eyebrow light">About Sri Sai Foundation</span>
          <h1>Service grounded in dignity, inclusion and opportunity.</h1>
          <p>Established in Chennai in 2016, the Foundation was created for public charitable purposes with education, social welfare, health and community development at its core.</p>
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div>
            <SectionHeading eyebrow="Our story" title="A broad charitable mandate with a human focus." />
            <p className="lead-copy">The original trust deed established Sree Sai Foundation on 14 July 2016 under the leadership of founder M. Devaki. Its objectives span scholarships, educational institutions, women’s employment, vocational training, medical relief, welfare, nutrition, village development, environmental awareness and livelihoods.</p>
            <p className="muted-copy">An amendment deed executed in June 2022 updated parts of the trust’s administration and records the Foundation’s office at Ennore, Chennai.</p>
          </div>
          <div className="story-card">
            <span className="mini-label">Foundation profile</span>
            <div><small>Legal name</small><strong>{foundation.legalName}</strong></div>
            <div><small>Established</small><strong>{foundation.established}</strong></div>
            <div><small>Founder & President</small><strong>{foundation.founder}</strong></div>
            <div><small>Location</small><strong>{foundation.location}</strong></div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHeading eyebrow="What guides us" title="Four principles behind our work." align="center" />
          <div className="principle-grid">
            {[HeartHandshake, Compass, Users, Award].map((Icon, i) => (
              <div className="principle-card" key={principles[i]}>
                <Icon size={24} />
                <h3>{['Dignity first', 'Opportunity that lasts', 'Inclusive community', 'Responsible action'][i]}</h3>
                <p>{principles[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column-list">
          <div>
            <SectionHeading eyebrow="Our mission" title="Help people build stronger foundations for life." text="We aim to improve access to learning, livelihoods, health and welfare while supporting people to become more self-reliant and resilient." />
          </div>
          <div className="mission-list">
            {[
              'Promote education and scholarships for deserving learners',
              'Support women’s skills, employment and entrepreneurship',
              'Advance medical relief and community health awareness',
              'Strengthen welfare for vulnerable and disadvantaged people',
              'Encourage food security, village development and livelihoods',
              'Build awareness around environmental protection and hygiene',
            ].map(item => <p key={item}><CircleCheck /> {item}</p>)}
          </div>
        </div>
      </section>

      <section className="section governance-section">
        <div className="container">
          <SectionHeading eyebrow="Governance" title="Leadership recorded in the Foundation’s documents." text="The 2022 amendment deed identifies the founder/president and records trustee changes for the administration of the trust." />
          <div className="people-grid">
            <article><span>Founder & President</span><h3>M. Devaki</h3><p>Founder of Sree Sai Foundation and signatory to the trust’s governing documents.</p></article>
            <article><span>Treasurer</span><h3>K. Jayanthi</h3><p>Recorded as joining the trust as Treasurer in the 2022 amendment deed.</p></article>
            <article><span>Trustee</span><h3>B. Bhuwaneswari</h3><p>Recorded as joining the trust as Trustee in the 2022 amendment deed.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}