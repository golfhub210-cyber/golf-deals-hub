"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ReviewDealsPage() {
  const [deals, setDeals] = useState<any[]>([]);

  const loadDeals = async () => {
    const { data } = await supabase
      .from("deals")
      .select("*")
      .eq("active", false)
      .order("created_at", { ascending: false });

    setDeals(data || []);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const approveDeal = async (id: string) => {
    const { error } = await supabase
      .from("deals")
      .update({ active: true })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deal approved!");
    loadDeals();
  };

  const rejectDeal = async (id: string) => {
    const { error } = await supabase
      .from("deals")
      .update({ active: false })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deal hidden.");
    loadDeals();
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Review Imported Deals</h1>

      <p>
        Imported deals stay hidden until you approve them. Only approved deals
        show publicly.
      </p>

      {deals.length === 0 && <p>No deals waiting for review.</p>}

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

          <p>
            <strong>Discount:</strong> {deal.discount}
          </p>

          <p>
            <strong>Category:</strong> {deal.category || "general"}
          </p>

          <p>
            <strong>URL:</strong>{" "}
            <a href={deal.affiliate_link} target="_blank">
              Test Link
            </a>
          </p>

          <button
            onClick={() => approveDeal(deal.id)}
            style={{
              padding: "10px 16px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: 8,
              marginRight: 10,
              cursor: "pointer",
            }}
          >
            Approve
          </button>

          <button
            onClick={() => rejectDeal(deal.id)}
            style={{
              padding: "10px 16px",
              background: "gray",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Keep Hidden
          </button>
        </div>
      ))}
    </main>
  );
}