import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Yashashvi Advertising",
  description: "Terms of Service for Yashashvi Advertising — the rules governing use of our services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#FF3D00] hover:underline mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: April 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Yashashvi Advertising website and services, you agree to
              be bound by these Terms of Service. If you do not agree to these terms, please do
              not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Services</h2>
            <p>
              Yashashvi Advertising provides signage design, fabrication, and installation
              services including, but not limited to, billboards, glow sign boards, LED displays,
              3D letters, and shop signage. All service agreements are subject to a separate
              written contract or purchase order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Quotations & Pricing</h2>
            <p>
              All quotations provided are valid for 30 days from the date of issue unless
              otherwise stated. Prices are subject to change based on material costs,
              specifications, and project scope.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payment Terms</h2>
            <p>
              Standard payment terms require a 50% advance deposit before work commences, with
              the remaining balance payable upon completion and before installation. Specific
              payment terms will be outlined in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              All designs, concepts, and creative work produced by Yashashvi Advertising remain
              our intellectual property until full payment is received. Upon full payment, the
              client receives a non-exclusive licence to use the completed work for its intended
              purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>
              Yashashvi Advertising shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our services. Our maximum liability
              is limited to the total value of the specific project in question.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of Maharashtra, India. Any disputes
              shall be resolved in the courts of Nagpur, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use
              of our services after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
            <p>For questions about these Terms, please contact us:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold">Yashashvi Advertising</p>
              <p>Nagpur, Maharashtra, India</p>
              <p>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/urvaksh-tirle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF3D00] hover:underline"
                >
                  Urvaksh Tirle
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
