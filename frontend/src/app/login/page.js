'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.access_token) {
        setMessage(data.detail || 'Login failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      window.dispatchEvent(new Event('storage'));

      setMessage('Login successful! Redirecting...');
      setTimeout(() => router.push('/home'), 500);
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Login failed. Please try again.');
      setIsLoading(false);
    }
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
        padding: '20px',
      }}
    >
      <div
        style={{
          background: colors.white,
          padding: '55px 45px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          maxWidth: '500px',
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
            👋
          </div>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: colors.dark,
              marginBottom: '12px',
            }}
          >
            Welcome Back!
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.textLight,
            }}
          >
            Login to continue your job search
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '26px',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px 18px',
                fontSize: '1.05rem',
                borderRadius: '10px',
                border: `2px solid ${colors.border}`,
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
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

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              maxLength={72}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px 18px',
                fontSize: '1.05rem',
                borderRadius: '10px',
                border: `2px solid ${colors.border}`,
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
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
              boxShadow: `0 4px 14px ${
                isLoading ? 'rgba(0,0,0,0.1)' : 'rgba(0, 102, 255, 0.3)'
              }`,
              fontFamily: 'inherit',
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = colors.primaryDark;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(0, 102, 255, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 14px rgba(0, 102, 255, 0.3)';
              }
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            style={{
              marginTop: '26px',
              padding: '13px 18px',
              borderRadius: '10px',
              background: message.includes('successful')
                ? `${colors.success}15`
                : `${colors.error}15`,
              border: `1px solid ${
                message.includes('successful') ? colors.success : colors.error
              }`,
              color: message.includes('successful')
                ? colors.success
                : colors.error,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '1rem',
            }}
          >
            {message}
          </div>
        )}

        {/* Signup Link */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '34px',
            fontSize: '1rem',
            color: colors.textLight,
          }}
        >
          Don’t have an account?{' '}
          <Link
            href="/signup"
            style={{
              color: colors.primary,
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = colors.primaryDark)}
            onMouseOut={(e) => (e.currentTarget.style.color = colors.primary)}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
