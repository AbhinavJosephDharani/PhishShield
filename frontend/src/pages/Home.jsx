import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FloatingNav } from '../components/ui/FloatingNav';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WavyBackground } from '../components/ui/WavyBackground';
import { IconShieldCheck } from "@tabler/icons-react";

export default function Home() {
  return (
    <>
      {/* First Page */}
      <WavyBackground className="w-full" waveOpacity={0.3} blur={4}>
        <div className="h-screen text-white">
          {/* Hero Section */}
          <div className="h-screen flex flex-col items-center justify-center px-8">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={10}
              containerClassName="max-w-5xl mx-auto text-center"
              textClassName="text-[9.5rem] font-['Editorialnew'] tracking-[-.57rem] leading-[.9] font-[200]"
            >
              Protect Your Digital World from Phishing Threats with Advanced AI Technology
            </ScrollReveal>
          </div>

          {/* Navigation */}
          <FloatingNav />
        </div>
      </WavyBackground>

      {/* Second Page */}
      <div className="min-h-screen bg-black text-white py-32 px-8">
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
    </>
  );
} 