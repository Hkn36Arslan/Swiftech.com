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

const contactRows = [
  { icon: Mail, label: "E-posta", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: "Telefon", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Adres", value: contactInfo.address, href: undefined },
] as const

const inputClass = "h-11"

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
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <RevealItem>
                <h2 className="text-h1">{iletisim.eyebrow}</h2>
              </RevealItem>
              <RevealItem>
                <p className="text-body mt-6 max-w-md text-base">{iletisim.intro}</p>
              </RevealItem>
            </Reveal>

            <Reveal className="mt-12 flex flex-col gap-5">
              {contactRows.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center border text-foreground transition-colors duration-[var(--duration-base)] group-hover:border-foreground/40 group-hover:bg-foreground/5">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="text-caption block uppercase tracking-wide">{label}</span>
                      <span className="text-base">{value}</span>
                    </span>
                  </>
                )
                return (
                  <RevealItem key={label}>
                    {href ? (
                      <a href={href} className="group flex items-center gap-4">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </RevealItem>
                )
              })}
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <RevealItem>
              <div className="border p-6 sm:p-10">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <FieldGroup className="gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field data-invalid={!!errors.name}>
                        <FieldLabel htmlFor="name">Ad Soyad</FieldLabel>
                        <Input
                          id="name"
                          autoComplete="name"
                          className={inputClass}
                          {...register("name")}
                        />
                        <FieldError errors={[errors.name]} />
                      </Field>

                      <Field data-invalid={!!errors.company}>
                        <FieldLabel htmlFor="company">Şirket (opsiyonel)</FieldLabel>
                        <Input
                          id="company"
                          autoComplete="organization"
                          className={inputClass}
                          {...register("company")}
                        />
                        <FieldError errors={[errors.company]} />
                      </Field>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field data-invalid={!!errors.email}>
                        <FieldLabel htmlFor="email">E-posta</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          className={inputClass}
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
                          className={inputClass}
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
                            <SelectTrigger id="interest" className="h-11 w-full">
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
                      <Textarea id="message" rows={5} {...register("message")} />
                      <FieldError errors={[errors.message]} />
                    </Field>

                    <div className="border-t pt-6">
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

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="mt-6 h-12 w-full sm:w-auto"
                      >
                        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                        {isSubmitting ? "Gönderiliyor…" : "Gönder"}
                      </Button>
                    </div>
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
