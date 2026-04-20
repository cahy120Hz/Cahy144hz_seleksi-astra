import type { FormData, FormStep } from '@/types/form';

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const validateStep = (step: FormStep, data: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!data.namaLengkap.trim()) errors.namaLengkap = 'Nama lengkap wajib diisi';
        if (!data.namaPanggilan.trim()) errors.namaPanggilan = 'Nama panggilan wajib diisi';
        if (!data.umur.trim()) errors.umur = 'Umur wajib diisi';
        else if (isNaN(Number(data.umur)) || Number(data.umur) < 1 || Number(data.umur) > 100) {
          errors.umur = 'Umur harus antara 1-100';
        }
        if (!data.jenisKelamin) errors.jenisKelamin = 'Pilih jenis kelamin';
        if (!data.sekolah.trim()) errors.sekolah = 'Kelas / Asal sekolah wajib diisi';
        if (!data.kota.trim()) errors.kota = 'Kota / Daerah wajib diisi';
        if (!data.whatsapp.trim()) errors.whatsapp = 'Nomor WhatsApp wajib diisi';
        else if (!/^[0-9+\-\s]{10,15}$/.test(data.whatsapp.trim())) {
          errors.whatsapp = 'Nomor WhatsApp tidak valid (10-15 digit)';
        }
        break;

      case 2:
        if (!data.sumberInfo) errors.sumberInfo = 'Pilih sumber informasi';
        if (!data.alasanGabung.trim()) errors.alasanGabung = 'Alasan bergabung wajib diisi';
        if (!data.yangInginDipelajari.trim()) errors.yangInginDipelajari = 'Yang ingin dipelajari wajib diisi';
        break;

      case 3:
        if (!data.astraMenurutKamu.trim()) errors.astraMenurutKamu = 'Wajib diisi';
        if (!data.kontribusi.trim()) errors.kontribusi = 'Wajib diisi';
        if (!data.siapAktif) errors.siapAktif = 'Pilih salah satu';
        break;

      case 4:
        if (!data.setujuAturan) errors.setujuAturan = 'Wajib dicentang';
        if (!data.setujuAktif) errors.setujuAktif = 'Wajib dicentang';
        if (!data.setujuTidakSpam) errors.setujuTidakSpam = 'Wajib dicentang';
        if (!data.setujuBelajar) errors.setujuBelajar = 'Wajib dicentang';
        break;

      case 5:
        // Step 5 is optional, no required validation
        break;
    }

    return errors;
  };

  const isStepValid = (step: FormStep, data: FormData): boolean => {
    return Object.keys(validateStep(step, data)).length === 0;
  };

  return { validateStep, isStepValid };
}
