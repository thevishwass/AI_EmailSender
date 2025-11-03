// app/home/page.js
'use client';
import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#1a1a1a',
        backgroundColor: '#fff',
        overflowX: 'hidden',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f8fbff 0%, #e9f0f8 100%)',
          color: '#1a1a1a',
          padding: '80px 20px 80px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          Apply to Multiple Jobs Effortlessly
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            maxWidth: '800px',
            margin: '0 auto 50px',
            opacity: 0.9,
          }}
        >
          Send job applications to multiple companies with one click. Fast, smart, and effortless.
        </p>

        <Link href="/home">
          <button
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              fontWeight: 600,
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.12)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
            }}
          >
            Get Started
          </button>
        </Link>

        <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/digital-job-application-form-11822366-9636844.png"
            alt="Job Application Illustration"
            style={{
              maxWidth: '550px',
              width: '90%',
              borderRadius: '0',
              background: 'none',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '90px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '60px',
          }}
        >
          Why Use EasyJobs?
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
          }}
        >
          {[
            {
              icon: '📧',
              title: 'Apply via Email',
              desc: 'Send applications directly using your email — no multiple logins needed.',
            },
            {
              icon: '⚡',
              title: 'Automated Applications',
              desc: 'Apply to multiple jobs with one click. Save hours of repetitive work.',
            },
            {
              icon: '✅',
              title: 'Track Your Applications',
              desc: 'Stay organized and see all your job application updates in one place.',
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 300px',
                background: '#fff',
                padding: '30px 25px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 14px 35px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
              }}
            >
              <p style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{f.icon}</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#555', fontSize: '1rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        style={{
          background: '#f9fafb',
          padding: '90px 20px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '60px' }}>How It Works</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {[
            { step: '1️⃣', title: 'Sign Up', text: 'Create your free account with your email.' },
            { step: '2️⃣', title: 'Upload Resume', text: 'Add your resume and cover letter securely.' },
            { step: '3️⃣', title: 'Select Jobs', text: 'Pick the companies you want to apply to.' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '30px 20px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{s.step}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ color: '#555' }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          textAlign: 'center',
          padding: '100px 20px',
          background: 'linear-gradient(135deg, #00d4ff 0%, #0070f3 100%)',
          color: '#fff',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Ready to Apply Effortlessly?
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>
          Save time and land your next opportunity with EasyJobs.
        </p>
        <Link href="/home">
          <button
            style={{
              backgroundColor: '#fff',
              color: '#0070f3',
              fontWeight: 600,
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '2rem 1.25rem',
          background: '#f0f4f8',
          color: '#333',
          fontSize: '0.95rem',
        }}
      >
        &copy; {new Date().getFullYear()} <strong>EasyJobs</strong> — All Rights Reserved.
      </footer>
    </div>
  );
}
