export interface FormData {
  // Step 1 - Data Diri
  namaLengkap: string;
  namaPanggilan: string;
  umur: string;
  jenisKelamin: string;
  sekolah: string;
  kota: string;
  whatsapp: string;
  tiktok: string;

  // Step 2 - Informasi
  sumberInfo: string;
  alasanGabung: string;
  yangInginDipelajari: string;

  // Step 3 - Pengetahuan ASTRA
  astraMenurutKamu: string;
  kontribusi: string;
  siapAktif: string;

  // Step 4 - Kesediaan
  setujuAturan: boolean;
  setujuAktif: boolean;
  setujuTidakSpam: boolean;
  setujuBelajar: boolean;

  // Step 5 - Foto & Tambahan
  fotoProfil: string;
  linkSosmed: string;
}

export interface MemberCardData extends FormData {
  nomorAnggota: string;
  tanggalDaftar: string;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;

export const INITIAL_FORM_DATA: FormData = {
  namaLengkap: '',
  namaPanggilan: '',
  umur: '',
  jenisKelamin: '',
  sekolah: '',
  kota: '',
  whatsapp: '',
  tiktok: '',
  sumberInfo: '',
  alasanGabung: '',
  yangInginDipelajari: '',
  astraMenurutKamu: '',
  kontribusi: '',
  siapAktif: '',
  setujuAturan: false,
  setujuAktif: false,
  setujuTidakSpam: false,
  setujuBelajar: false,
  fotoProfil: '',
  linkSosmed: '',
};
