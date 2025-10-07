import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Layers, Wand2, ArrowRight, Check, Cpu, Palette, Image } from 'lucide-react';

// A custom hook for tracking mouse position
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}

const App = () => {
    const { x, y } = useMousePosition();
    const cardRef = useRef(null);
    const [cardStyle, setCardStyle] = useState({});

    const offsetX = (x / window.innerWidth - 0.5) * -1;
    const offsetY = (y / window.innerHeight - 0.5) * -1;

    const handleMouseMoveOnCard = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - left) / width - 0.5;
        const mouseY = (e.clientY - top) / height - 0.5;

        const rotateX = mouseY * -18; // Invert for natural feel
        const rotateY = mouseX * 18;

        setCardStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
            transition: 'transform 0.1s ease-out'
        });
    };

    const handleMouseLeaveCard = () => {
        setCardStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        });
    };

    const backgroundStyle = {
      transform: `translateX(${offsetX * 40}px) translateY(${offsetY * 40}px) scale(1.2)`
    };

    const floatingOrb1Style = {
      transform: `translateX(${offsetX * 50}px) translateY(${offsetY * 50}px)`
    };

    const floatingOrb2Style = {
      transform: `translateX(${offsetX * 25}px) translateY(${offsetY * 25}px)`
    };
    
    const badge1Style = {
      transform: `translateX(${offsetX * -30}px) translateY(${offsetY * -30}px)`
    };

    const badge2Style = {
      transform: `translateX(${offsetX * -20}px) translateY(${offsetY * -20}px)`
    };


  return (
    <div className="bg-slate-900 text-white font-sans overflow-hidden">
        {/* Background Radial Gradient */}
        <div 
            className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.15),#0f172a_40%)] transition-transform duration-500 ease-out"
            style={{
                '--mouse-x': `${x}px`,
                '--mouse-y': `${y}px`,
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(167, 139, 250, 0.15), transparent 40%)`
            }}
        />

      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6 z-10 overflow-hidden">
        {/* Animated background shapes */}
        <div style={backgroundStyle} className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-violet-500 rounded-full blur-3xl" />
            <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
            <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-fuchsia-500 rounded-full blur-3xl" />
        </div>


        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/20 mb-8">
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
            Unleash editing with AI that transforms, upscales, and reimagines your images instantly
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
          <div 
            className="relative max-w-5xl mx-auto"
            ref={cardRef}
            onMouseMove={handleMouseMoveOnCard}
            onMouseLeave={handleMouseLeaveCard}
          >
            <div 
                className="relative rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 p-8 shadow-2xl"
                style={cardStyle}
            >
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
                <div style={badge1Style} className="absolute top-20 right-8 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 transition-transform duration-500 ease-out">
                  <Wand2 className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-bold">AI Magic Brush</span>
                </div>

                <div style={badge2Style} className="absolute bottom-20 left-8 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 transition-transform duration-500 ease-out">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold">8x Upscaling</span>
                </div>
              </div>
            </div>

            {/* Floating Orbs */}
            <div style={floatingOrb1Style} className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-60 transition-transform duration-500 ease-out" />
            <div style={floatingOrb2Style} className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-60 transition-transform duration-500 ease-out" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App;