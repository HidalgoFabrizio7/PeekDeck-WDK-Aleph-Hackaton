import { PeekDeckApp } from "@/components/peek-deck-app";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const [{ data: { user } }, { data: publishedDecks }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("decks").select("id, category_id, name, author, format, cost, list, likes").order("created_at", { ascending: false }),
  ]);

  return <PeekDeckApp userEmail={user?.email ?? null} publishedDecks={publishedDecks ?? []} />;
}
