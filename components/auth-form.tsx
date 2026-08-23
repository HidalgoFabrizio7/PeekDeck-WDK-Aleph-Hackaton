"use client";

import { ArrowLeft, Layers3, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = { mode: "login" | "sign-up" };

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const supabase = createClient();

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message.toLowerCase().includes("confirm") ? "Confirma tu correo antes de iniciar sesión." : "Correo o contraseña inválidos.");
        setPending(false);
        return;
      }
      router.push("/");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(error.message.toLowerCase().includes("password") ? "Usa una contraseña de al menos 8 caracteres." : "No pudimos crear la cuenta. Inténtalo de nuevo.");
      setPending(false);
      return;
    }
    router.push("/auth/sign-up-success");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      <section className="flex w-full max-w-md flex-col gap-8 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <div className="flex flex-col gap-5">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-4" /> Volver a PeekDeck
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Layers3 aria-hidden="true" className="size-5" /></span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">PEEKDECK</p>
              <h1 className="text-2xl font-black tracking-tight">{isLogin ? "Inicia sesión" : "Crea tu cuenta"}</h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{isLogin ? "Guarda tus mazos y continúa donde lo dejaste." : "Únete a la comunidad y empieza a compartir estrategias."}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="email">Correo electrónico
            <input id="email" name="email" type="email" autoComplete="email" required className="h-11 rounded-lg border border-border bg-background px-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" placeholder="tu@correo.com" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="password">Contraseña
            <input id="password" name="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} minLength={8} required className="h-11 rounded-lg border border-border bg-background px-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" placeholder="Mínimo 8 caracteres" />
          </label>
          {message ? <p role="alert" className="rounded-lg border border-border bg-muted p-3 text-sm text-foreground">{message}</p> : null}
          <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
            {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : null}
            {pending ? "Procesando..." : isLogin ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <Link href={isLogin ? "/auth/sign-up" : "/auth/login"} className="font-bold text-primary hover:underline">{isLogin ? "Regístrate" : "Inicia sesión"}</Link>
        </p>
      </section>
    </main>
  );
}
