import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import FluidBackground from './components/FluidBackground';
import Hero from './components/Hero';
import Profile from './components/Profile';
import IndexSection from './components/IndexSection';
import Projects from './components/Projects';
import Closing from './components/Closing';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <CustomCursor />
      <FluidBackground />
      
      <div className="portfolio-wrapper">
        <Hero />
        <Profile />
        <IndexSection />
        <Projects />
        <Closing />
      </div>
    </>
  );
}

export default App;
