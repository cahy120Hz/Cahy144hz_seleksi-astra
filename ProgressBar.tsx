import { motion } from 'framer-motion';
import type { FormStep } from '@/types/form';
import { User, Info, Brain, ClipboardCheck, Camera } from 'lucide-react';

interface ProgressBarProps {
  currentStep: FormStep;
}

const steps = [
  { num: 1 as FormStep, label: 'Data Diri', icon: User },
  { num: 2 as FormStep, label: 'Informasi', icon: Info },
  { num: 3 as FormStep, label: 'Seleksi', icon: Brain },
  { num: 4 as FormStep, label: 'Kesediaan', icon: ClipboardCheck },
  { num: 5 as FormStep, label: 'Tambahan', icon: Camera },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 rounded-full" />

        {/* Active line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #6C3BFF, #00D4FF)',
            boxShadow: '0 0 10px rgba(108, 59, 255, 0.5)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step) => {
          const isActive = step.num <= currentStep;
          const isCurrent = step.num === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#00D4FF] bg-[#00D4FF]/20'
                    : isActive
                    ? 'border-[#6C3BFF] bg-[#6C3BFF]/20'
                    : 'border-white/20 bg-[#0a0a2e]/80'
                }`}
                animate={
                  isCurrent
                    ? {
                        boxShadow: [
                          '0 0 5px rgba(0, 212, 255, 0.3)',
                          '0 0 20px rgba(0, 212, 255, 0.6)',
                          '0 0 5px rgba(0, 212, 255, 0.3)',
                        ],
                      }
                    : {}
                }
                transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-[#00D4FF]' : 'text-white/40'}
                />
              </motion.div>
              <span
                className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  isCurrent
                    ? 'text-[#00D4FF]'
                    : isActive
                    ? 'text-white/80'
                    : 'text-white/40'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
