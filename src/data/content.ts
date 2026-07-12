// Tüm site metinleri tek yerde toplanır — içerik güncellemesi için tek dosya.
// Kaynak: "OkuGör Dijital Sepet" tanıtım PDF'i + kullanıcı düzeltmesi
// (barkod okuma artık ayrı bir tarayıcı değil, tabletin kamerası ile yapılıyor).

export const nav = [
  { href: "#nasil-calisir", label: "Nasıl Çalışır" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#neden-okugor", label: "Neden OkuGör" },
  { href: "#iletisim", label: "İletişim" },
] as const

export const hero = {
  eyebrow: "Swiftech ürünü",
  title: "Alışverişin yeni adresi burada",
  subtitle:
    "OkuGör Dijital Sepet, sepetinize attığınız her ürünü anında ekranda gösterir, toplam tutarınızı gözünüzün önünde şekillendirir. Kamerayla barkodu okut, ekrana bak — bu kadar basit.",
  primaryCta: "Demo Talep Et",
  secondaryCta: "Özellikleri İncele",
}

export const problemSolution = {
  title: "Kasada bekleme yok, sürpriz yok",
  body: "OkuGör Dijital Sepet, alışveriş deneyimini baştan aşağı yeniden tasarlıyor. Sepetinize attığınız her ürün anında ekranda belirir, toplam tutarınız gözünüzün önünde şekillenir. Kamerayla barkodu okut, ekrana bak, bu kadar basit. Üstelik sistem sizi hiç yalnız bırakmaz; bir sorun olduğunda anında sizi uyarır. Kasaya geldiğinizde sürpriz yok, bekleme yok. Sadece akıllı, hızlı ve keyifli bir alışveriş.",
}

export const steps = [
  {
    title: "Sepete At",
    description: "Ürünü her zamanki gibi sepete koyun, ekstra bir işlem gerekmez.",
  },
  {
    title: "Kamerayla Okut",
    description: "Tabletin kendi kamerasıyla barkodu veya QR kodu okutun.",
  },
  {
    title: "Ekranda Anında Gör",
    description: "Ürün adı, adedi, görseli ve güncel sepet tutarı anında ekrana yansır.",
  },
  {
    title: "Kasada Beklemeden Çık",
    description: "Toplam tutar zaten belli — kasada sürpriz ya da uzun bekleyiş yok.",
  },
] as const

export type FeatureAlert = "info" | "success" | "warning"

export const features: {
  title: string
  description: string
  alert?: FeatureAlert
}[] = [
  {
    title: "7″ Tablet Ekran",
    description: "Sepete entegre, net ve okunaklı 7 inç dokunmatik ekran.",
  },
  {
    title: "Kamera ile Barkod Okuma",
    description: "Ayrı bir tarayıcı gerekmeden, tabletin kamerasıyla 1D/2D barkod ve QR kod okuma.",
  },
  {
    title: "Su Sıçramalarına Dayanıklı",
    description: "22 litrelik sert plastik gövde, günlük kullanım yıpranmasına karşı dayanıklı.",
  },
  {
    title: "Anlık Ürün Bilgisi",
    description: "Ürün adı, adet bilgisi ve ürün görseli ekranda anında görüntülenir.",
  },
  {
    title: "Sepet Toplam Tutarı",
    description: "Sepete eklenen her ürünle birlikte toplam tutar gerçek zamanlı güncellenir.",
  },
  {
    title: "Şarj ve Wi-Fi Durumu",
    description: "Tablet şarj düzeyi ve Wi-Fi bağlantı durumu her an ekranda.",
  },
  {
    title: "Sürekli API Bağlantısı",
    description: "Sunucu ile API üzerinden kesintisiz, gerçek zamanlı veri alışverişi.",
  },
  {
    title: "Bağlantı Hatası Uyarısı",
    description: "Veri çekme başarısız olduğunda kullanıcı otomatik olarak uyarılır.",
    alert: "warning",
  },
  {
    title: "Barkod Hatası Uyarısı",
    description: "Barkod/QR okuma başarısız olduğunda anında geri bildirim verilir.",
    alert: "warning",
  },
]

export const techSpecs = [
  { label: "Ekran boyutu", value: "7 inç dokunmatik tablet ekran" },
  { label: "Barkod okuma", value: "Kamera ile 1D ve 2D barkod desteği (QR kod dahil)" },
  { label: "Dayanıklılık", value: "Su sıçramalarına karşı dayanıklı gövde" },
  { label: "Sepet kapasitesi", value: "22 litre sert plastik alışveriş sepeti" },
  { label: "Ürün bilgisi", value: "Ürün adı, adet bilgisi ve ürün görseli" },
  { label: "Sepet tutarı", value: "Sepet toplam tutarı, anlık güncellenir" },
  { label: "Durum bilgisi", value: "Tablet şarj düzeyi ve Wi-Fi bağlantı durumu" },
  { label: "Veri iletişimi", value: "Sunucu ile API üzerinden sürekli veri alışverişi" },
  { label: "Bağlantı hatası", value: "Veri çekme başarısız olduğunda otomatik kullanıcı uyarısı" },
  { label: "Barkod hatası", value: "Kamera ile okuma başarısız olduğunda kullanıcı uyarısı" },
] as const

export const whyOkuGor = {
  retailer: {
    title: "Perakendeci için",
    items: [
      "Kasa önündeki yoğunluk ve bekleme süresi azalır",
      "Müşteri sepeti kasaya gelmeden önce hazır — checkout hızlanır",
      "Bağlantı ve okuma hatalarını anlık gösteren sistem, operasyonel sorunları erken yakalar",
    ],
  },
  customer: {
    title: "Müşteri için",
    items: [
      "Alışveriş boyunca toplam tutarı sürekli görür, kasada sürpriz yaşamaz",
      "Kamerayla barkod okutmak kadar basit, ekstra bir öğrenme gerekmez",
      "Kasada bekleme süresi kısalır, alışveriş daha keyifli hale gelir",
    ],
  },
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

export const footer = {
  tagline: "Alışverişin yeni adresi.",
}
