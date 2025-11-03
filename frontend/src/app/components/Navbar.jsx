'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const colors = {
    primary: '#0066ff',
    primaryDark: '#0052cc',
    primaryLight: '#e6f0ff',
    secondary: '#00d4ff',
    dark: '#1a1a2e',
    white: '#ffffff',
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);

    // Listen to storage events (triggered by login/logout)
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('access_token');
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  const navLinks = ['Home', 'Privacy', 'Contact', 'About'];

  return (
    <nav style={{
      background: colors.white,
      boxShadow: '0 2px 15px rgba(0, 102, 255, 0.08)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: `1px solid ${colors.primaryLight}`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: colors.dark,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '-0.5px',
            position: 'relative',
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = colors.primary;
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = colors.dark;
          }}
        >
          EasyJobs
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        className="md-flex">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              style={{
                position: 'relative',
                fontWeight: '600',
                color: colors.dark,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
              }}
              onMouseOver={e => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.background = colors.primaryLight;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = colors.dark;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link}
            </Link>
          ))}

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginLeft: '1.5rem'
          }}>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: '0.65rem 1.5rem',
                    border: `2px solid ${colors.primary}`,
                    color: colors.primary,
                    fontWeight: '600',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = colors.primary;
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.3)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  style={{
                    padding: '0.65rem 1.5rem',
                    background: colors.primary,
                    color: colors.white,
                    fontWeight: '600',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = colors.primaryDark;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 255, 0.35)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.25)';
                  }}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.65rem 1.5rem',
                  background: colors.dark,
                  color: colors.white,
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(26, 26, 46, 0.25)',
                  fontSize: '0.9rem'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#16213e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(26, 26, 46, 0.35)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = colors.dark;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 26, 46, 0.25)';
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="md-hidden"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{
              width: '28px',
              height: '3px',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0)',
            }}></span>
            <span style={{
              width: '28px',
              height: '3px',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1,
            }}></span>
            <span style={{
              width: '28px',
              height: '3px',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: '3px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0)',
            }}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          display: 'block',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: `1px solid ${colors.primary}30`,
          animation: 'slideDown 0.3s ease'
        }}
        className="md-hidden">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              style={{
                display: 'block',
                padding: '0.875rem 1rem',
                color: colors.dark,
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseOver={e => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.background = `${colors.primaryLight}40`;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = colors.dark;
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link}
            </Link>
          ))}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: '0.875rem 1.5rem',
                    border: `2px solid ${colors.primary}`,
                    color: colors.primary,
                    fontWeight: '700',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  style={{
                    padding: '0.875rem 1.5rem',
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: colors.white,
                    fontWeight: '700',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0, 102, 255, 0.4)'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  padding: '0.875rem 1.5rem',
                  background: colors.dark,
                  color: colors.white,
                  fontWeight: '700',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(26, 26, 46, 0.4)'
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .md-flex {
            display: flex !important;
          }
          .md-hidden {
            display: none !important;
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}