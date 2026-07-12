# OkuGör Dijital Sepet — Tanıtım Sitesi

Swiftech'in geliştirdiği OkuGör Dijital Sepet ürünü için tek sayfalık (SPA) tanıtım/pazarlama sitesi. Perakendeci ve yatırımcı ilgisi toplamayı hedefler.

**Stack:** Vite + React 19 + TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Framer Motion · react-hook-form + zod · Web3Forms · Cloudflare Pages

## Kurulum

```bash
npm install
cp .env.example .env.local   # VITE_WEB3FORMS_KEY değerini gir
npm run dev
```

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Tip kontrolü + production build (`dist/`) |
| `npm run preview` | Production build'i yerelde önizle |
| `npm run lint` | Oxlint |
| `npm run preview:cf` | Build'i Cloudflare Pages ortamını simüle ederek önizle (`wrangler pages dev`) |
| `npm run deploy` | Build al ve Wrangler ile Cloudflare Pages'e deploy et |

## İletişim Formu (Web3Forms)

Formun gerçekten e-posta göndermesi için [web3forms.com](https://web3forms.com) üzerinden ücretsiz bir "Access Key" alıp `.env.local` dosyasındaki `VITE_WEB3FORMS_KEY` değişkenine yapıştırın. Key girilmeden form denenirse kullanıcıya net bir uyarı gösterilir, sessizce başarısız olmaz.

## Cloudflare Pages'e Deploy

**Yol 1 — Dashboard (önerilen):** Cloudflare Pages'te bu repo'yu bağlayın. Build command: `npm run build`, output dizini: `dist`. `VITE_WEB3FORMS_KEY` ortam değişkenini Pages proje ayarlarından ekleyin. Her push'ta otomatik deploy olur.

**Yol 2 — CLI:**

```bash
npx wrangler login
npm run deploy
```

`wrangler.jsonc` proje adını ve build çıktı dizinini tanımlar. `public/_headers` dosyası Cloudflare Pages tarafından otomatik okunur ve temel güvenlik header'larını ekler. Site tek sayfa (anchor navigasyonlu) olduğu için ayrı bir `_redirects` kuralına gerek yok — Cloudflare Pages statik projelerde bilinmeyen yolları zaten `index.html`'e (200) düşürür; ileride client-side route eklenirse bu davranış otomatik devam eder.

## Proje Yapısı

```
src/
  data/content.ts        # Tüm Türkçe metinler tek dosyada
  components/
    layout/               # Header, Footer, Logo
    sections/              # Hero, ProblemSolution, HowItWorks, Features, TechSpecs, WhyOkuGor, Contact
    illustrations/         # ProductDiagram (imza SVG), GridGlow (arka plan)
    motion/Reveal.tsx      # Scroll-reveal sarmalayıcı
    ui/                     # shadcn/ui bileşenleri
```

## Yapılacaklar (TODO)

- [ ] Gerçek Web3Forms access key'i `.env.local`'e ekle
- [ ] `src/data/content.ts` içindeki `contactInfo` placeholder değerlerini gerçek e-posta/telefon/adres ile güncelle
- [ ] Gerçek ürün fotoğrafları ve Swiftech logo dosyaları geldiğinde `ProductDiagram` / `Logo` bileşenlerini güncelle
- [ ] KVKK aydınlatma metnini yazıp Contact formundaki `FieldDescription` alanına bağla
- [ ] Cloudflare Pages hesabına bağlayıp ilk canlı deploy'u yap
