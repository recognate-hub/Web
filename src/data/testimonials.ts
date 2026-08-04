export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
}

// TODO: Replace placeholders with real testimonials
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "ReCognate delivered our automation software ahead of schedule. The quality of engineering and attention to detail in the RPA workflows completely transformed our back-office operations.",
    author: "Sarah Jenkins",
    role: "Operations Director",
    company: "TechFlow Logistics",
  },
  {
    id: "t2",
    quote: "The mentorship I received for my Final Year Project was incredible. They didn't just write the code; they taught me the architecture and prepared me perfectly for my viva. I secured an A grade!",
    author: "Rahul M.",
    role: "Computer Science Student",
    company: "Engineering Institute",
  },
  {
    id: "t3",
    quote: "We needed a complex predictive AI model integrated into our existing stack. ReCognate's team handled the end-to-end development seamlessly, proving their deep expertise in machine learning.",
    author: "David Chen",
    role: "CTO",
    company: "Nexus Analytics",
  },
];
