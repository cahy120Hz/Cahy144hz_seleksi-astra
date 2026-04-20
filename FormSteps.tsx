import type { FormData } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  School,
  MapPin,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Heart,
  CheckCircle2,
  Upload,
  Link,
} from 'lucide-react';

interface StepProps {
  data: FormData;
  updateData: (field: keyof FormData, value: string | boolean) => void;
  errors: Record<string, string>;
}

const inputClasses =
  'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 rounded-xl h-12 transition-all duration-300';
const textareaClasses =
  'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D4FF] focus:ring-[#00D4FF]/20 rounded-xl min-h-[100px] transition-all duration-300 resize-none';
const labelClasses = 'text-white/80 text-sm font-medium mb-2 flex items-center gap-2';
const errorClasses = 'text-red-400 text-xs mt-1 ml-1';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

// ─── STEP 1: DATA DIRI ───
export function Step1DataDiri({ data, updateData, errors }: StepProps) {
  return (
    <motion.div {...fadeInUp} className="space-y-5">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
          }}
        >
          Data Diri
        </h2>
        <p className="text-white/50 text-sm">Lengkapi informasi dirimu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className={labelClasses}>
            <User size={14} className="text-[#6C3BFF]" /> Nama Lengkap
          </Label>
          <Input
            className={inputClasses}
            placeholder="Masukkan nama lengkap"
            value={data.namaLengkap}
            onChange={(e) => updateData('namaLengkap', e.target.value)}
          />
          {errors.namaLengkap && <p className={errorClasses}>{errors.namaLengkap}</p>}
        </div>

        <div>
          <Label className={labelClasses}>
            <User size={14} className="text-[#6C3BFF]" /> Nama Panggilan
          </Label>
          <Input
            className={inputClasses}
            placeholder="Nama panggilanmu"
            value={data.namaPanggilan}
            onChange={(e) => updateData('namaPanggilan', e.target.value)}
          />
          {errors.namaPanggilan && <p className={errorClasses}>{errors.namaPanggilan}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className={labelClasses}>
            <BookOpen size={14} className="text-[#6C3BFF]" /> Umur
          </Label>
          <Input
            className={inputClasses}
            type="number"
            placeholder="Umur kamu"
            value={data.umur}
            onChange={(e) => updateData('umur', e.target.value)}
          />
          {errors.umur && <p className={errorClasses}>{errors.umur}</p>}
        </div>

        <div>
          <Label className={labelClasses}>
            <User size={14} className="text-[#6C3BFF]" /> Jenis Kelamin
          </Label>
          <Select value={data.jenisKelamin} onValueChange={(v) => updateData('jenisKelamin', v)}>
            <SelectTrigger className={inputClasses}>
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a4e] border-white/10">
              <SelectItem value="Laki-laki" className="text-white hover:bg-white/10 focus:bg-white/10">
                Laki-laki
              </SelectItem>
              <SelectItem value="Perempuan" className="text-white hover:bg-white/10 focus:bg-white/10">
                Perempuan
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.jenisKelamin && <p className={errorClasses}>{errors.jenisKelamin}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className={labelClasses}>
            <School size={14} className="text-[#6C3BFF]" /> Kelas / Asal Sekolah
          </Label>
          <Input
            className={inputClasses}
            placeholder="Contoh: Kelas 10 SMA Negeri 1"
            value={data.sekolah}
            onChange={(e) => updateData('sekolah', e.target.value)}
          />
          {errors.sekolah && <p className={errorClasses}>{errors.sekolah}</p>}
        </div>

        <div>
          <Label className={labelClasses}>
            <MapPin size={14} className="text-[#6C3BFF]" /> Kota / Daerah
          </Label>
          <Input
            className={inputClasses}
            placeholder="Kota atau daerahmu"
            value={data.kota}
            onChange={(e) => updateData('kota', e.target.value)}
          />
          {errors.kota && <p className={errorClasses}>{errors.kota}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className={labelClasses}>
            <Phone size={14} className="text-[#6C3BFF]" /> Nomor WhatsApp Aktif
          </Label>
          <Input
            className={inputClasses}
            placeholder="Contoh: 081234567890"
            value={data.whatsapp}
            onChange={(e) => updateData('whatsapp', e.target.value)}
          />
          {errors.whatsapp && <p className={errorClasses}>{errors.whatsapp}</p>}
        </div>

        <div>
          <Label className={labelClasses}>
            <MessageCircle size={14} className="text-[#00D4FF]" /> Username TikTok{' '}
            <span className="text-white/30 text-xs">(opsional)</span>
          </Label>
          <Input
            className={inputClasses}
            placeholder="@username"
            value={data.tiktok}
            onChange={(e) => updateData('tiktok', e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── STEP 2: INFORMASI ───
export function Step2Informasi({ data, updateData, errors }: StepProps) {
  return (
    <motion.div {...fadeInUp} className="space-y-5">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
          }}
        >
          Informasi
        </h2>
        <p className="text-white/50 text-sm">Ceritakan tentang dirimu</p>
      </div>

      <div>
        <Label className={labelClasses}>
          <Lightbulb size={14} className="text-[#6C3BFF]" /> Dari mana kamu tahu ASTRA?
        </Label>
        <Select value={data.sumberInfo} onValueChange={(v) => updateData('sumberInfo', v)}>
          <SelectTrigger className={inputClasses}>
            <SelectValue placeholder="Pilih sumber informasi" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a4e] border-white/10">
            <SelectItem value="WhatsApp" className="text-white hover:bg-white/10 focus:bg-white/10">
              WhatsApp
            </SelectItem>
            <SelectItem value="Teman" className="text-white hover:bg-white/10 focus:bg-white/10">
              Teman
            </SelectItem>
            <SelectItem value="Status WhatsApp" className="text-white hover:bg-white/10 focus:bg-white/10">
              Status WhatsApp
            </SelectItem>
            <SelectItem value="Grup Komunitas" className="text-white hover:bg-white/10 focus:bg-white/10">
              Grup Komunitas
            </SelectItem>
            <SelectItem value="Lainnya" className="text-white hover:bg-white/10 focus:bg-white/10">
              Lainnya
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.sumberInfo && <p className={errorClasses}>{errors.sumberInfo}</p>}
      </div>

      <div>
        <Label className={labelClasses}>
          <Heart size={14} className="text-[#6C3BFF]" /> Kenapa kamu ingin bergabung dengan ASTRA?
        </Label>
        <Textarea
          className={textareaClasses}
          placeholder="Ceritakan alasan dan motivasimu bergabung..."
          value={data.alasanGabung}
          onChange={(e) => updateData('alasanGabung', e.target.value)}
        />
        {errors.alasanGabung && <p className={errorClasses}>{errors.alasanGabung}</p>}
      </div>

      <div>
        <Label className={labelClasses}>
          <BookOpen size={14} className="text-[#6C3BFF]" /> Apa yang ingin kamu pelajari di ASTRA?
        </Label>
        <Textarea
          className={textareaClasses}
          placeholder="Sebutkan hal-hal yang ingin kamu pelajari..."
          value={data.yangInginDipelajari}
          onChange={(e) => updateData('yangInginDipelajari', e.target.value)}
        />
        {errors.yangInginDipelajari && <p className={errorClasses}>{errors.yangInginDipelajari}</p>}
      </div>
    </motion.div>
  );
}

