import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FloatingNav } from '../components/ui/FloatingNav';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Home() {
  return (
    <div className="min-h-[200vh] bg-black text-white">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center px-8">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="max-w-5xl mx-auto text-center"
          textClassName="text-7xl font-serif tracking-tight leading-[1.1]"
        >
          Protect Your Digital World from Phishing Threats with Advanced AI Technology
        </ScrollReveal>
      </div>

      {/* Features Section */}
      <div className="min-h-screen py-32 px-8">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={8}
          containerClassName="max-w-5xl mx-auto mb-32"
          textClassName="text-5xl font-serif tracking-tight leading-[1.2]"
        >
          Advanced Protection Against Sophisticated Phishing Attacks
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={-3}
          blurStrength={8}
          containerClassName="max-w-4xl mx-auto mb-32"
          textClassName="text-5xl font-serif tracking-tight leading-[1.2]"
        >
          Real-time Threat Detection Using State-of-the-art Machine Learning Models
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={8}
          containerClassName="max-w-4xl mx-auto"
          textClassName="text-5xl font-serif tracking-tight leading-[1.2]"
        >
          Continuous Learning and Adaptation to New Phishing Techniques
        </ScrollReveal>
      </div>

      {/* Navigation */}
      <FloatingNav />
    </div>
  );
} 