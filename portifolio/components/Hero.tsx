import { MapPin, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatars.githubusercontent.com/u/198407031?v=4"
          alt="Larissa"
          className="size-24 shrink-0 rounded-box border border-line"
        />
        <div>
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-xl text-muted">{t("subtitle")}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex items-center gap-2">
          <MapPin className="size-4" aria-hidden /> {t("location")}
        </li>
        <li className="flex items-center gap-2">
          <GraduationCap className="size-4" aria-hidden /> {t("university")}
        </li>
      </ul>

      <p className="text-sm text-muted">
        {(["cc", "ai", "dev", "problems"] as const).map((k) => t(`tags.${k}`)).join(" · ")}
      </p>
    </header>
  );
}
