import React from 'react';
import { motion } from 'framer-motion';
import { infoData, educationData, skillsData, projectsData } from '../data';

const Mail = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const Github = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a2.4 2.4 0 0 0-.6-1.5 2.4 2.4 0 0 0-.1-1.6s-.5-.2-1.6.6a5.5 5.5 0 0 0-3 0c-1.1-.8-1.6-.6-1.6-.6a2.4 2.4 0 0 0-.1 1.6 2.4 2.4 0 0 0-.6 1.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>;
const MapPin = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ArrowUpRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>;

const BentoLayout = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };
    
    const tileVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
    };

    return (
       <div className="bento-container" id="overview">
           <motion.div 
               className="bento-grid"
               variants={containerVariants}
               initial="hidden"
               animate="visible"
           >
               {/* Hero 2x2 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-2 row-span-2 hero-tile">
                   <div className="hero-bg" style={{ backgroundImage: 'url("/img/profile.jpg")' }} />
                   <div className="hero-gradient" />
                   <div className="hero-content">
                       <span className="badge">CREATIVE DEVELOPER</span>
                       <h1>Hi, I'm <br/>Park Kyunghun</h1>
                       <p>Crafting digital experiences with modern web technologies.</p>
                   </div>
               </motion.div>

               {/* About 1x2 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-1 row-span-2 about-tile">
                   <h3>About</h3>
                   <div className="about-list">
                       {infoData.map(([key, value]) => (
                           <div key={key} className="about-item">
                               <span className="about-key">{key}</span>
                               <span className="about-val">
                                   {key === 'MAIL' ? <a href={`mailto:${value}`}>{value}</a> : value}
                               </span>
                           </div>
                       ))}
                   </div>
               </motion.div>

               {/* Map / Location 1x1 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-1 row-span-1 map-tile">
                   <div className="pulse-dot" />
                   <MapPin className="map-icon" size={36} />
                   <h4>Based in</h4>
                   <p>Seoul, Korea</p>
               </motion.div>

               {/* Social - GitHub & Email 1x1 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-1 row-span-1 social-tile">
                   <a href="#" target="_blank" rel="noreferrer" className="social-link github">
                      <Github size={28} />
                      <span>GitHub</span>
                   </a>
                   <a href="mailto:kyunghown98@naver.com" className="social-link email">
                      <Mail size={28} />
                      <span>Email</span>
                   </a>
               </motion.div>

               {/* Skills Marquee 2x1 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-2 row-span-1 skills-tile">
                   <h3>Core Stack</h3>
                   <div className="skills-wrap">
                      {skillsData.map(group => (
                         group.items.map(s => <span key={s} className="skill-pill">{s}</span>)
                      ))}
                   </div>
               </motion.div>

               {/* Education 2x1 */}
               <motion.div variants={tileVariants} whileHover={{ scale: 0.985 }} className="bento-tile col-span-2 row-span-1 edu-tile">
                   <h3>Education</h3>
                   <div className="edu-list">
                       {educationData.map(([year, text], i) => (
                           <div key={i} className="edu-item">
                               <span className="edu-year">{year}</span>
                               <span className="edu-text">{text}</span>
                           </div>
                       ))}
                   </div>
               </motion.div>

               {/* Divider / Title for Projects */}
               <motion.div id="projects" variants={tileVariants} className="col-span-4" style={{ padding: '40px 0 10px', display: 'flex', alignItems: 'flex-end' }}>
                   <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Selected Works</h2>
               </motion.div>

               {/* Projects Grid */}
               {projectsData.map((proj, i) => {
                   const isWide = i % 3 === 0; 
                   return (
                       <motion.div 
                           key={proj.idx} 
                           variants={tileVariants} 
                           whileHover={{ scale: 0.985 }} 
                           className={`bento-tile project-tile ${isWide ? 'col-span-2 row-span-2' : 'col-span-2 row-span-1'}`}
                       >
                           <div className="proj-image" style={{ backgroundImage: `url('${proj.image}')` }}>
                               <div className="proj-overlay">
                                   <div className="proj-meta">
                                       <span className="proj-tech">{proj.tech[0]}</span>
                                       <h3>{proj.title}</h3>
                                   </div>
                                   <a href={proj.link} target="_blank" rel="noreferrer" className="proj-link">
                                       <ArrowUpRight size={24} color="#000" />
                                   </a>
                               </div>
                           </div>
                       </motion.div>
                   );
               })}

           </motion.div>
       </div>
    );
};

export default BentoLayout;
