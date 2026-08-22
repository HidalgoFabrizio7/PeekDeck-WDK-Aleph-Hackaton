"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { Deck, GameCategory } from "@/lib/decks";
import type { Copy as CopyText } from "@/lib/translations";
import { DeckCard } from "./deck-card";

type DeckCarouselProps = {
  category: GameCategory;
  copy: CopyText;
  onPurchase: (deck: Deck) => void;
};

export function DeckCarousel({ category, copy, onPurchase }: DeckCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    railRef.current?.scrollBy({ left: direction * 400, behavior: "smooth" });
  }

  return (
    <section aria-labelledby={`${category.id}-title`} className="flex flex-col gap-5">
      <header className="flex items-end justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <span className={`flex size-11 items-center justify-center rounded-xl ${category.color} font-mono text-xs font-black text-primary-foreground shadow-sm`} aria-hidden="true">{category.shortName}</span>
          <div className="flex flex-col gap-1">
            <h2 id={`${category.id}-title`} className="text-balance text-xl font-bold tracking-tight sm:text-2xl">{category.name}</h2>
            <p className="text-sm text-muted-foreground">{category.decks.length} {copy.decks.toLowerCase()}</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} className="flex size-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring" aria-label={`${copy.previous}: ${category.name}`}>
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button type="button" onClick={() => scroll(1)} className="flex size-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring" aria-label={`${copy.next}: ${category.name}`}>
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </header>
      <div ref={railRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {category.decks.map((deck) => <DeckCard key={deck.id} deck={deck} copy={copy} onPurchase={onPurchase} />)}
      </div>
    </section>
  );
}
