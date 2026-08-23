"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Deck } from "@/lib/decks";
import type { Copy as CopyText } from "@/lib/translations";

type PaymentDialogProps = {
  deck: Deck | null;
  copy: CopyText;
  onClose: () => void;
};

export function PaymentDialog({ deck, copy, onClose }: PaymentDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (deck && dialog && !dialog.open) dialog.showModal();
    if (!deck && dialog?.open) dialog.close();
  }, [deck]);

  function closeDialog() {
    dialogRef.current?.close();
    setConfirmed(false);
    onClose();
  }

  if (!deck) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      aria-labelledby="payment-title"
      aria-describedby="payment-description"
    >
      <div className="flex flex-col gap-6 p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-primary/15 px-3 py-1 font-mono text-xs font-bold text-primary">${deck.price?.toFixed(2)} USDC</span>
            <h2 id="payment-title" className="text-xl font-bold">{confirmed ? copy.confirmed : copy.paymentTitle}</h2>
          </div>
          <button type="button" onClick={closeDialog} className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring" aria-label={copy.close}>
            <X aria-hidden="true" className="size-4" />
          </button>
        </header>

        {confirmed ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" className="size-7" /></span>
            <p className="text-sm leading-6 text-muted-foreground">{copy.paymentNote}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p id="payment-description" className="text-sm leading-6 text-muted-foreground">{copy.paymentBody} <strong className="text-foreground">{deck.name}</strong>.</p>
            <div className="rounded-xl border border-border bg-muted p-4 font-mono text-sm">
              <div className="flex items-center justify-between gap-4"><span>{deck.name}</span><strong>${deck.price?.toFixed(2)}</strong></div>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">{copy.paymentNote}</p>
          </div>
        )}

        <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={closeDialog} className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
            {confirmed ? copy.close : copy.cancel}
          </button>
          {!confirmed ? (
            <button type="button" onClick={() => setConfirmed(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:brightness-110 focus-visible:outline-2 focus-visible:outline-ring">
              <Copy aria-hidden="true" className="size-4" />
              {copy.confirm}
            </button>
          ) : null}
        </footer>
      </div>
    </dialog>
  );
}
