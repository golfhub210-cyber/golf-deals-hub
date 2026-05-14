"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [deals, setDeals] = useState<any[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      const { data } = await supabase
        .from("deals")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });

      setDeals(data || []);
    };

    fetchDeals();
  }, []);

  const subscribe = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    const { error } = await supabase.from("subscribers").insert([{ email }]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subscribed!");
    setEmail("");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Golf Deals Hub</h1>

      <p>Weekly golf deals, discounts, and the best golf stores in one place.</p>

      <div
        style={{
          marginTop: 30,
          marginBottom: 40,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 12,
        }}
      >
        <h2>📧 Weekly Golf Deals Newsletter</h2>

        <p>Get the best golf deals sent directly to your inbox.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 10,
            width: 300,
            marginRight: 10,
          }}
        />

        <button
          onClick={subscribe}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </div>

      <h2>🔥 Weekly Deals</h2>

      {deals.length === 0 && <p>No active deals yet.</p>}

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