import React, { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";
import { authService } from "../../lib/auth";
import { PASSWORD_MIN, PasswordStrength } from "./PasswordStrength";

// Landing page for the reset email. Like VerifyEmail, the token is dropped from the
// address bar once read and only ever POSTed.
export function ResetPasswordForm() {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(new URLSearchParams(location.search).get("token"));
    history.replaceState(history.state, "", location.pathname);
  }, []);

  const submit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (busy || !token) return;
    if (password.length < PASSWORD_MIN) return setError(`Use at least 12 characters (${password.length} now).`);
    if (password !== confirm) return setError("Passwords don't match.");
    setBusy(true);
    setError(null);
    try {
      await authService.resetPassword(token, password);
      // Every session was ended - including a stale one in this browser.
      authService.clearAuthState();
      setDone(true);
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 400 && (err as { data?: { field?: string } })?.data?.field !== "password") setToken(null);
      else setError(status === 429 ? "Too many attempts. Please wait a minute." : "Couldn't set the password. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (token === undefined) return null;

  if (done || token === null) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{done ? "Password updated" : "Link not valid"}</h1>
          <p className="text-sm text-balance text-muted-foreground">
            {done ? "Sign in with your new password. You were signed out everywhere else." : "This link is invalid or has expired."}
          </p>
        </div>
        <div>
          {done
            ? <Button asChild className="w-full"><a href="/login">Sign in</a></Button>
            : <Button asChild variant="outline" className="w-full"><a href="/forgot-password">Send a new link</a></Button>}
        </div>
      </div>
    );
  }

  const mismatch = confirm.length > 0 && confirm !== password;
  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Set a new password</h1>
        <p className="text-sm text-balance text-muted-foreground">You'll be signed out on every device.</p>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="grid gap-4">
          {error && (
            <Alert variant="destructive" aria-live="polite"><AlertDescription>{error}</AlertDescription></Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" autoComplete="new-password" minLength={12} maxLength={200} placeholder="At least 12 characters"
              value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="password-hints" required />
            <PasswordStrength id="password-hints" password={password} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" autoComplete="new-password" maxLength={200} value={confirm}
              onChange={(e) => setConfirm(e.target.value)} aria-invalid={mismatch} aria-describedby={mismatch ? "confirm-error" : undefined} required />
            {mismatch && <p id="confirm-error" className="text-xs text-destructive">Passwords don't match.</p>}
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-full" disabled={busy}>{busy ? "Saving..." : "Set password"}</Button>
        </div>
      </form>
    </div>
  );
}
