import { promises as fs } from "node:fs";
import path from "node:path";

import { cvFileName } from "@/data/site";

/**
 * Build-time asset checks.
 *
 * Server-only: these helpers touch the filesystem, so they must only be called
 * from Server Components or Route Handlers. The results are baked into the
 * statically generated HTML, which keeps the client bundle free of `node:fs`.
 */

const publicDir = path.join(process.cwd(), "public");

/** True when the CV PDF has actually been added to /public. */
export async function isCvAvailable() {
  try {
    const stats = await fs.stat(path.join(publicDir, cvFileName));
    return stats.isFile() && stats.size > 0;
  } catch {
    return false;
  }
}

/** True when a project screenshot exists, so a placeholder can be shown instead. */
export async function projectImageExists(folder: string, file: string) {
  try {
    const stats = await fs.stat(path.join(publicDir, folder, file));
    return stats.isFile() && stats.size > 0;
  } catch {
    return false;
  }
}