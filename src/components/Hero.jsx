import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    // GSAP Cinematic Title entrance
    let gsapCtx = gsap.context(() => {
       gsap.to('.hero-title-inner', {
           y: 0,
           duration: 2,
           stagger: 0.15,
           ease: "power4.out",
           delay: 0.3
       });
       gsap.to('.hero-subtitle', {
           opacity: 1,
           y: -10,
           duration: 2,
           delay: 1.5,
           ease: "power2.out"
       });
    }, comp);

    return () => {
        gsapCtx.revert();
    };
  }, []);

  return (
    <section className="hero container" ref={comp}>
       <h1 className="hero-title" style={{ zIndex: 2, position: 'relative' }}>
          <span className="hero-title-line"><span className="hero-title-inner">PORT</span></span>
          <span className="hero-title-line"><span className="hero-title-inner" style={{ fontStyle: 'italic', color: '#555' }}>FOLIO</span></span>
       </h1>
       
       <div className="hero-subtitle" style={{ zIndex: 2, position: 'relative' }}>
          Merging high-end design with deep engineering to build unforgettable digital experiences. Concept iteration, flawless code architecture, and elegant motion.
       </div>
    </section>
  );
};

export default Hero;
