'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [jd, setJD] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [confirming, setConfirming] = useState(false);

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
    error: '#ef4444',
    success: '#10b981',
    warning: '#f97316',
  };

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) router.push('/login');
  }, [router]);

  // Generate email from backend AI
  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('Please login first.');
        setLoading(false);
        return;
      }

      const res = await fetch('http://127.0.0.1:8000/email/final', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recruiter_email: email,
          jd,
          company: companyName || '',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubject(data.subject);
        setDraftEmail(data.body);
        setShowModal(true);
      } else {
        setMessage(data.detail || 'Failed to generate email.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  // Send email via backend
  // Send email via backend
const handleSend = async () => {
  if (!confirming) {
    setConfirming(true);
    setMessage('⚠️ Click again to confirm sending.');
    return;
  }

  setSending(true);
  setMessage('');
  setConfirming(false);

  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage('Please login first.');
      setSending(false);
      return;
    }

    // ✅ Single POST request (no GET)
    const res = await fetch('http://127.0.0.1:8000/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: email,
        subject,
        body: draftEmail,
      }),
    });

    const data = await res.json();

    // ✅ Check for success or backend error
    if (res.ok && data.success) {
      setMessage('✅ Email sent successfully!');
      setShowModal(false);
    } else {
      setMessage(
        `❌ ERROR — Please check your Gmail password. ${data.detail || ''}`
      );
    }
  } catch (err) {
    console.error(err);
    setMessage('⚠️ Network or server error while sending email.');
  } finally {
    setSending(false);
  }
};


  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: `2px solid ${colors.border}`,
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: colors.text,
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      background: colors.primaryLight,
    }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        marginLeft: '260px',
        padding: '60px 40px',
        transition: 'margin-left 0.3s ease',
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
            📧
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '15px',
          }}>
            Apply to Jobs Effortlessly
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textLight,
          }}>
            Generate professional job applications with AI
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            maxWidth: '700px',
            margin: '0 auto 30px',
            padding: '14px 20px',
            borderRadius: '10px',
            background: message.includes('✅') ? `${colors.success}15` : `${colors.error}15`,
            border: `1px solid ${message.includes('✅') ? colors.success : colors.error}`,
            color: message.includes('✅') ? colors.success : colors.error,
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '0.95rem',
          }}>
            {message}
          </div>
        )}

        {/* Main Form Card */}
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: colors.white,
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          border: `1px solid ${colors.primaryLight}`,
        }}>
          <form
            onSubmit={handleGenerate}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Company Name */}
            <div>
              <label style={labelStyle}>Company Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Google, Microsoft, Amazon"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Recruiter's Email */}
            <div>
              <label style={labelStyle}>Recruiter's Email *</label>
              <input
                type="email"
                placeholder="recruiter@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Job Description */}
            <div>
              <label style={labelStyle}>Job Description / Title *</label>
              <textarea
                placeholder="Paste the full job description or role title here..."
                value={jd}
                onChange={(e) => setJD(e.target.value)}
                required
                style={{
                  ...inputStyle,
                  minHeight: '160px',
                  resize: 'vertical',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: loading ? colors.textLight : colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(0, 102, 255, 0.3)',
                fontFamily: 'inherit',
                marginTop: '8px',
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = colors.primaryDark;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = colors.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.3)';
                }
              }}
            >
              {loading ? '⏳ Generating...' : '✨ Generate Email'}
            </button>
          </form>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                background: colors.white,
                padding: '40px',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '700px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ 
                marginBottom: '30px', 
                textAlign: 'center',
                fontSize: '1.8rem',
                fontWeight: '700',
                color: colors.dark,
              }}>
                📬 Preview Email
              </h2>

              {/* To Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>To:</label>
                <input
                  type="text"
                  value={email}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: colors.primaryLight,
                    cursor: 'not-allowed',
                  }}
                />
              </div>

              {/* Subject Field */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Body Field */}
              <div style={{ marginBottom: '30px' }}>
                <label style={labelStyle}>Body:</label>
                <textarea
                  value={draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)}
                  style={{
                    ...inputStyle,
                    minHeight: '250px',
                    whiteSpace: 'pre-wrap',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primaryLight}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setConfirming(false);
                  }}
                  style={{
                    padding: '12px 24px',
                    border: `2px solid ${colors.border}`,
                    borderRadius: '10px',
                    background: colors.white,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: colors.text,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = colors.text;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: sending 
                      ? colors.textLight 
                      : confirming 
                        ? colors.warning 
                        : colors.primary,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '10px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: sending ? 'none' : '0 4px 14px rgba(0, 102, 255, 0.3)',
                  }}
                  onMouseOver={(e) => {
                    if (!sending && !confirming) {
                      e.currentTarget.style.background = colors.primaryDark;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!sending && !confirming) {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.3)';
                    }
                  }}
                >
                  {sending ? '📤 Sending...' : confirming ? '⚠️ Confirm Send' : '📨 Send Email'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}