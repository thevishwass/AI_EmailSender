'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function CoverLetterPage() {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [hasResume, setHasResume] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  // Fetch existing cover letter & resume on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const fetchCoverLetter = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/cover/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setCoverLetter(data.cover_text || '');
          setHasResume(data.has_resume || false);
          setResumeName(data.resume_filename || '');
        } else {
          setCoverLetter('');
        }
      } catch (err) {
        console.error('Error fetching cover letter:', err);
      }
    };

    fetchCoverLetter();
  }, []);

  // Save (update) cover letter + upload resume
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage('⚠️ You are not logged in. Please login first.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('cover_text', coverLetter);
      if (resumeFile) formData.append('resume', resumeFile);

      const res = await fetch('http://127.0.0.1:8000/cover/', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setMessage('✅ ' + (data.message || 'Saved successfully!'));
        if (resumeFile) {
          setHasResume(true);
          setResumeName(resumeFile.name);
        }
        setResumeFile(null);
      } else {
        const errorDetail =
          typeof data.detail === 'string'
            ? data.detail
            : JSON.stringify(data.detail || data);
        setMessage('❌ ' + (errorDetail || 'Failed to save cover letter.'));
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  // Download stored resume from backend
  const handleDownloadResume = async () => {
    setDownloading(true);
    const token = localStorage.getItem('access_token');

    try {
      const res = await fetch('http://127.0.0.1:8000/cover/resume', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to download resume.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resumeName || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to download resume.');
    } finally {
      setDownloading(false);
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
    fontSize: '1.1rem',
    fontWeight: '600',
    color: colors.text,
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: colors.primaryLight,
      }}
    >
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
            📝
          </div>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: colors.dark,
              marginBottom: '15px',
            }}
          >
            Cover Letter & Resume
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textLight,
          }}>
            Manage your cover letter and resume for job applications
          </p>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            maxWidth: '900px',
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
          maxWidth: '900px',
          width: '100%',
          background: colors.white,
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          border: `1px solid ${colors.primaryLight}`,
        }}>
          <form
            onSubmit={handleSave}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Cover Letter Textarea */}
            <div>
              <label style={labelStyle}>Cover Letter *</label>
              <textarea
                placeholder="Write or edit your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                style={{
                  ...inputStyle,
                  minHeight: '200px',
                  resize: 'vertical',
                  fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                  lineHeight: '1.6',
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

            {/* Resume Upload */}
            <div>
              <label style={labelStyle}>Upload Resume (PDF only)</label>
              <input
                type="file"
                id="resume"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  paddingTop: '12px',
                  paddingBottom: '12px',
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
              {resumeFile && (
                <p style={{ 
                  marginTop: '10px', 
                  fontSize: '0.9rem',
                  color: colors.success,
                  fontWeight: '500'
                }}>
                  ✓ Selected: {resumeFile.name}
                </p>
              )}

              {/* Show saved resume info */}
              {hasResume && (
                <div style={{ 
                  marginTop: '20px',
                  padding: '20px',
                  background: colors.primaryLight,
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`,
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '15px'
                  }}>
                    <div>
                      <p style={{ 
                        margin: 0,
                        color: colors.text,
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        marginBottom: '5px'
                      }}>
                        📄 Current Resume
                      </p>
                      <p style={{ 
                        margin: 0,
                        color: colors.textLight,
                        fontSize: '0.9rem'
                      }}>
                        {resumeName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadResume}
                      disabled={downloading}
                      style={{
                        backgroundColor: downloading ? colors.textLight : colors.success,
                        color: colors.white,
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: downloading ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        boxShadow: downloading ? 'none' : '0 2px 8px rgba(16, 185, 129, 0.3)',
                      }}
                      onMouseOver={(e) => {
                        if (!downloading) {
                          e.currentTarget.style.backgroundColor = '#059669';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!downloading) {
                          e.currentTarget.style.backgroundColor = colors.success;
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                        }
                      }}
                    >
                      {downloading ? '📥 Downloading...' : '📥 Download Resume'}
                    </button>
                  </div>
                </div>
              )}
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
              {loading ? '💾 Saving...' : '💾 Save Cover Letter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}