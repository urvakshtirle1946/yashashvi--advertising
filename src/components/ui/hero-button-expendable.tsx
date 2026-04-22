"use client"

import { useState, useEffect } from "react"
import { Check, Mail, BarChart3, Globe2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MeshGradient } from "@paper-design/shaders-react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { useForm, ValidationError } from '@formspree/react'

export function HeroButtonExpendable({
  layoutId = "cta-card",
  className = "",
  buttonText = "Contact Us",
}: {
  layoutId?: string
  className?: string
  buttonText?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [state, handleSubmit] = useForm("xyzjaenv")

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
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isExpanded])

  return (
    <>
      {/* Inline CTA Button */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            className="inline-block relative"
            style={{ minWidth: "180px", minHeight: "56px" }}
          >
            <motion.div
              layoutId={layoutId}
              style={{ borderRadius: "100px" }}
              className={cn(
                "absolute inset-0 bg-[#FF3D00] shadow-[0_0_30px_rgba(255,61,0,0.5)]",
                className
              )}
            />
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }}
              onClick={handleExpand}
              className="relative flex items-center justify-center gap-2 h-14 px-8 py-3 text-lg font-semibold text-white tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {buttonText}
              <Mail className="w-5 h-5 ml-1" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Modal Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-6">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
                  exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
                  onClick={handleClose}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* Expanding Card */}
                <motion.div
                  layoutId={layoutId}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 1,
                  }}
                  initial={{ borderRadius: "24px", width: "100%", height: "100%" }}
                  style={{ borderRadius: "24px" }}
                  className="relative flex h-full w-full sm:h-[90vh] sm:max-h-[840px] sm:w-[92vw] sm:max-w-5xl overflow-hidden sm:rounded-[24px] shadow-2xl z-10"
                >
                  {/* MeshGradient Background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <MeshGradient
                      speed={0.5}
                      colors={["#FF3D00", "#1a0a00", "#0d0d1a", "#FF6B35"]}
                      distortion={0.75}
                      swirl={0.12}
                      grainMixer={0.18}
                      grainOverlay={0}
                      style={{ height: "100%", width: "100%", position: "absolute" }}
                    />
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/30" />
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { delay: 0.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{ opacity: 0, scale: 0.7, rotate: -45, transition: { duration: 0.18 } }}
                    onClick={handleClose}
                    className="absolute right-4 top-4 sm:right-8 sm:top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 border border-white/10"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>

                  {/* Modal Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
                    className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden"
                  >
                    {/* Left Side: Info + Testimonial */}
                    <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                      <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                          Ready to elevate your brand?
                        </h2>
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                          Join hundreds of growing businesses building powerful visual
                          presence with Yashashvi Advertising.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                            <BarChart3 className="w-6 h-6 text-orange-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Unmatched Quality</h3>
                            <p className="text-white/70 text-sm leading-relaxed mt-1">
                              Enterprise-grade signage crafted for maximum brand visibility.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                            <Globe2 className="w-6 h-6 text-orange-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">End-to-End Execution</h3>
                            <p className="text-white/70 text-sm leading-relaxed mt-1">
                              From 3D Letters to massive Glow Boards — design, fabrication,
                              and installation handled by us.
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
                              <h3 className="text-2xl font-bold text-white mb-2">
                                Request Received!
                              </h3>
                              <p className="text-white/80">
                                Our team will be in touch with you shortly.
                              </p>
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
                              <p className="text-sm text-white/60">
                                Fill out the form and we'll get back to you.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                                  Full Name
                                </label>
                                <input
                                  required
                                  type="text"
                                  name="name"
                                  placeholder="Rajesh Kumar"
                                  className="w-full px-4 py-3 rounded-lg bg-black/25 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                                  Email Address
                                </label>
                                <input
                                  required
                                  type="email"
                                  name="email"
                                  placeholder="rajesh@business.com"
                                  className="w-full px-4 py-3 rounded-lg bg-black/25 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                                />
                                <ValidationError
                                  prefix="Email"
                                  field="email"
                                  errors={state.errors}
                                  className="text-red-400 text-xs mt-1"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  placeholder="+91 98765 43210"
                                  className="w-full px-4 py-3 rounded-lg bg-black/25 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                                  Your Needs
                                </label>
                                <textarea
                                  rows={3}
                                  name="message"
                                  required
                                  placeholder="Tell us about your signage project..."
                                  className="w-full px-4 py-3 rounded-lg bg-black/25 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF3D00] transition-all resize-none text-sm"
                                />
                                <ValidationError
                                  prefix="Message"
                                  field="message"
                                  errors={state.errors}
                                  className="text-red-400 text-xs mt-1"
                                />
                              </div>
                            </div>

                            <button
                              disabled={state.submitting}
                              type="submit"
                              className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#FF3D00] text-white font-semibold hover:bg-[#e63600] focus:ring-4 focus:ring-[#FF3D00]/30 transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#FF3D00]/30"
                            >
                              {state.submitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Sending...
                                </span>
                              ) : (
                                "Submit Request"
                              )}
                            </button>

                            <p className="text-xs text-center text-white/40 mt-3">
                              By submitting, you agree to our Terms of Service and Privacy Policy.
                            </p>
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

export default HeroButtonExpendable
