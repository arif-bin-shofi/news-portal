import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const PrivacyPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Introduction",
      content: `Welcome to our News Portal Privacy Policy. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

Please read this privacy policy carefully. If you do not agree with our policies and practices, please do not use our website.`,
    },
    {
      id: 2,
      title: "Information We Collect",
      content: `We may collect information about you in a variety of ways. The information we may collect on the site includes:

• Personal Data: When you register an account, we collect personal information such as your name, email address, phone number, and password.

• Account Information: When you create an account or update your profile, we collect information you voluntarily provide, including your username, profile picture, and biographical information.

• News Preferences: We collect information about the news categories and topics you prefer to read.

• Technical Information: We automatically collect certain technical information when you visit our site, including your IP address, browser type, operating system, referring URLs, and pages visited.

• Cookies: We use cookies to enhance your experience and track your usage patterns on our website.`,
    },
    {
      id: 3,
      title: "How We Use Your Information",
      content: `We use the information we collect in various ways, including:

• Providing and improving our services
• Personalizing your experience and delivering content tailored to your interests
• Sending you news updates and newsletters (only if you opt-in)
• Responding to your inquiries and customer service requests
• Processing your transactions and sending related information
• Detecting, preventing, and addressing fraud and security issues
• Complying with legal and regulatory requirements
• Understanding and improving our site's functionality and user experience`,
    },
    {
      id: 4,
      title: "Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:

• Service Providers: We may share information with vendors, consultants, and service providers who assist us in operating our website and providing our services.

• Legal Requirements: We may disclose your information when required by law or when we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.

• Business Transfers: If our company is acquired or merged with another entity, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.

• Aggregated Data: We may share aggregated, de-identified information that cannot reasonably be used to identify you.`,
    },
    {
      id: 5,
      title: "Data Security",
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• SSL encryption for data transmission
• Secure password storage using industry-standard hashing
• Regular security audits and updates
• Restricted access to personal information

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.`,
    },
    {
      id: 6,
      title: "Your Privacy Rights",
      content: `Depending on your location, you may have certain rights regarding your personal information:

• Right to Access: You have the right to request access to your personal information that we hold.

• Right to Correction: You have the right to request that we correct inaccurate or incomplete information.

• Right to Deletion: You have the right to request deletion of your personal information, subject to certain legal exceptions.

• Right to Opt-Out: You can opt-out of receiving marketing communications from us at any time.

• Right to Data Portability: You have the right to request a copy of your personal information in a structured, commonly used format.

To exercise any of these rights, please contact us at the information provided below.`,
    },
    {
      id: 7,
      title: "Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

Types of cookies we use:

• Essential Cookies: Required for basic site functionality
• Performance Cookies: Help us understand how users interact with our site
• Functional Cookies: Remember your preferences and choices
• Advertising Cookies: Used to deliver relevant advertisements

You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.`,
    },
    {
      id: 8,
      title: "Third-Party Links",
      content: `Our website may contain links to third-party websites that are not operated by us. This privacy policy applies only to our website, and we are not responsible for the privacy practices of other websites. We encourage you to review the privacy policies of any third-party sites before providing your personal information or engaging with their services.`,
    },
    {
      id: 9,
      title: "Children's Privacy",
      content: `Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information and terminate the child's account. If you believe we have collected information from a child under 13, please contact us immediately.`,
    },
    {
      id: 10,
      title: "Changes to This Privacy Policy",
      content: `We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Last Updated" date of this policy. Your continued use of our website following the posting of revised privacy policy means that you accept and agree to the changes.`,
    },
    {
      id: 11,
      title: "Contact Us",
      content: `If you have questions, concerns, or requests regarding this privacy policy or our privacy practices, please contact us at:

Email: privacy@newportal.com
Phone: +1 (555) 123-4567
Address: 123 News Street, Media City, ST 12345, USA

We will respond to your inquiry within 30 days of receipt. Your privacy is important to us, and we are committed to addressing any concerns you may have.`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy - News Portal</title>
        <meta
          name="description"
          content="Read our comprehensive privacy policy to understand how we collect, use, and protect your personal information."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, privacy"
        />
        <meta property="og:title" content="Privacy Policy - News Portal" />
        <meta
          property="og:description"
          content="Our privacy policy explains our data collection and protection practices."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-blue-100">
              Your privacy matters to us. Learn how we protect your personal
              information.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last Updated: February 2026
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {section.id}. {section.title}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                id={`section-${section.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {section.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 text-left">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: expandedSection === section.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200"
          >
            <p className="text-slate-700 text-center">
              If you have any questions about this privacy policy or our privacy
              practices, please don't hesitate to contact us. We're committed to
              protecting your privacy and ensuring transparency in our data
              practices.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
