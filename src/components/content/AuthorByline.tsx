import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/lib/content";
import { formatDate } from "@/lib/utils";

// E-E-A-T byline: links to the author bio (Person schema lives on that page).
export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
}: {
  author: Author | undefined;
  publishedAt: string;
  updatedAt?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {author?.avatar ? (
        <Image
          src={author.avatar.src}
          alt={author.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
          {author?.name.charAt(0) ?? "?"}
        </div>
      )}
      <div className="text-sm">
        <p className="text-fg">
          By{" "}
          {author ? (
            <Link href={author.url} className="focus-ring rounded font-medium hover:text-brand">
              {author.name}
            </Link>
          ) : (
            <span className="font-medium">Staff</span>
          )}
          {author?.role && <span className="text-muted"> · {author.role}</span>}
        </p>
        <p className="text-muted">
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          {updatedAt && (
            <>
              {" "}
              · Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
