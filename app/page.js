// import Header from "@/components/header";
// //Purpose: Renders a single route/page inside the nearest layout.
// export default function Home() {
//   return (
//     <div>
//       <Header/ >
//     </div>
//   );
// }

"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Layers, Wand2, ArrowRight, Check, Cpu, Palette, Image } from 'lucide-react';
import Header from '@/components/header';

const RoopPixLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    
    resizeCanvas();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, 'rgba(167, 139, 250, 0.8)');
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Header />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/20 mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Powered by Next-Gen AI
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            <span className="inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Edit Beyond
            </span>
            <br />
            <span className="inline-block text-white mt-4">Reality</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unleash neural-powered editing with AI that transforms, upscales, and reimagines your images instantly
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-fuchsia-500/50 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="px-10 py-5 rounded-full border-2 border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-white/40 font-bold text-lg transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-cyan-500/10" />
              
              <div className="relative aspect-video bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.1),transparent_50%)]" />
                
                {/* Window Controls */}
                <div className="absolute top-6 left-6 flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Layers className="w-32 h-32 text-violet-400/30" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
                  </div>
                </div>

                {/* Floating Tool Badges */}
                <div className="absolute top-20 right-8 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 animate-pulse">
                  <Wand2 className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-bold">AI Magic Brush</span>
                </div>

                <div className="absolute bottom-20 left-8 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold">8x Upscaling</span>
                </div>
              </div>
            </div>

            {/* Floating Orbs */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-60 animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Neural-Powered
              </span>
              <br />
              <span className="text-white">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              AI tools that transform your creative workflow into something magical
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Cpu, 
                title: 'Neural Background Removal', 
                desc: 'AI instantly separates subjects with atomic-level precision. One click, perfect results.',
                color: 'from-violet-500 to-purple-500'
              },
              { 
                icon: Sparkles, 
                title: 'Quantum Upscaling', 
                desc: 'Scale images up to 8x without any quality loss using advanced neural networks.',
                color: 'from-fuchsia-500 to-pink-500'
              },
              { 
                icon: Palette, 
                title: 'AI Layer Fusion', 
                desc: 'Intelligent layer blending with context-aware compositing and smart harmonization.',
                color: 'from-cyan-500 to-blue-500'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-500" />
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-violet-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '2M+', label: 'Active Creators' },
              { num: '500M+', label: 'Images Edited' },
              { num: '99.9%', label: 'Uptime' },
              { num: '4.9★', label: 'User Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  {stat.num}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Choose Your Power
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: 'Starter', 
                price: 'Free', 
                period: '',
                features: ['10 AI edits per month', 'Basic editing tools', 'HD export quality', 'Community support'],
                cta: 'Start Free'
              },
              { 
                name: 'Pro', 
                price: '$19', 
                period: '/month',
                features: ['Unlimited AI edits', 'All premium tools', '8K export quality', 'Priority support', 'Advanced AI models'],
                featured: true,
                cta: 'Go Pro'
              },
              { 
                name: 'Enterprise', 
                price: '$99', 
                period: '/month',
                features: ['Everything in Pro', 'Team collaboration', 'API access', 'Custom AI training', 'Dedicated support'],
                cta: 'Contact Sales'
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured 
                    ? 'bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 border-2 border-violet-500 scale-105' 
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-full font-bold transition-all duration-300 ${
                  plan.featured 
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-2xl hover:shadow-fuchsia-500/50' 
                    : 'border-2 border-white/20 hover:bg-white/10 hover:border-white/40'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Images
            </span>
            <br />
            <span className="text-white">With AI Magic</span>
          </h2>
          
          <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join millions of creators pushing the boundaries of what's possible
          </p>
          
          <button className="group relative px-12 py-6 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-fuchsia-500/50 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              Start Creating Now
              <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              रूपPix
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {['Features', 'Pricing', 'Gallery', 'Docs', 'Blog', 'Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            © 2025 रूपPix. Transforming reality with AI.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoopPixLanding;