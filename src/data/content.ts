// Tüm site metinleri tek yerde toplanır — içerik güncellemesi için tek dosya.
// Hero: "OkuGör Dijital Sepet" tanıtım PDF'i + kullanıcı düzeltmesi (barkod
// okuma artık ayrı bir tarayıcı değil, tabletin kamerası ile yapılıyor).
// Hakkımızda: reference/content-hakkimizda.md (gerçek metin).
// İletişim gövde metni şu an lorem ipsum — gerçek metin gelince bu dosyadan
// değiştirilecek.

import okuGorCardPhoto from "@/assets/oku-gor-card.jpg"
import okuGorGallery1 from "@/assets/oku-gor-gallery-1.jpg"
import okuGorGallery2 from "@/assets/oku-gor-gallery-2.jpg"
import okuGorGallery3 from "@/assets/oku-gor-gallery-3.jpg"
import okuGorGallery4 from "@/assets/oku-gor-gallery-4.jpg"

export const nav = [
  { href: "/projeler", label: "Projeler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const

export const hero = {
  eyebrow: "Swıftech ürünü",
  title: "Alışverişi Yeniden İcat Ettik: FLOW",
  subtitle:
    "Her gün milyonlarca insan, yüz yıllık hantal metal arabaları marketlerde sürükleyip bitmek bilmeyen kasa kuyruklarında zaman kaybediyor. Biz bugün bu ilkel deneyime son veriyoruz. FLOW, karmaşık teknolojileri arka planda saklayan akıllı kameraları, bütçenizi anında şeffaflaştıran minimalist ekranı ve kasa sırasını tamamen yok eden yapısıyla alışverişi pürüzsüz bir akışa dönüştürüyor. Mağazaya girin, ürünleri sepete bırakın ve sadece yürüyüp çıkın. Tüketiciye en değerli hazinesi olan 'zamanı' geri veren bu sihirli sadelik; markalara tam satın alma kararının verildiği an müşteriye ulaşan kişiselleştirilmiş bir reklam alanı, perakendecilere ise sepet ortalamasını zirveye taşıyan yeni bir medya gelir kapısı sunuyor.",
  primaryCta: "Demo Talep Et",
  secondaryCta: "Projeleri İncele",
}

export type Project = {
  slug: string
  title: string
  description: string
  image: string
  gallery: string[]
  detailBody: string
}

// Şu an tek gerçek proje var (Oku Gör). Yeni projeler netleşince bu diziye
// aynı şekilde eklenir — henüz var olmayan projeler için placeholder kart
// eklenmiyor.
export const projects: Project[] = [
  {
    slug: "oku-gor",
    title: "Oku Gör",
    description:
      "Market arabasına entegre, kamera ile barkod okuyan dijital sepet paneli — kasada bekleme yok.",
    image: okuGorCardPhoto,
    gallery: [okuGorGallery1, okuGorGallery2, okuGorGallery3, okuGorGallery4],
    detailBody:
      "Geliştirdiğimiz panel, standart bir market arabasına takılıyor ve arabayı bir \"hareketli akıllı kasaya\" dönüştürüyor. Müşteri ürünü sepete atarken barkodunu okutuyor, sepetini ve toplam tutarını anlık takip ediyor, alışverişini arabanın üzerinden ödeyip kasaya hiç uğramadan çıkıyor. Bu, mağaza içinde sürtünmesiz bir \"tara-ve-git\" deneyimidir.",
  },
]

export const about = {
  eyebrow: "Hakkımızda",
  intro:
    "2026 yılında kurulan Swıftech, alışveriş deneyimini dijitalleştirmek amacıyla yola çıkmış bir perakende teknolojisi şirketidir. Geliştirdiği dijital ekranlı akıllı sepet sistemi, müşterilere ürün fiyatını, toplam tutarı ve kampanyaları anlık olarak gösterir; ürün arama ve mağaza içi yönlendirme özellikleriyle alışverişi hızlandırır. " +

" Sistem, mağazalar için de güçlü bir araçtır: kampanyaları sepet ekranında öne çıkarır, satışı artırır ve müşteri alışkanlıklarına dair veri sunar. Ar-Ge ve yazılım süreçlerini kendi bünyesinde yürüten Swıftech, kurulumdan teknik desteğe uçtan uca hizmet sağlar." + 

" Yenilikçi teknolojisi ve müşteri odaklı yaklaşımıyla Swıftech, perakendenin geleceğini bugünden şekillendiriyor.",
}

export const iletisim = {
  eyebrow: "İletişim",
  intro:
    "Swıftech, perakendeye tek bir cihazla üç boyutta değer üretiyor: operasyonel verimlilik, veri ve yeni bir gelir kanalı. Mevcut altyapınıza kolayca entegre olan, ilk günden ölçülebilir sonuç veren bir teknoloji ortağı arıyorsanız, doğru yerdesiniz." + 
    "Mağazanız için nasıl bir fark yaratabileceğimizi konuşmak, size özel bir demo ve kurulum planı çıkarmak isteriz."
}

export const contactInterests = [
  { value: "perakendeci", label: "Perakendeci / İş Ortağı" },
  { value: "yatirimci", label: "Yatırımcı" },
  { value: "diger", label: "Diğer" },
] as const

export const contactInfo = {
  // TODO: Gerçek iletişim bilgileriyle güncellenecek.
  email: "info@swiftech.com",
  phone: "+90 (542) 772 26 91",
  address: "Halkalı Merkez Mah. Halkalı Cad No:281/2355 Ofis No:395/A, 34303 Küçükçekmece/İstanbul/Türkiye",
}

export const footer = {
  tagline: "Alışverişin yeni adresi.",
  company: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/projeler", label: "Projeler" },
    { href: "/iletisim", label: "İletişim" },
  ],
  social: [
    { href: "#", label: "LinkedIn" },
  ],
}
