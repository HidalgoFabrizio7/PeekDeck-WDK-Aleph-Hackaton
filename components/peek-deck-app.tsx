"use client";

import { ArrowDown, Layers3, LogOut, Plus, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeckCarousel } from "@/components/deck-carousel";
import { PaymentDialog } from "@/components/payment-dialog";
import { gameCategories, type Deck, type Language } from "@/lib/decks";
import { createClient } from "@/lib/supabase/client";
import { translations } from "@/lib/translations";

type PeekDeckAppProps = { userEmail: string | null };

export function PeekDeckApp({ userEmail }: PeekDeckAppProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("es");
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  const visibleCategories = selectedCategory
    ? gameCategories.filter((category) => category.id === selectedCategory)
    : gameCategories;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2 font-black tracking-tight" aria-label="Peek Deck">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Layers3 aria-hidden="true" className="size-5" /></span>
            <span className="text-lg">PEEK<span className="text-primary">DECK</span></span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex" aria-label="Principal">
            <a href="#decks" className="hover:text-foreground">{copy.navExplore}</a>
            <a href="#how" className="hover:text-foreground">{copy.navHow}</a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border bg-card p-1" role="group" aria-label={copy.language}>
              {(["es", "en"] as const).map((item) => (
                <button key={item} type="button" onClick={() => setLanguage(item)} className={`rounded-md px-2.5 py-1.5 font-mono text-xs font-bold uppercase transition ${language === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`} aria-pressed={language === item}>
                  {item}
                </button>
              ))}
            </div>
            <Link href={userEmail ? "/" : "/auth/login"} onClick={userEmail ? signOut : undefined} className="flex size-10 items-center justify-center rounded-lg border border-border bg-card sm:hidden" aria-label={userEmail ? copy.signOut : copy.login}>
              {userEmail ? <LogOut aria-hidden="true" className="size-4" /> : <UserRound aria-hidden="true" className="size-4" />}
            </Link>
            {userEmail ? (
              <div className="hidden items-center gap-2 md:flex">
                <span className="max-w-36 truncate text-xs text-muted-foreground">{userEmail}</span>
                <button type="button" onClick={signOut} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-bold hover:bg-muted" aria-label={copy.signOut}>
                  <LogOut aria-hidden="true" className="size-4" />{copy.signOut}
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link href="/auth/login" className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-bold text-muted-foreground hover:text-foreground">{copy.login}</Link>
                <Link href="/auth/sign-up" className="inline-flex h-10 items-center rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground">{copy.signUp}</Link>
              </div>
            )}
            <button type="button" className="hidden h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-bold text-background hover:opacity-90 lg:inline-flex">
              <Plus aria-hidden="true" className="size-4" />{copy.publish}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-28">
            <div className="flex max-w-3xl flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles aria-hidden="true" className="size-3.5" />{copy.eyebrow}
              </div>
              <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                {copy.titleA}<br /><span className="text-primary">{copy.titleB}</span>
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">{copy.hero}</p>
              <a href="#decks" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 hover:brightness-110">
                {copy.explore}<ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
            <div id="how" className="grid w-full grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card lg:max-w-md">
              <div className="flex flex-col gap-1 p-4 sm:p-5"><strong className="font-mono text-xl sm:text-2xl">1.2K</strong><span className="text-xs text-muted-foreground">{copy.decks}</span></div>
              <div className="flex flex-col gap-1 p-4 sm:p-5"><strong className="font-mono text-xl sm:text-2xl">12</strong><span className="text-xs text-muted-foreground">{copy.games}</span></div>
              <div className="flex flex-col gap-1 p-4 sm:p-5"><strong className="font-mono text-xl sm:text-2xl">480</strong><span className="text-xs text-muted-foreground">{copy.creators}</span></div>
            </div>
          </div>
        </section>

        <section id="decks" className="flex flex-col gap-12 py-14 sm:py-20">
          <div className="flex flex-col gap-3 px-5 sm:px-8 lg:px-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">{copy.curated}</p>
            <h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">{copy.fresh}</h2>
            <p className="max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">{copy.freshDescription}</p>
          </div>
          <div className="flex flex-col gap-14">
            {visibleCategories.map((category) => (
              <DeckCarousel
                key={category.id}
                category={category}
                copy={copy}
                onPurchase={setSelectedDeck}
                selected={selectedCategory === category.id}
                onToggle={() => setSelectedCategory((current) => current === category.id ? null : category.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-foreground">PEEKDECK</span><span>{copy.footer}</span>
        </div>
      </footer>
      <PaymentDialog deck={selectedDeck} copy={copy} onClose={() => setSelectedDeck(null)} />
    </div>
  );
}
