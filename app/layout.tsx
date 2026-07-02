import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "石新雨｜让复杂的业务，变成清晰的合作",
  description: "石新雨个人品牌官网：法律服务背景、商务沟通、项目资源匹配与短视频内容获客。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
