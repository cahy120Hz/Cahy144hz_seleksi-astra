import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Rocket } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div
              className="relative w-full max-w-sm rounded-2xl p-6 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 10, 60, 0.98), rgba(10, 5, 40, 0.99))',
                border: '1px solid rgba(108, 59, 255, 0.4)',
                boxShadow: '0 0 60px rgba(108, 59, 255, 0.3), 0 0 100px rgba(0, 212, 255, 0.1)',
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, #6C3BFF, transparent)' }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                    boxShadow: '0 0 30px rgba(108, 59, 255, 0.5)',
                  }}
                >
                  <Rocket size={28} className="text-white" />
                </motion.div>

                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: '0 0 15px rgba(108, 59, 255, 0.5)',
                  }}
                >
                  Pendaftaran Berhasil!
                </h3>

                <p className="text-white/60 text-sm mb-1">
                  Selamat! Kamu telah terdaftar sebagai anggota ASTRA.
                </p>
                <p className="text-white/40 text-xs mb-5">
                  Kartu anggota telah dibuat. Simpan dan tunjukkan saat diperlukan.
                </p>

                {/* Divider */}
                <div
                  className="w-full h-px my-4"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(108, 59, 255, 0.5), transparent)',
                  }}
                />

                <p className="text-[#00D4FF] text-sm font-medium mb-3">
                  Follow TikTok resmi ASTRA untuk update terbaru!
                </p>

                <Button
                  onClick={() =>
                    window.open(
                      'https://www.tiktok.com/@astra_pasar_community?_r=1&_t=ZS-95RlBe7hRUD',
                      '_blank'
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                    boxShadow: '0 0 25px rgba(108, 59, 255, 0.4)',
                  }}
                >
                  <ExternalLink size={16} />
                  Follow TikTok ASTRA
                </Button>

                <button
                  onClick={onClose}
                  className="mt-3 text-white/40 text-xs hover:text-white/70 transition-colors"
                >
                  Tutup popup
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
