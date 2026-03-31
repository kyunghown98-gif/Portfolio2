import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // high performance tracking using GSAP quickTo
    const xDot = gsap.quickTo(dotRef.current, "left", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dotRef.current, "top", { duration: 0.1, ease: "power3" });
    
    const xOutline = gsap.quickTo(outlineRef.current, "left", { duration: 0.5, ease: "power3" });
    const yOutline = gsap.quickTo(outlineRef.current, "top", { duration: 0.5, ease: "power3" });

    const moveCursor = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    // Restore interactive hover expansion logic
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a') || e.target.classList.contains('index-item')) {
        outlineRef.current.classList.add('cursor-active');
      }
    };
    
    const handleMouseOut = () => {
      outlineRef.current.classList.remove('cursor-active');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-outline" ref={outlineRef}></div>
    </>
  );
};
export default CustomCursor;
