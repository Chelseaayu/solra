# Solra

**"You've always known. Let's find it together."**

Solra adalah platform self-discovery berbasis AI yang menggunakan percakapan mendalam — bukan tes pilihan ganda — untuk membantu pengguna memahami diri mereka sendiri.

## Fitur

- **Self-Discovery Mode**: Percakapan mendalam yang menghasilkan profil personal yang bisa di-download sebagai PNG
- **Safe Space Mode**: Teman curhat AI yang empatik dan non-judgmental, dengan disclaimer otomatis
- **Knowledge Page**: Artikel tentang mengenal diri, Ikigai, Values Clarification, dll
- **Profile Card**: Hasil sesi self-discovery bisa disave sebagai gambar dan dibagikan

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI (gemini-1.5-flash)
- html2canvas (untuk export PNG)
- Deployed ke Vercel

## Setup Lokal

### 1. Install dependencies
```bash
npm install
```

### 2. Konfigurasi API Key
Edit file `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

Dapatkan API key gratis di: https://aistudio.google.com

### 3. Jalankan development server
```bash
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

1. Push ke GitHub
2. Import project di vercel.com
3. Tambahkan environment variable: `GEMINI_API_KEY`
4. Deploy

## Struktur Project

```
solra/
├── app/
│   ├── page.tsx          # Landing page
│   ├── chat/
│   │   └── page.tsx      # Chat interface (Self-Discovery & Safe Space)
│   ├── knowledge/
│   │   └── page.tsx      # Knowledge articles
│   ├── components/
│   │   └── ProfileCard.tsx  # Profile card + PNG export
│   └── api/
│       └── chat/
│           └── route.ts  # Gemini API handler
└── .env.local            # API keys (jangan di-commit)
```
