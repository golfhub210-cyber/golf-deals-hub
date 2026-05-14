const { data } = await supabase
  .from("deals")
  .select("*")
  .eq("active", true)
  .order("created_at", { ascending: false });