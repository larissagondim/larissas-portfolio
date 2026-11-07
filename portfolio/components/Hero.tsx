import { MapPin, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Hero() {
  const t = useTranslations("Hero");
  const lines = [t("title").split(" ")[0], t("title").split(" ").slice(1).join(" ")];

  return (
    <header className="flex flex-col gap-8">
      <span aria-hidden className="draw-rule h-1 w-16 bg-accent" />
      <h1 className="text-6xl leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-7xl md:text-9xl">
        {lines.map((line, i) => (
          <span key={line} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
            <span className="line-in block" style={stagger(i)}>
              {line}
            </span>
          </span>
        ))}
      </h1>
      <p className="rise max-w-[36ch] text-xl leading-snug text-muted sm:text-2xl" style={stagger(4)}>
        {t("subtitle")}
      </p>
      <ul className="rise flex flex-col gap-2 text-sm" style={stagger(5)}>
        <li className="flex items-center gap-2">
          <MapPin className="size-4 text-accent" aria-hidden /> {t("location")}
        </li>
        <li className="flex items-center gap-2">
          <GraduationCap className="size-4 text-accent" aria-hidden /> {t("university")}
        </li>
      </ul>
    </header>
  );
}
