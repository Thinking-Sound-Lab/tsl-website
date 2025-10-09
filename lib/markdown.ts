import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content/research");

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

export interface Post extends PostMetadata {
  content: string;
  tableOfContents: { id: string; title: string }[];
}

// Get all post slugs
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// Get all posts metadata
export function getAllPosts(): PostMetadata[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      category: data.category,
      featured: data.featured || false,
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Get featured post
export function getFeaturedPost(): PostMetadata | null {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) || posts[0] || null;
}

// Extract table of contents from markdown headings
function extractTableOfContents(content: string): {
  id: string;
  title: string;
}[] {
  const headingRegex = /^## (.+)$/gm;
  const headings: { id: string; title: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, title });
  }

  return headings;
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML with heading IDs
    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content);
    const contentHtml = processedContent.toString();

    // Extract table of contents
    const tableOfContents = extractTableOfContents(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      category: data.category,
      featured: data.featured || false,
      content: contentHtml,
      tableOfContents,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
