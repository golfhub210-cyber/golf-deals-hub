"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [deals, setDeals] = useState<any[]>([]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const loadDeals = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);

      const { data } = await supabase
        .from("deals")
        .select("*")
        .eq("category", resolvedParams.slug)
        .eq("active", true)
        .order("created_at", { ascending: false });

      setDeals(data || []);
    };

    loadDeals();
  }, [params]);

  return (
    <main style={{ padding: 40 }}>
      <h1>{slug} Deals</h1>

      {deals.length === 0 && <p>No active deals found in this category yet.</p>}

      {deals.map((deal) => (
        <div
          key={deal.id}
          style={{
            border: "1px solid #ccc",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <h3>{deal.title}</h3>
          <p>{deal.description}</p>
          <strong>{deal.discount}</strong>
          <br />
          <a href={`/deals/${deal.id}`}>View Deal</a>
        </div>
      ))}
    </main>
  );
}