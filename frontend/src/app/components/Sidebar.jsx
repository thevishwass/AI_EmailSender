'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const colors = {
    primary: '#0066ff',
    primaryDark: '#0052cc',
    primaryLight: '#e6f0ff',
    secondary: '#00d4ff',
    dark: '#1a1a2e',
    darkLight: '#16213e',
    white: '#ffffff',
    text: '#2d3748',
    textLight: '#718096',
  };

  const links = [
    { href: '/home', label: 'Home', icon: '🏠' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
    { href: '/cover', label: 'Cover Letter', icon: '📝' },
    { href: '/help', label: 'Help', icon: '🌟' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.dispatchEvent(new Event('storage'));
    router.push('/');
  };

  return (
    <div
      style={{
        width: '260px',
        background: `linear-gradient(180deg, ${colors.dark} 0%, ${colors.darkLight} 100%)`,
        color: colors.white,
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0, 102, 255, 0.15)',
        overflow: 'hidden',
        paddingTop: '30px',
        zIndex: 40,
      }}
    >
      {/* Logo/Brand */}
      <div style={{
        padding: '0 20px',
        marginBottom: '40px',
        textAlign: 'left',
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>
          EasyJobs
        </h2>
      </div>

      {/* Navigation links */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '0 15px',
        gap: '8px'
      }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: 'none',
              color: colors.white,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary}30`;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{
                fontSize: '1.4rem',
                minWidth: '24px',
                textAlign: 'center'
              }}>
                {link.icon}
              </span>
              <span style={{
                fontWeight: '500',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
              }}>
                {link.label}
              </span>
            </div>
          </Link>
        ))}

        {/* Logout button at bottom */}
        <div
          style={{
            marginTop: 'auto',
            padding: '20px 0 30px',
          }}
        >
          {/* <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              backgroundColor: `${colors.primary}20`,
              color: colors.white,
              fontWeight: 600,
              border: `2px solid ${colors.primary}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.primary}20`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{
              fontSize: '1.4rem',
              minWidth: '24px',
              textAlign: 'center'
            }}>
              🚪
            </span>
            <span style={{
              whiteSpace: 'nowrap',
            }}>
              Logout
            </span>
          </button> */}
        </div>
      </nav>
    </div>
  );
}