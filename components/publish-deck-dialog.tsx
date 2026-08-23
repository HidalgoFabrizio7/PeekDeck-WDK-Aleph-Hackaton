"use client";

import { Loader2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  open: boolean;
  userEmail: string | null;
  onClose: () => void;
  onPublished: () => void;
};

export function PublishDeckDialog({ open, userEmail, onClose, onPublished }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userEmail) return;
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setPending(false);
      setError("Tu sesión expiró. Inicia sesión nuevamente.");
      return;
    }
    const cost = Number(form.get("cost") || 0);
    const { error: insertError } = await supabase.from("decks").insert({
      owner_id: user.id,
      category_id: String(form.get("category")),
      name: String(form.get("name")).trim(),
      author: String(form.get("author")).trim(),
      format: String(form.get("format")).trim(),
      cost: Number.isFinite(cost) ? cost : 0,
      list: String(form.get("list")).trim(),
    });
    setPending(false);
    if (insertError) {
      setError("No pudimos publicar el mazo. Revisa los campos e inténtalo nuevamente.");
      return;
    }
    onPublished();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur-md sm:items-center sm:p-5" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="publish-title" className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div className="flex flex-col gap-1"><p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Comunidad</p><h2 id="publish-title" className="text-2xl font-black">Publicar un mazo</h2><p className="text-sm text-muted-foreground">Comparte una lista importable con otros jugadores.</p></div>
          <button type="button" onClick={onClose} className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border" aria-label="Cerrar"><X className="size-4" /></button>
        </header>
        {!userEmail ? (
          <div className="flex flex-col items-start gap-4 p-6"><p className="text-sm text-muted-foreground">Debes iniciar sesión para publicar un mazo.</p><a href="/auth/login" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">Iniciar sesión</a></div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5 overflow-y-auto p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-bold">Nombre<input name="name" required minLength={3} maxLength={80} className="h-11 rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="Azorius Control" /></label>
              <label className="flex flex-col gap-2 text-sm font-bold">Autor<input name="author" required minLength={2} maxLength={50} defaultValue={userEmail.split("@")[0]} className="h-11 rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
              <label className="flex flex-col gap-2 text-sm font-bold">Juego<select name="category" required className="h-11 rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"><option value="pokemon">Pokémon TCG Pocket</option><option value="hearthstone">Hearthstone</option><option value="mtg">Magic: The Gathering Arena</option></select></label>
              <label className="flex flex-col gap-2 text-sm font-bold">Formato<input name="format" required minLength={2} maxLength={40} className="h-11 rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="Standard" /></label>
              <label className="flex flex-col gap-2 text-sm font-bold sm:col-span-2">Precio opcional<input name="cost" type="number" min="0" max="9999" step="0.01" defaultValue="0" className="h-11 rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-bold">Lista del mazo<textarea name="list" required minLength={10} maxLength={10000} rows={9} className="rounded-lg border border-border bg-black p-4 font-mono text-sm font-normal leading-6 text-white outline-none focus:ring-2 focus:ring-ring" placeholder="Deck&#10;4 No More Lies..." /></label>
            {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
            <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="h-11 rounded-lg border border-border px-4 text-sm font-bold">Cancelar</button><button type="submit" disabled={pending} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground disabled:opacity-60">{pending && <Loader2 className="size-4 animate-spin" />}Publicar mazo</button></div>
          </form>
        )}
      </section>
    </div>
  );
}
