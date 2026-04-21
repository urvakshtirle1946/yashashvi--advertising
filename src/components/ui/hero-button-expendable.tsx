"use client"

import { useState, useEffect } from "react"
import { Check, Mail, BarChart3, Globe2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { useForm, ValidationError } from '@formspree/react';

export function HeroButtonExpendable({ 
  layoutId = "cta-card",
  className = "",
  buttonText = "Contact Us",
}: { 
  layoutId?: string;
  className?: string;
  buttonText?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [state, handleSubmit] = useForm("xyzjaenv");

  const handleExpand = () => setIsExpanded(true)
  
  const handleClose = () => {
    setIsExpanded(false)
  }

  useEffect(() => {
    setMounted(true)
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isExpanded])

  return (
    <>
      {/* The inline button */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div className="inline-block relative">
            <motion.div
              style={{ borderRadius: "100px" }}
              layout
              layoutId={layoutId}
              className={cn("absolute inset-0 bg-[#FF3D00] shadow-[0_0_20px_rgba(255,61,0,0.4)]", className)}
            />
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }}
              layout={false}
              onClick={handleExpand}
              className="relative flex items-center justify-center gap-2 h-14 px-8 py-3 text-lg font-medium text-white tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {buttonText}
              <Mail className="w-5 h-5 ml-1" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Modal Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
                exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
              />

              {/* Expanding card */}
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 32,
                  mass: 1,
                }}
                style={{ borderRadius: "24px" }}
                layout
                className="relative flex h-full w-full sm:h-[88vh] sm:max-h-[820px] sm:max-w-5xl overflow-hidden bg-blue-900 sm:rounded-[24px] shadow-2xl z-10"
              >
                {/* Gradient background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.45 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 20% 50%, #FF3D0033 0%, transparent 60%), " +
                        "radial-gradient(ellipse at 80% 20%, #1e40af55 0%, transparent 55%), " +
                        "radial-gradient(ellipse at 60% 80%, #00000088 0%, transparent 50%)",
                    }}
                  />
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.32, duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, scale: 0.7, rotate: -45, transition: { duration: 0.18 } }}
                  onClick={handleClose}
                  className="absolute right-4 top-4 sm:right-8 sm:top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </motion.button>

                {/* Modal Content — staggered slide-up */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                  className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden"
                >
                  {/* Left Side: Testimonials & Info */}
                  <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                        Ready to scale?
                      </h2>
                      <p className="text-white/80 text-lg max-w-md">
                        Join hundreds of growing brands and local businesses building their visual presence with Yashashvi Advertising.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <BarChart3 className="w-6 h-6 text-white/90" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Unmatched Quality</h3>
                          <p className="text-white/70 text-sm leading-relaxed mt-1">
                            Enterprise-grade signage tailored perfectly for maximum visibility.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <Globe2 className="w-6 h-6 text-white/90" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">End-to-End Execution</h3>
                          <p className="text-white/70 text-sm leading-relaxed mt-1">
                            From 3D Lettering to massive Glow Boards, we handle design, fabrication, and installation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-16 bg-black/10 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                      
                      {state.succeeded ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center text-center h-[400px] space-y-6"
                        >
                          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Check className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                            <p className="text-white/80">Our team will be in touch shortly.</p>
                          </div>
                          <button 
                            onClick={handleClose}
                            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            Close
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
                            <p className="text-sm text-white/70">Fill out the form below and we'll contact you.</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                                Full Name
                              </label>
                              <input
                                required
                                type="text"
                                name="name"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                                Work Email
                              </label>
                              <input
                                required
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                              />
                              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                                Needs
                              </label>
                              <textarea
                                rows={3}
                                name="message"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all resize-none text-sm"
                              />
                              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                            </div>
                          </div>

                          <button
                            disabled={state.submitting}
                            type="submit"
                            className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#FF3D00] font-semibold hover:bg-white/90 transition-all mt-2"
                          >
                            {state.submitting ? (
                               <span className="flex items-center gap-2">
                                 <span className="h-4 w-4 border-2 border-[#FF3D00] border-t-transparent rounded-full animate-spin"></span>
                                 Sending...
                               </span>
                            ) : "Submit Request"}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default HeroButtonExpendable;
