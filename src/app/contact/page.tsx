"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service of interest"),
  message: z.string().min(10, "Please provide more details (at least 10 characters)"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-purple/8 rounded-full blur-[150px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent border border-accent/15 mx-auto"
            >
              <Sparkles size={12} className="mr-2" />
              Get In Touch
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent">Let's build something </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cyan">together.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
            >
              Have a project in mind, need technical mentorship, or want to explore our solutions? Reach out to us directly.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─── Content Grid ─── */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Col: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-base shadow-neu rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                {/* Form glow indicator when dirty */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-bl-full blur-[80px] pointer-events-none transition-opacity duration-1000 ${isDirty ? "opacity-100" : "opacity-0"}`}></div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-base shadow-neu-inset flex items-center justify-center text-accent">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-text-primary">Send us a message</h3>
                </div>
                
                {submitStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-base shadow-neu flex items-center justify-center text-success relative">
                       <div className="absolute inset-0 rounded-full border-2 border-success/20 animate-[pulse-glow_2s_ease-in-out_infinite]"></div>
                      <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-heading font-bold text-text-primary mb-2">Message Sent!</h4>
                      <p className="text-text-secondary max-w-sm text-lg">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={() => setSubmitStatus("idle")}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-text-secondary ml-1">Full Name</label>
                      <Input id="name" placeholder="John Doe" className="bg-base shadow-neu-inset focus-visible:ring-accent" {...register("name")} />
                      {errors.name && <p className="text-xs font-semibold text-red-500 ml-1 mt-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> {errors.name.message}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-text-secondary ml-1">Email</label>
                        <Input id="email" type="email" placeholder="john@example.com" className="bg-base shadow-neu-inset focus-visible:ring-accent" {...register("email")} />
                        {errors.email && <p className="text-xs font-semibold text-red-500 ml-1 mt-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> {errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-text-secondary ml-1">Phone <span className="text-text-secondary/50 font-normal capitalize">(Optional)</span></label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-base shadow-neu-inset focus-visible:ring-accent" {...register("phone")} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-bold uppercase tracking-wider text-text-secondary ml-1">Service of Interest</label>
                      <Select id="service" className="bg-base shadow-neu-inset focus-visible:ring-accent" {...register("service")}>
                        <option value="">Select a service...</option>
                        <option value="ai">AI Solutions</option>
                        <option value="automation">Automation & RPA</option>
                        <option value="software">Software Development</option>
                        <option value="iot">IoT Solutions</option>
                        <option value="fyp">Final Year Projects Mentorship</option>
                        <option value="other">Other / General Inquiry</option>
                      </Select>
                      {errors.service && <p className="text-xs font-semibold text-red-500 ml-1 mt-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> {errors.service.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-text-secondary ml-1">Project Details</label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project goals, timeline, and any specific requirements..." 
                        className="min-h-[150px] bg-base shadow-neu-inset focus-visible:ring-accent resize-none"
                        {...register("message")} 
                      />
                      {errors.message && <p className="text-xs font-semibold text-red-500 ml-1 mt-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> {errors.message.message}</p>}
                    </div>

                    {submitStatus === "error" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 text-red-600 rounded-2xl text-sm font-medium border border-red-500/20">
                        {errorMessage}
                      </motion.div>
                    )}

                    <Button type="submit" variant="primary" size="lg" className="w-full shadow-primary-btn hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] transition-shadow mt-4" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Col: Contact Details & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-10"
            >
              <div className="space-y-8">
                <h3 className="text-2xl font-heading font-bold text-text-primary">Contact Information</h3>
                
                <div className="grid gap-6">
                  {[
                    { icon: MapPin, title: "Office Location", content: <><span className="block">Coimbatore | Vellore</span></>, link: null },
                    { icon: Mail, title: "Email Us", content: "recognate.hub@gmail.com", link: "mailto:recognate.hub@gmail.com" },
                    { icon: Phone, title: "Call Us", content: "+91 9487407198", link: "tel:+919487407198" },
                    { icon: Clock, title: "Business Hours", content: "Mon - Sat, 9:00 AM - 6:00 PM (IST)", link: null },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 p-4 rounded-3xl hover:bg-base hover:shadow-neu transition-all group">
                      <div className="w-14 h-14 rounded-2xl bg-base shadow-neu-inset flex items-center justify-center text-accent shrink-0 transition-transform group-hover:scale-110 group-hover:text-accent-cyan group-hover:shadow-neu">
                        <item.icon size={22} />
                      </div>
                      <div className="pt-1.5">
                        <h4 className="font-semibold text-text-primary mb-1">{item.title}</h4>
                        {item.link ? (
                          <a href={item.link} className="text-text-secondary hover:text-accent font-medium transition-colors">{item.content}</a>
                        ) : (
                          <div className="text-text-secondary">{item.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="space-y-6 pt-8 border-t border-black/5">
                <h3 className="text-xl font-heading font-bold text-text-primary">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-text-primary text-base mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div>
                      Do you take final year projects from any branch?
                    </h5>
                    <p className="text-sm text-text-secondary leading-relaxed pl-3.5">We primarily focus on Computer Science, Electronics, and Mechanical (Automation/Robotics) branches due to our specific engineering capabilities.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary text-base mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></div>
                      What's your typical project timeline?
                    </h5>
                    <p className="text-sm text-text-secondary leading-relaxed pl-3.5">Timelines vary greatly based on scope. MVP web apps typically take 4-8 weeks, while complex AI or hardware integrations can take 3-6 months.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
