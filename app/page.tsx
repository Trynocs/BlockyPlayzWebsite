"use client";

import React, { useState, useEffect } from "react";
import { FaDiscord, FaStore } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import LetterPullup from "@/components/ui/letter-pullup";
import MorphingText from "@/components/ui/morphing-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HomeIcon } from "lucide-react";

const NAVIGATION = {
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  social: {
    Discord: {
      name: "Discord",
      url: "https://discord.gg/fAnBdezVeQ",
      icon: FaDiscord,
    },
    Store: {
      name: "Store",
      url: "/Store",
      icon: FaStore,
    },
  },
};

const texts = ["Citybuild", "Gute Wirtschaft", "Netter Support", "Werwolf"];

interface HeroProps {
  onFooterVisible: (visible: boolean) => void;
}

const Hero = ({ onFooterVisible }: HeroProps) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true);
      setNavbarVisible(true);
      setButtonVisible(true);
      onFooterVisible(true); // Footer sichtbar machen
    }, 4400);

    return () => clearTimeout(timer);
  }, [onFooterVisible]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center flex-col space-y-6">
      {/* Navbar */}
      <div className={navbarVisible ? "opacity-100" : "opacity-0"}>
        <Navigation />
        <br></br>
        <br></br>
        <br></br>
      </div>

      {/* Title Animation */}
      <div className="w-full text-center">
        <LetterPullup
          words={"BlockyPlayz"}
          delay={0.3}
          className="font-minecraft text-[1000px] text-white inline-block tracking-[.25em]"
        />
      </div>
      <br></br>
      <br></br>

      {/* Button */}
      <div className={buttonVisible ? "transition-opacity opacity-100" : "opacity-0"}>
        <RainbowButton onClick={copyIP} className="px-[35px] py-[35px] text-5xl">Join jetzt!</RainbowButton>
      </div>

      {/* Server Status */}

      {/* Morphing Text */}
      <div
        className={
          contentVisible 
            ? "fade-in transition-opacity opacity-100 w-full text-center space-y-8" 
            : "opacity-0"
        }
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <MorphingText
          texts={texts}
          className="font-minecraft text-white text-4xl mx-auto leading-[1.5em]"
        />
      </div>
    </section>
  );
};

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-sm">
    <TooltipProvider>
      <Dock direction="middle">
        {NAVIGATION.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-minecraft">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        {Object.entries(NAVIGATION.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  aria-label={social.name}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full text-white hover:text-emerald-400"
                  )}
                >
                  <social.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-minecraft">{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  </nav>
);

interface FooterProps {
  visible: boolean;
}

const Footer = ({ visible }: FooterProps) => (
  <footer
    className={`py-8 backdrop-blur-sm bg-black/20 sticky bottom-0 w-full z-50 transition-opacity ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <div className="container mx-auto px-4 text-center">
      <p className="text-gray-400">2024 BlockyPlayz.de - All rights reserved</p>
    </div>
  </footer>
);

function copyIP() {
  const copyText = "blockyplayz.de";
  navigator.clipboard.writeText(copyText).then(
    () => alert(`IP kopiert: ${copyText}\nStrg + V zum Einfügen`),
    (err) => console.log("Something went wrong", err)
  );
}

export default function Home() {
  const [footerVisible, setFooterVisible] = useState(false);

  return (
    <main className="relative min-h-screen bg-gray-900 text-white flex flex-col">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.05}
        duration={3}
        repeatDelay={1}
        className="fixed right-0 top-0 h-screen transform-gpu -skew-x-12 opacity-100"
      />
      <div className="flex-grow">
        <Hero onFooterVisible={setFooterVisible} />
      </div>
      <Footer visible={footerVisible} />
    </main>
  );
}
