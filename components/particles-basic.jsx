import { Particles } from "./ui/shadcn-io/particles";

export default function Particles_Comp() {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Your content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          
        
        </div>
      </div>
      
      {/* Interactive particles */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        staticity={50}
        color="#ffffff"
        size={0.8}
      />
    </div>
  );
}