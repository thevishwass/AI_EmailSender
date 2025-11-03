'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

export default function SettingsPage() {
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch existing settings
    const fetchSettings = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/user/settings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setPhone(data.phone || '');
          setLinkedin(data.linkedin_profile || '');
          setPortfolio(data.portfolio_url || '');
          setLocation(data.location || '');
        }
      } catch (err) {
        console.error('Error fetching user settings:', err);
      }
    };

    fetchSettings();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('You must be logged in.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, linkedin_profile: linkedin, portfolio_url: portfolio, location }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Settings saved successfully!');
      } else {
        setMessage('❌ ' + (data.detail || 'Failed to save settings.'));
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Error connecting to server.');
    } finally {
      setLoading(false);
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
          maxWidth: '700px',
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
            ⚙️
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '15px',
          }}>
            Your Settings
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textLight,
          }}>
            Manage your profile information
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            maxWidth: '700px',
            width: '100%',
            marginBottom: '30px',
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
          width: '100%',
          background: colors.white,
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          border: `1px solid ${colors.primaryLight}`,
        }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="text"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
                onChange={e => setLinkedin(e.target.value)}
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

            {/* Portfolio */}
            <div>
              <label style={labelStyle}>Portfolio URL</label>
              <input
                type="text"
                placeholder="https://yourportfolio.com"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
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

            {/* Location */}
            <div>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                placeholder="New York, USA"
                value={location}
                onChange={e => setLocation(e.target.value)}
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
              {loading ? '💾 Saving...' : '✅ Save Settings'}
            </button>
          </form>

          {/* Security Settings Link */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: colors.primaryLight,
            borderRadius: '10px',
            textAlign: 'center',
            border: `1px solid ${colors.border}`,
          }}>
            <p style={{ 
              margin: 0,
              fontSize: '0.95rem',
              color: colors.text,
            }}>
              🔐 Need to update advanced settings?{' '}
              <Link 
                href="/securitysettings" 
                style={{ 
                  color: colors.primary,
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = colors.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.color = colors.primary}
              >
                Go to Security Settings
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}