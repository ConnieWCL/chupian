import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { getFrame } from "@/lib/mock-frames";
import { toast } from "sonner";

const searchSchema = z.object({
  id: z.string().optional(),
});

export const Route = createFileRoute("/edit")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "出片 — 编辑" },
      { name: "description", content: "为你的神仙帧套上杂志级模版。" },
    ],
  }),
  component: EditPage,
});

type TemplateId = "vogue" | "xhs" | "live";

const TEMPLATES: { id: TemplateId; label: string; sub: string }[] = [
  { id: "vogue", label: "VOGUE", sub: "Cover" },
  { id: "xhs", label: "冷淡风", sub: "Editorial" },
  { id: "live", label: "Live 图", sub: "Raw" },
];

function EditPage() {
  const { id } = Route.useSearch();
  const frame = getFrame(id);
  const [template, setTemplate] = useState<TemplateId>("vogue");

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-background px-6 pb-12 pt-10">
      <header className="flex items-center justify-between fade-up">
        <Link
          to="/result"
          className="font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Reselect
        </Link>
        <div className="font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
          03 / Compose
        </div>
      </header>

      <section className="mt-8 fade-up">
        <p className="font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground">
          Now styling — {frame.caption}
        </p>
        <h1 className="mt-2 font-serif text-[28px] italic leading-tight tracking-display">
          Dress the frame.
        </h1>
      </section>

      {/* Canvas */}
      <section className="mt-8 fade-up">
        <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <img
            key={template}
            src={frame.src}
            alt={frame.caption}
            className={`block aspect-[3/4] w-full object-cover transition-all duration-500 fade-up ${
              template === "vogue"
                ? "filter-vogue"
                : template === "xhs"
                  ? "filter-xhs"
                  : "filter-live"
            }`}
          />

          {template === "vogue" && <VogueOverlay caption={frame.caption} />}
          {template === "xhs" && <XhsOverlay caption={frame.caption} />}
          {template === "live" && <LiveOverlay timestamp={frame.timestamp} />}
        </div>
      </section>

      {/* Templates */}
      <section className="mt-8">
        <p className="font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
          Templates
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {TEMPLATES.map((t) => {
            const active = t.id === template;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id)}
                className={`rounded-md border px-3 py-4 text-center shadow-sm transition-all duration-300 active:scale-[0.98] ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground/40"
                }`}
              >
                <div className="font-serif text-base italic tracking-display">
                  {t.label}
                </div>
                <div className="mt-1 font-sans text-[9px] uppercase tracking-widest-2 opacity-70">
                  {t.sub}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex-1" />

      <button
        type="button"
        onClick={() =>
          toast("已保存至相册", {
            description: "你的高级大片正在飞往照片库 ✦",
          })
        }
        className="mt-10 w-full rounded-md border border-foreground bg-foreground px-6 py-5 font-sans text-[13px] uppercase tracking-widest-2 text-background shadow-sm transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
      >
        保存高级大片到相册
      </button>
      <p className="mt-3 text-center font-serif italic text-[11px] text-muted-foreground">
        — exported at 2048 × 2732 · 300dpi —
      </p>
    </main>
  );
}

function VogueOverlay({ caption }: { caption: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
        <div className="font-serif text-[44px] font-bold leading-none tracking-tight text-background mix-blend-difference">
          VOGUE
        </div>
        <div className="text-right font-sans text-[9px] uppercase tracking-widest-2 text-background mix-blend-difference">
          JUNE
          <br />
          2026
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="font-serif text-base italic text-background mix-blend-difference">
          {caption}
        </p>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-widest-2 text-background mix-blend-difference">
          The new soft power · Cover story
        </p>
      </div>
    </>
  );
}

function XhsOverlay({ caption }: { caption: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center">
        <p className="font-serif text-2xl italic text-background mix-blend-difference">
          {caption.toLowerCase()}.
        </p>
        <div className="mx-auto mt-3 h-px w-10 bg-background mix-blend-difference" />
        <p className="mt-3 font-sans text-[10px] uppercase tracking-widest-2 text-background mix-blend-difference">
          a quiet afternoon · no.04
        </p>
      </div>
    </>
  );
}

function LiveOverlay({ timestamp }: { timestamp: string }) {
  return (
    <>
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-background mix-blend-difference reticle-pulse" />
        <span className="font-sans text-[10px] uppercase tracking-widest-2 text-background mix-blend-difference">
          LIVE · {timestamp}
        </span>
      </div>
      <div className="pointer-events-none absolute right-4 bottom-4 font-serif italic text-xs text-background mix-blend-difference">
        shot on 出片
      </div>
    </>
  );
}