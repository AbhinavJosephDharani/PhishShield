import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FloatingNav } from '../components/ui/FloatingNav';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WavyBackground } from '../components/ui/WavyBackground';

export default function Home() {
  return (
    <WavyBackground className="w-full" waveOpacity={0.3} blur={4}>
      <div className="min-h-[200vh] text-white">
        {/* Logo Section */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <img src="/logo.png" alt="PhishShield" className="h-8" />
        </div>

        {/* Hero Section */}
        <div className="h-screen flex items-center justify-center px-8">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            containerClassName="max-w-5xl mx-auto text-center mt-16"
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
            blurStrength={8}
            containerClassName="max-w-5xl mx-auto mb-32"
            textClassName="text-5xl font-serif tracking-tight leading-[1.2]"
          >
            Advanced Protection Against Sophisticated Phishing Attacks
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={8}
            containerClassName="max-w-4xl mx-auto mb-32"
            textClassName="text-5xl font-serif tracking-tight leading-[1.2]"
          >
            Real-time Threat Detection Using State-of-the-art Machine Learning Models
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
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
    </WavyBackground>
  );
} 