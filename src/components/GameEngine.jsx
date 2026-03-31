import React, { useState, useEffect, useRef } from 'react';
import Profile from './Profile';
import Projects from './Projects';
import Closing from './Closing';
import IndexSection from './IndexSection';
import Hero from './Hero';

const TILE_SIZE = 64;
const MAP_WIDTH = 2500;
const MAP_HEIGHT = 2000;

// Interactable areas represented as glowing teleport pads
const INTERACTABLES = [
  { id: 'HERO', x: 1250, y: 300, w: 120, h: 120, color: '#f1c40f', label: 'Title Area' },
  { id: 'PROFILE', x: 500, y: 800, w: 120, h: 120, color: '#3498db', label: 'Character Stats' },
  { id: 'PROJECTS', x: 2000, y: 800, w: 120, h: 120, color: '#e74c3c', label: 'Quest Log' },
  { id: 'INDEX', x: 800, y: 1500, w: 120, h: 120, color: '#2ecc71', label: 'World Map' },
  { id: 'CONTACT', x: 1700, y: 1500, w: 120, h: 120, color: '#9b59b6', label: 'The End' },
];

const GlowingPad = ({ obj }) => (
    <div style={{
        position: 'absolute', left: obj.x, top: obj.y, width: obj.w, height: obj.h,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: `radial-gradient(circle, ${obj.color}60 0%, transparent 80%)`,
        border: `6px dotted ${obj.color}`,
        borderRadius: '50%',
        boxShadow: `0 0 30px ${obj.color}`, zIndex: 1
    }} className="magic-pad">
        <div style={{
            background: '#000', padding: '8px 14px', border: '3px solid #fff',
            fontFamily: 'var(--font-pixel)', fontSize: '0.5rem', color: '#fff',
            position: 'absolute', top: '-50px', whiteSpace: 'nowrap',
            boxShadow: '4px 4px 0 #000'
        }}>
           [ {obj.label} ]
        </div>
    </div>
);

const GameEngine = () => {
  const [player, setPlayer] = useState({ x: 1250, y: 1800, dir: 'up', moving: false });
  const [activeModal, setActiveModal] = useState(null);
  
  const keys = useRef({ w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false });
  const playerRef = useRef(player);
  
  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default scrolling for arrows and spacebar
      if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.code) > -1) {
          e.preventDefault();
      }

      if (activeModal) {
         if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            setActiveModal(null);
         }
         return; 
      }
      if (keys.current.hasOwnProperty(e.key)) keys.current[e.key] = true;
      if (e.key === ' ' || e.key === 'Enter') checkForInteraction();
    };
    
    const handleKeyUp = (e) => {
      if (keys.current.hasOwnProperty(e.key)) keys.current[e.key] = false;
    };
    
    // Use {passive: false} to ensure preventDefault works
    window.addEventListener('keydown', handleKeyDown, {passive: false});
    window.addEventListener('keyup', handleKeyUp);
    
    let lastTime = performance.now();
    let animFrame;
    
    const loop = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (!activeModal) {
          let dx = 0; let dy = 0;
          let dir = playerRef.current.dir;
          let moving = false;
          
          if (keys.current.w || keys.current.ArrowUp) { dy -= 1; dir = 'up'; moving = true; }
          if (keys.current.s || keys.current.ArrowDown) { dy += 1; dir = 'down'; moving = true; }
          if (keys.current.a || keys.current.ArrowLeft) { dx -= 1; dir = 'left'; moving = true; }
          if (keys.current.d || keys.current.ArrowRight) { dx += 1; dir = 'right'; moving = true; }
          
          if (dx !== 0 || dy !== 0) {
             const speed = 0.6 * delta; // Much snappier and faster
             const length = Math.sqrt(dx*dx + dy*dy);
             dx = (dx/length) * speed;
             dy = (dy/length) * speed;
             
             let newX = playerRef.current.x + dx;
             let newY = playerRef.current.y + dy;

             // Map exact collision bounds
             newX = Math.max(0, Math.min(MAP_WIDTH - TILE_SIZE, newX));
             newY = Math.max(0, Math.min(MAP_HEIGHT - TILE_SIZE, newY));
             
             setPlayer({ x: newX, y: newY, dir, moving });
          } else if (playerRef.current.moving) {
             setPlayer(p => ({ ...p, moving: false }));
          }
      }
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animFrame);
    };
  }, [activeModal]);

  const checkForInteraction = () => {
     const { x, y } = playerRef.current;
     const px = x + TILE_SIZE/2; 
     const py = y + TILE_SIZE/2;
     
     for (let obj of INTERACTABLES) {
        // Simple distance radius check from centers
        const ox = obj.x + obj.w/2;
        const oy = obj.y + obj.h/2;
        if (Math.hypot(px - ox, py - oy) < (obj.w/2 + TILE_SIZE)) {
           setActiveModal(obj.id);
           break;
        }
     }
  };

  const cameraX = -player.x + window.innerWidth / 2 - TILE_SIZE / 2;
  const cameraY = -player.y + window.innerHeight / 2 - TILE_SIZE / 2;

  const renderModalContent = () => {
     switch(activeModal) {
         case 'HERO': return <Hero />;
         case 'PROFILE': return <Profile />;
         case 'PROJECTS': return <Projects />;
         case 'INDEX': return <IndexSection />;
         case 'CONTACT': return <Closing />;
         default: return null;
     }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      
      {/* Overlay UI */}
      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 100, pointerEvents: 'none' }}>
        <div className="dialog-box" style={{ padding: '20px' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#fff', lineHeight: 2, fontFamily: 'var(--font-pixel)' }}>[W][A][S][D] / ARROWS : MOVE!</p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gold)', lineHeight: 2, fontFamily: 'var(--font-pixel)' }}>[SPACE] / [ENTER] : ENTER ZONE</p>
        </div>
      </div>

      <div style={{
        transform: `translate(${cameraX}px, ${cameraY}px)`,
        width: MAP_WIDTH, height: MAP_HEIGHT,
        position: 'relative' // NO TRANSITION HERE = NO INPUT DELAY!
      }}>
         
         <div className="game-map-grid" />
         
         {INTERACTABLES.map(obj => (
           <GlowingPad key={obj.id} obj={obj} />
         ))}

         <div className={`player-sprite ${player.dir} ${player.moving ? 'walking' : ''}`} style={{ left: player.x, top: player.y }} />
      </div>

      {/* Modals Popup */}
      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.85)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ 
              width: '90vw', maxHeight: '90vh', overflowY: 'auto', 
              background: 'var(--bg)', border: '6px solid #fff', padding: '30px',
              position: 'relative', boxShadow: '10px 10px 0 #000'
          }}>
            <button className="rpg-btn" style={{ position: 'sticky', top: 0, float: 'right', zIndex: 9999, fontSize: '0.8rem', padding: '15px' }} onClick={() => setActiveModal(null)}>CLOSE [ESC]</button>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameEngine;
