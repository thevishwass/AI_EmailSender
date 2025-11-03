'use client'
import Link from 'next/link';

export default function PrivacyPolicy() {
  const colors = {
    primary: '#0066ff',
    primaryDark: '#0052cc',
    primaryLight: '#e6f0ff',
    secondary: '#00d4ff',
    dark: '#1a1a2e',
    white: '#ffffff',
    text: '#2d3748',
    textLight: '#718096',
    border: '#e2e8f0',
  };

  const sectionStyle = {
    marginBottom: '32px',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.dark,
    marginBottom: '12px',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: colors.text,
  };

  return (
    <div style={{
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.white} 100%)`,
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      padding: '60px 20px',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '50px',
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: '50%',
            margin: '0 auto 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            boxShadow: '0 10px 30px rgba(0, 102, 255, 0.2)',
          }}>
            🔒
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '15px',
          }}>
            Privacy Policy
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textLight,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>
        </div>

        {/* Main Content Card */}
        <div style={{
          background: colors.white,
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          border: `1px solid ${colors.primaryLight}`,
        }}>
          {/* Sections */}
          <div>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>📊 Information We Collect</h2>
              <p style={paragraphStyle}>
                We may collect personal information such as your name, email address, and any information you provide while using our services. This information helps us deliver a personalized experience and improve our platform.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>🎯 How We Use Your Information</h2>
              <p style={paragraphStyle}>
                Your information is used to provide and improve our services, communicate with you, and ensure a secure experience on our website. We respect your privacy and never sell your personal information to third parties.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>🍪 Cookies</h2>
              <p style={paragraphStyle}>
                We use cookies to enhance your browsing experience and analyze website traffic. Cookies help us understand how you interact with our site and allow us to provide personalized content. You can choose to disable cookies in your browser settings.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>🛡️ Data Security</h2>
              <p style={paragraphStyle}>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data is encrypted and stored securely using industry-standard protocols.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>🔗 Third-Party Services</h2>
              <p style={paragraphStyle}>
                We may use third-party services to help operate our website and provide enhanced functionality. These services are required to adhere to strict data protection standards and maintain the confidentiality of your information.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>📝 Changes to this Policy</h2>
              <p style={paragraphStyle}>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with the updated date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>💬 Contact Us</h2>
              <p style={paragraphStyle}>
                If you have any questions regarding this Privacy Policy, please{' '}
                <Link 
                  href="/contact"
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.3s ease',
                    borderBottom: `2px solid ${colors.primary}`,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = colors.primaryDark;
                    e.currentTarget.style.borderBottomColor = colors.primaryDark;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.borderBottomColor = colors.primary;
                  }}
                >
                  contact us
                </Link>
                . We're here to help and will respond to your inquiry as soon as possible.
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: `2px solid ${colors.primaryLight}`,
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: colors.textLight,
              fontStyle: 'italic',
            }}>
              Last Updated: October 26, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}