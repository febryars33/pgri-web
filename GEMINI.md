# Panduan AI Gemini - Website Resmi Sekolah (TypeScript & SOLID Edition)

Dokumen ini adalah instruksi dasar untuk agen AI dalam membantu pengembangan proyek website sekolah ini dengan standar kode tinggi.

## 1. Profil Teknologi (Tech Stack)

- **Backend**: Laravel 13.x (Wajib gunakan PHP 8.3+ Attributes untuk konfigurasi Eloquent jika memungkinkan)
- **Frontend Framework**: InertiaJS 3.x (React 19+, SSR aktif, tanpa Axios karena menggunakan Built-in XHR client bawaan Inertia v3)
- **Bahasa Frontend**: TypeScript 5.x (Strict mode aktif, hindari penggunaan `any`)
- **Bridge Routing**: Laravel Wayfinder (Gunakan fungsi _type-safe_ otomatis untuk memanggil endpoint backend di frontend)
- **UI Library**: Chakra UI 3.x (React components)
- **Pencarian**: Laravel Scout (Driver: `database` sebagai default)
- **Admin Panel**: Filament 5.x (Untuk modul kelola data sekolah)

## 2. Aturan Struktur & Penulisan Kode (Coding Style)

### Backend (Laravel 13 & Filament 5) - SOLID & Clean Code

- **Single Responsibility Principle (SRP)**: Kontroler wajib sangat ramping (_Skinny Controller_). Kontroler hanya bertugas menerima _request_, memanggil delegasi bisnis, dan mengembalikan respons.
- **Anti-Fat Controller**:
    - Validasi data wajib menggunakan **Form Request** terpisah (`php artisan make:request`).
    - Logika bisnis (proses kalkulasi, manipulasi data, integrasi pihak ketiga) wajib diekstraksi ke dalam kelas **Action** tunggal (`app/Actions/`).
    - Transfer data antar layer backend menggunakan struktur data yang jelas seperti kelas DTO (_Data Transfer Object_) jika kompleksitas meningkat.
- **Eloquent Attributes**: Gunakan fitur baru Laravel 13 PHP Attributes seperti `#[Table('...')]`, `#[Fillable([...])]`, dan `#[Hidden([...])]` pada Model Eloquent, alih-alih properti kelas klasik.
- **Filament**: Semua form administrasi, data guru, artikel, dan pendaftaran siswa harus dikelola via Filament 5 Resources.
- **Pencarian**: Untuk fitur pencarian artikel atau fasilitas sekolah, gunakan metode `searchable()` dari Laravel Scout.

### Frontend (Inertia 3, TypeScript 5 & Chakra UI 3)

- **Type Safety**: Semua file komponen React wajib menggunakan ekstensi `.tsx` dan mendefinisikan tipe data untuk setiap `props` secara eksplisit menggunakan `type` (hindari `interface`).
- **Inertia v3 Features**: Manfaatkan fitur baru Inertia v3 seperti _Optimistic Updates_ untuk interaksi cepat (misal: tombol _like_ artikel atau simpan _draft_).
- **Background Request**: Gunakan `useHttp` hook dari Inertia v3 jika membutuhkan _request_ latar belakang tanpa memicu navigasi halaman penuh.
- **Type-safe Routing**: Wajib menggunakan rute berbasis tipe dari **Laravel Wayfinder** saat melakukan _submit_ form atau mengambil data di komponen React agar _type-safe_ (contoh: `import { store } from "@/actions/..."; form.submit(store());`).
- **UI & Theme**: Desain antarmuka publik harus konsisten menggunakan komponen dasar dan _theming_ dari Chakra UI 3.

## 3. Perintah Penting Proyek (Commands)

