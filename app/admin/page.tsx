"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");

  const addDeal = async () => {
    const { error } = await supabase.from("deals").insert([
      {
        title,
        description,
        affiliate_link: affiliateLink,
        discount,
        category,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deal added!");

    setTitle("");
    setDescription("");
    setAffiliateLink("");
    setDiscount("");
    setCategory("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Affiliate Link"
        value={affiliateLink}
        onChange={(e) => setAffiliateLink(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Category, example: drivers"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addDeal}>Add Deal</button>
    </div>
  );
}