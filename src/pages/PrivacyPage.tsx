
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none">
              <p className="lead mb-6">
                This Privacy Policy explains how we collect, use, and protect your personal information when you use our Warranty Tracker application.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p>
                We collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> Name, email address, and password when you create an account.
                </li>
                <li>
                  <strong>Product Information:</strong> Details about your products and warranties, including purchase dates, product names, brands, and warranty periods.
                </li>
                <li>
                  <strong>Media Files:</strong> Receipt images or other documents you upload to the App.
                </li>
                <li>
                  <strong>Usage Information:</strong> How you interact with the App, including features you use and time spent in the App.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about your device, including device type, operating system, and unique device identifiers.
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
              <p>
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve the App's functionality</li>
                <li>Process and store your product warranty information</li>
                <li>Send notifications about warranty expirations</li>
                <li>Respond to your requests and provide customer support</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Ensure the security of your account and data</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Storage and Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers and we use encryption to protect sensitive information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">4. Sharing Your Information</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With service providers who perform services on our behalf</li>
                <li>When required by law or to respond to legal process</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights and Choices</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to the processing of your data</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent for certain data processing activities</li>
                <li>Adjust notification preferences in the App settings</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Children's Privacy</h2>
              <p>
                Our App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us through the support section of the App.
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

export default PrivacyPage;
