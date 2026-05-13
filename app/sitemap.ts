import { supabase } from "../lib/supabaseClient";

export default async function sitemap() {
  const { data: deals } = await supabase
    .from("deals")
    .select("id");

  const baseUrl = "https://your-domain.com";

  const dealUrls =
    deals?.map((deal) => ({
      url: `${baseUrl}/deals/${deal.id}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    ...dealUrls,
  ];
}