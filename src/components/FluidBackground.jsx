import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FluidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Elegant Art Museum Fluid Palette
    const orbs = [
        { x: width * 0.2, y: height * 0.3, r: 700, color: 'rgba(120, 160, 255, 0.4)', vx: 0.4, vy: 0.3 },
        { x: width * 0.8, y: height * 0.7, r: 700, color: 'rgba(255, 150, 150, 0.3)', vx: -0.3, vy: -0.4 },
        { x: width * 0.5, y: height * 0.5, r: 600, color: 'rgba(255, 220, 120, 0.4)', vx: 0, vy: 0 }
    ];

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationId;
    const render = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'normal';

        orbs.forEach((orb, i) => {
            if (i === 2) {
                orb.x += (mouseX - orb.x) * 0.02;
                orb.y += (mouseY - orb.y) * 0.02;
            } else {
                orb.x += orb.vx;
                orb.y += orb.vy;
                if(orb.x < -orb.r || orb.x > width + orb.r) orb.vx *= -1;
                if(orb.y < -orb.r || orb.y > height + orb.r) orb.vy *= -1;
            }

            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
            gradient.addColorStop(0, orb.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationId = requestAnimationFrame(render);
    };
    render();

    gsap.fromTo(canvas, 
        { opacity: 0 }, 
        { opacity: 1, duration: 3, ease: "power2.out" }
    );

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -10, overflow: 'hidden', background: '#fdfdfd' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', filter: 'blur(60px)' }}></canvas>
    </div>
  );
};

export default FluidBackground;
