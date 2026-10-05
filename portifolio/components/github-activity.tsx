"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => ({ default: mod.GitHubCalendar })),
  { ssr: false }
);

const scale = ["#ebedf0", "#bfdbfe", "#60a5fa", "#2563eb", "#1d4ed8"];

export default function GithubActivity({ username = "larissagondim" }: { username?: string }) {
  return (
    <div className="overflow-x-auto rounded-box border border-line p-4">
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
