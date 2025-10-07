import React from 'react'
import { Sparkles, Zap, Layers, Wand2, ArrowRight, Check, Cpu, Palette, Image } from 'lucide-react';

const Features = () => {
  return (
    <section className="relative py-25 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
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
                title: 'Background Removal', 
                desc: 'AI instantly separates subjects with atomic-level precision. One click, perfect results.',
                color: 'from-violet-500 to-purple-500'
              },
              { 
                icon: Sparkles, 
                title: 'Image Extender', 
                desc: 'Scale images up to 8x without any quality loss using advanced neural networks.',
                color: 'from-fuchsia-500 to-pink-500'
              },
              { 
                icon: Palette, 
                title: '------', 
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
  )
}

export default Features