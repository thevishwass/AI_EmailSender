'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 18px',
    fontSize: '1.05rem',
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
    fontSize: '1rem',
    fontWeight: '600',
    color: colors.text,
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.white} 100%)`,
        minHeight: '100vh',
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
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
            }}
          >
            💬
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: colors.dark, marginBottom: '15px' }}>
            Contact Us
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.textLight,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div
            style={{
              marginBottom: '30px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: `${colors.success}15`,
              border: `1px solid ${colors.success}`,
              color: colors.success,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1rem',
            }}
          >
            ✅ Thank you! Your message has been sent successfully.
          </div>
        )}

        {/* Form Card */}
        <div
          style={{
            background: colors.white,
            padding: '55px 45px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
            border: `1px solid ${colors.primaryLight}`,
            marginBottom: '40px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label htmlFor="name" style={labelStyle}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
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

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
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

            <div>
              <label htmlFor="message" style={labelStyle}>
                Message *
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Write your message here..."
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
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

            <button
              type="submit"
              style={{
                padding: '18px 22px',
                fontSize: '1.05rem',
                fontWeight: '600',
                background: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(0, 102, 255, 0.3)',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = colors.primaryDark;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.3)';
              }}
            >
              📤 Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Card */}
        <div
          style={{
            background: colors.white,
            padding: '35px 45px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
            border: `1px solid ${colors.primaryLight}`,
          }}
        >
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: colors.dark, marginBottom: '20px' }}>
            📞 Other Ways to Reach Us
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '1rem', color: colors.text }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>📧</span>
              <span>
                Email:{' '}
                <Link
                  href="mailto:thevishwass@gmail.com"
                  style={{ color: colors.primary, textDecoration: 'none', fontWeight: '600', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = colors.primaryDark)}
                  onMouseOut={(e) => (e.currentTarget.style.color = colors.primary)}
                >
                  thevishwass@gmail.com
                </Link>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>📱</span>
              <span>
                Phone:{' '}
                <span style={{ fontWeight: '600', color: colors.dark }}>+91 8070516359</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
