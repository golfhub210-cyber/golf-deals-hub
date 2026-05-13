"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ImportDealsPage() {
  const [csv, setCsv] = useState("");

  const importDeals = async () => {
    const rows = csv.trim().split("\n").slice(1);

    const deals = rows.map((row) => {
      const [title, description, affiliate_link, discount] = row.split(",");

      return {
        title: title?.trim(),
        description: description?.trim(),
        affiliate_link: affiliate_link?.trim(),
        discount: discount?.trim(),
      };
    });

    const { error } = await supabase.from("deals").insert(deals);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deals imported!");
    setCsv("");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Import Deals</h1>

      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        placeholder="title,description,affiliate_link,discount"
        style={{ width: "100%", height: 300 }}
      />

      <button onClick={importDeals} style={{ marginTop: 20 }}>
        Import Deals
      </button>
    </main>
  );
}