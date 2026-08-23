import { CircleAlert } from "lucide-react";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      <section className="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
        <CircleAlert aria-hidden="true" className="size-12 text-primary" />
        <h1 className="text-2xl font-black tracking-tight">El enlace no funcionó</h1>
        <p className="text-sm leading-6 text-muted-foreground">El enlace venció o ya fue utilizado. Intenta iniciar sesión o crea una cuenta nuevamente.</p>
        <Link href="/auth/login" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">Volver al acceso</Link>
      </section>
    </main>
  );
}
