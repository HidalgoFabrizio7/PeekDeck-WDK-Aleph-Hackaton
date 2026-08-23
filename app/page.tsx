import { PeekDeckApp } from "@/components/peek-deck-app";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <PeekDeckApp userEmail={user?.email ?? null} />;
}
