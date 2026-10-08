import React, { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { authService } from "../../lib/auth";

// Landing page for the confirmation email. The token is POSTed from the browser
// (never in a server log line) and dropped from the address bar once read.
export function VerifyEmail() {
  const [state, setState] = useState<"pending" | "ok" | "failed">("pending");

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    history.replaceState(null, "", location.pathname);
    if (!token) {
      setState("failed");
      return;
    }
    authService.verifyEmail(token).then(() => setState("ok"), () => setState("failed"));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {state === "pending" ? "Confirming your email…" : state === "ok" ? "Email confirmed" : "Link not valid"}
        </CardTitle>
        <CardDescription>
          {state === "ok" ? "You can sign in now." : state === "failed" ? "This link is invalid or has expired." : "One moment."}
        </CardDescription>
      </CardHeader>
      {state !== "pending" && (
        <CardFooter>
          {state === "ok"
            ? <Button asChild className="w-full"><a href="/login">Sign in</a></Button>
            : <Button asChild variant="outline" className="w-full"><a href="/register?resend=1">Send a new link</a></Button>}
        </CardFooter>
      )}
    </Card>
  );
}
