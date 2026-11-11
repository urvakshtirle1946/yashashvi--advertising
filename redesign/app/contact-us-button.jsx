"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Check, Globe2, X } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";

const FORM_ENDPOINT = "https://formspree.io/f/xbdqvznj";
const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };
const FORM_FIELD_KEYS = {
  name: "Name",
  email: "email",
  phone: "Mobile No.",
  message: "Message",
};
const FORM_FIELD_STATE = Object.fromEntries(
  Object.entries(FORM_FIELD_KEYS).map(([stateKey, formKey]) => [formKey, stateKey])
);

function describeFormspreeError(error) {
  if (typeof error?.message === "string" && error.message.trim()) return error.message.trim();
  switch (error?.code) {
    case "REQUIRED_FIELD_MISSING":
    case "REQUIRED_FIELD_EMPTY":
      return "This field is required.";
    case "TYPE_EMAIL":
      return "Enter a valid email address.";
    case "TYPE_NUMERIC":
      return "Enter a valid phone number using digits only.";
    case "TYPE_TEXT":
      return "Enter text for this field.";
    default:
      return "Please check this field and try again.";
  }
}

export default function ContactUsButton({ placement = "header" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const reducedMotion = useReducedMotion();
  const modalId = `contact-modal-${useId().replace(/:/g, "")}`;
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const submittingRef = useRef(false);
  const restoreScrollRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isExpanded) return undefined;

    const priorOverflow = document.body.style.overflow;
    const lenis = window.__yashashviLenis;
    const shouldResumeLenis = Boolean(lenis && !lenis.isStopped);
    document.body.style.overflow = "hidden";
    if (shouldResumeLenis) lenis.stop();
    restoreScrollRef.current = () => {
      document.body.style.overflow = priorOverflow;
      if (shouldResumeLenis && lenis?.isStopped) lenis.start();
    };

    const focusFrame = window.requestAnimationFrame(() => nameInputRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsExpanded(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...(dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      ) ?? [])].filter((element) => element.getAttribute("aria-hidden") !== "true");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded]);

  useEffect(() => () => {
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;
  }, []);

  const handleOpen = () => {
    setSucceeded(false);
    setErrorMessage("");
    setFieldErrors({});
    setIsExpanded(true);
  };

  const handleClose = () => setIsExpanded(false);

  const handleExitComplete = () => {
    if (isExpanded) return;
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;
    triggerRef.current?.focus();
  };

  const handleChange = (event) => {
    const { name, value, dataset } = event.target;
    const stateKey = dataset.formKey || name;
    setFormData((previous) => ({ ...previous, [stateKey]: value }));
    setFieldErrors((previous) => {
      if (!previous[stateKey]) return previous;
      const next = { ...previous };
      delete next[stateKey];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || (Array.isArray(result.errors) && result.errors.length > 0)) {
        const errors = Array.isArray(result.errors) ? result.errors : [];
        const nextFieldErrors = {};
        const formMessages = [];
        errors.forEach((item) => {
          const rawField = typeof item?.field === "string" ? item.field.trim() : "";
          const stateKey = FORM_FIELD_STATE[rawField]
            ?? Object.entries(FORM_FIELD_KEYS).find(([, key]) => key.toLowerCase() === rawField.toLowerCase())?.[0];
          const message = describeFormspreeError(item);
          if (stateKey) {
            nextFieldErrors[stateKey] = nextFieldErrors[stateKey]
              ? `${nextFieldErrors[stateKey]} ${message}`
              : message;
          } else if (typeof item?.message === "string" && item.message.trim()) {
            formMessages.push(item.message.trim());
          }
        });
        setFieldErrors(nextFieldErrors);
        const serverMessage = formMessages.join(" ");
        setErrorMessage(Object.keys(nextFieldErrors).length
          ? "Please correct the field errors shown below."
          : serverMessage || "We couldn't send your request. Please try again.");
        return;
      }

      setFormData(EMPTY_FORM);
      setSucceeded(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We couldn't send your request. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const transition = (values) => reducedMotion ? { duration: 0 } : values;

  return (
    <>
      <button
        ref={triggerRef}
        className={`contact-us-button ${placement === "footer" ? "contact-us-button--footer" : ""}`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isExpanded}
        aria-controls={modalId}
        onClick={handleOpen}
      >
        <span>Contact Us</span>
      </button>

      {mounted && createPortal(
        <AnimatePresence onExitComplete={handleExitComplete}>
          {isExpanded && (
            <div className="contact-modal-root" key={modalId}>
              <motion.div
                className="contact-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: transition({ duration: 0.35, ease: "easeOut" }) }}
                exit={{ opacity: 0, transition: transition({ duration: 0.28, ease: "easeIn" }) }}
                onMouseDown={(event) => { if (event.target === event.currentTarget) handleClose(); }}
              />

              <motion.div
                ref={dialogRef}
                id={modalId}
                className="contact-modal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${modalId}-title`}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30, mass: 1 }}
              >
                <motion.div
                  className="contact-modal-mesh"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: transition({ delay: 0.15, duration: 0.5 }) }}
                  exit={{ opacity: 0, transition: transition({ duration: 0.2 }) }}
                  aria-hidden="true"
                >
                  <MeshGradient
                    speed={reducedMotion ? 0 : 0.5}
                    colors={["#FF3D00", "#1a0a00", "#0d0d1a", "#FF6B35"]}
                    distortion={0.75}
                    swirl={0.12}
                    grainMixer={0.18}
                    grainOverlay={0}
                    style={{ height: "100%", width: "100%", position: "absolute" }}
                  />
                  <div className="contact-modal-shade" />
                </motion.div>

                <motion.button
                  className="contact-modal-close"
                  type="button"
                  aria-label="Close contact form"
                  onClick={handleClose}
                  initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, transition: transition({ delay: 0.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] }) }}
                  exit={{ opacity: 0, scale: 0.7, rotate: -45, transition: transition({ duration: 0.18 }) }}
                >
                  <X aria-hidden="true" />
                </motion.button>

                <motion.div
                  className="contact-modal-content"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: transition({ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }) }}
                  exit={{ opacity: 0, y: 12, transition: transition({ duration: 0.2 }) }}
                >
                  <div className="contact-modal-story">
                    <div className="contact-modal-intro">
                      <h2 id={`${modalId}-title`}>Ready to elevate your brand?</h2>
                      <p>Join hundreds of growing businesses building powerful visual presence with Yashashvi Advertising.</p>
                    </div>
                    <div className="contact-modal-features">
                      <div className="contact-modal-feature">
                        <span className="contact-modal-feature-icon"><BarChart3 aria-hidden="true" /></span>
                        <div>
                          <h3>Unmatched Quality</h3>
                          <p>Enterprise-grade signage crafted for maximum brand visibility.</p>
                        </div>
                      </div>
                      <div className="contact-modal-feature">
                        <span className="contact-modal-feature-icon"><Globe2 aria-hidden="true" /></span>
                        <div>
                          <h3>End-to-End Execution</h3>
                          <p>From 3D Letters to massive Glow Boards — design, fabrication, and installation handled by us.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contact-modal-form-side">
                    <div className="contact-modal-form-card">
                      {succeeded ? (
                        <motion.div
                          className="contact-modal-success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1, transition: transition({ duration: 0.35 }) }}
                          role="status"
                        >
                          <span className="contact-modal-success-icon"><Check aria-hidden="true" /></span>
                          <div>
                            <h3>Request Received!</h3>
                            <p>Our team will be in touch with you shortly.</p>
                          </div>
                          <button className="contact-modal-success-close" type="button" onClick={handleClose}>Close</button>
                        </motion.div>
                      ) : (
                        <form className="contact-modal-form" onSubmit={handleSubmit} aria-busy={submitting}>
                          <div className="contact-modal-form-heading">
                            <h3>Contact Us</h3>
                            <p>Fill out the form and we&apos;ll get back to you.</p>
                          </div>

                          <div className="contact-modal-fields">
                          <div className="contact-modal-field">
                              <label htmlFor={`${modalId}-name`}>Full Name <span className="contact-modal-required-star" aria-hidden="true">*</span></label>
                              <input ref={nameInputRef} id={`${modalId}-name`} required type="text" name={FORM_FIELD_KEYS.name} data-form-key="name" autoComplete="name" placeholder="Rajesh Kumar" value={formData.name} onChange={handleChange} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? `${modalId}-name-error` : undefined} />
                              {fieldErrors.name && <span className="contact-modal-field-error" id={`${modalId}-name-error`}>{fieldErrors.name}</span>}
                            </div>
                            <div className="contact-modal-field">
                              <label htmlFor={`${modalId}-email`}>Email Address <span className="contact-modal-required-star" aria-hidden="true">*</span></label>
                              <input id={`${modalId}-email`} required type="email" name={FORM_FIELD_KEYS.email} data-form-key="email" autoComplete="email" placeholder="rajesh@business.com" value={formData.email} onChange={handleChange} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? `${modalId}-email-error` : undefined} />
                              {fieldErrors.email && <span className="contact-modal-field-error" id={`${modalId}-email-error`}>{fieldErrors.email}</span>}
                            </div>
                            <div className="contact-modal-field">
                              <label htmlFor={`${modalId}-phone`}>Phone Number <span className="contact-modal-required-star" aria-hidden="true">*</span></label>
                              <input id={`${modalId}-phone`} required type="tel" name={FORM_FIELD_KEYS.phone} data-form-key="phone" inputMode="numeric" pattern="[0-9]+" title="Enter digits only to match the phone number validation." autoComplete="tel" placeholder="9876543210" value={formData.phone} onChange={handleChange} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? `${modalId}-phone-error` : undefined} />
                              {fieldErrors.phone && <span className="contact-modal-field-error" id={`${modalId}-phone-error`}>{fieldErrors.phone}</span>}
                            </div>
                            <div className="contact-modal-field">
                              <label htmlFor={`${modalId}-message`}>Your Needs <span className="contact-modal-required-star" aria-hidden="true">*</span></label>
                              <textarea id={`${modalId}-message`} rows={3} required name={FORM_FIELD_KEYS.message} data-form-key="message" placeholder="Tell us about your signage project..." value={formData.message} onChange={handleChange} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? `${modalId}-message-error` : undefined} />
                              {fieldErrors.message && <span className="contact-modal-field-error" id={`${modalId}-message-error`}>{fieldErrors.message}</span>}
                            </div>
                          </div>

                          {errorMessage && <p className="contact-modal-error" role="alert">{errorMessage}</p>}

                          <button className="contact-modal-submit" type="submit" disabled={submitting}>
                            {submitting ? <><span className="contact-modal-spinner" aria-hidden="true" />Sending...</> : "Submit Request"}
                          </button>
                          <p className="contact-modal-terms">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
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
  );
}
