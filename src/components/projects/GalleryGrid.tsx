"use client";

import { ChevronLeft, ChevronRight, ImageIcon, Monitor, Smartphone, Workflow, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import type { ProjectImageKind } from "@/types";

const kindMeta: Record<
  ProjectImageKind,
  { label: string; placeholder: string; Icon: typeof Monitor }
> = {
  mobile: {
    label: "Mobile screen",
    placeholder: "Add mobile application screenshot here",
    Icon: Smartphone,
  },
  desktop: {
    label: "Desktop screen",
    placeholder: "Add desktop screenshot here",
    Icon: Monitor,
  },
  diagram: {
    label: "Diagram",
    placeholder: "Add architecture diagram here",
    Icon: Workflow,
  },
};

type ResolvedImage = {
  file: string;
  label: string;
  kind: ProjectImageKind;
  exists: boolean;
};

type GalleryGridProps = {
  folder: string;
  images: readonly ResolvedImage[];
};

/**
 * Interactive gallery: thumbnails open a full-size lightbox.
 *
 * Only images that exist in /public are clickable — placeholders stay inert so a
 * visitor can never "open" a frame that has no screenshot behind it.
 */
export function GalleryGrid({ folder, images }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = openIndex !== null;
  const current = openIndex !== null ? images[openIndex] : undefined;

  const close = useCallback(() => {
    const node = dialogRef.current;
    if (node?.open) node.close();
    setOpenIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) => {
        if (index === null) return null;
        const next = (index + delta + images.length) % images.length;
        return next;
      });
    },
    [images.length],
  );

  // Native imperative API mirrors the React state, the same way `Dialog` does.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  // Lock background scrolling and compensate for the scrollbar while open.
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /**
   * Opening moves focus onto the thumbnail before `showModal()` runs: a dialog
   * remembers the element that was focused when it opened and restores focus
   * there on close. That is what returns keyboard users to the frame they came
   * from, without fighting the platform's own focus restoration.
   */
  const openAt = useCallback((index: number) => {
    triggerRefs.current[index]?.focus();
    setOpenIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setOpenIndex(null);
  }, []);

  /**
   * Escape is handled here instead of by the browser.
   *
   * Chrome fires `cancel` on every open modal dialog, not only the topmost one,
   * so the lightbox and the case study behind it would close together. Blocking
   * the key's default action stops that cascade; the lightbox closes itself.
   */
  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  // Belt and braces: if `cancel` still arrives (platform-initiated close), keep
  // it from cascading to the dialog underneath.
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    close();
  };

  return (
    <>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const meta = kindMeta[image.kind];
          const src = `${folder}/${image.file}`;
          const alt = `${image.label} — screenshot of ${image.file}`;

          return (
            <li key={image.file} className="group">
              <figure className="overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
                  {image.exists ? (
                    <button
                      type="button"
                      ref={(node) => {
                        triggerRefs.current[index] = node;
                      }}
                      onClick={() => openAt(index)}
                      aria-haspopup="dialog"
                      className={cn(
                        "absolute inset-0 block w-full",
                        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
                      )}
                    >
                      {image.kind === "mobile" ? (
                        <span className="absolute inset-0 flex items-center justify-center p-4">
                          {/* Phone-shaped frame so portrait screenshots are not cropped. */}
                          <span className="relative block h-full aspect-[9/19] overflow-hidden rounded-[1.125rem] border border-line-strong bg-surface">
                            <Image
                              src={src}
                              alt={alt}
                              fill
                              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 10vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </span>
                        </span>
                      ) : (
                        <Image
                          src={src}
                          alt={alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                      <span className="sr-only">Open {image.label} full size</span>
                    </button>
                  ) : image.kind === "mobile" ? (
                    <span className="absolute inset-0 flex items-center justify-center p-4">
                      <span className="relative block h-full aspect-[9/19] overflow-hidden rounded-[1.125rem] border border-line-strong bg-surface">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 grid place-items-center text-fg-subtle/70"
                        >
                          <meta.Icon className="size-4" strokeWidth={1.5} />
                        </span>
                      </span>
                    </span>
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
                      <span className="grid size-10 place-items-center rounded-lg border border-dashed border-line-strong bg-surface text-fg-subtle">
                        <meta.Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                      </span>
                      <p className="text-xs font-medium text-fg-muted">{meta.placeholder}</p>
                      <p className="flex items-center gap-1.5 font-mono text-[0.625rem] text-fg-subtle/80">
                        <ImageIcon aria-hidden="true" className="size-3" />
                        awaiting asset
                      </p>
                    </span>
                  )}
                </div>

                <figcaption className="flex items-center gap-2 border-t border-line px-3.5 py-3">
                  <meta.Icon
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-fg-subtle"
                    strokeWidth={1.75}
                  />
                  <span className="truncate text-xs tracking-tight text-fg-muted">
                    {image.label}
                  </span>
                  {!image.exists ? (
                    <span className="ml-auto shrink-0 font-mono text-[0.625rem] text-fg-subtle/80">
                      {image.file}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onCancel={handleCancel}
        onKeyDown={handleDialogKeyDown}
        onClick={handleBackdropClick}
        aria-label={current ? `${current.label} — enlarged view` : "Enlarged view"}
        className={cn(
          // Full-viewport panel, so the background must be opaque — the page
          // behind would otherwise show through the transparent areas.
          "m-auto h-[100dvh] max-h-[100dvh] w-[100vw] max-w-[100vw] bg-slate-950/95 p-0 text-fg",
          "open:animate-dialog-in",
        )}
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
              {/* Announced on navigation, since arrow keys change it silently. */}
              <div className="min-w-0" aria-live="polite">
                <p className="font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                  {kindMeta[current.kind].label}
                </p>
                <p className="mt-1 truncate text-base font-semibold tracking-tight sm:text-lg">
                  {current.label}
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface/80 text-fg transition-colors duration-200 hover:text-accent"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
                <span className="sr-only">Close enlarged view</span>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-4 py-4 sm:px-6">
              {/*
                `unoptimized` serves the uploaded file untouched. The optimizer
                is free to hand back a rendition *smaller* than the source, which
                is the opposite of what an enlarged view needs.
              */}
              <div className="relative h-full w-full">
                <Image
                  key={current.file}
                  src={`${folder}/${current.file}`}
                  alt={`${current.label} — screenshot of ${current.file}`}
                  fill
                  unoptimized
                  className="object-contain select-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 pb-4 sm:px-6 sm:pb-6">
              <p className="font-mono text-xs text-fg-subtle">
                {openIndex !== null ? openIndex + 1 : 1} / {images.length}
              </p>

              <div className="flex items-center gap-2">
                {images.length > 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="grid size-9 place-items-center rounded-lg border border-line-strong bg-surface/80 transition-colors duration-200 hover:text-accent"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    <span className="sr-only">Previous screenshot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="grid size-9 place-items-center rounded-lg border border-line-strong bg-surface/80 transition-colors duration-200 hover:text-accent"
                  >
                    <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    <span className="sr-only">Next screenshot</span>
                  </button>
                </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}