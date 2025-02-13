import React from 'react';
import Title from '../components/Title';

const PrivacyPolicy: React.FC = () => {
  return (
    <div id="pp" className="container mx-auto px-4 py-8 max-w-4xl ">
      <h1 className="line text-7xl font-bold font-beau mb-6 text-gray-800">Privacy Policy</h1>
      <Title highlightText="Website" mainText="Data Privacy" />
      
      <section className="mb-6 font-medium">
        <p className="text-gray-600 mb-4">
          The aim of this privacy policy is to provide you with clear, simple and complete information about how we process the personal data you give us or the data we may collect while you are browsing our website. We are committed to safeguarding the privacy of our website visitors. In this policy, we explain how we will treat your personal information.
        </p>
        <p className="text-gray-600">
          By using our website and agreeing to this policy, you consent to our use of cookies in accordance with the terms of this policy.
        </p>
      </section>

      <section className="mb-6 font-medium">
      <Title highlightText="Data" mainText="We Collect" />
        <ul className="list-disc list-inside sm:list-outside sm:text-center text-gray-600 space-y-2">
          <li>Information about your computer and website visits (IP address, location, browser, referral source, visit length)</li>
          <li>Registration information (email address)</li>
          <li>Profile information (name, email, physical location)</li>
          <li>Email notification and newsletter subscription details</li>
          <li>Service usage information</li>
          <li>Purchase and transaction details</li>
          <li>Posted content and communication information</li>
        </ul>
      </section>

      <section className="mb-6 font-medium">
      <Title highlightText="Using Your" mainText="Personal Data" />
        <p className="text-gray-600 mb-6">We may use your personal information to:</p>
        <ul className="list-disc list-inside sm:list-outside sm:text-center text-gray-600 space-y-2">
          <li>Administer our website and business</li>
          <li>Personalize website experience</li>
          <li>Enable service usage</li>
          <li>Send transactional communications</li>
          <li>Send requested notifications</li>
          <li>Provide marketing communications</li>
          <li>Handle enquiries and complaints</li>
          <li>Maintain website security</li>
        </ul>
      </section>

      <section className="mb-6 font-medium">
      <Title highlightText="Disclosing" mainText="Personal Information" />
        <p className="text-gray-600 mb-6">We may disclose personal information:</p>
        <ul className="list-disc list-inside sm:list-outside sm:text-center text-gray-600 space-y-2">

          <li>To employees, advisers, and business partners</li>
          <li>As required by law</li>
          <li>In connection with legal proceedings</li>
          <li>To establish or defend legal rights</li>
          <li>To potential business purchasers</li>
        </ul>
      </section>

      <section className="mb-6 font-medium">
      <Title highlightText="Data" mainText="Security" />
        <p className="text-gray-600">
          We will take reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information. All personal information is stored on secure, password- and firewall-protected servers.
        </p>
      </section>

      <section className="mb-6 font-medium">
      <Title highlightText="Data" mainText="Retention" />
        <p className="text-gray-600">
          Personal information will not be kept longer than necessary and may be retained to comply with legal obligations or for potential legal proceedings.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;