/**
 * ============================================================================
 * CONTACT FORM — UI-only stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Client form with no backend. Prevents default submit so buyers can
 *   preview the UI; wire to Formspree / Resend / etc. later.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Replace the onSubmit handler with your form provider when ready.
 *   2. Keep labels and accessible attributes intact.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // UI-only stub — connect a form provider here when you are ready.
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>
      <Button type="submit">Send message</Button>
      <p className="text-xs text-muted-foreground">
        UI-only stub — submissions are not sent until you connect a form
        provider (documented in CUSTOMIZATION.md).
      </p>
    </form>
  )
}
