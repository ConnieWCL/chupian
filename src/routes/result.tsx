import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MOCK_FRAMES } from "@/lib/mock-frames";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "出片 — AI 神仙帧" },
      { name: "description", content: "AI 已为你甄选三张黄金帧。" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(MOCK_FRAMES[0].id);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-background px-6 pb-32 pt-10">
      <header className="flex items-center justify-between fade-up">
        <Link
          to="/"
          className="font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
        <div className="font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
          02 / Curation
        </div>
      </header>

      <section className="mt-10 fade-up">
        <p className="font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground">
          Scan complete · 32s · 768 frames
        </p>
        <h1 className="mt-3 font-serif text-[34px] leading-[1.1] tracking-display">
          The <span className="italic">golden</span> three.
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          AI 视觉审美引擎认为，整段视频中只有这三帧值得被记住。
        </p>
      </section>

      <section className="mt-10 space-y-10">
        {MOCK_FRAMES.map((f, i) => {
          const isSelected = selected === f.id;
          return (
            <article
              key={f.id}
              className="fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <button
                type="button"
                onClick={() => setSelected(f.id)}
                className={`relative block w-full overflow-hidden rounded-md border bg-card text-left shadow-sm transition-all duration-300 ${
                  isSelected
                    ? "border-foreground"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <img
                  src={f.src}
                  alt={f.caption}
                  loading="lazy"
                  className="block aspect-[3/4] w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest-2 text-background mix-blend-difference">
                  <span>FRAME 0{i + 1}</span>
                  <span className="opacity-60">·</span>
                  <span>{f.timestamp}</span>
                </div>
                <div className="absolute right-3 top-3 font-serif italic text-xs text-background mix-blend-difference">
                  {f.score}
                </div>
                <div
                  className={`absolute right-3 bottom-3 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-background bg-background text-foreground"
                      : "border-background/70 text-transparent"
                  } mix-blend-difference`}
                >
                  ✓
                </div>
              </button>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-lg italic tracking-display text-foreground">
                  {f.caption}
                </h2>
                <span className="font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
                  T+{f.timestamp}
                </span>
              </div>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-muted-foreground">
                <span className="text-foreground">“</span>
                {f.verdict}
                <span className="text-foreground">”</span>
              </p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
                — AI Aesthetic Critic
              </p>
            </article>
          );
        })}
      </section>

      {/* Sticky action */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4">
          <p className="font-serif italic text-sm text-muted-foreground">
            {selected ? "已选定 1 帧" : "请选择一帧"}
          </p>
          <button
            type="button"
            disabled={!selected}
            onClick={() =>
              selected &&
              navigate({ to: "/edit", search: { id: selected } })
            }
            className="rounded-md border border-foreground bg-foreground px-6 py-3 font-sans text-[12px] uppercase tracking-widest-2 text-background shadow-sm transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            进入出片 →
          </button>
        </div>
      </div>
    </main>
  );
}