// ─── STEP 3: SELEKSI ASTRA ───
export function Step3Seleksi({ data, updateData, errors }: StepProps) {
  return (
    <motion.div {...fadeInUp} className="space-y-5">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
          }}
        >
          Seleksi ASTRA
        </h2>
        <p className="text-white/50 text-sm">Uji pengetahuan dan komitmenmu</p>
      </div>

      <div className="bg-[#6C3BFF]/10 border border-[#6C3BFF]/30 rounded-xl p-4 mb-4">
        <p className="text-[#00D4FF] text-sm font-medium mb-1">Pertanyaan Seleksi</p>
        <p className="text-white/60 text-xs">
          Jawablah pertanyaan-pertanyaan berikut dengan jujur dan sesuai pemikiranmu.
        </p>
      </div>

      <div>
        <Label className={labelClasses}>
          <Lightbulb size={14} className="text-[#6C3BFF]" /> Apa yang kamu ketahui tentang ASTRA?
        </Label>
        <Textarea
          className={textareaClasses}
          placeholder="Ceritakan pemahamanmu tentang ASTRA..."
          value={data.astraMenurutKamu}
          onChange={(e) => updateData('astraMenurutKamu', e.target.value)}
        />
        {errors.astraMenurutKamu && <p className={errorClasses}>{errors.astraMenurutKamu}</p>}
      </div>

      <div>
        <Label className={labelClasses}>
          <Heart size={14} className="text-[#6C3BFF]" /> Jika diterima, kontribusi apa yang akan kamu berikan?
        </Label>
        <Textarea
          className={textareaClasses}
          placeholder="Ceritakan kontribusi yang bisa kamu berikan..."
          value={data.kontribusi}
          onChange={(e) => updateData('kontribusi', e.target.value)}
        />
        {errors.kontribusi && <p className={errorClasses}>{errors.kontribusi}</p>}
      </div>

      <div>
        <Label className={labelClasses}>
          <CheckCircle2 size={14} className="text-[#6C3BFF]" /> Apakah kamu siap aktif di grup ASTRA?
        </Label>
        <Select value={data.siapAktif} onValueChange={(v) => updateData('siapAktif', v)}>
          <SelectTrigger className={inputClasses}>
            <SelectValue placeholder="Pilih jawaban" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a4e] border-white/10">
            <SelectItem value="Ya" className="text-white hover:bg-white/10 focus:bg-white/10">
              Ya, Saya Siap!
            </SelectItem>
            <SelectItem value="Tidak" className="text-white hover:bg-white/10 focus:bg-white/10">
              Belum Siap
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.siapAktif && <p className={errorClasses}>{errors.siapAktif}</p>}
      </div>
    </motion.div>
  );
}

