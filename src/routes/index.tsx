import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import videoCover from "@/assets/video-cover.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "出片 — 让 AI 替你挑神仙帧" },
      {
        name: "description",
        content: "上传爱豆 / 旅拍短视频，AI 视觉审美扫描，自动甄选神图。",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleUpload = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      navigate({ to: "/result" });
    }, 3200);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-background px-6 pb-12 pt-10">
      <header className="flex items-center justify-between fade-up">
        <div className="font-serif italic text-xl tracking-display">出片</div>
        <div className="font-sans text-[10px] uppercase tracking-widest-2 text-muted-foreground">
          Editorial · AI
        </div>
      </header>

      <section className="mt-14 fade-up">
        <p className="font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground">
          Issue 001 — June MMXXVI
        </p>
        <h1 className="mt-4 font-serif text-[44px] leading-[1.05] tracking-display text-foreground">
          Let the algorithm
          <br />
          <span className="italic">curate</span> your
          <br />
          golden frame.
        </h1>
        <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground">
          上传你的旅拍 · 爱豆现场 · 街头短片，
          <br />
          AI 将逐帧进行视觉审美扫描，
          <br />
          为你呈上仅有的几张神仙帧。
        </p>
      </section>

      <section className="mt-10 fade-up">
        <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <img
            src={videoCover}
            alt="待扫描视频封面"
            className="block h-[280px] w-full object-cover"
          />
          {scanning && <div className="scan-beam" aria-hidden />}
          <Reticle />
          <div className="absolute left-3 top-3 font-sans text-[10px] uppercase tracking-widest-2 text-background mix-blend-difference">
            {scanning ? "Scanning…" : "Ready"}
          </div>
          <div className="absolute bottom-3 right-3 font-serif italic text-xs text-background mix-blend-difference">
            00:00 — 00:32
          </div>
        </div>

        {scanning ? (
          <div className="mt-6 space-y-2">
            <p className="font-serif italic text-foreground">
              AI 正在逐帧进行视觉审美扫描…
            </p>
            <div className="space-y-1 font-sans text-[11px] uppercase tracking-wider-2 text-muted-foreground">
              <p className="reticle-pulse">› analyzing composition</p>
              <p className="reticle-pulse" style={{ animationDelay: "0.3s" }}>
                › evaluating light &amp; tone
              </p>
              <p className="reticle-pulse" style={{ animationDelay: "0.6s" }}>
                › selecting golden frames
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center font-sans text-[11px] uppercase tracking-widest-2 text-muted-foreground">
            点击下方按钮 · 开始一次视觉策展
          </p>
        )}
      </section>

      <div className="flex-1" />

      <button
        type="button"
        onClick={handleUpload}
        disabled={scanning}
        className="group mt-10 w-full rounded-md border border-foreground bg-background px-6 py-5 font-sans text-[13px] uppercase tracking-widest-2 text-foreground shadow-sm transition-all duration-300 hover:bg-foreground hover:text-background active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {scanning ? "Scanning in progress…" : "导入爱豆 / 旅拍短视频"}
      </button>
      <p className="mt-3 text-center font-serif italic text-[11px] text-muted-foreground">
        — supports .mp4 / .mov / live photo —
      </p>
    </main>
  );
}

function Reticle() {
  const base = "absolute h-3 w-3 border-background mix-blend-difference";
  return (
    <>
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} left-2 bottom-2 border-l border-b`} />
      <span className={`${base} right-2 bottom-2 border-r border-b`} />
    </>
  );
}