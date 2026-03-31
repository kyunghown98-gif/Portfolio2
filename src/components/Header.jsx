import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="apple-header">
      <nav className="header-nav">
        <a href="#overview" className="active">Overview</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
