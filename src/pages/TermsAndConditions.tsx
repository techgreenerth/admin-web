import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 11, 2026</p>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you,"
                or "your") and Greenerth ("Company," "we," "our," or "us") concerning your access to and use of the
                Greenerth Admin & Partner Portal application and web platform (collectively, the "Platform").
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these
                Terms, you must not access or use the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-2">To use the Platform, you must:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into a binding contract</li>
                <li>Be authorized by your organization to use the Platform</li>
                <li>Have been assigned appropriate credentials by a Platform administrator</li>
                <li>Not be prohibited from using the Platform under applicable laws</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                By using the Platform, you represent and warrant that you meet all eligibility requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts and Access</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.1 Account Creation</h3>
              <p className="text-gray-700 leading-relaxed">
                Your user account will be created by an authorized administrator. You will receive login credentials
                and will be assigned one of the following roles:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Super Admin:</strong> Full platform access and admin user management</li>
                <li><strong>Admin:</strong> Platform management, verification, and configuration</li>
                <li><strong>Supervisor:</strong> Site-level management and production oversight</li>
                <li><strong>CSI Manager:</strong> Access to verified records and compliance data</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.2 Account Security</h3>
              <p className="text-gray-700 leading-relaxed mb-2">You are responsible for:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of any unauthorized access or security breach</li>
                <li>Using strong passwords and changing them periodically</li>
                <li>Not sharing your account credentials with others</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">3.3 Account Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these Terms,
                fraudulent activity, or at the request of your organization's administrator.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Permitted Use</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                The Platform is provided solely for the purpose of managing biochar production operations. You may use
                the Platform to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Track and manage biochar production workflows</li>
                <li>Record biomass sourcing, production, activation, sampling, and bulk density data</li>
                <li>Manage sites, kontikis (kilns), users, and shifts</li>
                <li>Generate reports and analytics for production oversight</li>
                <li>Access verified records for compliance purposes (if authorized)</li>
                <li>Upload and manage documentation related to production activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Prohibited Activities</h2>
              <p className="text-gray-700 leading-relaxed mb-2">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Use the Platform for any illegal or unauthorized purpose</li>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Impersonate any person or entity or falsify your affiliation</li>
                <li>Upload false, inaccurate, or misleading information</li>
                <li>Interfere with or disrupt the Platform's operation or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Platform</li>
                <li>Use automated systems (bots, scrapers) without authorization</li>
                <li>Reverse engineer, decompile, or disassemble the Platform</li>
                <li>Transmit viruses, malware, or any harmful code</li>
                <li>Remove, alter, or obscure any proprietary notices</li>
                <li>Use the Platform to compete with us or develop similar products</li>
                <li>Share your login credentials with unauthorized individuals</li>
                <li>Collect or harvest personal information from other users</li>
                <li>Engage in any activity that could harm our reputation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. User Content</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">6.1 Your Responsibility</h3>
              <p className="text-gray-700 leading-relaxed">
                You are solely responsible for any data, information, photos, videos, documents, or other content you
                upload or submit to the Platform ("User Content"). You represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>You have the right to upload and share the User Content</li>
                <li>The User Content is accurate and not misleading</li>
                <li>The User Content does not violate any laws or third-party rights</li>
                <li>The User Content does not contain viruses or malicious code</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">6.2 License Grant</h3>
              <p className="text-gray-700 leading-relaxed">
                By uploading User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, store,
                display, and process the User Content for the purpose of providing and improving the Platform and for
                compliance with CSI standards and regulations.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">6.3 Data Accuracy</h3>
              <p className="text-gray-700 leading-relaxed">
                You must ensure that all production data, measurements, and records you enter are accurate and complete.
                False or fraudulent data entry may result in account termination and legal consequences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property Rights</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.1 Our Intellectual Property</h3>
              <p className="text-gray-700 leading-relaxed">
                The Platform, including its design, features, graphics, code, and content (excluding User Content),
                is owned by Greenerth and is protected by copyright, trademark, patent, and other intellectual property
                laws. All rights are reserved.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.2 Limited License</h3>
              <p className="text-gray-700 leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the
                Platform solely for its intended purpose in accordance with these Terms.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">7.3 Trademarks</h3>
              <p className="text-gray-700 leading-relaxed">
                "Greenerth" and related logos are trademarks of Greenerth. You may not use these trademarks without
                our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms
                by reference. Please review our Privacy Policy to understand how we collect, use, and protect your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Services and Links</h2>
              <p className="text-gray-700 leading-relaxed">
                The Platform may contain links to third-party websites, services, or resources. We are not responsible
                for the content, accuracy, or practices of these third parties. Your use of third-party services is at
                your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>Warranties that the Platform will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
                <li>Warranties that defects will be corrected</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                We do not warrant that the Platform will meet your requirements or expectations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, GREENERTH AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES,
                AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Business interruption or loss of goodwill</li>
                <li>Cost of substitute services</li>
                <li>Any damages arising from your use or inability to use the Platform</li>
                <li>Any damages arising from errors, omissions, or inaccuracies in content</li>
                <li>Any damages arising from unauthorized access to your account or data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THE PLATFORM SHALL NOT EXCEED
                THE AMOUNT YOU PAID TO US (IF ANY) IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Greenerth and its affiliates, officers, directors,
                employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses
                (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Your use or misuse of the Platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of third parties</li>
                <li>Your User Content</li>
                <li>Any fraudulent or illegal activity conducted through your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Platform Availability and Modifications</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">13.1 Availability</h3>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain Platform availability but do not guarantee uninterrupted access. The Platform may
                be unavailable due to maintenance, updates, technical issues, or circumstances beyond our control.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">13.2 Modifications</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without
                prior notice. We may also impose limits on certain features or restrict access to parts of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Updates to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may revise these Terms from time to time. We will notify you of material changes by posting the
                updated Terms on the Platform and updating the "Last Updated" date. Your continued use of the Platform
                after changes are posted constitutes your acceptance of the revised Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                If you do not agree to the revised Terms, you must stop using the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">15. Termination</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">15.1 Termination by You</h3>
              <p className="text-gray-700 leading-relaxed">
                You may stop using the Platform at any time. Contact your organization's administrator to deactivate
                your account.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">15.2 Termination by Us</h3>
              <p className="text-gray-700 leading-relaxed">
                We may suspend or terminate your access to the Platform immediately, without prior notice, for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Violation of these Terms</li>
                <li>Fraudulent, illegal, or harmful activity</li>
                <li>Request from your organization's administrator</li>
                <li>Extended periods of inactivity</li>
                <li>Any reason at our sole discretion</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">15.3 Effect of Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the Platform will immediately cease. We may delete your account and
                data, though we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">16. Dispute Resolution</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">16.1 Informal Resolution</h3>
              <p className="text-gray-700 leading-relaxed">
                Before filing a formal dispute, you agree to contact us to attempt to resolve the issue informally.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">16.2 Governing Law</h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
                without regard to its conflict of law provisions.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">16.3 Jurisdiction</h3>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive
                jurisdiction of the courts located in [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">17. Miscellaneous</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">17.1 Entire Agreement</h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with the Privacy Policy, constitute the entire agreement between you and Greenerth
                regarding the Platform and supersede all prior agreements.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">17.2 Severability</h3>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited
                or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">17.3 Waiver</h3>
              <p className="text-gray-700 leading-relaxed">
                Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right
                or provision.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">17.4 Assignment</h3>
              <p className="text-gray-700 leading-relaxed">
                You may not assign or transfer these Terms or your account without our prior written consent. We may
                assign these Terms without restriction.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">17.5 Force Majeure</h3>
              <p className="text-gray-700 leading-relaxed">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable
                control, including acts of God, war, terrorism, riots, natural disasters, or governmental actions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">18. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have questions, concerns, or disputes regarding these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700"><strong>Greenerth</strong></p>
                <p className="text-gray-700">Email: legal@greenerth.com</p>
                <p className="text-gray-700">Support: support@greenerth.com</p>
              </div>
            </section>

            <section className="border-t pt-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                BY USING THE GREENERTH PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND
                BY THESE TERMS AND CONDITIONS.
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TermsAndConditions;
