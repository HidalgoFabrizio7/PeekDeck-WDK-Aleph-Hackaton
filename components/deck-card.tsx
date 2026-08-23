"use client";

import { Check, Copy, LockKeyhole, ShieldCheck, Trophy } from "lucide-react";
import { useState } from "react";
import type { Deck } from "@/lib/decks";
import type { Copy as CopyText } from "@/lib/translations";

type DeckCardProps = {
  deck: Deck;
  copy: CopyText;
  onPurchase: (deck: Deck) => void;
};

export function DeckCard({ deck, copy, onPurchase }: DeckCardProps) {
  const [copied, setCopied] = useState(false);
  const isPremium = typeof deck.price === "number";

  async function handleAction() {
    if (isPremium) {
      onPurchase(deck);
      return;
    }

    await navigator.clipboard.writeText(deck.list);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="flex h-[31rem] w-[85vw] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm sm:w-96">
      <header className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">{deck.format}</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              {isPremium ? <LockKeyhole aria-hidden="true" className="size-3.5" /> : <ShieldCheck aria-hidden="true" className="size-3.5" />}
              {isPremium ? copy.premium : copy.free}
            </span>
          </div>
          <h3 className="truncate text-lg font-bold tracking-tight">{deck.name}</h3>
          <p className="truncate font-mono text-xs text-muted-foreground">{deck.creator}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2.5 py-2 text-xs font-semibold">
          <Trophy aria-hidden="true" className="size-3.5 text-primary" />
          {deck.wins}%
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <pre className={`h-full overflow-hidden whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-muted-foreground ${isPremium ? "select-none blur-[5px]" : "overflow-y-auto"}`} aria-hidden={isPremium}>
          {deck.list}
        </pre>
        {isPremium ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/50 px-8 text-center backdrop-brightness-75">
            <span className="flex size-11 items-center justify-center rounded-full border border-primary/40 bg-card text-primary shadow-lg">
              <LockKeyhole aria-hidden="true" className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <strong className="text-base">{copy.lockedTitle}</strong>
              <span className="font-mono text-2xl font-bold text-primary">${deck.price?.toFixed(2)} USDC</span>
            </div>
            <p className="text-sm leading-5 text-muted-foreground">{copy.lockedDescription}</p>
          </div>
        ) : null}
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-border bg-card p-4">
        <span className="font-mono text-xs text-muted-foreground">{deck.cards} {copy.cards}</span>
        <button
          type="button"
          onClick={handleAction}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={isPremium ? `${copy.unlock}: ${deck.name}` : `${copy.copy}: ${deck.name}`}
        >
          {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
          {copied ? copy.copied : isPremium ? copy.unlock : copy.copy}
        </button>
        <span className="sr-only" aria-live="polite">{copied ? copy.copied : ""}</span>
      </footer>
    </article>
  );
}
