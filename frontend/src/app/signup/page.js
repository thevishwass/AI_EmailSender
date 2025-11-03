'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          location,
          portfolio,
          linkedin,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.access_token) {
        setMessage(data.detail || 'Signup failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      window.dispatchEvent(new Event('storage'));

      setMessage('Signup successful! Redirecting...');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setLocation('');
      setPortfolio('');
      setLinkedin('');

      setTimeout(() => router.push('/cover'), 500);
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed. Please try again.');
      setIsLoading(false);
    }
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
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.white} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          background: colors.white,
          padding: '55px 45px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          maxWidth: '560px',
          width: '100%',
          border: `1px solid ${colors.primaryLight}`,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div
            style={{
              width: '85px',
              height: '85px',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: '50%',
              margin: '0 auto 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.8rem',
              boxShadow: '0 10px 30px rgba(0, 102, 255, 0.2)',
            }}
          >
            🚀
          </div>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: colors.dark,
              marginBottom: '12px',
            }}
          >
            Create an Account
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.textLight,
            }}
          >
            Join EasyJobs and start your journey
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Full Name */}
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input
              type="email"
              placeholder="your.email@example.com"
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

          {/* Password Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div>
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                maxLength={72}
                onChange={(e) => setPassword(e.target.value)}
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
            <div>
              <label style={labelStyle}>Confirm *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                maxLength={72}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          {/* Phone & Location Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="text"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                placeholder="New York, USA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
          </div>

          {/* Portfolio */}
          <div>
            <label style={labelStyle}>Portfolio URL</label>
            <input
              type="text"
              placeholder="https://yourportfolio.com"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
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

          {/* LinkedIn */}
          <div>
            <label style={labelStyle}>LinkedIn Profile</label>
            <input
              type="text"
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '18px 22px',
              fontSize: '1.05rem',
              fontWeight: '600',
              background: isLoading ? colors.textLight : colors.primary,
              color: colors.white,
              border: 'none',
              borderRadius: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: `0 4px 14px ${isLoading ? 'rgba(0,0,0,0.1)' : 'rgba(0, 102, 255, 0.3)'}`,
              fontFamily: 'inherit',
              marginTop: '8px',
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = colors.primaryDark;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.3)';
              }
            }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: '26px',
              padding: '13px 18px',
              borderRadius: '10px',
              background: message.includes('successful') ? `${colors.success}15` : `${colors.error}15`,
              border: `1px solid ${message.includes('successful') ? colors.success : colors.error}`,
              color: message.includes('successful') ? colors.success : colors.error,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1rem',
            }}
          >
            {message}
          </div>
        )}

        {/* Login Link */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '34px',
            fontSize: '1rem',
            color: colors.textLight,
          }}
        >
          Already have an account?{' '}
          <Link
            href="/login"
            style={{
              color: colors.primary,
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = colors.primaryDark)}
            onMouseOut={(e) => (e.currentTarget.style.color = colors.primary)}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
