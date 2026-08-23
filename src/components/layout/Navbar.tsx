"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import RecognateLogo from "@/components/ui/RecognateLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "pt-4 px-4 md:px-8" : "pt-6 px-4 md:px-8"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 relative",
        scrolled
          ? "bg-base/60 backdrop-blur-xl shadow-neu py-2 px-4 sm:py-3 sm:px-6 rounded-full border border-white/50"
          : "bg-transparent py-2 px-2"
      )}>
        {/* Subtle gradient shimmer on scrolled navbar */}
        {scrolled && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 50%, transparent 100%)",
                animation: "shimmer 4s ease-in-out infinite"
              }}
            ></div>
          </div>
        )}

        {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              "flex items-center w-40 sm:w-48 transition-all duration-300 relative z-10",
              pathname === "/" && !scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <RecognateLogo animated={false} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-base/80 backdrop-blur-md shadow-neu-inset px-3 py-1.5 rounded-full relative z-10">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 relative",
                    isActive
                      ? "bg-base shadow-neu text-accent"
                      : "text-text-secondary hover:text-text-primary hover:bg-base/60"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-base shadow-neu -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-10">

            <Button
              variant="default"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent to-accent-cyan origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Mobile Nav Drawer — animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-base/95 backdrop-blur-xl rounded-3xl shadow-neu border border-white/40 overflow-hidden"
          >
            <Container className="py-5 flex flex-col gap-3">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "px-6 py-3.5 text-[16px] font-medium rounded-2xl transition-all flex items-center gap-3",
                          isActive
                            ? "bg-base shadow-neu-inset text-accent"
                            : "text-text-primary hover:shadow-neu-inset hover:text-accent"
                        )}
                      >
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full transition-colors",
                          isActive ? "bg-accent" : "bg-text-secondary/30"
                        )} />
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
