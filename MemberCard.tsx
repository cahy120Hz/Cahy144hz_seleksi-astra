import { forwardRef } from 'react';
import type { MemberCardData } from '@/types/form';
import { User, Phone, School, MapPin, MessageCircle, Lightbulb, Heart, BookOpen, CheckCircle2, Link } from 'lucide-react';

interface MemberCardProps {
  data: MemberCardData;
}

export const MemberCard = forwardRef<HTMLDivElement, MemberCardProps>(({ data }, ref) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getKesiapanList = () => {
    const list = [];
    if (data.setujuAturan) list.push('Mengikuti aturan ASTRA');
    if (data.setujuAktif) list.push('Aktif berpartisipasi');
    if (data.setujuTidakSpam) list.push('Tidak melakukan spam');
    if (data.setujuBelajar) list.push('Terus belajar & berkembang');
    return list;
  };

  return (
    <div
      ref={ref}
      id="astraCard"
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 10, 60, 0.95), rgba(10, 5, 40, 0.98))',
        border: '1px solid rgba(108, 59, 255, 0.4)',
        boxShadow: '0 0 40px rgba(108, 59, 255, 0.2), inset 0 0 40px rgba(0, 212, 255, 0.05)',
      }}
    >
      {/* Header */}
      <div
        className="relative px-6 py-6 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(108, 59, 255, 0.3), rgba(0, 212, 255, 0.2))',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-30 blur-2xl"
          style={{ background: 'radial-gradient(circle, #6C3BFF, transparent)' }}
        />

        {/* Logo */}
        <img
          src="/assets/astra-logo.png"
          alt="ASTRA Logo"
          className="w-20 h-20 mx-auto mb-3 relative z-10"
          style={{ filter: 'drop-shadow(0 0 15px rgba(108, 59, 255, 0.6))' }}
        />

        <h3
          className="text-lg font-bold text-white relative z-10"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 15px rgba(108, 59, 255, 0.8)',
          }}
        >
          KARTU ANGGOTA ASTRA
        </h3>
        <p className="text-[#00D4FF] text-xs relative z-10 mt-1">
          ASTRA Community — Explore The Universe Together
        </p>
      </div>

      {/* Member Number Banner */}
      <div
        className="px-6 py-3 text-center"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(108, 59, 255, 0.2), transparent)',
          borderTop: '1px solid rgba(108, 59, 255, 0.3)',
          borderBottom: '1px solid rgba(108, 59, 255, 0.3)',
        }}
      >
        <p className="text-white/50 text-xs mb-1">Nomor Anggota</p>
        <p
          className="text-xl font-bold tracking-wider"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#00D4FF',
            textShadow: '0 0 15px rgba(0, 212, 255, 0.6)',
          }}
        >
          {data.nomorAnggota}
        </p>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-5 flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{
            border: '2px solid rgba(108, 59, 255, 0.5)',
            boxShadow: '0 0 15px rgba(108, 59, 255, 0.2)',
          }}
        >
          {data.fotoProfil && data.fotoProfil !== '' ? (
            <img src={data.fotoProfil} alt="Foto" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #6C3BFF, #00D4FF)',
                color: 'white',
                fontFamily: 'Orbitron, sans-serif',
              }}
            >
              {getInitials(data.namaLengkap || 'A')}
            </div>
          )}
        </div>

        {/* Name Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-lg truncate">{data.namaLengkap || '-'}</h4>
          <p className="text-[#00D4FF] text-sm">{data.namaPanggilan || '-'}</p>
          <p className="text-white/40 text-xs mt-1">{data.tanggalDaftar}</p>
        </div>
      </div>

      {/* Data Sections */}
      <div className="px-6 pb-5 space-y-4">
        {/* Data Diri */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h5 className="text-[#6C3BFF] text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <User size={12} /> Data Diri
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-white/40">Umur:</span>
              <span className="text-white ml-1">{data.umur || '-'} tahun</span>
            </div>
            <div>
              <span className="text-white/40">Gender:</span>
              <span className="text-white ml-1">{data.jenisKelamin || '-'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-white/40 flex items-center gap-1 mt-1">
                <School size={10} /> {data.sekolah || '-'}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-white/40 flex items-center gap-1 mt-1">
                <MapPin size={10} /> {data.kota || '-'}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-white/40 flex items-center gap-1 mt-1">
                <Phone size={10} /> {data.whatsapp || '-'}
              </span>
            </div>
            {data.tiktok && (
              <div className="col-span-2">
                <span className="text-white/40 flex items-center gap-1 mt-1">
                  <MessageCircle size={10} /> @{data.tiktok}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informasi */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h5 className="text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lightbulb size={12} /> Informasi
          </h5>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-white/40">Sumber:</span>
              <span className="text-white ml-1">{data.sumberInfo || '-'}</span>
            </div>
            <div>
              <span className="text-white/40 flex items-center gap-1">
                <Heart size={10} /> Alasan:
              </span>
              <p className="text-white/80 mt-1 leading-relaxed">{data.alasanGabung || '-'}</p>
            </div>
            <div>
              <span className="text-white/40 flex items-center gap-1">
                <BookOpen size={10} /> Ingin dipelajari:
              </span>
              <p className="text-white/80 mt-1 leading-relaxed">{data.yangInginDipelajari || '-'}</p>
            </div>
          </div>
        </div>

        {/* Seleksi */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h5 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 size={12} /> Hasil Seleksi
          </h5>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-white/40">Pengetahuan ASTRA:</span>
              <p className="text-white/80 mt-1 leading-relaxed">{data.astraMenurutKamu || '-'}</p>
            </div>
            <div>
              <span className="text-white/40">Kontribusi:</span>
              <p className="text-white/80 mt-1 leading-relaxed">{data.kontribusi || '-'}</p>
            </div>
            <div>
              <span className="text-white/40">Kesiapan:</span>
              <span className={`ml-1 font-medium ${data.siapAktif === 'Ya' ? 'text-green-400' : 'text-yellow-400'}`}>
                {data.siapAktif || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Kesediaan */}
        <div
          className="rounded-xl p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h5 className="text-green-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 size={12} /> Kesediaan
          </h5>
          <ul className="space-y-1">
            {getKesiapanList().map((item, i) => (
              <li key={i} className="text-white/70 text-xs flex items-center gap-2">
                <CheckCircle2 size={10} className="text-green-400 flex-shrink-0" />
                {item}
              </li>
            ))}
            {getKesiapanList().length === 0 && (
              <li className="text-white/40 text-xs">-</li>
            )}
          </ul>
        </div>

        {/* Link Sosmed */}
        {data.linkSosmed && (
          <div
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h5 className="text-[#00D4FF] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <Link size={12} /> Sosial Media
            </h5>
            <p className="text-white/70 text-xs break-all">{data.linkSosmed}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-6 py-4 text-center"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)',
          borderTop: '1px solid rgba(0, 212, 255, 0.2)',
        }}
      >
        <p className="text-white/30 text-xs">
          ASTRA Community — Explore The Universe Together
        </p>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';
