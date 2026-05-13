import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  try {
    const datasetId = "7D9nUeMMeLBi3IOol";
    const token = process.env.APIFY_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "Missing APIFY_API_TOKEN in .env.local" },
        { status: 500 }
      );
    }

    const apifyUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`;

    const response = await fetch(apifyUrl);

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        {
          error: "Apify request failed",
          status: response.status,
          details: text,
        },
        { status: 500 }
      );
    }

    const items = await response.json();

    if (!Array.isArray(items)) {
      return NextResponse.json(
        {
          error: "Apify did not return an array",
          received: items,
        },
        { status: 500 }
      );
    }

    const deals = items
      .filter((item: any) => {
        const url = item.url || item.loadedUrl;

        return (
          url &&
          typeof url === "string" &&
          url.startsWith("https://") &&
          !url.includes("#") &&
          !url.startsWith("mailto:") &&
          !url.startsWith("tel:")
        );
      })
      .slice(0, 20)
      .map((item: any) => {
        const url = item.url || item.loadedUrl;

        return {
          title: item.title || item.pageTitle || "Golf Deal",
          description:
            item.text?.slice(0, 250) ||
            item.description ||
            "Golf discount",
          affiliate_link: url,
          discount: "Sale",
          category: "general",
        };
      });

    if (deals.length === 0) {
      return NextResponse.json(
        {
          error: "No valid deal URLs found in Apify dataset",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("deals").insert(deals);

    if (error) {
      return NextResponse.json(
        {
          error: "Supabase insert failed",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imported: deals.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Server crashed",
        details: err.message,
      },
      { status: 500 }
    );
  }
}