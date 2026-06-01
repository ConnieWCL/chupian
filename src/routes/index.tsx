import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import videoCover from "@/assets/video-cover.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "出片 CHU PIAN · AI 视频神仙帧捕捉器" },
      {
        name: "description",
        content: "导入 10 秒爱豆或旅拍视频，AI 自动捕捉最具情绪张力的神仙帧。",
      },
    ],
  }),
  component: Index,
});

const SCAN_HINTS = [
  "正在进行端侧画质无损切片…",
  "正在基于神经美学过滤闭眼与模糊帧…",
  "AI 正在捕捉最具情绪张力的瞬间…",
];

function Index() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleUpload = () => {
    if (scanning) return;
    setScanning(true);
  };

  useEffect(() => {
    if (!scanning) return;
    const tick = setInterval(() => {
      setHintIndex((i) => (i + 1) % SCAN_HINTS.length);
    }, 1400);
    const done = setTimeout(() => {
      navigate({ to: "/result" });
    }, 4400);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [scanning, navigate]);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-background px-6 pb-14 pt-12">
      {/* 顶部品牌标语 */}
      <header className="fade-up text-center">
        <p className="font-sans text-[11px] tracking-widest-2 text-muted-foreground">
          <span className="font-serif italic text-foreground text-base align-middle">
            出片
          </span>
          <span className="mx-2 align-middle">CHU PIAN</span>
          <span className="mx-1 align-middle opacity-50">·</span>
          <span className="align-middle">AI 视频神仙帧捕捉器</span>
        </p>
        <div className="mx-auto mt-5 h-px w-10 bg-border" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center py-16">
        {!scanning ? (
          /* 中心呼吸卡片 */
          <button
            type="button"
            onClick={handleUpload}
            className="breathe group relative flex aspect-[3/4] w-full max-w-[300px] flex-col items-center justify-center rounded-md border border-border bg-card text-center transition-all duration-500 hover:border-foreground/60"
          >
            <Reticle />
            <div className="font-sans text-[10px] tracking-widest-2 text-muted-foreground">
              POINT · 01
            </div>
            <div className="mt-6 font-serif text-[26px] italic leading-tight tracking-display text-foreground">
              导入 10s
              <br />
              爱豆或旅拍视频
            </div>
            <div className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] tracking-widest-2 text-foreground">
              <span className="h-px w-6 bg-foreground" />
              <span>点击此处上传</span>
              <span className="h-px w-6 bg-foreground" />
            </div>
            <div className="mt-3 font-sans text-[10px] tracking-widest-2 text-muted-foreground">
              支持 MP4 / MOV / 实况
            </div>
          </button>
        ) : (
          /* 原地展开的扫描视图 */
          <div className="w-full max-w-[300px] fade-up">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-card">
              <img
                src={videoCover}
                alt="待扫描视频封面"
                className="block h-full w-full object-cover"
              />
              <div className="scan-beam" aria-hidden />
              <Reticle />
              <div className="absolute left-3 top-3 font-sans text-[10px] tracking-widest-2 text-background mix-blend-difference">
                正在扫描
              </div>
              <div className="absolute bottom-3 right-3 font-serif italic text-xs text-background mix-blend-difference">
                00:00 — 00:10
              </div>
            </div>

            <div className="mt-8 min-h-[44px] text-center">
              <p
                key={hintIndex}
                className="hint-rotate font-serif italic text-[15px] text-foreground"
              >
                {SCAN_HINTS[hintIndex]}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {SCAN_HINTS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-px w-6 transition-all duration-500 ${
                      i === hintIndex ? "bg-foreground" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-center font-sans text-[10px] tracking-widest-2 text-muted-foreground">
        端侧处理 · 不上传云端
      </p>
    </main>
  );
}

function Reticle() {
  const base = "pointer-events-none absolute h-3 w-3 border-foreground/40";
  return (
    <>
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} left-2 bottom-2 border-l border-b`} />
      <span className={`${base} right-2 bottom-2 border-r border-b`} />
    </>
  );
}