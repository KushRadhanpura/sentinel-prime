import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Key, CheckCircle, Copy, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const TwoFactorSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1234-STUV',
  ]);
  const [qrCodeData] = useState('otpauth://totp/SentinelPrime:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=SentinelPrime');

  const steps = [
    {
      number: 1,
      title: 'Download Authenticator App',
      description: 'Install Google Authenticator, Authy, or Microsoft Authenticator on your phone',
      icon: Smartphone,
    },
    {
      number: 2,
      title: 'Scan QR Code',
      description: 'Open your authenticator app and scan the QR code below',
      icon: Key,
    },
    {
      number: 3,
      title: 'Verify Code',
      description: 'Enter the 6-digit code from your authenticator app',
      icon: Shield,
    },
    {
      number: 4,
      title: 'Save Backup Codes',
      description: 'Store these codes safely - you\'ll need them if you lose your device',
      icon: CheckCircle,
    },
  ];

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleVerify = () => {
    // TODO: Add API verification
    console.log('Verifying code:', verificationCode);
    handleNextStep();
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
  };

  const downloadBackupCodes = () => {
    const blob = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentinel-prime-backup-codes.txt';
    a.click();
    // Mark 2FA as completed
    localStorage.setItem('twoFactorEnabled', 'true');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Two-Factor Authentication Setup</h1>
            <p className="text-gray-400">Add an extra layer of security to your account</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.number
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'bg-slate-800 border-slate-600 text-gray-400'
                    }`}
                    animate={{
                      scale: currentStep === step.number ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: currentStep === step.number ? Infinity : 0 }}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </motion.div>
                  <span className="text-xs text-gray-400 mt-2 text-center hidden md:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2">
                    <div
                      className={`h-full ${
                        currentStep > step.number ? 'bg-cyan-500' : 'bg-slate-600'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-8 border border-cyan-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: 'w-10 h-10 text-cyan-400',
                })}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Step {currentStep}: {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-400">{steps[currentStep - 1].description}</p>
                </div>
              </div>

              <div className="mt-8">
                {/* Step 1: Download App */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { name: 'Google Authenticator', color: 'blue' },
                        { name: 'Microsoft Authenticator', color: 'cyan' },
                        { name: 'Authy', color: 'purple' },
                      ].map((app) => (
                        <div
                          key={app.name}
                          className={`p-6 bg-slate-900/50 rounded-lg border-2 border-${app.color}-500/30 hover:border-${app.color}-500/60 transition-all cursor-pointer`}
                        >
                          <Smartphone className={`w-12 h-12 text-${app.color}-400 mb-3`} />
                          <h3 className="text-white font-bold mb-2">{app.name}</h3>
                          <p className="text-sm text-gray-400">Download from App Store or Google Play</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Scan QR Code */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-white p-8 rounded-lg inline-block mx-auto">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Or enter this code manually:</p>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-slate-800 px-4 py-2 rounded text-cyan-400 font-mono">
                          JBSWY3DPEHPK3PXP
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText('JBSWY3DPEHPK3PXP')}
                          className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded transition-colors"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Verify Code */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Enter 6-digit verification code
                      </label>
                      <input
                        type="text"
                        maxLength="6"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-900 text-white px-6 py-4 rounded-lg border border-cyan-500/30 focus:border-cyan-500 focus:outline-none text-center text-2xl font-mono tracking-widest"
                        placeholder="000000"
                      />
                      <button
                        onClick={handleVerify}
                        disabled={verificationCode.length !== 6}
                        className="w-full mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify & Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Backup Codes */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                      <p className="text-yellow-400 text-sm">
                        ⚠️ <strong>Important:</strong> Save these backup codes in a secure location. Each code can only be used once.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {backupCodes.map((code, index) => (
                        <div
                          key={index}
                          className="bg-slate-900/50 px-4 py-3 rounded-lg font-mono text-cyan-400 text-center border border-cyan-500/20"
                        >
                          {code}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={copyBackupCodes}
                        className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy Codes</span>
                      </button>
                      <button
                        onClick={downloadBackupCodes}
                        className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Download Codes</span>
                      </button>
                    </div>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/50"
                    >
                      <Home className="w-6 h-6" />
                      <span>Return to Vault</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              {currentStep !== 3 && (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default TwoFactorSetup;
