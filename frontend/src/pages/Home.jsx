import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FloatingNav } from '../components/ui/FloatingNav';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WavyBackground } from '../components/ui/WavyBackground';
import { BackgroundGradient } from '../components/ui/BackgroundGradient';
import { IconShieldCheck } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden w-full">
      {/* Navigation Layer - Highest */}
      <FloatingNav />

      {/* Content Layer - Below Navigation */}
      <div className="relative z-0">
        {/* First Page - Main Hero Section */}
        <WavyBackground className="w-full" waveOpacity={0.3} blur={4}>
          <div className="h-screen text-[color:var(--color--eeeeee)]">
            {/* Hero Section */}
            <div className="h-screen flex flex-col items-center justify-center -mt-32">
              <div className="container-large px-8 max-w-full">
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  blurStrength={10}
                  containerClassName="mx-auto text-center mb-8"
                  textClassName="text-[9.5rem] font-['Editorial_New'] tracking-[-.57rem] leading-[1.1] font-light"
                >
                  Protect Your Digital World with Advanced AI
                </ScrollReveal>
                <div className="flex justify-center mt-8">
                  <BackgroundGradient>
                    <Link
                      to="/register"
                      className="block bg-black text-white px-5 py-[1.25rem] rounded-[1.125rem] text-sm font-medium hover:bg-gray-900 transition-colors"
                    >
                      Start learning now
                    </Link>
                  </BackgroundGradient>
                </div>
              </div>
            </div>
          </div>
        </WavyBackground>

        {/* Second Page */}
        <div className="relative bg-black text-[color:var(--color--eeeeee)] py-32">
          <div className="container-large px-8 max-w-full">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              containerClassName="mx-auto mb-32"
              textClassName="text-5xl font-['Editorial_New'] tracking-tight leading-[1.3]"
            >
              Advanced Protection Against Sophisticated Phishing Attacks
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              containerClassName="mx-auto mb-32"
              textClassName="text-5xl font-['Editorial_New'] tracking-tight leading-[1.3]"
            >
              Real-time Threat Detection Using State-of-the-art Machine Learning Models
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              containerClassName="mx-auto"
              textClassName="text-5xl font-['Editorial_New'] tracking-tight leading-[1.3]"
            >
              Continuous Learning and Adaptation to New Phishing Techniques
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
} 