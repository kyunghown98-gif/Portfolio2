import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Closing = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        // Refresh GSAP on load to forcefully re-calculate offsets disrupted by prior section pinning
        ScrollTrigger.refresh();

        let ctx = gsap.context(() => {
            // Using fromTo forces the base state aggressively, avoiding disappearance bugs
            gsap.fromTo('.closing-text', 
                { scale: 1, opacity: 0 },
                {
                    scrollTrigger: {
                       trigger: comp.current,
                       start: "top 90%", // Trigger precisely when section enters viewport
                       end: "center center",
                       scrub: 1.5,
                    },
                    scale: 3, 
                    opacity: 1,
                    ease: 'none'
                }
            );
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section className="closing" ref={comp}>
            <div className="closing-text">LET'S TALK</div>
            <div className="footer">
                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '5px', color: 'var(--text-primary)' }}>kyunghown98@naver.com</p>
                {/* placeholder phone number requested by user */}
                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>010 8985 4968</p> 
                <p>© 2026 Park Kyunghun. Built for Excellence.</p>
            </div>
        </section>
    );
};
export default Closing;
