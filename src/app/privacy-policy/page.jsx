import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | Yashashvi Advertising",
  description: "Privacy Policy for Yashashvi Advertising — learn how we protect your personal and business data for our Indore signage and flex printing services.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-[#FF3D00] hover:text-[#E63600] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-orange max-w-none text-gray-600">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At Yashashvi Advertising, we collect information that you provide directly to us when you fill out a contact form, request a quote, or communicate with us via email or phone. This may include your name, email address, phone number, company name, and details about your signage needs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, including answering your inquiries and sending you quotes and updates regarding your projects.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website or serving our users, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Cookies</h2>
          <p className="mb-4">
            Our website utilizes "cookies" to enhance your experience. You can choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Contacting Us</h2>
          <p className="mb-4">
            If there are any questions regarding this privacy policy, you may contact us using the contact endpoints located on our homepage footer.
          </p>
        </div>
      </div>
    </div>
  );
}
