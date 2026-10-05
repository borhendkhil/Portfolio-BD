import { GalleryGrid } from "@/components/projects/GalleryGrid";
import { projectImageExists } from "@/lib/assets";
import type { ProjectImage } from "@/types";

/**
 * Reusable screenshot gallery.
 *
 * Runs on the server so it can check which files actually exist in /public at
 * build time. Missing frames render an explicit, labelled placeholder instead of
 * a broken image — no generated or invented screenshots are ever presented as
 * real application screens. Rendering and the lightbox live in `GalleryGrid`.
 */
export async function ProjectGallery({
  folder,
  images,
}: {
  folder: string;
  images: readonly ProjectImage[];
}) {
  const resolved = await Promise.all(
    images.map(async (image) => ({
      ...image,
      exists: await projectImageExists(folder, image.file),
    })),
  );

  return <GalleryGrid folder={folder} images={resolved} />;
}