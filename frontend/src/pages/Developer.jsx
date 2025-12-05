import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Brain, Code, Cpu, Database, Shield, Github, Linkedin, Mail } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';

const Developer = () => {
  const skills = [
    { icon: <Code />, name: 'React & Node.js', level: 95 },
    { icon: <Database />, name: 'MongoDB & SQL', level: 90 },
    { icon: <Brain />, name: 'AI & Machine Learning', level: 88 },
    { icon: <Shield />, name: 'Cybersecurity', level: 92 },
    { icon: <Terminal />, name: 'Linux (Pop!_OS)', level: 85 },
    { icon: <Cpu />, name: 'System Architecture', level: 90 },
  ];

  const projects = [
    {
      title: 'Sentinel Prime',
      description: 'Military-grade encrypted vault with AES-256 encryption',
      tech: ['React', 'Node.js', 'MongoDB', 'Three.js'],
      status: 'Active',
    },
    {
      title: 'AI Vision System',
      description: 'Computer vision platform for real-time object detection',
      tech: ['Python', 'TensorFlow', 'OpenCV'],
      status: 'Completed',
    },
    {
      title: 'Neural Network Framework',
      description: 'Custom deep learning framework for research',
      tech: ['Python', 'CUDA', 'NumPy'],
      status: 'Research',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section - Personnel File */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 border-gold/50"
          >
            {/* Classification Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold/30">
              <div className="flex items-center space-x-4">
                <Shield className="w-12 h-12 text-gold glow-gold-strong" />
                <div>
                  <div className="text-xs text-gold/60 uppercase tracking-wider mb-1">
                    [CLASSIFIED: LEVEL 5]
                  </div>
                  <h1 className="text-4xl font-rajdhani font-bold text-gold">
                    KUSH SONI
                  </h1>
                  <p className="text-silver/70 text-sm">Full-Stack Developer | AI Engineer</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/KushRadhanpura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 text-gold transition-all border border-gold/30 hover:border-gold/50"
                  title="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kush-radhanpura-550393320/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 text-gold transition-all border border-gold/30 hover:border-gold/50"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:kushsoni1675@gmail.com"
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 text-gold transition-all border border-gold/30 hover:border-gold/50"
                  title="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Image Area */}
              <div className="md:col-span-1">
                <div className="glass-card p-6 border-gold/30">
                  <div className="w-full aspect-square bg-gradient-to-br from-gold/20 to-transparent border-2 border-gold/50 rounded-lg flex items-center justify-center mb-4">
                    <Terminal className="w-24 h-24 text-gold" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-silver/60 font-mono uppercase mb-1">
                      Status
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 font-mono text-sm">ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-6 space-y-3">
                  <a
                    href="https://github.com/KushRadhanpura"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 glass-card border-silver/20 hover:border-gold/50 transition-all"
                  >
                    <Github className="w-5 h-5 text-gold" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kush-radhanpura-550393320/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 glass-card border-silver/20 hover:border-gold/50 transition-all"
                  >
                    <Linkedin className="w-5 h-5 text-gold" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:kushsoni1675@gmail.com"
                    className="flex items-center space-x-3 p-3 glass-card border-silver/20 hover:border-gold/50 transition-all"
                  >
                    <Mail className="w-5 h-5 text-gold" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-4xl font-rajdhani font-bold text-gold mb-2">
                    KUSH SONI
                  </h2>
                  <p className="text-xl text-silver/80 font-inter">
                    AI Engineer & Full Stack Developer
                  </p>
                  <p className="text-sm text-gold/70 font-mono mt-1">
                    ARCHITECT OF DIGITAL FORTRESSES
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-silver/60 uppercase font-mono mb-1">Mission</p>
                      <p className="text-silver">
                        Securing the Digital Frontier through innovation in AI, cybersecurity, and full-stack development.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-silver/60 uppercase font-mono mb-1">Specialization</p>
                      <p className="text-silver">
                        Building production-grade applications that merge cutting-edge AI with bulletproof security protocols.
                        Expert in MERN stack, machine learning, and Linux systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-silver/60 uppercase font-mono mb-1">Environment</p>
                      <p className="text-silver">
                        Pop!_OS Linux · 4GB RAM Optimization · Performance-First Architecture
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clearance Levels */}
                <div className="glass-card p-4 border-gold/30 bg-gold/5">
                  <p className="text-xs text-gold uppercase font-mono mb-2">Clearance Levels</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-void-black border border-gold/50 rounded text-xs font-mono text-gold">
                      FULL-STACK
                    </span>
                    <span className="px-3 py-1 bg-void-black border border-gold/50 rounded text-xs font-mono text-gold">
                      AI/ML
                    </span>
                    <span className="px-3 py-1 bg-void-black border border-gold/50 rounded text-xs font-mono text-gold">
                      CYBERSEC
                    </span>
                    <span className="px-3 py-1 bg-void-black border border-gold/50 rounded text-xs font-mono text-gold">
                      DevOps
                    </span>
                    <span className="px-3 py-1 bg-void-black border border-gold/50 rounded text-xs font-mono text-gold">
                      3D/WebGL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-armor/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-rajdhani font-bold text-gold mb-4 flex items-center">
              <Cpu className="w-8 h-8 mr-3" />
              TECHNICAL CAPABILITIES
            </h2>
            <p className="text-silver/70">Proficiency levels across core technologies</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 border-silver/20 hover:border-gold/50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-gold">{skill.icon}</div>
                    <span className="font-rajdhani font-semibold text-silver">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-gold font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-void-black/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-gold to-yellow-500 glow-gold-strong"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-rajdhani font-bold text-gold mb-4 flex items-center">
              <Terminal className="w-8 h-8 mr-3" />
              CLASSIFIED PROJECTS
            </h2>
            <p className="text-silver/70">Selected works from the digital armory</p>
          </motion.div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 border-silver/20 hover:border-gold/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-rajdhani font-bold text-gold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-silver/80">{project.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-mono ${
                    project.status === 'Active' ? 'bg-green-500/20 text-green-500 border border-green-500/50' :
                    project.status === 'Completed' ? 'bg-gold/20 text-gold border border-gold/50' :
                    'bg-silver/20 text-silver border border-silver/50'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-void-black border border-silver/30 rounded text-sm font-mono text-silver/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Developer;
