import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 11, 2026</p>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Greenerth ("we," "our," or "us"). We are committed to protecting your personal information
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you use our Greenerth Admin & Partner Portal mobile application and web platform
                (collectively, the "Platform").
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                By using our Platform, you agree to the collection and use of information in accordance with this policy.
                If you do not agree with our policies and practices, please do not use our Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.1 Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">We collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username and encrypted password)</li>
                <li>User role and permissions (Admin, Supervisor, CSI Manager)</li>
                <li>Profile information and preferences</li>
                <li>Organization and site assignment information</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.2 Production Data</h3>
              <p className="text-gray-700 leading-relaxed mb-2">In the course of biochar production tracking, we collect:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Biomass sourcing records (delivery logs, quantities, timestamps)</li>
                <li>Biochar production data (batch information, kiln assignments, production metrics)</li>
                <li>Biochar activation records (bio-agent usage, process data)</li>
                <li>Quality control data (sampling records, lab results, bulk density measurements)</li>
                <li>Shift and work schedule information</li>
                <li>Site and kontiki (kiln) inventory data</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.3 Media and Files</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Photos and images uploaded for production verification</li>
                <li>Documents and files related to site management</li>
                <li>Video documentation of processes (where applicable)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">2.4 Technical Information</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Device information (device type, operating system, unique device identifiers)</li>
                <li>IP address and general location information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics (pages visited, features used, time spent)</li>
                <li>Login timestamps and access logs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Platform Operation:</strong> To provide, maintain, and improve our biochar production management services</li>
                <li><strong>Authentication & Security:</strong> To verify user identity and maintain secure access to the Platform</li>
                <li><strong>Production Tracking:</strong> To track and manage the complete biochar production workflow</li>
                <li><strong>Analytics & Reporting:</strong> To generate production reports, dashboards, and analytics</li>
                <li><strong>User Management:</strong> To manage user roles, permissions, and site assignments</li>
                <li><strong>Communication:</strong> To send important notifications about production activities, system updates, and account changes</li>
                <li><strong>Compliance:</strong> To comply with legal obligations and industry standards (CSI compliance)</li>
                <li><strong>Support:</strong> To provide customer support and respond to your requests</li>
                <li><strong>Improvement:</strong> To analyze usage patterns and improve Platform functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-2">We may share your information in the following circumstances:</p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.1 Within Organization</h3>
              <p className="text-gray-700 leading-relaxed">
                Information is shared among authorized users within your organization based on role-based access controls.
                Admins and Supervisors have access to data relevant to their assigned sites and responsibilities.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.2 Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">
                We may share information with third-party service providers who perform services on our behalf, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Cloud hosting and storage providers</li>
                <li>Analytics and monitoring services</li>
                <li>Customer support tools</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.3 Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                We may disclose your information if required to do so by law or in response to valid requests by
                public authorities (e.g., court orders, government regulations).
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">4.4 CSI Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                Verified production records may be shared with Carbon Standards International (CSI) for compliance
                and certification purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Encryption of data in transit using HTTPS/TLS protocols</li>
                <li>Secure password storage using industry-standard hashing algorithms</li>
                <li>JWT-based authentication with secure token management</li>
                <li>Role-based access controls to limit data access</li>
                <li>Regular security assessments and updates</li>
                <li>Secure cloud infrastructure with backup and recovery systems</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we
                strive to use commercially acceptable means to protect your personal information, we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required or permitted by law. Production data and
                records are retained in accordance with CSI compliance requirements and applicable regulations.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-2">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Access:</strong> Request access to your personal information we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Restriction:</strong> Request restriction of processing of your personal information</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on consent to process your information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                To exercise these rights, please contact us at the information provided in Section 12.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Platform uses cookies and similar tracking technologies to enhance user experience and analyze usage.
                We use:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Essential Cookies:</strong> Required for authentication and Platform functionality</li>
                <li><strong>Analytics Cookies:</strong> To understand how users interact with our Platform</li>
                <li><strong>Preference Cookies:</strong> To remember your settings and preferences</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                You can control cookie settings through your browser preferences. Note that disabling certain cookies
                may affect Platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Platform may contain links to third-party websites or services. We are not responsible for the
                privacy practices of these third parties. We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Platform is not intended for children under the age of 16. We do not knowingly collect personal
                information from children under 16. If you believe we have collected information from a child under 16,
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                These countries may have different data protection laws. We ensure appropriate safeguards are in place
                to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Your continued use of the Platform after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700"><strong>Greenerth</strong></p>
                <p className="text-gray-700">Email: privacy@greenerth.com</p>
                <p className="text-gray-700">Support: support@greenerth.com</p>
              </div>
            </section>

            <section className="border-t pt-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Compliance Information</h2>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy is designed to comply with:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>General Data Protection Regulation (GDPR) - EU</li>
                <li>California Consumer Privacy Act (CCPA) - USA</li>
                <li>Personal Data Protection Act - India</li>
                <li>Google Play Store Privacy Requirements</li>
                <li>Apple App Store Privacy Requirements</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
