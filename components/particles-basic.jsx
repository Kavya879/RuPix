import { Particles } from "./ui/shadcn-io/particles";

export default function Particles_Comp({ children }) {
  return (
   <div className="relative min-h-full bg-black overflow-hidden">

    <Particles
  className="fixed inset-0 z-0 pointer-events-none"
  quantity={100}
  ease={20}           // smaller ease = faster movement
  staticity={20}      // smaller staticity = more movement (less static)
  color="#ffffff"
  size={0.8}
/>
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
