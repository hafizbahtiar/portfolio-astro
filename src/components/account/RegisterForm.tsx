import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";
import { authService } from "../../lib/auth";
import { createTurnstile } from "../../lib/turnstile";

// mode "resend" (from /login: ?resend=1) asks only for the email and re-sends the link.
export function RegisterForm({ siteKey, mode }: { siteKey: string; mode: "register" | "resend" }) {
  const resend = mode === "resend";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const turnstile = useRef<ReturnType<typeof createTurnstile> | null>(null);

  useEffect(() => {
    turnstile.current = createTurnstile("turnstile-register", siteKey, "register");
  }, [siteKey]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const email = form.email.trim();
    if (!email || (!resend && (!form.name.trim() || form.password.length < 12))) {
      setError(resend ? "Enter your email." : "Fill in your name, email and a password of at least 12 characters.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const captchaToken = siteKey ? await turnstile.current!.execute() : "";
      if (siteKey && !captchaToken) throw new Error("captcha");
      if (resend) await authService.resendVerification(email, captchaToken || undefined);
      else await authService.register({ email, password: form.password, name: form.name.trim(), captchaToken: captchaToken || undefined });
      // Same answer whether or not the email exists - the API never says.
      setSentTo(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      const status = (err as { status?: number })?.status;
      setError(
        message.toLowerCase().includes("captcha") ? "Spam check failed. Please reload the page and try again."
          : status === 429 ? "Too many attempts. Please wait a minute."
            : status === 400 && message ? message.replace(/^\w+: /, "")
              : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
      turnstile.current?.reset();
    }
  };

  if (sentTo) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
          <p className="text-sm text-balance text-gray-600 dark:text-gray-400">
            If {sentTo} can be registered, a confirmation link is on its way. It expires in 24 hours.
          </p>
        </div>
        <div>
          <Button asChild variant="outline" className="w-full"><a href="/login">Back to sign in</a></Button>
        </div>
      </div>
    );
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{resend ? "Resend confirmation" : "Create an account"}</h1>
        <p className="text-sm text-balance text-gray-600 dark:text-gray-400">
          {resend ? "We'll send the confirmation link again." : "Write blog posts and share quotes. Posts go live straight away and are moderated."}
        </p>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="grid gap-4">
          {error && (
            <Alert variant="destructive" aria-live="polite"><AlertDescription>{error}</AlertDescription></Alert>
          )}
          {!resend && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" autoComplete="name" maxLength={100} placeholder="How your name appears on posts" value={form.name} onChange={set("name")} required />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
          </div>
          {!resend && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" minLength={12} placeholder="At least 12 characters" value={form.password} onChange={set("password")} required />
            </div>
          )}
          {siteKey && <div id="turnstile-register" className="flex justify-center" />}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Sending..." : resend ? "Send link" : "Create account"}
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <a href="/login" className="font-medium text-sky-600 hover:underline dark:text-sky-400">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  );
}
