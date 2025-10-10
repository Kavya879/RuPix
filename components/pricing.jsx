import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Pricing = () => {
  return (
    <section className="relative py-24 px-6 z-10 ">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-5xl font-extrabold text-white mb-12">
          Pricing
        </h2>

        {/* Glassy Pricing Table Container */}
        <div className="bac kdrop-blur-md bg-white/20 rounded-2xl shadow-xl p-10">
          <PricingTable
                    checkoutProps={{
                      appearance:{
                          elements:{
                              drawerRoot:
                              {
                                  zIndex:20000
                              }
                          }
                      }
                    }} />
        </div>
      </div>
    </section>
  );
};

export default Pricing;

