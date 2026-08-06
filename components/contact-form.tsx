/**
 * ============================================================================
 * CONTACT FORM — client component (validation + submit state)
 * ============================================================================
 *
 * WHAT THIS IS:
 *   The only client component on /contact. Handles inline validation, a
 *   pending state, and a success panel. There is no backend by default.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Wire it up by replacing the body of `sendInquiry` below with your
 *      provider (Formspree, Getform, Resend + a route handler, ...).
 *   2. Edit all copy in config/site.ts → contactPage.form.
 *   3. Delete `form.stubNote` in config/site.ts once a provider is connected.
 *   4. Keep the label / aria wiring intact — it is what makes the form
 *      accessible to screen readers.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type FormValues = {
  name: string
  email: string
  projectType: string
  message: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Please add your name."
  }
  if (!values.email.trim()) {
    errors.email = "Please add an email address."
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn’t look right."
  }
  if (values.message.trim().length < 10) {
    errors.message = "A sentence or two is enough to get started."
  }
  if (!values.consent) {
    errors.consent = "Please confirm I can reply by email."
  }

  return errors
}

/**
 * Replace this with a real submission. Example (Formspree):
 *
 *   await fetch("https://formspree.io/f/YOUR_ID", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(values),
 *   })
 */
async function sendInquiry(values: FormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  console.info("[contact-form] demo submission", values)
}

const FIELD_CLASS =
  "border-zinc-200 bg-white placeholder:text-zinc-400 focus-visible:ring-offset-0"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs text-destructive">
      {message}
    </p>
  )
}

export function ContactForm() {
  const copy = siteConfig.contactPage.form
  const [values, setValues] = React.useState<FormValues>({
    name: "",
    email: "",
    projectType: copy.projectTypes[0] ?? "",
    message: "",
    consent: false,
  })
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus("submitting")
    try {
      await sendInquiry(values)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-zinc-200 bg-zinc-50/60 px-6 py-10 text-center"
      >
        <CheckCircle2
          className="mx-auto h-8 w-8 text-brand"
          aria-hidden="true"
        />
        <p className="mt-4 text-base font-semibold text-zinc-950">
          {copy.successTitle}
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
          {copy.successMessage}
        </p>
      </div>
    )
  }

  const isSubmitting = status === "submitting"

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="contact-name" className="text-zinc-950">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Jane Cooper"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(FIELD_CLASS, errors.name && "border-destructive")}
        />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email" className="text-zinc-950">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="jane@company.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(FIELD_CLASS, errors.email && "border-destructive")}
        />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-type" className="text-zinc-950">
          {copy.projectTypeLabel}
        </Label>
        <select
          id="contact-type"
          name="projectType"
          value={values.projectType}
          onChange={(event) => update("projectType", event.target.value)}
          className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copy.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-zinc-950">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="A few lines about the project, the timeline, and what you need help with."
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(FIELD_CLASS, errors.message && "border-destructive")}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? "contact-consent-error" : undefined
            }
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 accent-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Label
            htmlFor="contact-consent"
            className="text-sm font-normal leading-relaxed text-zinc-500"
          >
            {copy.consentLabel}
          </Label>
        </div>
        <FieldError id="contact-consent-error" message={errors.consent} />
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-zinc-950 py-5 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
        </Button>
      </div>

      <p aria-live="polite" className="min-h-[1rem] text-xs text-destructive">
        {status === "error"
          ? "Something went wrong sending your message. Please email me instead."
          : ""}
      </p>

      {copy.stubNote ? (
        <p className="text-xs text-zinc-400">{copy.stubNote}</p>
      ) : null}
    </form>
  )
}
