import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/lib/content";

// Full author bio strip placed near the foot of a review (E-E-A-T). Links to
// the author's bio page where the Person schema lives.
export function AuthorBio({ author }: { author: Author | undefined }) {
  if (!author) return null;

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-start sm:p-6">
      {author.avatar ? (
        <Image
          src={author.avatar.src}
          alt={author.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xl font-bold text-brand">
          {author.name.charAt(0)}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">Written by</p>
        <p className="mt-1 text-lg font-bold text-fg">
          <Link href={author.url} className="focus-ring rounded hover:text-brand">
            {author.name}
          </Link>
          {author.role && <span className="ml-2 text-sm font-medium text-muted">{author.role}</span>}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{author.bio}</p>
      </div>
    </aside>
  );
}
