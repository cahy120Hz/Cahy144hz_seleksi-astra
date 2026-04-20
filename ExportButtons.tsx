import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { MemberCardData } from '@/types/form';
import { FileImage, FileText, FileJson, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ExportButtonsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: MemberCardData;
}

export function ExportButtons({ cardRef, data }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<'png' | 'pdf' | 'json' | null>(null);

  const exportToPNG = async () => {
    if (!cardRef.current) return;
    setExporting('png');
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0520',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `astra-card-${data.namaLengkap || 'member'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('PNG export error:', err);
      alert('Gagal mengekspor PNG. Silakan coba lagi.');
    }
    setExporting(null);
  };

  const exportToPDF = async () => {
    if (!cardRef.current) return;
    setExporting('pdf');
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0520',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2;
      const y = 10;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`astra-card-${data.namaLengkap || 'member'}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Gagal mengekspor PDF. Silakan coba lagi.');
    }
    setExporting(null);
  };

  const exportToJSON = () => {
    setExporting('json');
    try {
      const jsonData = {
        namaLengkap: data.namaLengkap || '',
        namaPanggilan: data.namaPanggilan || '',
        umur: data.umur || '',
        jenisKelamin: data.jenisKelamin || '',
        sekolah: data.sekolah || '',
        kota: data.kota || '',
        whatsapp: data.whatsapp || '',
        tiktok: data.tiktok || '',
        sumber: data.sumberInfo || '',
        alasan: data.alasanGabung || '',
        pembelajaran: data.yangInginDipelajari || '',
        astraMenurutKamu: data.astraMenurutKamu || '',
        kontribusi: data.kontribusi || '',
        siapAktif: data.siapAktif || '',
        kesiapan: [
          data.setujuAturan ? 'Mengikuti aturan ASTRA' : '',
          data.setujuAktif ? 'Aktif berpartisipasi' : '',
          data.setujuTidakSpam ? 'Tidak melakukan spam' : '',
          data.setujuBelajar ? 'Terus belajar & berkembang' : '',
        ].filter(Boolean),
        sosialMedia: data.linkSosmed || '',
        nomorAnggota: data.nomorAnggota,
        tanggalDaftar: data.tanggalDaftar,
      };

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.download = `astra-data-${data.namaLengkap || 'member'}.json`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('JSON export error:', err);
      alert('Gagal mengekspor JSON. Silakan coba lagi.');
    }
    setExporting(null);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        onClick={exportToPNG}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #6C3BFF, #8B5CF6)',
          boxShadow: '0 0 20px rgba(108, 59, 255, 0.4)',
        }}
      >
        {exporting === 'png' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <FileImage size={16} />
        )}
        Download PNG
      </Button>

      <Button
        onClick={exportToPDF}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #00D4FF, #06B6D4)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
        }}
      >
        {exporting === 'pdf' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <FileText size={16} />
        )}
        Download PDF
      </Button>

      <Button
        onClick={exportToJSON}
        disabled={exporting !== null}
        variant="outline"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border-white/20 text-white hover:bg-white/10 transition-all duration-300"
      >
        {exporting === 'json' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <FileJson size={16} />
        )}
        Download JSON
      </Button>
    </div>
  );
}
