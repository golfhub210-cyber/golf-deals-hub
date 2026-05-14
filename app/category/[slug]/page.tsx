const { data } = await supabase
  .from("deals")
  .select("*")
  .eq("category", slug)
  .eq("active", true)
  .order("created_at", { ascending: false });