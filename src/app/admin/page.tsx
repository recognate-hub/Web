"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/ui/Container";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push("/admin/projects");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-base">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-base pointer-events-none"></div>

      <Container className="relative z-10 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-base p-10 rounded-[2.5rem] shadow-neu"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full shadow-neu-inset bg-base flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-text-primary text-center">
              Admin Access
            </h1>
            <p className="text-text-secondary text-sm mt-2 text-center">
              Enter your credentials to access the dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent text-center tracking-widest text-lg py-4 transition-all text-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-base shadow-neu-inset border-none focus:ring-2 focus:ring-accent text-center tracking-widest text-lg py-4 transition-all text-text-primary"
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-bold text-center py-2"
              >
                {error}
              </motion.p>
            )}
            
            <Button
              type="submit"
              className="w-full py-4 text-base font-bold shadow-neu hover:shadow-neu-inset transition-all bg-base text-accent"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                  Authenticating...
                </span>
              ) : "Login to Dashboard"}
            </Button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
}
