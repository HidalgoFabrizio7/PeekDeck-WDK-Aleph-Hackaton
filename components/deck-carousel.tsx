"use client";

import { ArrowLeft, ArrowRight, ListFilter } from "lucide-react";
import { useRef } from "react";
import type { Deck, GameCategory } from "@/lib/decks";
import type { Copy as CopyText } from "@/lib/translations";
import { DeckCard } from "./deck-card";

type DeckCarouselProps = {
  category: GameCategory;
  copy: CopyText;
  onPurchase: (deck: Deck) => void;
  selected: boolean;
  onToggle: () => void;
};

export function DeckCarousel({ category, copy, onPurchase, selected, onToggle }: DeckCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    railRef.current?.scrollBy({ left: direction * 400, behavior: "smooth" });
  }

  return (
    <section aria-labelledby={`${category.id}-title`} className="flex flex-col gap-5">
      <header className="flex items-end justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <button type="button" onClick={onToggle} aria-pressed={selected} aria-label={`${selected ? copy.showAllCategories : copy.showOnlyCategory}: ${category.name}`} className="group flex flex-1 items-center justify-between gap-3 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:flex-none">
          <span className="flex items-center gap-3">
            <span className={`flex size-11 items-center justify-center rounded-xl ${category.color} font-mono text-xs font-black text-primary-foreground shadow-sm`} aria-hidden="true">{category.shortName}</span>
            <span className="flex flex-col gap-1">
              <h2 id={`${category.id}-title`} className="text-balance text-xl font-bold tracking-tight sm:text-2xl">{category.name}</h2>
              <span className="text-sm text-muted-foreground">{category.decks.length} {copy.decks.toLowerCase()}</span>
            </span>
          </span>
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground group-hover:text-foreground"}`} aria-hidden="true">
            <ListFilter className="size-4" />
          </span>
        </button>
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
