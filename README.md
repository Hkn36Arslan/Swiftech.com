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

## Cloudflare'e Deploy

Bu proje Cloudflare'in birleşik **Workers (Static Assets)** modeliyle deploy edilir — `wrangler.jsonc` içindeki `assets.directory` alanı `dist` klasörünü statik asset olarak sunar, ayrı bir Worker script'ine gerek yoktur. `not_found_handling: "single-page-application"` ayarı, bilinmeyen yolların `index.html`'e düşmesini sağlar (ileride client-side route eklenirse diye).

**Yol 1 — Dashboard + GitHub entegrasyonu (önerilen):** Workers & Pages → Create → bu repo'yu bağlayın. Build command: `npm run build`, deploy command otomatik olarak `npx wrangler deploy` çalışır (repo'da `wrangler.jsonc` bulunduğu için). `VITE_WEB3FORMS_KEY` ortam değişkenini proje ayarlarından ekleyin. Her push'ta otomatik deploy olur.

**Yol 2 — CLI:**

```bash
npx wrangler login
npm run deploy
```

`public/_headers` dosyası otomatik okunur ve temel güvenlik header'larını ekler.

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
