// "use client";

// import React from "react";
// import { LayoutDashboard, Sparkles } from "lucide-react";
// import Link from "next/link";
// import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// // import { useStoreUser } from "@/hooks/use-store-user";
// // import { BarLoader } from "react-spinners";
// import { Authenticated, Unauthenticated } from "convex/react";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { Button } from "./ui/button";

// export default function Header() {
//   

//   return (
//     <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
//       {/* Center - Glass Navigation Container */}

//       <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
//         {/* Logo */}
//         <Link href="/" className="mr-10 md:mr-20">
//           <Image
//             src="/logo-text.png"
//             alt="Pixxel Logo"
//             className="min-w-24 object-cover"
//             width={96}
//             height={24}
//           />
//         </Link>

//         {path === "/" && (
//           <div className="hidden md:flex space-x-6">
//             <Link
//               href="#features"
//               className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
//             >
//               Features
//             </Link>
//             <Link
//               href="#pricing"
//               className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
//             >
//               Pricing
//             </Link>
//             <Link
//               href="#contact"
//               className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
//             >
//               Contact
//             </Link>
//           </div>
//         )}

//         {/* Auth Actions */}
//         <div className="flex items-center gap-3 ml-10 md:ml-20">
//           <Authenticated>
//             <Link href="/dashboard">
//               <Button variant="glass" className="hidden sm:flex">
//                 <LayoutDashboard className="h-4 w-4" />
//                 <span className="hidden md:flex">Dashboard</span>
//               </Button>
//             </Link>

//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-8 h-8 rounded-lg border border-white/20",
//                   userButtonPopoverCard:
//                     "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
//                   userPreviewMainIdentifier: "font-semibold text-white",
//                 },
//               }}
//               afterSignOutUrl="/"
//             />
//           </Authenticated>

//           <Unauthenticated>
//             <SignInButton>
//               <Button variant="glass" className="hidden sm:flex">
//                 Sign In
//               </Button>
//             </SignInButton>

//             <SignUpButton>
//               <Button variant="primary">Get Started</Button>
//             </SignUpButton>
//           </Unauthenticated>
//         </div>
//         {/* {isLoading && (
//           <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
//             <BarLoader width={"95%"} color="#06b6d4" />
//           </div>
//         )} */}
//       </div>
//     </header>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated,  Unauthenticated } from "convex/react";
import { useStoreUserEffect } from "@/hooks/useStoreUserEffect";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
const Header = () => {
  const path = usePathname();
  const { isLoading } = useStoreUserEffect();

  
  if (path.includes("/editor")) {
    return null; // Hide header on editor page
  }

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" suppressHydrationWarning>
        
        {/* Logo */}
        <Link href="/" className="mr-10 md:mr-20 flex items-center">
          <Image
            src="/next.svg"
            alt="RuPix Logo"
            width={96}
            height={24}
            className="object-contain"
          />
        </Link>

        {/* Navigation (only on homepage) */}
        {path === "/" && (
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/80 hover:text-cyan-400 font-medium transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Unauthenticated>
            <SignInButton>
              <button className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Log in
              </button>
            </SignInButton>

            <SignUpButton>
              <button
              className="
                px-5 py-2 rounded-full
                bg-gradient-to-r from-purple-600 via-pink-600 to-red-500
                text-white font-semibold text-sm
                shadow-[0_0_8px_rgba(255,0,128,0.6)]
                hover:brightness-110 hover:shadow-[0_0_12px_rgba(255,0,128,0.9)]
                transition duration-300
                focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black
              "
            >
              Sign Up
            </button>

            </SignUpButton>
          </Unauthenticated>
{/* <SignedIn> does NOT wait for Convex backend registration. */}
          <Authenticated>
          <Link href="/dashboard">
               <Button variant="glass" className="hidden sm:flex">
                 <LayoutDashboard className="h-4 w-4" />
                 <span className="hidden md:flex">Dashboard</span>
               </Button>
             </Link>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
          </Authenticated>
        </div>
        
         {isLoading && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
            <BarLoader width={"95%"} color="#06b6d4" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
