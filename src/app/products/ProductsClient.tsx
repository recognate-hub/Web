"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, Sparkles, ArrowRight, Code2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Product } from "@/data/products";
import Image from "next/image";
import dynamic from "next/dynamic";

const CTASection = dynamic(() => import("@/components/shared/CTASection").then(mod => mod.CTASection));

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const products = initialProducts;
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/8 rounded-full blur-[120px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent-cyan border border-accent-cyan/15 mx-auto"
            >
              <Sparkles size={12} className="mr-2" />
              Pre-built Packages
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-cyan">Solutions & </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Kits</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
            >
              Productized service packages and starter kits designed to accelerate your development and reduce time-to-market.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─── Grid ─── */}
      <section className="relative">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product, i) => {
              const isEven = i % 2 === 0;
              const gradient = isEven 
                ? "from-accent-cyan/15 via-accent/5 to-transparent" 
                : "from-accent-purple/15 via-success/5 to-transparent";
              const accentText = isEven ? "text-accent-cyan" : "text-accent-purple";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Card className="h-full flex flex-col p-6 group hover:shadow-neu-hover transition-all duration-300 gradient-border-glow bg-base/80 backdrop-blur-sm relative overflow-hidden">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                    
                    {/* Visual Container */}
                    <div className="w-full h-64 rounded-[2rem] bg-base shadow-neu-inset p-6 mb-8 relative overflow-hidden flex flex-col items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none"></div>
                      
                      {/* Decorative box graphic */}
                      <div className={`relative z-10 w-24 h-24 rounded-2xl bg-base shadow-neu flex items-center justify-center ${accentText} transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2`}>
                        <Package size={40} strokeWidth={1.5} />
                        {/* Glow behind icon */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 30px currentColor`, filter: "opacity(0.3)" }}></div>
                      </div>
                      
                      <div className={`absolute bottom-4 right-6 text-6xl font-heading font-extrabold ${accentText} opacity-[0.08] select-none pointer-events-none`}>
                        0{i + 1}
                      </div>
                    </div>

                    <CardHeader className="px-2 relative z-10">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          {product.logoUrl && (
                            <Image src={product.logoUrl} alt={`${product.name} logo`} width={32} height={32} className="w-8 h-8 object-contain" />
                          )}
                          <CardTitle className={`text-2xl transition-colors ${isEven ? "group-hover:text-accent-cyan" : "group-hover:text-accent-purple"}`}>
                            {product.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-2 flex-grow space-y-6 relative z-10">
                      <CardDescription className="text-[16px] text-text-secondary leading-relaxed">
                        {product.description}
                      </CardDescription>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-text-primary uppercase tracking-wider text-xs flex items-center gap-2">
                          <div className={`w-6 h-[1px] ${isEven ? "bg-accent-cyan/40" : "bg-accent-purple/40"}`}></div>
                          Included
                        </h4>
                        <ul className="space-y-3">
                          {product.features.map((feature, idx) => (
                            <motion.li 
                              key={idx} 
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              className="flex items-start gap-3 group/feat"
                            >
                              <div className={`mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-base shadow-neu ${accentText} shrink-0 transition-transform group-hover/feat:scale-110`}>
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="text-text-secondary group-hover/feat:text-text-primary transition-colors text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="px-2 pt-8 mt-auto relative z-10 flex flex-col gap-4">
                      {product.downloadUrl && (
                        <Button variant="outline" className={`w-full group/btn hover:shadow-neu hover:${accentText} hover:border-transparent`} asChild>
                          <Link href={product.downloadUrl} className="flex items-center justify-center w-full" target="_blank">
                            View Product
                            <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Custom Solution Note ─── */}
      <section className="relative overflow-hidden">
        <Container>
          <div className="bg-base shadow-neu-inset rounded-[3rem] p-10 md:p-16 text-center max-w-4xl mx-auto relative group overflow-hidden">
             {/* Animated gradient border */}
             <div className="absolute inset-[-100%] origin-center animate-[spin_8s_linear_infinite] opacity-30" style={{ background: "conic-gradient(from 0deg, transparent 50%, #8b5cf6 75%, #06b6d4 100%)" }}></div>
             <div className="absolute inset-1 rounded-[3rem] bg-base shadow-neu-inset"></div>
             
             <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none rounded-[3rem]"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-base shadow-neu flex items-center justify-center text-accent-cyan mb-6">
                 <Code2 size={24} />
               </div>
               <h3 className="text-3xl font-heading font-extrabold text-text-primary mb-4">Don't see what you need?</h3>
               <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
                 These kits are just starting points. We specialize in fully custom engineering tailored exactly to your unique requirements.
               </p>
               <Button variant="primary" className="shadow-primary-btn hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] transition-shadow" asChild>
                 <Link href="/services">View Custom Services</Link>
               </Button>
             </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </div>
  );
}
