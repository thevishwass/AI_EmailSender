'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function SecuritySettingsPage() {
  const [senderEmail, setSenderEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  // ✅ Fetch saved settings (without passkey)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        const response = await fetch('http://localhost:8000/security/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data) {
          setSenderEmail(data.sender_email || '');
          setSmtpHost(data.smtp_host || '');
          setSmtpPort(data.smtp_port ? data.smtp_port.toString() : '');
        }
      } catch (err) {
        console.error('Failed to load security settings:', err);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Save / Update security settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!senderEmail.includes('@')) {
      setMessage('❌ Please enter a valid sender email!');
      return;
    }

    // Passkey is optional, validate only if entered
    if (passkey && passkey.replace(/\s/g, '').length < 16) {
      setMessage('❌ Passkey must be 16 letters (a–z)!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('❌ Please log in first!');
        setLoading(false);
        return;
      }

      // Build body data (send passkey only if provided)
      const bodyData = {
        sender_email: senderEmail,
        smtp_host: smtpHost,
        smtp_port: smtpPort ? parseInt(smtpPort) : undefined,
      };

      if (passkey.trim() !== '') {
        bodyData.passkey = passkey;
      }

      const response = await fetch('http://localhost:8000/security/create-or-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Security settings saved successfully!');
        setPasskey(''); // Clear passkey field after saving
      } else {
        setMessage(`❌ ${data.detail || 'Error saving settings'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Server error occurred!');
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
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        backgroundColor: colors.primaryLight,
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '700px',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              background: `linear-gradient(135deg, ${colors.error} 0%, ${colors.warning} 100%)`,
              borderRadius: '50%',
              margin: '0 auto 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)',
            }}
          >
            🔐
          </div>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: colors.dark,
              marginBottom: '15px',
            }}
          >
            Security Settings
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.textLight,
            }}
          >
            View and update your sender email or SMTP settings.  
            (Passkey won’t be shown for security reasons)
          </p>
        </div>

        {message && (
          <div
            style={{
              maxWidth: '700px',
              width: '100%',
              marginBottom: '30px',
              padding: '14px 20px',
              borderRadius: '10px',
              background: message.includes('✅')
                ? `${colors.success}15`
                : `${colors.error}15`,
              border: `1px solid ${
                message.includes('✅') ? colors.success : colors.error
              }`,
              color: message.includes('✅') ? colors.success : colors.error,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '0.95rem',
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            maxWidth: '700px',
            width: '100%',
            background: colors.white,
            padding: '50px 40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
            border: `1px solid ${colors.primaryLight}`,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Sender Email */}
            <div>
              <label style={labelStyle}>Sender Email *</label>
              <input
                type="email"
                placeholder="e.g. you@gmail.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                
                style={inputStyle}
              />
            </div>

            {/* Passkey (optional) */}
            <div>
              <label style={labelStyle}>Passkey *</label>
              <input
                type="text"
                placeholder="abcd efgh ijkl mnop"
                value={passkey}
                onChange={(e) => {
                  let value = e.target.value.toLowerCase().replace(/[^a-z]/g, '');
                  value = value.slice(0, 16);
                  const formatted = value.replace(/(.{4})/g, '$1 ').trim();
                  setPasskey(formatted);
                }}
                style={inputStyle}
                maxLength={19}
              />
              <small style={{ color: colors.textLight, fontSize: '0.85rem' }}>
                • It is saved in the database and will not be shown for security reasons. (update if needed)
              </small>
            </div>

            {/* SMTP Host */}
            <div>
              <label style={labelStyle}>SMTP Host</label>
              <input
                type="text"
                placeholder="e.g. smtp.gmail.com"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* SMTP Port */}
            <div>
              <label style={labelStyle}>SMTP Port</label>
              <input
                type="text"
                placeholder="e.g. 587"
                value={smtpPort}
                onChange={(e) =>
                  setSmtpPort(e.target.value.replace(/[^0-9]/g, ''))
                }
                style={inputStyle}
                maxLength={5}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '16px 20px',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: loading ? colors.textLight : colors.error,
                color: colors.white,
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? '🔄 Saving...' : '🔒 Save Security Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
