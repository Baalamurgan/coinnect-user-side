import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    revalidateTag("categories");

    return new Response(JSON.stringify({ revalidated: true }));
  } catch {
    return new Response(JSON.stringify({ error: "Failed to revalidate" }), {
      status: 500,
    });
  }
}
