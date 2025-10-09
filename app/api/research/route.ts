import { NextResponse } from "next/server";
import { getAllPosts, getFeaturedPost } from "@/lib/markdown";

export async function GET() {
  try {
    const posts = getAllPosts();
    const featured = getFeaturedPost();

    return NextResponse.json({ posts, featured });
  } catch (error) {
    console.error("Error fetching research posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch research posts" },
      { status: 500 }
    );
  }
}
