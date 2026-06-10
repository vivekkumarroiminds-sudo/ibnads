import Link from "next/link";
import Image from "next/image";
import type { Review } from "@/lib/content";
import { RatingStars } from "./RatingStars";
import { Badge } from "@/components/ui/Badge";
import { slugify } from "@/lib/content";

export function ReviewCard({ review, priority = false }: { review: Review; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        {review.coverImage ? (
          <Image
            src={review.coverImage.src}
            alt={review.coverImage.blurDataURL ? "" : review.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder={review.coverImage.blurDataURL ? "blur" : "empty"}
            blurDataURL={review.coverImage.blurDataURL}
            priority={priority}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-bold text-border">
            {review.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Link
            href={`/categories/${slugify(review.category)}`}
            className="focus-ring relative z-10 rounded"
          >
            <Badge tone="brand">{review.category}</Badge>
          </Link>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-fg">
          {/* Card-wide click target via stretched link. */}
          <Link href={review.url} className="focus-ring rounded after:absolute after:inset-0">
            {review.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted">{review.excerpt}</p>

        <div className="mt-4 flex items-center justify-between pt-2">
          <RatingStars value={review.rating} size="sm" />
          {review.affiliate?.price && (
            <span className="text-sm font-semibold text-fg">{review.affiliate.price}</span>
          )}
        </div>
      </div>
    </article>
  );
}
