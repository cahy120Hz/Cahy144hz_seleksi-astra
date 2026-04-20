import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { ProgressBar } from '@/components/ProgressBar';
import {
  Step1DataDiri,
  Step2Informasi,
  Step3Seleksi,
  Step4Kesediaan,
  Step5Tambahan,
} from '@/components/FormSteps';
import { MemberCard } from '@/components/MemberCard';
import { ExportButtons } from '@/components/ExportButtons';
import { SuccessPopup } from '@/components/SuccessPopup';
import { useFormValidation } from '@/hooks/useFormValidation';
import { INITIAL_FORM_DATA } from '@/types/form';
import type { FormData, FormStep, MemberCardData } from '@/types/form';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  Sparkles,
  Globe,
} from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [memberData, setMemberData] = useState<MemberCardData | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { validateStep, isStepValid } = useFormValidation();

  const updateData = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const handleNext = () => {
    const validationErrors = validateStep(currentStep, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
      setErrors({});
    }
  };

  const generateMemberNumber = () => {
    const tahun = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `ASTRA-${tahun}-${random}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate loading delay (minimum 1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const memberNumber = generateMemberNumber();
    const now = new Date();
    const tanggalDaftar = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const cardData: MemberCardData = {
      ...formData,
      nomorAnggota: memberNumber,
      tanggalDaftar,
    };

    setMemberData(cardData);
    setShowCard(true);
    setShowSuccessPopup(true);
    setIsSubmitting(false);

    // Scroll to card
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setShowCard(false);
    setMemberData(null);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1DataDiri data={formData} updateData={updateData} errors={errors} />;
      case 2:
        return <Step2Informasi data={formData} updateData={updateData} errors={errors} />;
      case 3:
        return <Step3Seleksi data={formData} updateData={updateData} errors={errors} />;
      case 4:
        return <Step4Kesediaan data={formData} updateData={updateData} errors={errors} />;
      case 5:
        return <Step5Tambahan data={formData} updateData={updateData} errors={errors} />;
    }
  };

  const canSubmit =
    isStepValid(1, formData) &&
    isStepValid(2, formData) &&
    isStepValid(3, formData) &&
    isStepValid(4, formData);

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <GalaxyBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.img
              src="/assets/astra-logo.png"
              alt="ASTRA Logo"
              className="w-24 h-24 mx-auto mb-4"
              style={{ filter: 'drop-shadow(0 0 25px rgba(108, 59, 255, 0.6))' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 30px rgba(108, 59, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)',
              }}
            >
              ASTRA
            </h1>
            <p
              className="text-lg md:text-xl font-bold mb-1"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Pendaftaran Anggota Baru
            </p>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              Isi formulir di bawah ini untuk bergabung dengan komunitas ASTRA
            </p>
          </motion.div>
        </header>

        {/* Main Form */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-2xl mx-auto">
            {!showCard ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Form Container */}
                <div
                  className="rounded-2xl p-6 md:p-8 backdrop-blur-xl"
                  style={{
                    background: 'rgba(10, 5, 40, 0.6)',
                    border: '1px solid rgba(108, 59, 255, 0.2)',
                    boxShadow: '0 0 40px rgba(108, 59, 255, 0.1), inset 0 0 40px rgba(0, 212, 255, 0.02)',
                  }}
                >
                  <ProgressBar currentStep={currentStep} />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <Button
                      onClick={handleBack}
                      disabled={currentStep === 1 || isSubmitting}
                      variant="outline"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-white/20 text-white hover:bg-white/10 disabled:opacity-30 transition-all duration-300"
                    >
                      <ChevronLeft size={18} />
                      Kembali
                    </Button>

                    {currentStep < 5 ? (
                      <Button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                          boxShadow: '0 0 25px rgba(108, 59, 255, 0.4)',
                        }}
                      >
                        Lanjut
                        <ChevronRight size={18} />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canSubmit || isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        style={{
                          background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                          boxShadow: '0 0 25px rgba(108, 59, 255, 0.4)',
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Kirim
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Card Display */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Success Message */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                    className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                      boxShadow: '0 0 30px rgba(108, 59, 255, 0.5)',
                    }}
                  >
                    <Sparkles size={24} className="text-white" />
                  </motion.div>
                  <h2
                    className="text-2xl font-bold text-white"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
                    }}
                  >
                    Kartu Anggota ASTRA
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    Simpan kartu ini sebagai bukti keanggotaanmu
                  </p>
                </div>

                {/* Member Card */}
                {memberData && <MemberCard ref={cardRef} data={memberData} />}

                {/* Export Buttons */}
                {memberData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div
                      className="rounded-xl p-5 backdrop-blur-xl"
                      style={{
                        background: 'rgba(10, 5, 40, 0.6)',
                        border: '1px solid rgba(108, 59, 255, 0.2)',
                      }}
                    >
                      <p className="text-white/60 text-sm text-center mb-4">
                        Download kartu anggota dalam format:
                      </p>
                      <ExportButtons cardRef={cardRef} data={memberData} />
                    </div>
                  </motion.div>
                )}

                {/* New Registration Button */}
                <div className="text-center pb-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6 py-2.5 rounded-xl border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Daftar Anggota Baru
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center">
          <div
            className="w-full h-px mb-4"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(108, 59, 255, 0.5), transparent)',
            }}
          />
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe size={14} className="text-[#6C3BFF]" />
            <p className="text-white/40 text-sm">
              ASTRA Community — Explore The Universe Together
            </p>
          </div>
          <p className="text-white/25 text-xs">
            Developer:{' '}
            <a
              href="https://website-cahy144hz.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors"
            >
              CahyASTRO
            </a>
          </p>
        </footer>
      </div>

      {/* Success Popup */}
      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  );
}

export default App;
