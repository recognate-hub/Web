"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Folder, Package, Users, LogOut, Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/admin/projects", icon: Folder },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Team", href: "/admin/team", icon: Users },
  ];

  const handleLogout = async () => {
    const { createClient } = await import("@/utils/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <div className="flex items-center gap-3 text-2xl font-heading font-extrabold text-text-primary mb-10">
          <LayoutDashboard className="text-accent w-8 h-8" />
          <span>Admin Panel</span>
        </div>
        
        <nav className="space-y-4">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative group font-semibold ${
                  isActive 
                    ? "text-accent shadow-neu-inset bg-base" 
                    : "text-text-secondary hover:text-text-primary hover:shadow-neu bg-base"
                }`}
              >
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-accent" : "group-hover:text-accent transition-colors"}`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-8 border-t border-black/5">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-4 w-full px-5 py-4 text-red-500 hover:text-red-600 shadow-neu hover:shadow-neu-inset bg-base rounded-2xl transition-all font-semibold group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-base overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-20 bg-base/90 backdrop-blur-md shadow-neu flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3 text-xl font-heading font-extrabold text-text-primary">
          <LayoutDashboard className="text-accent w-6 h-6" />
          <span>Admin Panel</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-base shadow-neu hover:shadow-neu-inset rounded-xl text-text-primary transition-all"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-base flex flex-col shadow-neu z-50 md:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-base hidden md:flex flex-col shadow-neu z-10 relative">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 pt-24 md:pt-12 px-6 pb-6 md:px-12 md:pb-12 lg:px-16 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
