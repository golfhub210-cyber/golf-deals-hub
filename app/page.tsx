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

    const { error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Subscribed!");
    setEmail("");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #07130d 0%, #0b1c13 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          padding: "40px 24px 80px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 80,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Golf Deals Hub"
              style={{
                height: 64,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </a>

          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <a href="/about" style={navLink}>
              About
            </a>

            <a href="/contact" style={navLink}>
              Contact
            </a>

            <a href="/privacy-policy" style={navLink}>
              Privacy
            </a>

            <a href="/terms" style={navLink}>
              Terms
            </a>

            <a
              href="/admin/review"
              style={{
                ...navLink,
                color: "#9eff9e",
              }}
            >
              Admin
            </a>
          </div>
        </nav>

        <div style={{ maxWidth: 760 }}>
          <p
            style={{
              color: "#9eff9e",
              fontWeight: "bold",
              marginBottom: 14,
              letterSpacing: 1,
            }}
          >
            PREMIUM GOLF DEALS • CLUBS • BALLS • APPAREL
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 8vw, 72px)",
              lineHeight: 1,
              marginBottom: 24,
              fontWeight: 800,
            }}
          >
            Find elite golf deals before they disappear.
          </h1>

          <p
            style={{
              fontSize: 20,
              color: "#cbd5cb",
              lineHeight: 1.7,
              marginBottom: 34,
            }}
          >
            Curated weekly discounts from trusted golf retailers,
            clearance sales, premium club brands, and hidden online deals.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a href="#deals" style={primaryBtn}>
              View Deals
            </a>

            <a href="/category/drivers" style={secondaryBtn}>
              Driver Deals
            </a>

            <a href="/category/golf-balls" style={secondaryBtn}>
              Golf Balls
            </a>
          </div>
        </div>
      </section>

      <section style={newsletterBox}>
        <div>
          <h2
            style={{
              fontSize: 32,
              marginBottom: 10,
            }}
          >
            📧 Weekly Golf Deals
          </h2>

          <p
            style={{
              color: "#cbd5cb",
              lineHeight: 1.7,
            }}
          >
            Join the newsletter and get premium golf discounts sent directly
            to your inbox every week.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
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

      <section
        id="deals"
        style={{
          padding: "70px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: 40,
            marginBottom: 34,
          }}
        >
          🔥 Approved Weekly Deals
        </h2>

        {deals.length === 0 && (
          <p
            style={{
              color: "#cbd5cb",
            }}
          >
            No active deals yet. Approve deals in the admin dashboard.
          </p>
        )}

        <div style={grid}>
          {deals.map((deal) => (
            <div key={deal.id} style={card}>
              <p style={badge}>
                {deal.category || "deal"}
              </p>

              <h3
                style={{
                  fontSize: 26,
                  marginBottom: 14,
                }}
              >
                {deal.title}
              </h3>

              <p
                style={{
                  color: "#cbd5cb",
                  minHeight: 90,
                  lineHeight: 1.6,
                }}
              >
                {deal.description}
              </p>

              <strong
                style={{
                  color: "#9eff9e",
                  display: "block",
                  marginBottom: 24,
                  marginTop: 12,
                  fontSize: 20,
                }}
              >
                {deal.discount}
              </strong>

              <a
                href={deal.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                style={primaryBtn}
              >
                View Deal
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer style={footer}>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="/about" style={footerLink}>
            About
          </a>

          <a href="/contact" style={footerLink}>
            Contact
          </a>

          <a href="/privacy-policy" style={footerLink}>
            Privacy Policy
          </a>

          <a href="/terms" style={footerLink}>
            Terms & Conditions
          </a>
        </div>

        <p
          style={{
            marginTop: 24,
            color: "#6b8b75",
          }}
        >
          © 2026 Golf Deals Hub
        </p>
      </footer>
    </main>
  );
}

const navLink = {
  color: "#cbd5cb",
  textDecoration: "none",
  fontWeight: 600,
};

const footerLink = {
  color: "#cbd5cb",
  textDecoration: "none",
};

const footer = {
  borderTop: "1px solid #21402b",
  marginTop: 80,
  padding: "50px 20px",
  textAlign: "center" as const,
};

const primaryBtn = {
  display: "inline-block",
  background: "#22c55e",
  color: "#031009",
  padding: "14px 22px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(34,197,94,.25)",
};

const secondaryBtn = {
  display: "inline-block",
  border: "1px solid #2f5f3e",
  color: "white",
  padding: "14px 22px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: "bold",
  background: "rgba(255,255,255,.03)",
};

const newsletterBox = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: 36,
  border: "1px solid #21402b",
  borderRadius: 24,
  display: "flex",
  justifyContent: "space-between",
  gap: 30,
  alignItems: "center",
  flexWrap: "wrap" as const,
  background: "rgba(255,255,255,.03)",
};

const inputStyle = {
  padding: 14,
  width: 300,
  borderRadius: 12,
  border: "1px solid #21402b",
  background: "#102017",
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const card = {
  background: "rgba(255,255,255,.03)",
  border: "1px solid #21402b",
  borderRadius: 24,
  padding: 28,
  backdropFilter: "blur(10px)",
};

const badge = {
  color: "#9eff9e",
  fontSize: 12,
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  marginBottom: 12,
};