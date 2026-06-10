import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "./AdSlot";
import { AffiliateButton } from "./AffiliateButton";
import { Disclosure } from "./Disclosure";
import { NewsletterForm } from "./NewsletterForm";

// Velite compiles MDX to a function-body string. Evaluate it once to get the
// component. (Trusted, build-time content from our own repo.)
function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

// Components available to MDX authors + element overrides for styling/perf.
const components = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href.startsWith("/")) return <Link href={href} {...props} />;
    if (href.startsWith("#")) return <a href={href} {...props} />;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" {...props} alt={props.alt ?? ""} className="rounded-xl" />
  ),
  // Wide GFM tables would otherwise overflow the viewport on phones; let the
  // table scroll horizontally inside its own box instead of the whole page.
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="-mx-4 overflow-x-auto sm:mx-0">
      <table {...props} className="min-w-full" />
    </div>
  ),
  // Shortcodes usable inside MDX:
  AdSlot,
  AffiliateButton,
  Disclosure,
  NewsletterForm,
  Image,
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
