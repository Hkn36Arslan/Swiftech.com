// Tüm site metinleri tek yerde toplanır — içerik güncellemesi için tek dosya.
// Hero: "OkuGör Dijital Sepet" tanıtım PDF'i + kullanıcı düzeltmesi (barkod
// okuma artık ayrı bir tarayıcı değil, tabletin kamerası ile yapılıyor).
// Hakkımızda: reference/content-hakkimizda.md (gerçek metin).
// İletişim/Kariyer gövde metinleri şu an lorem ipsum — gerçek metin gelince
// bu dosyadan değiştirilecek.

import okuGorCardPhoto from "@/assets/oku-gor-card.jpg"

export const nav = [
  { href: "#projeler", label: "Projeler" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
  { href: "#kariyer", label: "Kariyer" },
] as const

export const hero = {
  eyebrow: "Swiftech ürünü",
  title: "Alışverişin yeni adresi burada",
  subtitle:
    "OkuGör Dijital Sepet, sepetinize attığınız her ürünü anında ekranda gösterir, toplam tutarınızı gözünüzün önünde şekillendirir. Kamerayla barkodu okut, ekrana bak — bu kadar basit.",
  primaryCta: "Demo Talep Et",
  secondaryCta: "Projeleri İncele",
}

export type Project = {
  slug: string
  title: string
  description: string
  href: string
  placeholder: boolean
  span: "featured" | "half"
  image?: string
}

export const projects: Project[] = [
  {
    slug: "oku-gor",
    title: "Oku Gör",
    description:
      "Market arabasına entegre, kamera ile barkod okuyan dijital sepet paneli — kasada bekleme yok.",
    href: "#hero",
    placeholder: false,
    span: "featured",
    image: okuGorCardPhoto,
  },
  {
    slug: "proje-2",
    title: "Proje 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "#",
    placeholder: true,
    span: "half",
  },
  {
    slug: "proje-3",
    title: "Proje 3",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    href: "#",
    placeholder: true,
    span: "half",
  },
]

export const about = {
  eyebrow: "Hakkımızda",
  intro:
    "Swiftech, perakendenin en büyük operasyonel sorunlarından birini çözmek için kurulmuş bir perakende teknolojisi şirketidir: kasa. Kasa kuyruğu, hem müşteri memnuniyetini düşüren hem de marketlerin personel maliyetini artıran, on yıllardır çözülmemiş bir darboğazdır. Biz bu darboğazı, mevcut market arabalarına entegre ettiğimiz akıllı panel teknolojisiyle ortadan kaldırıyoruz.",
  cards: [
    {
      lead: "Ne yapıyoruz.",
      body:
        "Geliştirdiğimiz panel, standart bir market arabasına takılıyor ve arabayı bir \"hareketli akıllı kasaya\" dönüştürüyor. Müşteri ürünü sepete atarken barkodunu okutuyor, sepetini ve toplam tutarını anlık takip ediyor, alışverişini arabanın üzerinden ödeyip kasaya hiç uğramadan çıkıyor. Bu, mağaza içinde sürtünmesiz bir \"tara-ve-git\" deneyimidir.",
    },
    {
      lead: "Neden savunulabilir bir teknoloji.",
      body:
        "Bu pazarda asıl zorluk tarama değil, kayıp önlemedir. Swiftech, sepete konan her ürünün okutulan ve ödenen ürünle eşleştiğini çok katmanlı bir doğrulama mimarisiyle güvence altına alıyor: barkod okuma, ağırlık doğrulama, bilgisayarlı görü ve davranış analizi birlikte çalışıyor. Bu katmanların entegrasyonu, kolayca kopyalanamayan ve şirketin asıl teknolojik değerini oluşturan yapıdır.",
    },
    {
      lead: "Neden ölçeklenebilir bir iş modeli.",
      body:
        "Panelimiz mevcut arabalara sonradan takıldığı için market, filosunu yenilemek zorunda kalmıyor. Bu, rakip çözümlerin en büyük engeli olan yüksek kurulum maliyetini ortadan kaldırıyor; benimsemeyi hızlandırıyor ve teknolojiyi yalnızca büyük zincirlerin değil, orta ölçekli perakendenin de erişebileceği bir noktaya taşıyor. Donanımın yanında, abonelik bazlı yazılım ve veri hizmetleriyle tekrar eden gelir modeli kuruyoruz.",
    },
    {
      lead: "Donanımın ötesinde: veri.",
      body:
        "Her panel aynı zamanda bir veri toplama noktasıdır. Müşteri davranışı, kampanya etkinliği ve satış örüntüleri hakkında marketin bugüne kadar erişemediği veriyi, aksiyon alınabilir bir analitik katmanına dönüştürüyoruz. Ayrıca ekran, mağaza içi reklam ve kişiselleştirilmiş kampanyalar için yeni bir gelir kanalı yaratıyor. Böylece tek bir cihaz üç iş modeline hizmet ediyor: operasyonel verimlilik, veri ve perakende medyası.",
    },
    {
      lead: "Pazar.",
      body:
        "Küresel akıllı perakende ve sürtünmesiz alışveriş pazarı, artan personel maliyetleri ve değişen tüketici beklentileriyle hızla büyüyor. Swiftech, bu büyümenin en pratik ve en hızlı benimsenebilir giriş noktasında konumlanıyor: pahalı mağaza yenileme projeleri değil, mevcut altyapıya takılan, ilk günden değer üreten bir çözüm.",
    },
    {
      lead: "Ekip ve yaklaşım.",
      body:
        "Swiftech'i mühendislik disipliniyle yönetiyoruz. Bir çözümün ne kadar hızlı sahaya çıktığı kadar, sahada ne kadar istikrarlı çalıştığıyla da ölçülüyoruz; çünkü perakende, kesintiyi affetmeyen bir sektördür. Adımızdaki \"swift\" hem müşteriye kazandırdığımız hızı hem de pazara çıkış disiplinimizi ifade eder.",
    },
  ],
  closing:
    "Swiftech, alışverişin en verimsiz anını ortadan kaldırıyor ve bunu yaparken perakendeye operasyon, veri ve gelir olmak üzere üç boyutta değer üretiyor.",
}

export const iletisim = {
  eyebrow: "İletişim",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nunc ut aliquam laoreet, elit velit fermentum enim, id ullamcorper nibh justo sed nulla. Praesent sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
}

export const contactInterests = [
  { value: "perakendeci", label: "Perakendeci / İş Ortağı" },
  { value: "yatirimci", label: "Yatırımcı" },
  { value: "diger", label: "Diğer" },
] as const

export const contactInfo = {
  // TODO: Gerçek iletişim bilgileriyle güncellenecek.
  email: "info@swiftech.com",
  phone: "+90 (000) 000 00 00",
  address: "Adres bilgisi eklenecek",
}

export const kariyer = {
  eyebrow: "Kariyer",
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  positions: [
    {
      index: "01",
      title: "Açık Pozisyon",
      body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      index: "02",
      title: "Açık Pozisyon",
      body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
}

export const footer = {
  tagline: "Alışverişin yeni adresi.",
  company: [
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#projeler", label: "Projeler" },
  ],
  joinUs: [
    { href: "#kariyer", label: "Kariyer" },
    { href: "#iletisim", label: "İletişim" },
  ],
  social: [
    { href: "#", label: "LinkedIn" },
    { href: "#", label: "Instagram" },
    { href: "#", label: "X" },
  ],
}
