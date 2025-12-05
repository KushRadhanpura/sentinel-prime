import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Eye, Code, Heart } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';

const About = () => {
  return (
    <PublicLayout>
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Shield className="w-20 h-20 text-gold mx-auto mb-6 glow-gold-strong" />
            <h1 className="text-6xl font-rajdhani font-bold text-gold mb-6">
              ABOUT SENTINEL PRIME
            </h1>
            <p className="text-xl text-silver/80">
              More than a password manager. A digital fortress.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-gold/30"
            >
              <h2 className="text-3xl font-rajdhani font-bold text-gold mb-4 flex items-center">
                <Lock className="w-8 h-8 mr-3" />
                OUR MISSION
              </h2>
              <p className="text-silver/80 text-lg leading-relaxed">
                In an era where data breaches happen daily and privacy is under constant siege,
                Sentinel Prime stands as an impenetrable fortress for your digital life. We believe
                that security should never be compromised, and privacy is a fundamental right.
              </p>
              <p className="text-silver/80 text-lg leading-relaxed mt-4">
                Built with military-grade AES-256 encryption, our platform ensures that your
                sensitive information remains yours alone. Not even we can access your data.
              </p>
            </motion.div>

            {/* Privacy Principles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-gold/30"
            >
              <h2 className="text-3xl font-rajdhani font-bold text-gold mb-6 flex items-center">
                <Eye className="w-8 h-8 mr-3" />
                ZERO-KNOWLEDGE ARCHITECTURE
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-silver/80">
                    <span className="text-gold font-semibold">Client-Side Encryption:</span> All
                    encryption happens in your browser before data reaches our servers.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-silver/80">
                    <span className="text-gold font-semibold">No Plaintext Storage:</span> We never
                    see or store your passwords in readable form.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-silver/80">
                    <span className="text-gold font-semibold">Secure Key Management:</span> Your
                    encryption keys never leave your device.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-silver/80">
                    <span className="text-gold font-semibold">Open Source:</span> Transparency is
                    key. Our code is auditable and community-verified.
                  </p>
                </li>
              </ul>
            </motion.div>

            {/* Technology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-gold/30"
            >
              <h2 className="text-3xl font-rajdhani font-bold text-gold mb-6 flex items-center">
                <Code className="w-8 h-8 mr-3" />
                TECHNOLOGY STACK
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-rajdhani font-semibold text-gold mb-3">
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-silver/80">
                    <li>• React 18 (Modern UI)</li>
                    <li>• Three.js (3D Visualization)</li>
                    <li>• Vite (Lightning-Fast Builds)</li>
                    <li>• TailwindCSS (Cybernetic Design)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-rajdhani font-semibold text-gold mb-3">
                    Backend
                  </h3>
                  <ul className="space-y-2 text-silver/80">
                    <li>• Node.js & Express</li>
                    <li>• MongoDB (Encrypted Storage)</li>
                    <li>• JWT Authentication</li>
                    <li>• AES-256-CBC Encryption</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-gold/30"
            >
              <h2 className="text-3xl font-rajdhani font-bold text-gold mb-6 flex items-center">
                <Zap className="w-8 h-8 mr-3" />
                WHY SENTINEL PRIME?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-rajdhani font-semibold text-gold mb-1">
                      Military-Grade Security
                    </h3>
                    <p className="text-silver/80">
                      Same encryption standards used by governments and defense contractors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-rajdhani font-semibold text-gold mb-1">
                      Optimized Performance
                    </h3>
                    <p className="text-silver/80">
                      Built to run smoothly even on resource-constrained systems (4GB RAM).
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Eye className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-rajdhani font-semibold text-gold mb-1">
                      Complete Privacy
                    </h3>
                    <p className="text-silver/80">
                      We cannot see your data. You are the sole key-holder to your vault.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Heart className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-rajdhani font-semibold text-gold mb-1">
                      Built with Care
                    </h3>
                    <p className="text-silver/80">
                      Crafted by Kush Soni, an AI Engineer passionate about security and privacy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <h3 className="text-3xl font-rajdhani font-bold text-gold mb-6">
                READY TO FORTIFY YOUR DIGITAL LIFE?
              </h3>
              <a href="/register" className="btn-gold inline-block">
                Create Your Vault
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