- **Menjalankan Dev Server**: `npm run dev` (Inertia v3 otomatis menangani SSR selama development)
- **Mengecek Error TypeScript**: `npm run type-check` atau `tsc --noEmit`
- **Membangun Aset Produksi**: `npm run build && php artisan inertia:start-ssr`
- **Sinkronisasi Rute Wayfinder**: `php artisan wayfinder:generate` atau biarkan Vite plugin mendeteksinya otomatis saat dev.
- **Indeks Ulang Pencarian**: `php artisan scout:import`

## 4. Gaya Respons AI

- Berikan solusi kode backend yang memisahkan antara Form Request, Action Class, dan Controller (_Clean Code_ & _SOLID_).
- Berikan solusi kode frontend yang sepenuhnya menggunakan TypeScript yang valid, bermutu, dan _type-safe_.
- Integrasikan pemanggilan rute backend menggunakan fungsi bawaan dari Laravel Wayfinder.
- Jawab secara ringkas, padat, langsung pada fungsi teknis, dan menggunakan Bahasa Indonesia.

## 5. Prosedur Keamanan & Pembatasan Otonom (CRITICAL)

Untuk menjaga integritas proyek dan mencegah kerusakan data yang tidak disengaja, AI WAJIB mematuhi prosedur keamanan berikut:

-   **Human-in-the-Loop (Kontrol Manusia)**: AI DILARANG KERAS untuk mengeksekusi perintah terminal, modifikasi file berskala besar, atau tindakan signifikan lainnya secara otonom. Setiap tindakan yang berpotensi memiliki dampak permanen atau luas HARUS mendapatkan persetujuan eksplisit dan per baris perintah dari pengguna manusia.

-   **Definisi Tindakan Destruktif**: AI TIDAK BOLEH menjalankan, menyarankan, atau mengotomatisasi perintah berbahaya berikut tanpa konfirmasi manual dari pengguna, terlepas dari konteksnya:
    -   **Operasi Git yang Mengubah Sejarah/Data**: `git push --force`, `git push -f`, `git reset --hard`, `git clean -fdx`, atau `git rebase -i` yang dapat menghapus atau menimpa perubahan. Jika diperlukan, AI hanya BOLEH menyarankan `git push --force-with-lease` dan meminta pengguna untuk mengeksekusinya secara manual.
    -   **Operasi Sistem File yang Merusak**: Perintah penghapusan rekursif atau massal (`rm -rf`, `del /s /q`), pemindahan atau penulisan ulang file sistem kritis, atau operasi yang secara permanen menghapus data tanpa mekanisme pemulihan yang jelas.
    -   **Operasi Database Produksi**: Perintah database yang dapat menghapus, mereset, atau memodifikasi skema/data secara permanen pada lingkungan produksi atau database yang sensitif (contoh: `php artisan db:wipe`, `php artisan migrate:fresh`, `DROP TABLE`, `DELETE FROM` tanpa kondisi `WHERE` yang jelas). AI WAJIB mengidentifikasi apakah sebuah database adalah "produksi" dan menghentikan diri.

-   **Penanganan Lingkungan**: AI WAJIB secara eksplisit meminta konfirmasi dan menjelaskan risiko sebelum melakukan perubahan pada lingkungan yang dapat dianggap "produksi" atau "sensitif". Asumsikan semua lingkungan adalah produksi hingga dikonfirmasi sebaliknya oleh pengguna.

-   **Informasi Sensitif**: AI DILARANG KERAS untuk mengekspos, mencatat, atau melakukan commit informasi sensitif seperti kredensial, kunci API, atau data pribadi ke dalam repositori atau log.

-   **Prosedur Konfirmasi**: Jika tugas memerlukan salah satu tindakan yang tergolong "destruktif" di atas, AI WAJIB:
    1.  Berhenti dan tidak melanjutkan tindakan tersebut.
    2.  Menjelaskan secara detail mengapa tindakan tersebut dianggap berbahaya dan potensi risikonya.
    3.  Menampilkan perintah yang diperlukan dalam format blok teks yang mudah disalin, dan secara eksplisit meminta pengguna untuk mengeksekusinya secara manual jika mereka memahami dan menerima risikonya.
