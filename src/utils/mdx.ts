import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image?: string;
  featured?: boolean;
}

export interface BlogItem extends BlogMeta {
  slug: string;
}

const DATA_DIR = path.join(process.cwd(), "src/data");

export async function getSingleBlog(slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(DATA_DIR, `${slug}.mdx`), "utf-8");
  } catch {
    return null;
  }
}

export async function getAllBlogs(): Promise<BlogItem[]> {
  try {
    const files = await fs.readdir(DATA_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const source = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
        const { frontmatter } = await compileMDX<BlogMeta>({
          source,
          options: { parseFrontmatter: true },
        });

        return {
          slug,
          ...frontmatter,
        };
      })
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}
