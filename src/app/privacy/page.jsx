import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Yashashvi Advertising",
  description: "Privacy Policy for Yashashvi Advertising — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#FF3D00] hover:underline mb-10"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: April 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect for Signage Orders</h2>
            <p>
              When you submit a query through our contact forms, request custom flex printing quotes, or inquire about personalized sign boards, promotional posters, or outdoor hoardings in Indore, Madhya Pradesh, we collect the data you voluntarily share. This includes contact details (name, email address, phone number), business profiles, custom design files, and specifications for your customized flex banners, neon glow boards, or LED display units.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Branding & Design Data</h2>
            <p>We process your information exclusively to deliver high-quality advertising media and custom printing solutions in Indore. Specifically, we use your data to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Formulate precise vector graphic drafts, layout designs, and custom flex board print previews.</li>
              <li>Generate commercial estimates and custom quotes for glow sign boards, poster printing, banners, and digital display solutions.</li>
              <li>Coordinate shipment, transport logistics, and on-site physical installation of heavy billboards, shop banners, or LED display systems.</li>
              <li>Provide customer support regarding order revisions or safety standards.</li>
            </ul>
            <p className="mt-3">
              We do not sell, trade, or distribute your personal details, design configurations, or graphic assets to third-party brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes
              outlined in this policy, or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies</h2>
            <p>
              Our website uses minimal cookies required for basic site functionality. We do not
              use tracking cookies or third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>
              Our contact forms are processed through Formspree. Please review{" "}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF3D00] hover:underline"
              >
                Formspree's Privacy Policy
              </a>{" "}
              for details on how they handle submitted data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete any personal data we hold about
              you. To exercise these rights, please contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact for Indore Flex & Signage Services</h2>
            <p>
              If you have any questions about this Privacy Policy, your graphic files, or custom poster and board orders in Indore, please contact us:
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold">Yashashvi Advertising</p>
              <p>Indore, Madhya Pradesh, India</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
