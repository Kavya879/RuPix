
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/header";
// import { ClerkProvider } from "@clerk/nextjs";
// import { shadesOfPurple } from "@clerk/themes";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ConvexClientProvider } from "@/components/ConvexClientProvider";
// import Particles_Comp from "@/components/particles-basic";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Pixxel",
//   description: "Professional image editing powered by AI",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="icon" href="/logo-text.png" sizes="any" />
//       </head>
//       {/* Fron ShadCn */}
//       <body className={`${inter.className}`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ClerkProvider
//             publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
//             appearance={{
//               baseTheme: shadesOfPurple,
//             }}
//           >
//             <ConvexClientProvider>
//               <Header />
//               <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
//                 <Particles_Comp/>
//                 {/* <Toaster richColors /> */}

//                 {children}
//               </main>
//             </ConvexClientProvider>
//           </ClerkProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Particles_Comp from "@/components/particles-basic";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RuPix",
  description: "AI Powered Photo Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-text.png" sizes="any" />
      </head>

      <body className={`${inter.className} bg-slate-900 text-white overflow-x-hidden`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                <ConvexClientProvider>

            <Header />

            {/* Use Particles_Comp here and render children inside it */}
            <Particles_Comp>
              <main className="min-h-screen w-full">
                  {children}
              </main>
            </Particles_Comp>
                </ConvexClientProvider>

          </ThemeProvider>
          
        </ClerkProvider>
      </body>
    </html>
  );
}
