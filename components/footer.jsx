import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer