import { Sparkles } from 'lucide-react'
import React from 'react'

const HomeCTA = () => {
  return (
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
  )
}

export default HomeCTA