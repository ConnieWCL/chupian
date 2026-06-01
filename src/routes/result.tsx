import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MOCK_FRAMES, type Frame } from "@/lib/mock-frames";
import { toast } from "sonner";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "出片 · AI 神仙帧" },
      { name: "description", content: "AI 已为你甄选三张黄金底图，一键出片。" },
    ],
  }),
  component: ResultPage,
});

type TemplateId = "vogue" | "xhs" | "live";
const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "vogue", label: "VOGUE 封面" },
  { id: "xhs", label: "清冷街拍" },
  { id: "live", label: "Live 图直出" },
];

const TAGS = [
  "封面级眼神张力",
  "黄金时刻顶光",
  "电影感对称构图",
];

function ResultPage() {
  const [template, setTemplate] = useState<TemplateId>("vogue");
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-background pb-36 pt-10">
      {/* 顶部 */}
      <header className="flex items-center justify-between px-6 fade-up">
        <Link
          to="/"
          className="font-sans text-[11px] tracking-widest-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 返回
        </Link>
        <p className="font-sans text-[10px] tracking-widest-2 text-muted-foreground">
          扫描完成 · 共甄选 3 帧
        </p>
      </header>

      <section className="mt-8 px-6 fade-up">
        <h1 className="font-serif text-[30px] italic leading-tight tracking-display text-foreground">
          神仙底图 · 黄金三帧
        </h1>
        <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted-foreground">
          左右滑动浏览，下方切换模版即可实时套用。
        </p>
      </section>

      {/* 横向滑动大图卡片流 */}
      <section className="mt-8">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
        >
          {MOCK_FRAMES.map((f, i) => (
            <FrameCard
              key={f.id}
              frame={f}
              tag={TAGS[i] ?? "高分神帧"}
              template={template}
              index={i}
            />
          ))}
        </div>

        {/* 指示器 */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {MOCK_FRAMES.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-300 ${
                i === activeIdx ? "w-8 bg-foreground" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 模版切换 */}
      <section className="mt-8 px-6">
        <p className="font-sans text-[10px] tracking-widest-2 text-muted-foreground">
          切换模版
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {TEMPLATES.map((t) => {
            const active = t.id === template;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id)}
                className={`rounded-md border px-2 py-4 text-center transition-all duration-300 active:scale-[0.98] ${
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground/50"
                }`}
              >
                <div className="font-sans text-[12px] tracking-wider-2">
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 底部导出按钮 */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-6 py-5 backdrop-blur">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={() =>
              toast("已保存至相册", {
                description: "你的杂志级成片已飞往照片库 ✦",
              })
            }
            className="w-full rounded-md bg-foreground px-6 py-4 font-sans text-[13px] tracking-widest-2 text-background transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
          >
            导出杂志级高阶成片
          </button>
          <p className="mt-2 text-center font-serif italic text-[11px] text-muted-foreground">
            2048 × 2732 · 300dpi · 无水印
          </p>
        </div>
      </div>
    </main>
  );
}

function FrameCard({
  frame,
  tag,
  template,
  index,
}: {
  frame: Frame;
  tag: string;
  template: TemplateId;
  index: number;
}) {
  const filterCls =
    template === "vogue"
      ? "filter-vogue"
      : template === "xhs"
        ? "filter-xhs"
        : "filter-live";

  return (
    <article
      className="fade-up w-[78vw] max-w-[320px] flex-none snap-center"
      style={{ animationDelay: `${0.05 + index * 0.08}s` }}
    >
      {/* 黑色醒目标签 */}
      <div className="mb-3 inline-flex items-center gap-2 bg-foreground px-3 py-1.5">
        <span className="font-sans text-[10px] tracking-widest-2 text-background">
          [ {tag} ]
        </span>
      </div>

      <div className="relative overflow-hidden rounded-md border border-border bg-card">
        <img
          src={frame.src}
          alt={tag}
          className={`block aspect-[3/4] w-full object-cover transition-all duration-500 ${filterCls}`}
        />

        {/* 时间码 */}
        <div className="absolute left-3 top-3 font-sans text-[10px] tracking-widest-2 text-background mix-blend-difference">
          {String(index + 1).padStart(2, "0")} · {frame.timestamp}
        </div>
        <div className="absolute right-3 top-3 font-serif italic text-xs text-background mix-blend-difference">
          {frame.score}
        </div>

        {/* 模版叠加层 */}
        {template === "vogue" && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <div className="font-serif text-[38px] font-bold leading-none tracking-tight text-background mix-blend-difference">
                VOGUE
              </div>
              <div className="text-right font-sans text-[9px] tracking-widest-2 text-background mix-blend-difference">
                JUNE
                <br />
                2026
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
              <p className="font-serif text-base italic text-background mix-blend-difference">
                {frame.caption}
              </p>
              <p className="mt-1 font-sans text-[10px] tracking-widest-2 text-background mix-blend-difference">
                THE NEW SOFT POWER
              </p>
            </div>
          </>
        )}
        {template === "xhs" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-center">
            <p className="font-serif text-xl italic text-background mix-blend-difference">
              {frame.caption.toLowerCase()}.
            </p>
            <div className="mx-auto mt-2 h-px w-8 bg-background mix-blend-difference" />
            <p className="mt-2 font-sans text-[10px] tracking-widest-2 text-background mix-blend-difference">
              A QUIET AFTERNOON
            </p>
          </div>
        )}
        {template === "live" && (
          <>
            <div className="pointer-events-none absolute left-3 top-9 flex items-center gap-2">
              <span className="reticle-pulse h-1.5 w-1.5 rounded-full bg-background mix-blend-difference" />
              <span className="font-sans text-[10px] tracking-widest-2 text-background mix-blend-difference">
                LIVE
              </span>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 font-serif italic text-xs text-background mix-blend-difference">
              shot on 出片
            </div>
          </>
        )}
      </div>

      {/* 锐评 */}
      <p className="mt-4 font-serif text-[15px] leading-relaxed text-foreground">
        “{frame.verdict}”
      </p>
      <p className="mt-2 font-sans text-[10px] tracking-widest-2 text-muted-foreground">
        — AI 审美锐评
      </p>
    </article>
  );
}
