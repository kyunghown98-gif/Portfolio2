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
          <div className="profile-photo" style={{ backgroundImage: 'url("./img/사진.png")' }}>
          </div>
          
          {/* Column 2: About & Info */}
          <div>
             <p className="profile-p">
                틀에 얽매이지 않는 창의적인 프론트엔드 개발자 박경훈입니다. 저는 <span>기능과 예술의 경계</span>를 허물며, 시각적으로 강렬하면서도 탄탄한 아키텍처를 기반으로 한 웹 경험을 구축합니다. <span>React, GSAP, 모던 JS</span>에 대한 깊은 이해도와 집요한 픽셀 디테일을 바탕으로 사용자에게 잊지 못할 몰입형 디지털 인터랙션을 선사합니다.
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
