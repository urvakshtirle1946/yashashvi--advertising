import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="inline-flex items-center text-[#FF3D00] hover:text-[#E63600] mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-orange max-w-none text-gray-600">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Services</h2>
          <p className="mb-4">
            Yashashvi Advertising provides custom signage solutions, including but not limited to Billboards, Glow Sign Boards, LED Displays, and 3D Letters. We reserve the right to modify or discontinue any aspect of our services at our sole discretion.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            The site and its original content, features, and functionality are owned by Yashashvi Advertising and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall Yashashvi Advertising, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for damages, direct or consequential, resulting from your use of the Site, and you agree to defend, indemnify and hold us harmless from any claims, losses, liability costs and expenses.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Modifications to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </div>
    </div>
  );
}
