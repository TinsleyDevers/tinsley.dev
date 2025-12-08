"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The extension saved me so much time during registration. It's like an easy way to see what professors are recommended by other students.",
    name: "Sarah M.",
    role: "Calhoun Student",
    context: "CalhounRMP User",
  },
  {
    quote:
      "Tinsley stepped into a challenging role and quickly earned the respect of the team. He found ways to improve our processes that we hadn't considered, and he wasn't afraid to take ownership of problems. His ability to identify issues and come up with ideas to implement solutions was impressive for someone his age.",
    name: "Warehouse Lead",
    role: "Carter Express",
    context: "Former Supervisor",
  },
  {
    quote:
      "Working with Tinsley on ATK has been incredible. He is always staying on top of things and implementing solutions to improve projects.",
    name: "Co-founder",
    role: "ATK.social",
    context: "Business Partner",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Testimonials() {
  return (
    <section className="py-24 px-8 md:px-12 border-t border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Header */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-xs uppercase tracking-widest text-[#737373] mb-3 block">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                What People Say
              </h2>
              <p className="text-[#737373] leading-relaxed">
                Feedback from users, colleagues, and collaborators I&apos;ve
                worked with along the way.
              </p>
            </motion.div>
          </div>

          {/* Right column - Testimonials */}
          <div className="lg:col-span-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative bg-white border border-[#e5e5e5] p-6 md:p-8 hover:border-[#d4d4d4] transition-colors"
                >
                  <Quote
                    size={24}
                    className="absolute top-6 right-6 text-[#e5e5e5]"
                  />
                  <blockquote className="text-lg text-[#525252] leading-relaxed mb-6 pr-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#f5f5f5] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#737373]">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-[#737373]">
                        {testimonial.role} · {testimonial.context}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
