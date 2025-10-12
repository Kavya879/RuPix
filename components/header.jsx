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
import { FaGithub } from 'react-icons/fa';

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
          <div className="text-4xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                        रूपPix
                        </div>
        </Link>

        {/* Navigation (only on homepage) */}
        {path === "/" && (
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Github", href: "https://github.com/Kavya879/RuPix"}

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
