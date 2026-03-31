import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data';

const IndexSection = () => {
    const comp = useRef(null);
    const previewRef = useRef(null);

    useLayoutEffect(() => {
       const ctx = gsap.context(() => {
          gsap.from('.index-item', {
             scrollTrigger: { trigger: '.index-list', start: "top 80%" },
             y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out'
          });
       }, comp);
       return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
       const movePreview = gsap.quickTo(previewRef.current, "left", {duration: 0.4, ease: "power3"});
       const movePreviewY = gsap.quickTo(previewRef.current, "top", {duration: 0.4, ease: "power3"});
       
       const handleMove = (e) => {
           movePreview(e.clientX);
           movePreviewY(e.clientY);
       };
       window.addEventListener('mousemove', handleMove);
       return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    const handleEnter = (img) => {
        if (!previewRef.current) return;
        previewRef.current.style.backgroundImage = `url('${img}')`;
        gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };

    const handleLeave = () => {
       if (!previewRef.current) return;
       gsap.to(previewRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.out", overwrite: "auto" });
    };

    const handleClick = (e, index) => {
        e.preventDefault();
        const targetSection = document.getElementById('projects-section');
        if (targetSection) {
            // Find precise absolute Y offset of the projects section start
            const startY = targetSection.getBoundingClientRect().top + window.scrollY;
            
            // Because GSAP scrub is 1:1 with horizontal scroll width,
            // and each project is exactly 100vw (window.innerWidth),
            // we calculate the target offset perfectly.
            const targetY = startY + (window.innerWidth * index);
            
            // Smoothly glide exactly to that project!
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    };

    return (
       <section className="index-section container" ref={comp}>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '60px', color: 'var(--text-secondary)' }}>ARCHIVE</h2>
           
           <div className="index-list">
               {projectsData.map((proj, idx) => (
                   <div 
                      key={proj.idx} 
                      className="index-item"
                      onClick={(e) => handleClick(e, idx)}
                      onMouseEnter={() => handleEnter(proj.image)}
                      onMouseLeave={handleLeave}
                      style={{ cursor: 'pointer' }}
                   >
                       <span className="idx-num">0{proj.idx}</span>
                       <span className="idx-title">{proj.title}</span>
                       <span className="idx-tech">{proj.tech.join(' / ')}</span>
                   </div>
               ))}
           </div>

           <div 
               className="hover-preview-img" 
               ref={previewRef} 
               style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center' }}
           >
           </div>
       </section>
    );
};
export default IndexSection;
