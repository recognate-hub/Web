"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MessageCircle, Briefcase, Terminal, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import RecognateLogo from "@/components/ui/RecognateLogo";

const socialLinks = [
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: Terminal, label: "Github", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-auto relative overflow-hidden">
      {/* Gradient divider line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent"></div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-base pt-20 pb-8 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Col */}
            <div className="space-y-6">
              <Link href="/" className="inline-block w-40">
                <RecognateLogo animated={false} />
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                ReCognate turns ideas into working technology — from enterprise automation to student capstone projects.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-base shadow-neu text-text-secondary hover:text-accent-purple hover:shadow-neu-hover active:shadow-neu-inset transition-all relative overflow-hidden"
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    <social.icon className="h-4.5 w-4.5 relative z-10" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-text-primary text-lg">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Projects", href: "/projects" },
                  { name: "Products & Kits", href: "/products" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-text-secondary hover:text-accent-purple transition-colors inline-flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-accent-purple group-hover:w-3 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-text-primary text-lg">Services</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "AI Solutions", href: "/services#ai-solutions" },
                  { name: "Automation & RPA", href: "/services#automation" },
                  { name: "Software Development", href: "/services#software-development" },
                  { name: "IoT Solutions", href: "/services#iot-solutions" },
                  { name: "Final Year Projects", href: "/services#final-year-projects" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-text-secondary hover:text-accent-purple transition-colors inline-flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-accent-purple group-hover:w-3 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="font-heading font-semibold text-text-primary text-lg">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-text-secondary">
                  <div className="w-8 h-8 rounded-full bg-base shadow-neu flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4 text-accent-purple" />
                  </div>
                  <span>Coimbatore | Vellore</span>
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-8 h-8 rounded-full bg-base shadow-neu flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-accent-purple" />
                  </div>
                  <span>+91 9487407198</span>
                </li>
                <li className="flex items-center gap-3 text-text-secondary">
                  <div className="w-8 h-8 rounded-full bg-base shadow-neu flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-accent-purple" />
                  </div>
                  <span>recognate.hub@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">© {currentYear} ReCognate. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-text-secondary">
              <a href="#" className="hover:text-accent-purple transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-purple transition-colors">Terms of Service</a>
            </div>
          </div>
        </Container>
      </div>

      {/* Back to top button */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-base shadow-neu flex items-center justify-center text-accent-purple hover:shadow-neu-hover hover:text-accent active:shadow-neu-inset transition-all group"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </footer>
  );
}
