import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.project-panel');
            
            // By applying xPercent: -100 to the panels themselves, 
            // and using exactly 100vw for each panel, 
            // GSAP guarantees a mathematically perfect 1-by-1 snap ratio based on user scroll.
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    pin: true,
                    scrub: 1, 
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + window.innerWidth * panels.length
                }
            });

        }, wrapperRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="projects-gsap-safe-container" id="projects-section">
            <section className="projects-wrapper" ref={wrapperRef}>
               <div className="projects-container" ref={containerRef}>
                   {projectsData.map((proj, idx) => (
                       <div key={proj.idx} className="project-panel">
                           <div className="project-panel-inner">
                               <div className="proj-img-wrap">
                                   {proj.image && (
                                       <div className="proj-hero-img" style={{ backgroundImage: `url('${proj.image}')` }}></div>
                                   )}
                               </div>
                               <div className="proj-info">
                                   <div className="proj-idx">Exhibition 0{idx + 1}</div>
                                   <h3 className="proj-title">{proj.title}</h3>
                                   <p className="proj-desc">{proj.desc}</p>
                                   <div className="proj-tech-list">
                                       {proj.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                                   </div>
                                   <a href={proj.link === '#' ? undefined : proj.link} target="_blank" rel="noreferrer" className="proj-link">View Details</a>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
            </section>
        </div>
    );
};
export default Projects;
