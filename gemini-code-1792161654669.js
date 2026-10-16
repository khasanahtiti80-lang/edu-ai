import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, FileText, CheckCircle2, Download, Printer, Edit3, Plus, Trash2, 
  RefreshCw, Sparkles, User, Settings, Layers, Award, BarChart2, Eye, ShieldCheck,
  ChevronRight, ArrowLeft, ArrowRight, Save, Layout, Check, AlertCircle, FileSpreadsheet
} from 'lucide-react';

// Default API Key dari Environment Variable atau Konfigurasi
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || ""; 

export default function LKPDSmartApp() {
  const [activeTab, setActiveTab] = useState('generator'); // 'landing', 'generator', 'dashboard', 'preview'
  const [docType, setDocType] = useState('full'); // 'full' (LKPD + Guru) atau 'evaluation' (Evaluasi Saja)
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: 'LKPD Praktikum Akuntansi Perusahaan Jasa',
    school: 'SMK Negeri 1 Yogyakarta',
    subject: 'Akuntansi Keuangan',
    grade: 'Fase F / Kelas XI',
    semester: 'Ganjil',
    topic: 'Pencatatan Transaksi Jurnal Umum dan Ledger',
    timeAllocation: '2 Pertemuan x 45 Menit',
    curriculum: 'Kurikulum Merdeka',
    targetAudience: 'SMK',
    learningModel: 'Problem-Based Learning (PBL)',
    activityType: 'Kelompok & Individu',
    difficulty: 'Sedang - HOTS',
    pertemuanCount: 2,
    additionalNotes: 'Sertakan contoh kasus transaksi nyata penjualan jasa salon dan pangkas rambut.'
  });

  // Generated Content State
  const [generatedData, setGeneratedData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const printRef = useRef();

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to call Gemini API
  const generateLKPD = async () => {
    setLoading(true);
    setLoadingText('Menganalisis Kurikulum & Menyusun Indikator...');

    const systemPrompt = `
    Anda adalah Pakar Kurikulum Pendidikan Indonesia dan Instruktur Pedagogi Senior.
    Tugas Anda adalah merancang ${docType === 'full' ? 'Lembar Kerja Peserta Didik (LKPD) Lengkap beserta Lampiran Guru' : 'Instrumen Evaluasi dan Penilaian Pembelajaran Lengkap'}.

    INPUT PENGGUNA:
    - Judul/Materi Pokok: ${formData.topic}
    - Satuan Pendidikan: ${formData.school} (${formData.targetAudience})
    - Mata Pelajaran/Kuliah: ${formData.subject}
    - Jenjang/Kelas/Semester: ${formData.grade} / ${formData.semester}
    - Kurikulum: ${formData.curriculum}
    - Alokasi Waktu: ${formData.timeAllocation}
    - Model Pembelajaran: ${formData.learningModel}
    - Tingkat Kesulitan: ${formData.difficulty}
    - Jumlah Pertemuan: ${formData.pertemuanCount}
    - Catatan Khusus: ${formData.additionalNotes}

    WAJIB Menghasilkan JSON TERTATA KETAT tanpa teks pengantar di luar JSON. Format JSON harus persis seperti struktur berikut:
    {
      "identitas": {
        "judul": "...",
        "satuanPendidikan": "...",
        "mataPelajaran": "...",
        "jenjangKelas": "...",
        "alokasiWaktu": "...",
        "modelPembelajaran": "..."
      },
      "kompetensiTabel": [
        {
          "capaianAwal": "...",
          "tujuanPembelajaran": "...",
          "indikatorKeberhasilan": "...",
          "materiTerkait": "..."
        }
      ],
      "tujuanPembelajaranDetail": ["..."],
      "petunjukBelajar": ["..."],
      "uraianMateri": {
        "pengantar": "...",
        "subMateri": [
          { "judulSub": "...", "isi": "...", "contohKasusAtauData": "..." }
        ]
      },
      "kegiatanPembelajaran": [
        {
          "pertemuanKe": 1,
          "tujuanKegiatan": "...",
          "petunjukPengerjaan": "...",
          "permasalahanAtauKasus": "...",
          "pertanyaanTugas": ["..."],
          "tabelKerjaSiswa": {
            "headers": ["No", "Tanggal", "Keterangan / Transaksi", "Ref / Akun", "Debit (Rp)", "Kredit (Rp)"],
            "rowsSample": [
              ["1", "01/10/2026", "Kas disetor pemilik modal", "", "", ""],
              ["2", "03/10/2026", "Pembelian perlengkapan tunai", "", "", ""]
            ]
          }
        }
      ],
      "refleksiDanKesimpulan": {
        "pertanyaanRefleksi": ["..."],
        "kolomKesimpulan": "..."
      },
      "lampiranGuru": {
        "kunciJawaban": [
          { "nomorSoalOrAktivitas": "Tugas Pertemuan 1", "kunciJawabanDetail": "..." }
        ],
        "kisiKisiPengetahuan": [
          {
            "capaian": "...",
            "indikatorSoal": "...",
            "bentukSoal": "Uraian / Praktik",
            "nomorSoal": "1",
            "levelKognitif": "C4 (Analisis)"
          }
        ],
        "rubrikPengetahuan": [
          {
            "nomor": "1",
            "aspekKriteria": "...",
            "skorMaksimal": 25,
            "pedomanPenskoran": "Skor 25 jika analisis tepat dan jurnal seimbang; Skor 10 jika ada kesalahan debit/kredit."
          }
        ],
        "rubrikKeterampilan": [
          {
            "aspekKeterampilan": "Penyusunan Lembar Kerja",
            "indikator": "Kerapian & Keteptan Angka",
            "skorMaks": 20,
            "kriteriaDetail": "Skor 20: Tepat & Rapi. Skor 10: Kurang Rapi."
          }
        ],
        "penilaianSikapProses": [
          {
            "aspekSikap": "Kerja Sama & Tanggung Jawab",
            "skala": "1 - 4",
            "deskripsi": "4: Sangat Aktif, 3: Aktif, 2: Cukup, 1: Kurang"
          }
        ],
        "pedomanPenskoranTotal": {
          "rumusNilai": "Nilai Akhir = (Total Skor Diperoleh / Total Skor Maksimal 100) * 100",
          "bobotPengetahuan": "40%",
          "bobotKeterampilan": "60%",
          "remedialDanPengayaan": "Remedial untuk nilai < 75; Pengayaan membuat analisis variansi transaksi kompleks."
        }
      }
    }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }]
        })
      });

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Clean JSON Response
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setGeneratedData(parsed);
        setActiveTab('preview');
      } else {
        alert("Gagal memproses struktur JSON dari AI. Silakan coba lagi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi saat memanggil Gemini API. Pastikan API Key valid.");
    } finally {
      setLoading(false);
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Export to Word Document (.doc)
  const exportToWord = () => {
    const content = printRef.current.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>LKPD SMART Document</title>"+
      "<style>body{font-family:Arial, sans-serif; font-size:11pt;} table{border-collapse:collapse; width:100%;} td, th{border:1px solid #000; padding:6px;}</style>"+
      "</head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${formData.title.replace(/\s+/g, '_')}_LKPD.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans print:bg-white print:m-0">
      
      {/* NAVBAR (Hidden when printing) */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-yellow-300"/>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LKPD SMART AI</h1>
              <p className="text-xs text-blue-200">Generator LKPD & Evaluasi Pembelajaran Komprehensif</p>
            </div>
          </div>

          <nav className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('generator')} 
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'generator' ? 'bg-white text-blue-900 shadow' : 'hover:bg-white/10'}`}
            >
              Buat LKPD / Evaluasi
            </button>
            {generatedData && (
              <button 
                onClick={() => setActiveTab('preview')} 
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'preview' ? 'bg-white text-blue-900 shadow' : 'hover:bg-white/10'}`}
              >
                Pratinjau Dokumen
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-8 print:p-0 print:max-w-full">

        {/* LOADING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-400 mb-4"/>
            <h3 className="text-xl font-semibold">{loadingText}</h3>
            <p className="text-sm text-slate-300 mt-2">Menyusun materi, instrumen evaluasi, kisi-kisi, dan rubrik penilaian...</p>
          </div>
        )}

        {/* TAB 1: FORM GENERATOR */}
        {activeTab === 'generator' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400"/> Form Perancangan LKPD & Evaluasi
              </h2>
              <p className="text-slate-400 text-sm mt-1">Lengkapi data berikut untuk menghasilkan dokumen pembelajaran utuh & siap cetak.</p>
            </div>

            <div className="p-8 space-y-6">

              {/* Mode Selection */}
              <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDocType('full')}
                  className={`py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${docType === 'full' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-600'}`}
                >
                  <Layers className="w-4 h-4"/> LKPD Lengkap + Lampiran Guru
                </button>
                <button
                  type="button"
                  onClick={() => setDocType('evaluation')}
                  className={`py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${docType === 'evaluation' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-600'}`}
                >
                  <Award className="w-4 h-4"/> Instrumen Evaluasi & Rubrik Saja
                </button>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Materi Pokok / Judul Topik</label>
                  <input 
                    type="text" 
                    name="topic" 
                    value={formData.topic} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Contoh: Jurnal Umum Akuntansi Jasa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Satuan Pendidikan</label>
                  <input 
                    type="text" 
                    name="school" 
                    value={formData.school} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mata Pelajaran / Mata Kuliah</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jenjang & Kelas / Semester</label>
                  <input 
                    type="text" 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kurikulum</label>
                  <select 
                    name="curriculum" 
                    value={formData.curriculum} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Kurikulum Merdeka">Kurikulum Merdeka (Capaian Pembelajaran)</option>
                    <option value="Kurikulum 2013">Kurikulum 2013 (Kompetensi Dasar)</option>
                    <option value="Perguruan Tinggi / OBE">Perguruan Tinggi (CPMK / Sub-CPMK)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Model Pembelajaran</label>
                  <select 
                    name="learningModel" 
                    value={formData.learningModel} 
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Problem-Based Learning (PBL)">Problem-Based Learning (PBL)</option>
                    <option value="Project-Based Learning (PjBL)">Project-Based Learning (PjBL)</option>
                    <option value="Discovery / Inquiry Learning">Discovery / Inquiry Learning</option>
                    <option value="Direct Instruction">Direct Instruction & Praktikum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alokasi Waktu</label>
                  <input 
                    type="text" 
                    name="timeAllocation" 
                    value={formData.timeAllocation} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jumlah Pertemuan</label>
                  <input 
                    type="number" 
                    name="pertemuanCount" 
                    value={formData.pertemuanCount} 
                    onChange={handleInputChange} 
                    min="1" max="5"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Tambahan / Konteks Khusus</label>
                <textarea 
                  name="additionalNotes" 
                  value={formData.additionalNotes} 
                  onChange={handleInputChange} 
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="Tambahkan petunjuk khusus, misal: Sertakan format tabel jurnal akuntansi lengkap atau soal berbasis HOTS..."
                ></textarea>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button 
                  onClick={generateLKPD}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300"/> Buat Dokumen LKPD AI
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: DOCUMENT PREVIEW & PRINT READY A4 */}
        {activeTab === 'preview' && generatedData && (
          <div className="space-y-6">

            {/* ACTION BAR (Hidden when printing) */}
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md flex flex-wrap justify-between items-center gap-4 print:hidden">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveTab('generator')} 
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5"/>
                </button>
                <div>
                  <h3 className="font-bold text-sm">Pratinjau Dokumen Siap Cetak</h3>
                  <p className="text-xs text-slate-400">Format A4 Standar - Terstruktur & Lengkap</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={exportToWord}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow"
                >
                  <FileSpreadsheet className="w-4 h-4"/> Unduh Word (.doc)
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow"
                >
                  <Printer className="w-4 h-4"/> Cetak / Simpan PDF
                </button>
              </div>
            </div>

            {/* DOCUMENT BODY (A4 FORMATED) */}
            <div 
              ref={printRef} 
              className="bg-white mx-auto p-12 max-w-[210mm] min-h-[297mm] shadow-2xl border border-slate-300 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-full text-slate-900 text-sm leading-relaxed"
            >
              
              {/* HALAMAN 1: IDENTITAS */}
              <div className="border-b-4 border-slate-900 pb-4 mb-6">
                <h1 className="text-2xl font-black text-center uppercase tracking-wide text-slate-900 mb-1">
                  LEMBAR KERJA PESERTA DIDIK (LKPD)
                </h1>
                <p className="text-center font-bold text-slate-700 uppercase tracking-wider text-xs">
                  {generatedData.identitas.satuanPendidikan} - TAHUN AJARAN 2026/2027
                </p>
              </div>

              {/* IDENTITAS TABEL */}
              <table className="w-full mb-6 border-collapse text-xs">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="py-1.5 font-bold w-36">Mata Pelajaran/Kuliah</td>
                    <td className="py-1.5">: {generatedData.identitas.mataPelajaran}</td>
                    <td className="py-1.5 font-bold w-28">Nama Kelompok</td>
                    <td className="py-1.5">: .....................................</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-1.5 font-bold">Jenjang / Kelas</td>
                    <td className="py-1.5">: {generatedData.identitas.jenjangKelas}</td>
                    <td className="py-1.5 font-bold">Nama Anggota</td>
                    <td className="py-1.5">: 1. ...................................</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-1.5 font-bold">Materi Pokok</td>
                    <td className="py-1.5">: {generatedData.identitas.judul}</td>
                    <td className="py-1.5 font-bold"></td>
                    <td className="py-1.5">&nbsp; 2. ...................................</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold">Alokasi Waktu</td>
                    <td className="py-1.5">: {generatedData.identitas.alokasiWaktu}</td>
                    <td className="py-1.5 font-bold"></td>
                    <td className="py-1.5">&nbsp; 3. ...................................</td>
                  </tr>
                </tbody>
              </table>

              {/* SEKSI 1: TABEL KOMPETENSI & INDIKATOR */}
              <div className="mb-6">
                <h2 className="font-bold text-base text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 uppercase">
                  A. Capaian, Tujuan & Indikator Pembelajaran
                </h2>
                <table className="w-full border border-slate-800 text-xs text-left">
                  <thead className="bg-slate-100 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 border-r border-slate-800">Capaian / Kompetensi</th>
                      <th className="p-2 border-r border-slate-800">Tujuan Pembelajaran</th>
                      <th className="p-2 border-r border-slate-800">Indikator Keberhasilan</th>
                      <th className="p-2">Materi Terkait</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedData.kompetensiTabel?.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-300">
                        <td className="p-2 border-r border-slate-800 align-top">{item.capaianAwal}</td>
                        <td className="p-2 border-r border-slate-800 align-top">{item.tujuanPembelajaran}</td>
                        <td className="p-2 border-r border-slate-800 align-top">{item.indikatorKeberhasilan}</td>
                        <td className="p-2 align-top">{item.materiTerkait}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SEKSI 2: PETUNJUK BELAJAR */}
              <div className="mb-6">
                <h2 className="font-bold text-base text-slate-900 border-b-2 border-slate-800 pb-1 mb-2 uppercase">
                  B. Petunjuk Penggunaan LKPD
                </h2>
                <ol className="list-decimal list-inside space-y-1 text-slate-800 text-xs pl-2">
                  {generatedData.petunjukBelajar?.map((petunjuk, i) => (
                    <li key={i}>{petunjuk}</li>
                  ))}
                </ol>
              </div>

              {/* SEKSI 3: URAIAN MATERI MENDALAM */}
              <div className="mb-6">
                <h2 className="font-bold text-base text-slate-900 border-b-2 border-slate-800 pb-1 mb-2 uppercase">
                  C. Uraian Materi & Konsep Dasar
                </h2>
                <p className="text-xs mb-3 text-justify leading-relaxed">{generatedData.uraianMateri?.pengantar}</p>

                {generatedData.uraianMateri?.subMateri?.map((sub, i) => (
                  <div key={i} className="mb-3 bg-slate-50 p-3 rounded border border-slate-200">
                    <h3 className="font-bold text-xs text-slate-900 mb-1">{i + 1}. {sub.judulSub}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed mb-2">{sub.isi}</p>
                    {sub.contohKasusAtauData && (
                      <div className="bg-white p-2 border-l-2 border-blue-600 text-xs italic text-slate-800">
                        <strong>Contoh / Data Transaksi:</strong> <br />
                        {sub.contohKasusAtauData}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* SEKSI 4: KEGIATAN & TABEL LEMBAR KERJA */}
              <div className="mb-6">
                <h2 className="font-bold text-base text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 uppercase">
                  D. Kegiatan Pembelajaran & Lembar Kerja Siswa
                </h2>

                {generatedData.kegiatanPembelajaran?.map((keg, idx) => (
                  <div key={idx} className="mb-6 border border-slate-400 p-4 rounded-lg">
                    <h3 className="font-bold text-sm bg-slate-900 text-white px-3 py-1 inline-block mb-3">
                      Pertemuan Ke-{keg.pertemuanKe}: {keg.tujuanKegiatan}
                    </h3>

                    <p className="text-xs text-slate-700 mb-2"><strong>Petunjuk:</strong> {keg.petunjukPengerjaan}</p>
                    
                    <div className="bg-yellow-50 p-3 border border-yellow-300 rounded mb-4 text-xs">
                      <strong>Kasus / Permasalahan:</strong>
                      <p className="mt-1 leading-relaxed">{keg.permasalahanAtauKasus}</p>
                    </div>

                    <p className="font-bold text-xs mb-2">Tugas & Pertanyaan Analisis:</p>
                    <ul className="list-disc list-inside text-xs space-y-1 mb-4 pl-2">
                      {keg.pertanyaanTugas?.map((q, qIdx) => (
                        <li key={qIdx}>{q}</li>
                      ))}
                    </ul>

                    {/* TABEL KERJA SISWA */}
                    {keg.tabelKerjaSiswa && (
                      <div className="mt-4">
                        <p className="font-bold text-xs mb-1">Lembar Kerja / Tabel Analisis Siswa:</p>
                        <table className="w-full border border-slate-800 text-xs">
                          <thead className="bg-slate-200 font-bold border-b border-slate-800">
                            <tr>
                              {keg.tabelKerjaSiswa.headers?.map((h, hIdx) => (
                                <th key={hIdx} className="p-2 border-r border-slate-800 text-center">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {keg.tabelKerjaSiswa.rowsSample?.map((r, rIdx) => (
                              <tr key={rIdx} className="border-b border-slate-400 min-h-[30px]">
                                {r.map((c, cIdx) => (
                                  <td key={cIdx} className="p-2 border-r border-slate-400">{c}</td>
                                ))}
                              </tr>
                            ))}
                            {/* Empty rows for student filling */}
                            {[1, 2, 3].map((emptyRow) => (
                              <tr key={`empty-${emptyRow}`} className="border-b border-slate-300 h-8">
                                {keg.tabelKerjaSiswa.headers?.map((_, cIdx) => (
                                  <td key={cIdx} className="border-r border-slate-300"></td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* SEKSI 5: REFLEKSI & KESIMPULAN */}
              <div className="mb-8">
                <h2 className="font-bold text-base text-slate-900 border-b-2 border-slate-800 pb-1 mb-2 uppercase">
                  E. Refleksi & Kesimpulan Siswa
                </h2>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="font-semibold mb-1">Pertanyaan Refleksi Diri:</p>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {generatedData.refleksiDanKesimpulan?.pertanyaanRefleksi?.map((ref, rI) => (
                        <li key={rI}>{ref}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">Ruang Kesimpulan Belajar Siswa:</p>
                    <div className="border border-slate-400 rounded h-24 p-2 text-slate-400 italic">
                      Tuliskan kesimpulan utama pembelajaran Anda di sini...
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE BREAK UNTUK LAMPIRAN GURU */}
              <div className="page-break print:page-break-before my-8 border-t-4 border-dashed border-slate-400 pt-6">
                <div className="bg-slate-900 text-white text-center py-2 px-4 rounded font-bold tracking-widest text-sm uppercase mb-6">
                  LAMPIRAN KHUSUS GURU & INSTRUMEN PENILAIAN
                </div>

                {/* 1. KUNCI JAWABAN */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm border-b border-slate-800 pb-1 mb-2">1. Kunci Jawaban & Pedoman Output</h3>
                  <div className="space-y-2">
                    {generatedData.lampiranGuru?.kunciJawaban?.map((kunci, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 border rounded text-xs">
                        <span className="font-bold text-blue-900">{kunci.nomorSoalOrAktivitas}:</span>
                        <p className="mt-1 text-slate-800">{kunci.kunciJawabanDetail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. KISI-KISI PENILAIAN PENGETAHUAN */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm border-b border-slate-800 pb-1 mb-2">2. Kisi-Kisi Assessment Pengetahuan</h3>
                  <table className="w-full border border-slate-800 text-xs">
                    <thead className="bg-slate-100 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5 border-r border-slate-800">Capaian / KD</th>
                        <th className="p-1.5 border-r border-slate-800">Indikator Soal</th>
                        <th className="p-1.5 border-r border-slate-800">Bentuk</th>
                        <th className="p-1.5 border-r border-slate-800">No. Soal</th>
                        <th className="p-1.5">Level Kognitif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedData.lampiranGuru?.kisiKisiPengetahuan?.map((kisi, idx) => (
                        <tr key={idx} className="border-b border-slate-300">
                          <td className="p-1.5 border-r border-slate-800">{kisi.capaian}</td>
                          <td className="p-1.5 border-r border-slate-800">{kisi.indikatorSoal}</td>
                          <td className="p-1.5 border-r border-slate-800 text-center">{kisi.bentukSoal}</td>
                          <td className="p-1.5 border-r border-slate-800 text-center">{kisi.nomorSoal}</td>
                          <td className="p-1.5 text-center">{kisi.levelKognitif}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 3. RUBRIK PENILAIAN PENGETAHUAN */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm border-b border-slate-800 pb-1 mb-2">3. Rubrik Penilaian Pengetahuan</h3>
                  <table className="w-full border border-slate-800 text-xs">
                    <thead className="bg-slate-100 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5 border-r border-slate-800 w-12 text-center">No</th>
                        <th className="p-1.5 border-r border-slate-800">Aspek / Kriteria</th>
                        <th className="p-1.5 border-r border-slate-800">Skor Maks</th>
                        <th className="p-1.5">Pedoman Penskoran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedData.lampiranGuru?.rubrikPengetahuan?.map((rubrik, idx) => (
                        <tr key={idx} className="border-b border-slate-300">
                          <td className="p-1.5 border-r border-slate-800 text-center">{rubrik.nomor}</td>
                          <td className="p-1.5 border-r border-slate-800 font-semibold">{rubrik.aspekKriteria}</td>
                          <td className="p-1.5 border-r border-slate-800 text-center">{rubrik.skorMaksimal}</td>
                          <td className="p-1.5">{rubrik.pedomanPenskoran}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 4. RUBRIK KETERAMPILAN */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm border-b border-slate-800 pb-1 mb-2">4. Rubrik Assessment Keterampilan / Unjuk Kerja</h3>
                  <table className="w-full border border-slate-800 text-xs">
                    <thead className="bg-slate-100 font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-1.5 border-r border-slate-800">Aspek Keterampilan</th>
                        <th className="p-1.5 border-r border-slate-800">Indikator</th>
                        <th className="p-1.5 border-r border-slate-800">Skor Maks</th>
                        <th className="p-1.5">Kriteria Penskoran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedData.lampiranGuru?.rubrikKeterampilan?.map((rubK, idx) => (
                        <tr key={idx} className="border-b border-slate-300">
                          <td className="p-1.5 border-r border-slate-800 font-semibold">{rubK.aspekKeterampilan}</td>
                          <td className="p-1.5 border-r border-slate-800">{rubK.indikator}</td>
                          <td className="p-1.5 border-r border-slate-800 text-center">{rubK.skorMaks}</td>
                          <td className="p-1.5">{rubK.kriteriaDetail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. PEDOMAN PENSKORAN & TINDAK LANJUT */}
                <div className="bg-slate-50 p-4 border border-slate-300 rounded text-xs space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-1">5. Rumus Perhitungan Nilai & Tindak Lanjut</h3>
                  <p><strong>Rumus Nilai Akhir:</strong> {generatedData.lampiranGuru?.pedomanPenskoranTotal?.rumusNilai}</p>
                  <div className="flex gap-4">
                    <p><strong>Bobot Pengetahuan:</strong> {generatedData.lampiranGuru?.pedomanPenskoranTotal?.bobotPengetahuan}</p>
                    <p><strong>Bobot Keterampilan:</strong> {generatedData.lampiranGuru?.pedomanPenskoranTotal?.bobotKeterampilan}</p>
                  </div>
                  <p><strong>Rencana Remedial & Pengayaan:</strong> {generatedData.lampiranGuru?.pedomanPenskoranTotal?.remedialDanPengayaan}</p>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}