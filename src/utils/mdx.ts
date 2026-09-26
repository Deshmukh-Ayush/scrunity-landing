import { promises as fs } from "fs";
import path from "path";

export const getSingleBlog = async (slug: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }

  try {
    const singleBlog = await fs.readFile(
      path.join(process.cwd(), "src/data", `${slug}.mdx`),
      "utf-8",
    );

    if (!singleBlog) {
      return null;
    }

    return singleBlog;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    console.error("Failed to read blog file:", error);
    return null;
  }
};
