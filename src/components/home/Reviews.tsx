import Image from "next/image";
import { reviewsBlock } from "@/content/copy";
import { videoReviews } from "@/content/reviews";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/Heading";
import { ArrowUpRight, Comment, Heart, Instagram, LogoMark, Play, Send, Star } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

const handle = site.instagramHandle.replace("@", "");

export function Reviews() {
  return (
    <SectionCard id="reviews" clip>
      <SectionHead
        eyebrow={reviewsBlock.eyebrow}
        title={reviewsBlock.title}
        lead={reviewsBlock.lead}
        className="lg:[&>div:first-child]:col-span-8 lg:[&>div:last-child]:col-span-4"
        action={
          <a href={site.instagramReviews} target="_blank" rel="noopener noreferrer" className="btn ig-btn w-full sm:w-auto" data-variant="primary">
            <Instagram /> {reviewsBlock.instagramCta}
            <ArrowUpRight />
          </a>
        }
      />

      {/* Показатель доверия: реальные цифры из 2ГИС */}
      <Reveal className="trust-strip mb-6 lg:mb-8">
        <span className="t-mono trust-score">{site.stats.rating.toFixed(1)}</span>
        <span className="flex flex-col gap-1">
          <span className="flex gap-0.5 text-accent" role="img" aria-label={`Оценка ${site.stats.rating.toFixed(1)} из 5`}>
            {Array.from({ length: 5 }, (_, star) => (
              <Star key={star} width={18} height={18} />
            ))}
          </span>
          <Mono className="text-ink-muted">
            {site.stats.reviews} отзывов · 2ГИС
          </Mono>
        </span>
        <a href={site.map2gis} target="_blank" rel="noopener noreferrer" className="text-link ml-auto hidden sm:inline-flex">
          Читать в 2ГИС <ArrowUpRight />
        </a>
      </Reveal>

      <Reveal group className="reels-row">
        {videoReviews.map((review) => (
          <a
            key={review.cover}
            href={review.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal-item=""
            aria-label={`Смотреть видеоотзыв в Instagram: ${review.caption}`}
            className="reel group"
          >
            <Image src={review.cover} alt={review.coverAlt} fill sizes="(min-width: 1024px) 24vw, 72vw" className="reel-cover" />
            <span className="reel-shade" aria-hidden="true" />

            <span className="reel-top">
              <span className="reel-avatar">
                <LogoMark width={22} height={22} />
              </span>
              <span className="text-[13px] font-semibold">{handle}</span>
              <span className="reel-tag">Reels</span>
            </span>

            <span className="reel-play" aria-hidden="true">
              <Play width={26} height={26} />
            </span>

            <span className="reel-side" aria-hidden="true">
              <Heart />
              <Comment />
              <Send />
            </span>

            <span className="reel-bottom">
              <span className="block text-[15px] font-semibold leading-tight">{review.title}</span>
              <span className="mt-1 block text-[13px] leading-snug opacity-85">{review.caption}</span>
            </span>
          </a>
        ))}
      </Reveal>
    </SectionCard>
  );
}