// ─── STEP 4: KESEDIAAN ───
export function Step4Kesediaan({ data, updateData, errors }: StepProps) {
  const checkboxes = [
    {
      key: 'setujuAturan' as const,
      label: 'Saya bersedia mengikuti aturan dan tata tertib yang berlaku di ASTRA',
    },
    {
      key: 'setujuAktif' as const,
      label: 'Saya bersedia aktif berpartisipasi dalam setiap kegiatan ASTRA',
    },
    {
      key: 'setujuTidakSpam' as const,
      label: 'Saya bersedia untuk tidak melakukan spam di grup komunitas',
    },
    {
      key: 'setujuBelajar' as const,
      label: 'Saya bersedia untuk terus belajar dan berkembang bersama ASTRA',
    },
  ];

  return (
    <motion.div {...fadeInUp} className="space-y-5">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
          }}
        >
          Kesediaan
        </h2>
        <p className="text-white/50 text-sm">Konfirmasi komitmenmu</p>
      </div>

      <div className="bg-gradient-to-r from-[#6C3BFF]/20 to-[#00D4FF]/20 border border-white/10 rounded-xl p-5 space-y-4">
        <p className="text-white/70 text-sm mb-4">
          Centang semua pernyataan berikut untuk melanjutkan:
        </p>

        {checkboxes.map((item, index) => (
          <motion.label
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              data[item.key]
                ? 'bg-[#6C3BFF]/20 border-[#6C3BFF]/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <input
              type="checkbox"
              checked={data[item.key]}
              onChange={(e) => updateData(item.key, e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-white/30 bg-white/5 text-[#6C3BFF] focus:ring-[#6C3BFF]/30 cursor-pointer"
            />
            <span className="text-white/80 text-sm leading-relaxed">{item.label}</span>
          </motion.label>
        ))}
      </div>

      {(errors.setujuAturan || errors.setujuAktif || errors.setujuTidakSpam || errors.setujuBelajar) && (
        <p className={errorClasses}>Semua pernyataan wajib dicentang</p>
      )}
    </motion.div>
  );
}

// ─── STEP 5: FOTO & TAMBAHAN ───
export function Step5Tambahan({ data, updateData }: StepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          updateData('fotoProfil', ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div {...fadeInUp} className="space-y-5">
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 20px rgba(108, 59, 255, 0.5)',
          }}
        >
          Tambahan
        </h2>
        <p className="text-white/50 text-sm">Upload foto profil & link sosial media (opsional)</p>
      </div>

      {/* Foto Profil Upload */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-dashed border-[#6C3BFF]/50 flex items-center justify-center cursor-pointer hover:border-[#00D4FF] transition-all duration-300 group"
          style={{
            boxShadow: data.fotoProfil ? '0 0 30px rgba(108, 59, 255, 0.3)' : 'none',
          }}
          onClick={() => document.getElementById('foto-upload')?.click()}
        >
          {data.fotoProfil ? (
            <img
              src={data.fotoProfil}
              alt="Foto Profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-white/40 group-hover:text-[#00D4FF] transition-colors">
              <Upload size={32} />
              <span className="text-xs mt-2">Upload Foto</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
            <Upload size={24} className="text-white" />
          </div>
        </div>
        <input
          id="foto-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-white/40 text-xs mt-3">Klik untuk upload foto profil</p>
        {data.fotoProfil && (
          <button
            onClick={() => updateData('fotoProfil', '')}
            className="text-red-400 text-xs mt-2 hover:text-red-300 transition-colors"
          >
            Hapus foto
          </button>
        )}
      </div>

      <div>
        <Label className={labelClasses}>
          <Link size={14} className="text-[#00D4FF]" /> Link Sosial Media{' '}
          <span className="text-white/30 text-xs">(opsional)</span>
        </Label>
        <Input
          className={inputClasses}
          placeholder="Contoh: https://instagram.com/username"
          value={data.linkSosmed}
          onChange={(e) => updateData('linkSosmed', e.target.value)}
        />
      </div>
    </motion.div>
  );
}
