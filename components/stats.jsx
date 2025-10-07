import React from 'react'

const Stats = () => {
  return (
    <section className="relative py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '1+', label: 'Active Creators' },
              { num: '5+', label: 'Images Edited' },
              { num: '99.9%', label: 'Uptime' },
              { num: '0★', label: 'On Github' },
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
  )
}

export default Stats