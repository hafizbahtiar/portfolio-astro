import React, { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { authService, can, type Me } from "../../lib/auth";

// Nav + sign out for /account/*. Also the client guard: no session → /login
// (the middleware already bounced cookieless visits).
const LINKS = [
  { href: "/account", label: "Profile" },
  { href: "/account/blog", label: "Blog posts" },
  { href: "/account/quotes", label: "Quotes" },
];

export function AccountHeader({ path }: { path: string }) {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    void (async () => {
      if (!authService.isAuthenticated() && !(await authService.tryRefresh())) {
        window.location.replace("/login");
        return;
      }
      const who = await authService.me();
      if (!who) window.location.replace("/login");
      else setMe(who);
    })();
  }, []);

  const signOut = async () => {
    await authService.logout();
    window.location.href = "/";
  };

  return (
    <nav className="flex grow flex-wrap items-center gap-1" aria-label="Account">
      {LINKS.map((l) => (
        <Button key={l.href} asChild variant={path === l.href ? "secondary" : "ghost"} size="sm">
          <a href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</a>
        </Button>
      ))}
      <span className="grow" />
      {can(me, "admin.access") && (
        <Button asChild variant="ghost" size="sm"><a href="/admin">Admin</a></Button>
      )}
      <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
    </nav>
  );
}
