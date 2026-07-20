# Design System Reference
> Kaynak: DevTools inspect ile referans siteden çıkarılan gerçek CSS değerleri.
> Bu dosya, tüm tasarım kararlarının tek doğruluk kaynağıdır.

## Renk
```
--bg: #010101
--text: #ffffff
--accent: rgba(223, 241, 64, 1)   /* lime/sarı-yeşil — SADECE mikro etkileşim */
```
Kural: Site %95 monokrom (siyah/beyaz). Accent rengi büyük alan kaplamaz;
sadece hover altı çizgi, focus ring, ince CTA border, selection gibi
mikro noktalarda kullanılır.

## Grid
- 12 kolonlu CSS Grid, tüm layout'un temeli.
- Kart bileşenleri: `grid-column: span 4` (satırda 3 kart) veya
  `span 6` / `span 8` (asimetrik büyük+küçük kombinasyonları).
- Kartlar varsayılan olarak kare (1:1 aspect-ratio).
- Section içerikleri de aynı 12-kolonluk grid'e hizalanır.

## Şekil
```
border-radius: 2px   /* img, video, button, card — HEPSİNDE sabit */
```
Büyük radius (rounded-lg, rounded-xl, rounded-full vb.) kullanılmaz.

## Hareket / Animasyon
| Öğe | Davranış |
|---|---|
| Kart hover | iç görsel `scale(1.05)` civarı, kutu sabit, `.2s ease-out` |
| Görsel yükleme | `opacity: 0 → 1`, ~125ms fade-in |
| Header renk geçişi | `.3s ease-out` |
| Genel prensip | Her zaman yumuşak easing, asla sert/ani geçiş |

## Layout Ritmi
- Section'lar arası boşluk yok — geçiş doğrudan arkaplan rengi değişimiyle.
- Her section: `min-height: 100vh`.
- Header: `position: fixed`, sayfa başında şeffaf (`--backgroundOpacity: 0`,
  `pointer-events: none`), scroll'da frosted/blur'lu siyah zemine geçiş
  (`--backgroundOpacity: 1`, `--frosted: 1`).

## Tipografi
- Base font-size: `14px` (768px+ breakpoint).
- Nav / logo: geniş letter-spacing, uppercase, ince font-weight.
- Section başlıkları: büyük punto, normal ağırlık (bold değil), sans-serif.
- Kart üstü overlay başlıklar: orta punto, bold, sol-alt konumlu.
- Body/açıklama metni: küçük punto, düşük kontrastlı (soft gri).

## Sayfa Yapısı (referans site — tek sayfa)
1. Header (fixed, anchor-linkli nav)
2. Hero (full-bleed video/görsel, 16:9)
3. Öne çıkan büyük görsel bandı (tek satır, geniş)
4. Ürün/hizmet grid (3'lü eşit + asimetrik 2+1 kombinasyonu)
5. Büyük showcase (tek görsel + 2 sütun meta bilgi)
6. İçerik/haber section'ı (metin + görsel yan yana)
7. Story card'lar (2 sütun, renkli arkaplan bloklar, seri numarası pagination)
8. Footer (4 sütun: marka/copyright, Company, Work With Us, Social)

## Uygulama Kuralı
Yukarıdaki sistemde net veri **olmayan** bir bileşen tasarlanırken
**icat edilmez** — mevcut renk/grid/radius/animasyon/spacing kuralları
mantıksal olarak uzatılır. Her yeni bileşen aynı tasarım dilinden
çıkmış gibi hissettirmelidir.
