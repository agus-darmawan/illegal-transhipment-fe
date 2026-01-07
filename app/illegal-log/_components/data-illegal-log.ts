export type IllegalLog = {
  id: string;
  nama_kapal: string;
  gt: number;
  kebangsaan: string;
  tgl_riksa: string;
  lintang: number;
  bujur: number;
  jumlah_awak_wni: number;
  jumlah_awak_wna: number;
  alkap: string;
  perairan: string;
  duga_langgar: string;
  tindak_lanjut: string;
  keterangan: string | null;
};

export const dataIllegalLogs: IllegalLog[] = [
  {
    id: "log-1",
    nama_kapal: "KM. LA GRACIA",
    gt: 30,
    kebangsaan: "Indonesia",
    tgl_riksa: "2017-01-28",
    lintang: 1.438833,
    bujur: 125.1581,
    jumlah_awak_wni: 20,
    jumlah_awak_wna: 0,
    alkap: "Purse Seine",
    perairan: "WPP-NRI 715",
    duga_langgar: "Pemalsuan Dokumen; Penggunaan ABK Asing",
    tindak_lanjut: "Dikawal ke Pangkalan PSDKP Bitung",
    keterangan: null,
  },
  {
    id: "log-2",
    nama_kapal: "KM. HIU 07",
    gt: 45,
    kebangsaan: "Indonesia",
    tgl_riksa: "2019-03-12",
    lintang: 1.4452,
    bujur: 125.1713,
    jumlah_awak_wni: 18,
    jumlah_awak_wna: 2,
    alkap: "Gill Net",
    perairan: "WPP-NRI 715",
    duga_langgar: "ABK Asing Tidak Terdaftar",
    tindak_lanjut: "Pemeriksaan Lanjutan",
    keterangan: "Dokumen kapal tidak lengkap",
  },
];
