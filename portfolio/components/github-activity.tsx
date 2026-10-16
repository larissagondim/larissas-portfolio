"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => ({ default: mod.GitHubCalendar })),
  { ssr: false }
);

const scale = [0, 1, 2, 3, 4].map((level) => `var(--calendar-${level})`);

export default function GithubActivity({ username = "larissagondim" }: { username?: string }) {
  return (
    <div className="overflow-x-auto rounded-box border border-line bg-surface p-4 shadow-box">
      <GitHubCalendar
        username={username}
        colorScheme="light"
        theme={{ light: scale, dark: scale }}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
      />
    </div>
  );
}
