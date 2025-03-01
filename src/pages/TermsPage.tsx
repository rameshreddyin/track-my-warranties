
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
        
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Warranty Tracker application ("the App"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use the App.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Description of Service</h2>
              <p>
                The App provides a platform for users to track and manage their product warranties. The App allows users to store information about their purchases, warranty details, and receive notifications about upcoming warranty expirations.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">3. User Accounts</h2>
              <p>
                To use certain features of the App, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">4. User Content</h2>
              <p>
                You retain ownership of any content you submit to the App. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display the content in connection with the App.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Prohibited Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the App for any illegal purpose</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Attempt to gain unauthorized access to the App</li>
                <li>Interfere with or disrupt the App's functionality</li>
                <li>Collect user information without permission</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Disclaimer of Warranties</h2>
              <p>
                The App is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the App will be error-free or uninterrupted.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">8. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of the App after any such changes constitutes your acceptance of the new Terms.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us through the support section of the App.
              </p>
              
              <p className="mt-6 text-sm text-muted-foreground">
                Last updated: June 1, 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsPage;
