import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Reveal, RevealItem } from "@/components/motion/Reveal"
import { contactInfo, contactInterests, iletisim } from "@/data/content"

const schema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı"),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().trim().optional(),
  interest: z.enum(["perakendeci", "yatirimci", "diger"], "Lütfen bir ilgi alanı seçin"),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalı"),
  consent: z.literal(true, "Devam etmek için KVKK metnini onaylamalısınız"),
})

type ContactFormValues = z.infer<typeof schema>

export function Contact() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      consent: undefined as unknown as true,
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

    if (!accessKey) {
      toast.error(
        "Form gönderimi henüz yapılandırılmadı. VITE_WEB3FORMS_KEY .env.local dosyasına eklenmeli."
      )
      return
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "OkuGör Dijital Sepet — yeni demo talebi",
          from_name: "OkuGör Web Sitesi",
          ...values,
        }),
      })
      const result = await res.json()

      if (result.success) {
        toast.success("Talebiniz alındı, en kısa sürede size dönüş yapacağız.")
        reset()
      } else {
        toast.error("Gönderim başarısız oldu. Lütfen tekrar deneyin.")
      }
    } catch {
      toast.error("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.")
    }
  }

  return (
    <section
      id="iletisim"
      className="section-light relative overflow-hidden bg-background py-24 text-foreground sm:py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-h2">{iletisim.eyebrow}</h2>

        <div className="mt-12 grid gap-[2px] sm:mt-16 lg:grid-cols-5">
        <Reveal className="bg-card p-6 sm:p-8 lg:col-span-2">
          <RevealItem>
            <p className="text-body text-base">{iletisim.intro}</p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-body">
                <Mail className="size-4 text-lime" aria-hidden="true" />
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-3 text-body">
                <Phone className="size-4 text-lime" aria-hidden="true" />
                {contactInfo.phone}
              </li>
              <li className="flex items-center gap-3 text-body">
                <MapPin className="size-4 text-lime" aria-hidden="true" />
                {contactInfo.address}
              </li>
            </ul>
          </RevealItem>
        </Reveal>

        <Reveal className="bg-card lg:col-span-3">
          <RevealItem>
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field data-invalid={!!errors.name}>
                      <FieldLabel htmlFor="name">Ad Soyad</FieldLabel>
                      <Input id="name" autoComplete="name" {...register("name")} />
                      <FieldError errors={[errors.name]} />
                    </Field>

                    <Field data-invalid={!!errors.company}>
                      <FieldLabel htmlFor="company">Şirket (opsiyonel)</FieldLabel>
                      <Input id="company" autoComplete="organization" {...register("company")} />
                      <FieldError errors={[errors.company]} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field data-invalid={!!errors.email}>
                      <FieldLabel htmlFor="email">E-posta</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                      />
                      <FieldError errors={[errors.email]} />
                    </Field>

                    <Field data-invalid={!!errors.phone}>
                      <FieldLabel htmlFor="phone">Telefon (opsiyonel)</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        {...register("phone")}
                      />
                      <FieldError errors={[errors.phone]} />
                    </Field>
                  </div>

                  <Field data-invalid={!!errors.interest}>
                    <FieldLabel htmlFor="interest">İlgi Alanı</FieldLabel>
                    <Controller
                      name="interest"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="interest" className="w-full">
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactInterests.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.interest]} />
                  </Field>

                  <Field data-invalid={!!errors.message}>
                    <FieldLabel htmlFor="message">Mesaj</FieldLabel>
                    <Textarea id="message" rows={4} {...register("message")} />
                    <FieldError errors={[errors.message]} />
                  </Field>

                  <Field orientation="horizontal" data-invalid={!!errors.consent}>
                    <Controller
                      name="consent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="consent"
                          checked={field.value === true}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                      )}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor="consent" className="font-normal">
                        Kişisel verilerimin KVKK kapsamında işlenmesini kabul ediyorum.
                      </FieldLabel>
                      <FieldDescription>
                        Aydınlatma metni yakında bu alanda yayınlanacaktır.
                      </FieldDescription>
                      <FieldError errors={[errors.consent]} />
                    </FieldContent>
                  </Field>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {isSubmitting ? "Gönderiliyor…" : "Gönder"}
                  </Button>
                </FieldGroup>
              </form>
            </div>
          </RevealItem>
        </Reveal>
        </div>
      </div>
    </section>
  )
}

// Alt bölümde yer alan Contact, form kütüphanelerini (react-hook-form, zod,
// resolvers) taşır — lazy import ile ana bundle'ın dışında tutulur.
export default Contact
