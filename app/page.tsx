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
    <main style={{ minHeight: "100vh", background: "#07130d", color: "white" }}>
      <section style={{ padding: "60px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <nav style={{ display: "flex", justifyContent: "space-between", marginBottom: 70 }}>
          <h2>⛳ Golf Deals Hub</h2>
          <a href="/admin" style={{ color: "#9eff9e" }}>Admin</a>
        </nav>

        <div style={{ maxWidth: 760 }}>
          <p style={{ color: "#9eff9e", fontWeight: "bold" }}>
            WEEKLY GOLF DEALS • CLUBS • BALLS • APPAREL
          </p>

          <h1 style={{ fontSize: 56, lineHeight: 1.05, marginBottom: 20 }}>
            Find the best golf deals before they disappear.
          </h1>

          <p style={{ fontSize: 20, color: "#cbd5cb", marginBottom: 30 }}>
            Curated weekly discounts from golf retailers, used club shops,
            clearance sales, and hidden online deals.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#deals" style={primaryBtn}>View Deals</a>
            <a href="/category/drivers" style={secondaryBtn}>Driver Deals</a>
            <a href="/category/golf-balls" style={secondaryBtn}>Golf Balls</a>
          </div>
        </div>
      </section>

      <section style={newsletterBox}>
        <div>
          <h2>📧 Get weekly golf deals</h2>
          <p style={{ color: "#cbd5cb" }}>
            Join the list and get the best golf discounts sent to your inbox.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <button onClick={subscribe} style={primaryBtn}>
            Subscribe
          </button>
        </div>
      </section>

      <section id="deals" style={{ padding: "40px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: 34, marginBottom: 25 }}>🔥 Approved Weekly Deals</h2>

        {deals.length === 0 && (
          <p style={{ color: "#cbd5cb" }}>No active deals yet. Approve deals in the admin dashboard.</p>
        )}

        <div style={grid}>
          {deals.map((deal) => (
            <div key={deal.id} style={card}>
              <p style={badge}>{deal.category || "deal"}</p>

              <h3 style={{ fontSize: 24, marginBottom: 12 }}>{deal.title}</h3>

              <p style={{ color: "#cbd5cb", minHeight: 70 }}>
                {deal.description}
              </p>

              <strong style={{ color: "#9eff9e", display: "block", marginBottom: 20 }}>
                {deal.discount}
              </strong>

              <a href={`/deals/${deal.id}`} style={primaryBtn}>
                View Deal
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const primaryBtn = {
  display: "inline-block",
  background: "#22c55e",
  color: "#031009",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const secondaryBtn = {
  display: "inline-block",
  border: "1px solid #2f5f3e",
  color: "white",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: "bold",
};

const newsletterBox = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: 30,
  border: "1px solid #21402b",
  borderRadius: 18,
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "center",
};

const inputStyle = {
  padding: 12,
  width: 280,
  borderRadius: 10,
  border: "1px solid #21402b",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const card = {
  background: "#0d1f14",
  border: "1px solid #21402b",
  borderRadius: 18,
  padding: 24,
};

const badge = {
  color: "#9eff9e",
  fontSize: 12,
  fontWeight: "bold",
  textTransform: "uppercase" as const,
};