"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const { data } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });

      setDeals(data || []);
    };

    fetchDeals();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Golf Deals Hub</h1>
      <p>Weekly golf deals, discounts, and the best golf stores in one place.</p>

      <h2>🔥 Weekly Deals</h2>

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

          <a
            href={`/deals/${deal.id}`}
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "10px 16px",
              background: "green",
              color: "white",
              borderRadius: 8,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            View Deal
          </a>
        </div>
      ))}
    </main>
  );
}