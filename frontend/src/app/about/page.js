'use client'

export default function About() {
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
  };

  const sectionStyle = {
    marginBottom: '40px',
  };

  const headingStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: colors.dark,
    marginBottom: '16px',
  };

  const paragraphStyle = {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    color: colors.text,
  };

  const skills = ['Next.js', 'FastAPI', 'React', 'Tailwind CSS', 'MongoDB', 'Python', 'JavaScript'];

  return (
    <div style={{
      background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.white} 100%)`,
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      padding: '60px 20px',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
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
            👨‍💻
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '15px',
          }}>
            About EasyJobs
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: colors.textLight,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8',
          }}>
            Hello! I'm Vishwas, a passionate software engineer with experience in building modern web applications using Next.js, FastAPI, and other cutting-edge technologies. I enjoy creating clean, responsive, and user-friendly interfaces that combine functionality with aesthetics.
          </p>
        </div>

        {/* Main Content Card */}
        <div style={{
          background: colors.white,
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 102, 255, 0.15)',
          border: `1px solid ${colors.primaryLight}`,
        }}>
          {/* Skills Section */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>💡 Skills & Technologies</h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '20px',
            }}>
              {skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    padding: '10px 20px',
                    background: colors.primaryLight,
                    color: colors.primary,
                    fontWeight: '600',
                    borderRadius: '10px',
                    border: `2px solid ${colors.primary}20`,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    fontSize: '0.95rem',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = colors.primary;
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = colors.primaryLight;
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>🎯 My Mission</h2>
            <p style={paragraphStyle}>
              My mission is to build impactful and scalable web solutions that provide a seamless experience for users. I strive for excellence in every project, constantly learning new technologies and best practices to deliver top-quality applications. I believe in clean, maintainable code and beautiful, functional interfaces.
            </p>
          </section>

          {/* Experience Section */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>🏢 Experience</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '20px',
            }}>
              <div style={{
                padding: '20px',
                background: colors.primaryLight,
                borderRadius: '12px',
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: colors.dark,
                  marginBottom: '5px',
                }}>
                  Software Engineer
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: colors.textLight,
                  marginBottom: '8px',
                }}>
                  XYZ Company • 2023 - Present
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: colors.text,
                  lineHeight: '1.6',
                }}>
                  Building modern web applications and contributing to full-stack development projects.
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: colors.primaryLight,
                borderRadius: '12px',
                borderLeft: `4px solid ${colors.primary}`,
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: colors.dark,
                  marginBottom: '5px',
                }}>
                  Intern
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: colors.textLight,
                  marginBottom: '8px',
                }}>
                  ABC Tech • 2022 - 2023
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  color: colors.text,
                  lineHeight: '1.6',
                }}>
                  Gained hands-on experience in software development and learned industry best practices.
                </p>
              </div>
            </div>
          </section>

          {/* What I Do Section */}
          <section style={{ marginTop: '40px' }}>
            <h2 style={headingStyle}>✨ What I Do</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}>
              <div style={{
                padding: '25px',
                background: colors.white,
                border: `2px solid ${colors.primaryLight}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = colors.primaryLight;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚀</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: colors.dark, marginBottom: '8px' }}>
                  Full-Stack Development
                </h3>
                <p style={{ fontSize: '0.95rem', color: colors.textLight, lineHeight: '1.6' }}>
                  Building complete web applications from frontend to backend with modern technologies.
                </p>
              </div>

              <div style={{
                padding: '25px',
                background: colors.white,
                border: `2px solid ${colors.primaryLight}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = colors.primaryLight;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎨</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: colors.dark, marginBottom: '8px' }}>
                  UI/UX Design
                </h3>
                <p style={{ fontSize: '0.95rem', color: colors.textLight, lineHeight: '1.6' }}>
                  Creating beautiful, intuitive interfaces that provide excellent user experiences.
                </p>
              </div>

              <div style={{
                padding: '25px',
                background: colors.white,
                border: `2px solid ${colors.primaryLight}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = colors.primaryLight;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: colors.dark, marginBottom: '8px' }}>
                  Performance Optimization
                </h3>
                <p style={{ fontSize: '0.95rem', color: colors.textLight, lineHeight: '1.6' }}>
                  Ensuring fast, efficient, and scalable applications that perform exceptionally well.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}