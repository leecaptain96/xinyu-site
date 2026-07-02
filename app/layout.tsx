import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "石新雨｜商务沟通 · 项目对接 · 内容获客",
  description:
    "石新雨的个人商务品牌网站：法律服务背景，专注商务洽谈、项目资源对接与短视频内容获客。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
