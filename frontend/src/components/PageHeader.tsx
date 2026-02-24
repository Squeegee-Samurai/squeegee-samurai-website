import { useState, type ReactNode } from "react";
import { useParallax } from "../hooks/useParallax";

interface PageHeaderProps {
  /** Small uppercase subtitle text (e.g. "Our Story") */
  subtitle: string;
  /** Main heading – can be a string or JSX for multi-line/styled titles */
  title: string | ReactNode;
  /** Optional paragraph below the title */
  description?: string;
  /** Path to the background image in /public */
  backgroundImage: string;
  /** Optional children rendered below description (CTAs, icons, etc.) */
  children?: ReactNode;
  /** Show the aka-600 accent divider line below the title (Pattern B) */
  showAccentLine?: boolean;
  /** Enable subtle parallax scroll on the background image */
  parallax?: boolean;
}

export default function PageHeader({
  subtitle,
  title,
  description,
  backgroundImage,
  children,
  showAccentLine = false,
  parallax = true,
}: PageHeaderProps) {
  const { ref, offset } = useParallax(parallax ? 0.3 : 0);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section ref={ref} className="relative overflow-hidden bg-sumi-900">
      {/* Background image layer */}
      <div
        className={`absolute inset-[-10%] bg-cover bg-center will-change-transform transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          transform: parallax ? `translateY(${offset * 0.5}px)` : undefined,
        }}
      />

      {/* Gradient overlay – multi-stop dark blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-sumi-900/90 via-indigo-900/70 to-sumi-900/90" />

      {/* Subtle bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-washi-200/20" />

      {/* Content */}
      <div className="section-container relative z-10 py-20 lg:py-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
          {subtitle}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl text-balance">
          {title}
        </h1>
        {showAccentLine && (
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
        )}
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Hidden image preloader */}
      <img
        src={backgroundImage}
        alt=""
        className="sr-only"
        onLoad={() => setImageLoaded(true)}
        aria-hidden="true"
      />
    </section>
  );
}
