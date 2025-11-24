import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';

/**
 * SOFIA'S ANTOJITOS - LIGHT THEME (Le Thai Style)
 * - Theme: White Background, Dark Text, Deep Red Accents
 * - Font: Serif Headings, Sans-serif Body
 * - Menu: Separate page at /menu
 */

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
