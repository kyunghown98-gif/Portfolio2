import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { infoData, educationData, skillsData } from '../data';

const Profile = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
       gsap.from('.profile-title', {
           scrollTrigger: { trigger: comp.current, start: "top 70%" },
           y: 40, opacity: 0, duration: 1, ease: 'power3.out'
       });
       gsap.from('.profile-photo', {
           scrollTrigger: { trigger: comp.current, start: "top 70%" },
           scale: 0.9, opacity: 0, duration: 1.2, ease: 'power3.out'
       });
       gsap.from('.profile-p', {
           scrollTrigger: { trigger: comp.current, start: "top 60%" },
           y: 40, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power3.out'
       });
       gsap.from('.stat-group', {
           scrollTrigger: { trigger: comp.current, start: "top 60%" },
           y: 30, opacity: 0, duration: 1, stagger: 0.1, delay: 0.3, ease: 'power3.out'
       });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section className="profile-section container" ref={comp}>
       <h2 className="profile-title">PROFILE</h2>
       <div className="profile-grid-dense">
          {/* Column 1: Photo */}
          <div className="profile-photo" style={{ backgroundImage: 'url("/img/사진.png")' }}>
          </div>
          
          {/* Column 2: About & Info */}
          <div>
             <p className="profile-p">
                I'm a visionary developer from <span>DAEGU, KR</span>. I blur the line between <span>code and art</span>, building visually striking interfaces driven by robust modern architecture. My arsenal includes <span>React, GSAP, Three.js</span> and an unrelenting obsession with pixel-perfect design.
             </p>
             <div className="stat-group" style={{ marginBottom: '40px' }}>
                <h3 className="stat-header">INFO</h3>
                <ul className="info-list">
                   {infoData.map(([k, v]) => (
                      <li key={k}><span>{k}</span> {v}</li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Column 3: Skills & Education */}
          <div>
             <div className="stat-group" style={{ marginBottom: '40px' }}>
                <h3 className="stat-header">EDUCATION</h3>
                <ul className="edu-list">
                   {educationData.map(([y, t]) => (
                      <li key={t}><span>{y}</span> {t}</li>
                   ))}
                </ul>
             </div>

             <div className="stat-group">
                <h3 className="stat-header">SKILLS</h3>
                <div className="skills-grid">
                   {skillsData.map(s => (
                      <div key={s.cat} className="skill-cat">
                         <h4>{s.cat}</h4>
                         <div className="skill-tags">
                            {s.items.map(i => <span key={i}>{i}</span>)}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

       </div>
    </section>
  );
};
export default Profile;
