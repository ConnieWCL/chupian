import frame1 from "@/assets/frame1.jpg";
import frame2 from "@/assets/frame2.jpg";
import frame3 from "@/assets/frame3.jpg";

export type Frame = {
  id: string;
  src: string;
  timestamp: string;
  verdict: string;
  caption: string;
  score: number;
};

export const MOCK_FRAMES: Frame[] = [
  {
    id: "f1",
    src: frame1,
    timestamp: "00:04",
    verdict: "眼神极具故事感，完美三分法构图",
    caption: "The Quiet Hour",
    score: 98,
  },
  {
    id: "f2",
    src: frame2,
    timestamp: "00:11",
    verdict: "黄金时刻顶光，肩线与街道形成隐性透视",
    caption: "Off Duty in Paris",
    score: 96,
  },
  {
    id: "f3",
    src: frame3,
    timestamp: "00:23",
    verdict: "对称构图，唇色与背景互为呼应，氛围克制",
    caption: "Soft Power",
    score: 95,
  },
];

export const getFrame = (id: string | undefined): Frame =>
  MOCK_FRAMES.find((f) => f.id === id) ?? MOCK_FRAMES[0];