import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      <section className="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><MailCheck aria-hidden="true" className="size-6" /></span>
        <h1 className="text-2xl font-black tracking-tight">Revisa tu correo</h1>
        <p className="text-sm leading-6 text-muted-foreground">Te enviamos un enlace para confirmar tu cuenta. Después podrás iniciar sesión en PeekDeck.</p>
        <Link href="/auth/login" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">Ir a iniciar sesión</Link>
      </section>
    </main>
  );
}
