'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';

export default function HelpPage() {
  const currentYear = new Date().getFullYear();

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
    success: '#10b981',
    purple: '#8b5cf6',
    orange: '#f97316',
  };

  const cardStyle = {
    background: colors.white,
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 102, 255, 0.1)',
    border: `1px solid ${colors.primaryLight}`,
    marginBottom: '24px',
  };

  const iconBoxStyle = (bgColor) => ({
    width: '48px',
    height: '48px',
    background: bgColor,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  });

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: colors.primaryLight,
    }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        marginLeft: '260px',
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '50px',
          maxWidth: '900px',
          width: '100%',
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
            📘
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '15px',
          }}>
            Help Center
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textLight,
            lineHeight: '1.8',
          }}>
            Follow these simple steps to set up your Gmail app password, upload your resume, and send personalized cover letters securely.
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '900px',
          width: '100%',
        }}>
          {/* Step 1 */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={iconBoxStyle(`${colors.primary}20`)}>
                <span style={{ color: colors.primary }}>🔑</span>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                margin: 0,
              }}>
                Step 1: Create Gmail App Password
              </h2>
            </div>
            <div style={{ color: colors.text, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px', fontSize: '1rem' }}>
                To send emails securely, you need to use a Gmail <strong>App Password</strong> instead of your main password.
              </p>
              <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '12px' }}>
                  Go to{' '}
                  <a
                    href="https://myaccount.google.com/security"
                    style={{
                      color: colors.primary,
                      fontWeight: '600',
                      textDecoration: 'none',
                      borderBottom: `2px solid ${colors.primary}`,
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Account → Security
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Turn on <strong>2-Step Verification</strong> (if not already enabled).
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Under "Signing in to Google", click <strong>App passwords</strong>.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Sign in again → Choose "Mail" as the app and "Other (Custom name)" → enter <strong>AI Email Sender</strong>.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Google will generate a 16-character app password like{' '}
                  <code style={{
                    background: colors.primaryLight,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  }}>
                    abcd efgh ijkl mnop
                  </code>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Copy it — you'll use this in your account settings below.
                </li>
              </ol>
            </div>
          </div>

          {/* Step 2 */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={iconBoxStyle(`${colors.success}20`)}>
                <span style={{ color: colors.success }}>📧</span>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                margin: 0,
              }}>
                Step 2: Add Your Email Settings
              </h2>
            </div>
            <div style={{ color: colors.text, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px', fontSize: '1rem' }}>
                In the <strong>Security Settings</strong> section of this app, add your email and app password.
              </p>
              <ul style={{ paddingLeft: '20px', margin: '0 0 16px', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Account Email:</strong> Your Gmail (example@gmail.com)
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Sender Email:</strong> Same as above (or alias if you have one)
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>App Password:</strong> Paste the 16-character app password from Google
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>SMTP Host:</strong>{' '}
                  <code style={{
                    background: colors.primaryLight,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  }}>
                    smtp.gmail.com
                  </code>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>SMTP Port:</strong>{' '}
                  <code style={{
                    background: colors.primaryLight,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  }}>
                    587
                  </code>
                </li>
              </ul>
              <p style={{
                fontStyle: 'italic',
                color: colors.textLight,
                fontSize: '0.95rem',
                background: colors.primaryLight,
                padding: '12px 16px',
                borderRadius: '8px',
                margin: 0,
              }}>
                💡 Once saved, your credentials are encrypted securely in the database.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={iconBoxStyle(`${colors.purple}20`)}>
                <span style={{ color: colors.purple }}>📤</span>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                margin: 0,
              }}>
                Step 3: Upload Your Resume
              </h2>
            </div>
            <div style={{ color: colors.text, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px', fontSize: '1rem' }}>
                Go to the <strong>Resume Upload</strong> section and choose your latest PDF resume file.
              </p>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '12px' }}>
                  Supported formats: <strong>.pdf</strong> (Recommended)
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Keep the filename short, e.g.{' '}
                  <code style={{
                    background: colors.primaryLight,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  }}>
                    Vishwas_Singh_Resume.pdf
                  </code>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Your resume will be attached automatically to every cover letter email you send.
                </li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={iconBoxStyle(`${colors.orange}20`)}>
                <span style={{ color: colors.orange }}>🚀</span>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.dark,
                margin: 0,
              }}>
                Step 4: Send Cover Letter
              </h2>
            </div>
            <div style={{ color: colors.text, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px', fontSize: '1rem' }}>
                Once your settings and resume are ready:
              </p>
              <ol style={{ paddingLeft: '20px', margin: '0 0 16px', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '12px' }}>
                  Enter the company's <strong>HR email address</strong>.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Write your <strong>cover letter</strong> — or use AI to generate one.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Click <strong>Send Email</strong>.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  Your email will be sent instantly from your Gmail with your resume attached.
                </li>
              </ol>
              <p style={{
                color: colors.textLight,
                fontSize: '0.95rem',
                background: `${colors.success}15`,
                padding: '12px 16px',
                borderRadius: '8px',
                margin: 0,
                borderLeft: `4px solid ${colors.success}`,
              }}>
                💡 <strong>Pro Tip:</strong> You can personalize each cover letter using the AI editor to match company details.
              </p>
            </div>
          </div>

          {/* Footer */}
          {/* <div style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '24px',
            background: colors.white,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0, 102, 255, 0.08)',
          }}>
            <p style={{
              margin: 0,
              fontSize: '0.9rem',
              color: colors.textLight,
            }}>
              © {currentYear} AI Email Sender — Crafted with ❤️ by Vishwas
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}