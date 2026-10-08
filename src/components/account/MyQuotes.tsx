import React, { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";
import { Separator } from "@/components/shadcn/ui/separator";
import { accountService, errorText } from "../../lib/account";
import type { Quote } from "../../types/quotes";
import { ConfirmDelete } from "./ConfirmDelete";

// /account/quotes: own quotes. Live on /quotes at once; a moderator can reject them.
const empty = { text: "", author: "", source: "" };

export function MyQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [draft, setDraft] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    try { setQuotes(await accountService.listQuotes()); }
    catch (e) { setMsg(errorText(e)); }
  };
  useEffect(() => { void load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { text: draft.text.trim(), author: draft.author.trim(), source: draft.source.trim() || null };
    try {
      if (editId) await accountService.updateQuote(editId, data);
      else await accountService.createQuote(data);
      setDraft(empty);
      setEditId(null);
      setMsg(null);
      await load();
    } catch (err) {
      setMsg(errorText(err));
    }
  };

  const remove = async (q: Quote) => {
    try { await accountService.deleteQuote(q.id); await load(); }
    catch (err) { setMsg(errorText(err)); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <Card className="self-start">
        <CardHeader>
          <CardTitle>{editId ? "Edit quote" : "Share a quote"}</CardTitle>
          <CardDescription>Shared quotes appear on the quotes page straight away.</CardDescription>
        </CardHeader>
        <form onSubmit={save}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="q-text">Quote</Label>
              <Textarea id="q-text" rows={3} maxLength={500} required value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="q-author">Said by</Label>
              <Input id="q-author" maxLength={120} required value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="q-source">Source (optional)</Label>
              <Input id="q-source" maxLength={120} placeholder="Book, film, speech…" value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value })} />
            </div>
            {msg && <Alert variant="destructive"><AlertDescription>{msg}</AlertDescription></Alert>}
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit">{editId ? "Save" : "Share"}</Button>
            {editId && <Button type="button" variant="ghost" onClick={() => { setEditId(null); setDraft(empty); }}>Cancel</Button>}
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your quotes</CardTitle>
          <CardDescription>{quotes.length} shared</CardDescription>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 && <p className="text-sm text-gray-500">No quotes yet.</p>}
          {quotes.map((q, i) => (
            <React.Fragment key={q.id}>
              {i > 0 && <Separator />}
              <div className="flex flex-wrap items-start gap-3 py-3">
                <div className="min-w-48 flex-1">
                  <p className="font-medium whitespace-pre-line">“{q.text}”</p>
                  <p className="text-sm text-gray-500">- {q.author}{q.source ? `, ${q.source}` : ""}</p>
                  {q.status === "rejected" && (
                    <p className="text-sm text-red-600 dark:text-red-400">Removed by a moderator: {q.moderationReason}</p>
                  )}
                </div>
                {q.status !== "rejected" && (
                  <Button variant="ghost" size="sm" onClick={() => { setEditId(q.id); setDraft({ text: q.text, author: q.author, source: q.source ?? "" }); }}>Edit</Button>
                )}
                <ConfirmDelete what="this quote" onConfirm={() => void remove(q)} />
              </div>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
