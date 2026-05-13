"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function DealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [deal, setDeal] = useState<any>(null);

  useEffect(() => {
    const loadDeal = async () => {
      const { id } = await params;

      const { data } = await supabase
        .from("deals")
        .select("*")
        .eq("id", id)
        .single();

      setDeal(data);
    };

    loadDeal();
  }, [params]);

  if (!deal) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>{deal.title}</h1>

      <p>{deal.description}</p>

      <h3>{deal.discount}</h3>

      <button
        onClick={async () => {
          await supabase.from("clicks").insert([
            {
              deal_id: deal.id,
            },
          ]);

          window.open(deal.affiliate_link, "_blank");
        }}
        style={{
          display: "inline-block",
          marginTop: 12,
          padding: "10px 16px",
          background: "green",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        Shop Deal
      </button>
    </main>
  );
}