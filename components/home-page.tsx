"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  capabilities,
  cooperation,
  experiences,
  processSteps,
  videos,
  type VideoItem,
} from "@/components/content";
import {
  ArrowIcon,
  CapabilityIcon,
  CloseIcon,
  PlayIcon,
  Reveal,
  SectionLabel,
} from "@/components/ui";

const navItems = [
  { label: "关于我", href: "#about" },
  { label: "核心能力", href: "#capabilities" },
  { label: "内容作品", href: "#content" },
  { label: "项目经历", href: "#experience" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-black/10 bg-paper/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,.04)] backdrop-blur-xl" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3" aria-label="返回首页">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white transition-transform duration-300 group-hover:rotate-[-8deg]">
            石
          </span>
          <span>
            <span className="block text-[15px] font-semibold tracking-[0.16em]">石新雨</span>
            <span className="block text-[9px] uppercase tracking-[0.22em] text-black/45">Business Partner</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-black/60 transition-colors hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group hidden items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-white transition-colors hover:bg-moss md:flex"
        >
          发起合作
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-black/15 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="打开导航"
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-1 h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`absolute bottom-1 left-0 h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 mt-3 rounded-2xl border border-black/10 bg-[#f8f5ee] p-5 shadow-soft md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-black/10 py-4 text-lg last:border-0"
              >
                {item.label}<ArrowIcon className="h-4 w-4" />
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 flex justify-center rounded-full bg-ink px-5 py-4 text-white">
              发起合作
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 80]);
  const textY = useTransform(scrollY, [0, 700], [0, 35]);

  return (
    <section id="top" className="page-grid relative overflow-hidden border-b border-black/10 pt-28 lg:pt-32">
      <div className="pointer-events-none absolute left-[3%] top-[14%] h-80 w-80 rounded-full bg-[#cabdab]/35 blur-3xl" />
      <div className="mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-10 px-5 pb-14 md:px-8 lg:grid-cols-[.96fr_1.04fr] lg:px-12">
        <motion.div style={{ y: textY }} className="relative z-10 pb-4 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-moss"
          >
            <span className="h-px w-9 bg-moss/50" />
            Business · Legal · Content
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.75rem] font-semibold leading-[1.01] tracking-[-0.065em] sm:text-[clamp(3.35rem,5.25vw,6.4rem)]"
          >
            <span className="md:whitespace-nowrap">让每一次沟通，</span>
            <br />
            <span className="text-moss md:whitespace-nowrap">都成为一次合作。</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-8 max-w-2xl"
          >
            <p className="text-base font-medium leading-8 md:text-lg">
              法律服务背景<span className="mx-2 text-black/25">｜</span>商务洽谈与项目对接<span className="mx-2 text-black/25">｜</span>
              <br className="hidden sm:block" />短视频内容表达与线上获客
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-black/55 md:text-base">
              专注企业客户沟通、项目资源匹配与合作流程推进，也擅长通过短视频和内容表达，让复杂业务更容易被客户理解与看见。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#capabilities" className="group flex items-center gap-4 rounded-full bg-ink px-6 py-4 text-sm text-white transition-all hover:bg-moss">
                查看合作方向<ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#content" className="group flex items-center gap-3 rounded-full border border-black/20 px-6 py-4 text-sm transition-all hover:border-black hover:bg-white/50">
                <PlayIcon className="h-4 w-4" />了解我的内容作品
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[650px] lg:ml-auto"
        >
          <div className="absolute -left-3 top-[10%] z-20 rounded-2xl border border-white/60 bg-white/75 px-5 py-4 shadow-soft backdrop-blur-xl md:-left-16">
            <p className="text-[9px] uppercase tracking-[.22em] text-black/40">Background</p>
            <p className="mt-1 text-sm font-semibold">法律服务背景</p>
          </div>
          <div className="absolute -right-3 top-[28%] z-20 hidden rounded-2xl border border-white/20 bg-ink/80 px-5 py-4 text-white shadow-soft backdrop-blur-xl sm:block md:-right-8">
            <p className="text-[9px] uppercase tracking-[.22em] text-white/45">Business</p>
            <p className="mt-1 text-sm font-semibold">谈判与资源对接</p>
          </div>
          <div className="absolute -left-2 bottom-[22%] z-20 hidden rounded-2xl border border-white/30 bg-moss/85 px-5 py-4 text-white shadow-soft backdrop-blur-xl sm:block md:-left-12">
            <p className="text-[9px] uppercase tracking-[.22em] text-white/50">Communication</p>
            <p className="mt-1 text-sm font-semibold">企业客户沟通</p>
          </div>
          <motion.div style={{ y: imageY }} className="paper-noise relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#cfc4b4] shadow-soft md:rounded-[3rem]">
            {/* 可替换位置：建议替换为石新雨会议室、办公桌或拍摄现场的 4:5 商务形象照。 */}
            <Image
              src="/videos/case-01-poster.jpg"
              alt="石新雨在办公场景中的内容出镜画面"
              fill
              priority
              className="object-cover object-[center_22%]"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between rounded-2xl border border-white/25 bg-black/45 p-5 text-white backdrop-blur-md md:inset-x-7 md:bottom-7">
              <div>
                <p className="text-[10px] uppercase tracking-[.24em] text-white/60">Personal Business Partner</p>
                <p className="mt-1 text-xl font-semibold tracking-wide">石新雨 / SHI XINYU</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-lg">↗</span>
            </div>
          </motion.div>
          <div className="absolute -bottom-5 -right-3 z-20 grid h-24 w-24 place-items-center rounded-full bg-wine text-center text-[10px] font-semibold uppercase leading-4 tracking-[.16em] text-white shadow-soft md:-right-9 md:h-28 md:w-28">
            Content
            <br />& Camera
          </div>
        </motion.div>
      </div>
      <div className="overflow-hidden border-y border-black/10 bg-[#e7e1d6]/80 py-4">
        <div className="marquee text-sm font-medium tracking-[.04em]">
          {["商务洽谈", "项目对接", "法律服务咨询", "内容获客", "短视频运营", "主播出镜", "企业客户开发", "商务洽谈", "项目对接", "法律服务咨询", "内容获客", "短视频运营", "主播出镜", "企业客户开发"].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-5 flex items-center gap-5 whitespace-nowrap"><span className="text-wine">✦</span>{item}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 md:grid-cols-4 md:px-8 lg:px-12">
        {[["50+", "内容作品"], ["1W+", "单条播放"], ["30%", "视频获客占比"], ["MULTI", "多行业沟通经验"]].map(([value, label], index) => (
          <div key={label} className="border-r border-black/10 px-3 py-9 last:border-0 md:px-8 md:py-12 md:first:pl-0">
            <p className={`font-semibold leading-none tracking-[-.06em] ${index === 3 ? "text-3xl md:text-5xl" : "text-5xl md:text-7xl"}`}>{value}</p>
            <p className="mt-3 text-xs text-black/45">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const tags = ["商务洽谈", "企业客户沟通", "法律服务咨询", "资源匹配", "项目推进", "客户开发", "短视频运营", "口播出镜", "直播表达", "内容获客"];
  return (
    <section id="about" className="relative overflow-hidden bg-[#dcd5c8] py-20 md:py-28">
      <div className="absolute right-0 top-0 text-[16rem] font-bold leading-none tracking-[-.1em] text-white/20 md:text-[28rem]">SX</div>
      <div className="relative mx-auto grid max-w-[1320px] gap-8 px-5 md:px-8 lg:grid-cols-[.78fr_1.22fr]">
        <Reveal className="relative min-h-[650px] overflow-hidden rounded-[2rem] md:min-h-[820px]">
          <Image src="/videos/case-02-poster.jpg" alt="石新雨法律内容口播出镜" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 42vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-x-7 bottom-7 text-white">
            <p className="text-[10px] uppercase tracking-[.25em] text-white/55">Shi Xinyu · Business Partner</p>
            <p className="mt-2 text-2xl font-semibold">法律理解 × 商务沟通 × 内容表达</p>
          </div>
        </Reveal>
        <div className="flex flex-col justify-between gap-10 rounded-[2rem] bg-paper/75 p-6 backdrop-blur-sm md:p-10 lg:p-12">
          <Reveal>
            <SectionLabel>Personal brand · 人物品牌</SectionLabel>
            <h2 className="text-4xl font-semibold leading-[1.12] tracking-[-0.05em] md:text-7xl">懂业务的人，<br />不只会说，<br /><span className="text-wine">更知道怎么推进。</span></h2>
            <p className="mt-7 max-w-2xl text-[15px] leading-8 text-black/60 md:text-base">从法律服务、企业沟通，到项目资源匹配和短视频获客，我更关注合作有没有真正发生，而不是只停留在一次沟通里。长期服务企业客户、个体经营者及多行业合作方，在真实业务里理解需求、建立信任并推动执行。</p>
          </Reveal>
          <Reveal className="grid gap-px overflow-hidden rounded-2xl bg-black/10 sm:grid-cols-2">
            {[["身份", "法律服务 / 商务拓展 / 内容表达"], ["城市", "海口 · HAIKOU"], ["服务对象", "企业主、创业者、个体经营者、合作机构"], ["工作方式", "沟通、匹配、推进、落地"]].map(([label, value]) => (
              <div key={label} className="min-h-[120px] bg-[#eee9df] p-5"><p className="text-[10px] uppercase tracking-[.2em] text-black/35">{label}</p><p className="mt-4 text-base font-semibold leading-7">{value}</p></div>
            ))}
          </Reveal>
          <Reveal className="flex flex-wrap gap-3">
            {tags.map((tag, index) => <motion.span key={tag} whileHover={{ y: -3 }} className={`rounded-full border px-5 py-3 text-sm ${index % 4 === 0 ? "border-moss bg-moss text-white" : "border-black/15 bg-white/40"}`}>{tag}</motion.span>)}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#e9e4da] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <SectionLabel>Core capabilities · 核心能力</SectionLabel>
            <h2 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">让每一种能力，<br />都服务于业务结果。</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-black/55">从第一次沟通，到方案落地与内容传播，连接每一个容易断开的环节。</p>
        </Reveal>
        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className={`${index === 0 ? "md:col-span-2 lg:row-span-2" : ""} ${index === 1 ? "lg:col-span-2" : ""} ${index === 3 ? "lg:col-span-2" : ""}`}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-black/10 p-7 transition-[border-color,box-shadow] duration-300 hover:border-moss/50 hover:shadow-soft md:p-8 ${index === 0 ? "bg-moss text-white" : index === 1 ? "bg-[#c9b7a3]" : index === 3 ? "bg-ink text-white" : index === 4 ? "bg-wine text-white" : "bg-paper"}`}
              >
                {index === 0 && <Image src="/videos/case-01-poster.jpg" alt="商务沟通场景" fill className="object-cover opacity-30 mix-blend-luminosity" sizes="50vw" />}
                {index === 3 && <Image src="/videos/case-02-poster.jpg" alt="短视频出镜场景" fill className="object-cover opacity-25 mix-blend-luminosity" sizes="50vw" />}
                <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-current/20 transition-transform group-hover:rotate-6"><CapabilityIcon name={item.icon} /></span>
                  <span className="text-5xl font-semibold tracking-[-.06em] opacity-15">{item.number}</span>
                </div>
                <div><h3 className={`${index === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} font-semibold tracking-[-.04em]`}>{item.title}</h3><p className={`mt-4 max-w-xl text-sm leading-7 ${[0,3,4].includes(index) ? "text-white/65" : "text-black/55"}`}>{item.description}</p><p className="mt-5 text-[10px] font-semibold tracking-[.12em] opacity-55">{item.note}</p></div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs leading-6 text-black/40">* 法律及相关项目内容仅限前期咨询、需求梳理、信息匹配与合规机构服务对接，不构成结果承诺。</p>
      </div>
    </section>
  );
}

function Cooperation() {
  const first = cooperation.slice(0, 5);
  const second = cooperation.slice(5);
  const Tag = ({ label }: { label: string }) => (
    <span className="mx-2 flex items-center gap-3 whitespace-nowrap rounded-full border border-black/15 bg-paper/60 px-5 py-3.5 text-sm md:px-7 md:py-4 md:text-base">
      <span className="h-1.5 w-1.5 rounded-full bg-wine" />{label}
    </span>
  );
  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#f0ece4] py-20 md:py-28">
      <Reveal className="mx-auto mb-12 max-w-[1280px] px-5 text-center md:px-8">
        <SectionLabel>Cooperation · 合作方向</SectionLabel>
        <h2 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">可合作的业务方向</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-black/50">以需求为起点，以合规为边界，以落地为目标。</p>
      </Reveal>
      <div className="space-y-4" aria-label="合作方向标签">
        <div className="marquee">{[...first, ...first].map((item, i) => <Tag key={`${item}-${i}`} label={item} />)}</div>
        <div className="marquee reverse">{[...second, ...second].map((item, i) => <Tag key={`${item}-${i}`} label={item} />)}</div>
      </div>
      <div className="mx-auto mt-20 max-w-[1320px] px-5 md:px-8">
        <Reveal className="mb-10 grid gap-5 md:grid-cols-2 md:items-end"><h3 className="text-4xl font-semibold leading-tight tracking-[-.045em] md:text-6xl">不同的业务，<br />需要不同的沟通方式。</h3><p className="max-w-md text-sm leading-7 text-black/50 md:justify-self-end">不是用同一套话术面对所有人，而是进入具体场景，理解对方真正需要什么。</p></Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["企业老板商务洽谈", "理解经营需求、梳理合作重点、推进项目进入下一步。", "/videos/case-01-poster.jpg", "Business talk"],
            ["法律服务客户咨询", "将复杂问题讲清楚，让客户知道自己应该怎么做。", "/videos/case-02-poster.jpg", "Legal consulting"],
            ["项目资源匹配沟通", "根据具体需求，对接合规服务、合作机构与执行路径。", "", "Resource match"],
            ["短视频与直播内容合作", "用镜头、表达和内容，把专业服务变成客户听得懂的话。", "/videos/case-01-poster.jpg", "Content studio"],
          ].map(([title, text, image, label], index) => (
            <Reveal key={title} delay={index * .05}>
              <motion.article whileHover={{ y: -6 }} className={`group relative min-h-[360px] overflow-hidden rounded-[1.75rem] ${index === 2 ? "bg-wine" : "bg-ink"}`}>
                {image && <Image src={image} alt={`${title}场景`} fill className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105" sizes="50vw" />}
                {!image && <div className="absolute inset-0 opacity-30 page-grid" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
                <div className="absolute inset-x-7 bottom-7 z-10 text-white"><p className="text-[10px] uppercase tracking-[.22em] text-white/50">{label}</p><h4 className="mt-3 text-3xl font-semibold tracking-[-.035em]">{title}</h4><p className="mt-3 max-w-md text-sm leading-7 text-white/60">{text}</p></div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoArtwork({ video, featured = false, onClick }: { video: VideoItem; featured?: boolean; onClick: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`video-card video-${video.accent} group relative w-full overflow-hidden rounded-[1.5rem] text-left text-white ${featured ? "h-full min-h-[620px] md:min-h-[760px]" : "min-h-[220px] md:min-h-[235px]"}`}
    >
      {video.videoUrl ? (
        <video
          src={video.videoUrl}
          poster={video.posterUrl}
          controls
          playsInline
          preload="metadata"
          aria-label={`播放视频：${video.title}`}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      ) : video.posterUrl ? (
        <Image
          src={video.posterUrl}
          alt=""
          fill
          className="z-0 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 45vw"}
        />
      ) : null}
      {!video.videoUrl && (
        <button type="button" onClick={onClick} className="absolute inset-0 z-[5]" aria-label={`查看视频详情：${video.title}`} />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 md:p-6">
        <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/65">{video.category}</span>
        <span className="text-[10px] font-semibold tracking-[.18em] text-white/55">{video.number}</span>
      </div>
      {!video.videoUrl && <div className={`pointer-events-none absolute z-10 ${featured ? "left-7 top-[28%] md:left-10" : "right-5 top-16"}`}>
        <span className={`grid place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md transition-all group-hover:scale-110 group-hover:bg-white group-hover:text-black ${featured ? "h-16 w-16 md:h-20 md:w-20" : "h-12 w-12"}`}>
          <PlayIcon className={featured ? "h-7 w-7" : "h-5 w-5"} />
        </span>
      </div>}
      <div className={`pointer-events-none absolute inset-x-0 bottom-10 z-10 ${featured ? "p-7 md:bottom-12 md:p-10" : "p-5 md:p-6"}`}>
        {featured && <p className="mb-3 max-w-xs text-xs leading-6 text-white/60">{video.description}</p>}
        <h3 className={`max-w-lg font-semibold leading-tight tracking-[-.03em] ${featured ? "text-3xl md:text-5xl" : "pr-12 text-xl md:text-2xl"}`}>{video.title}</h3>
        {!featured && <p className="mt-2 line-clamp-1 text-xs text-white/55">{video.description}</p>}
      </div>
      <span className="absolute left-[68%] top-[22%] z-[1] text-[8rem] font-bold leading-none text-white/[.05] md:text-[13rem]">{video.id}</span>
    </motion.article>
  );
}

function VideoModal({ video, onClose }: { video: VideoItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[1.75rem] bg-[#f1eee7] text-ink shadow-2xl md:grid-cols-[.82fr_1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`video-card video-${video.accent} relative min-h-[440px] overflow-hidden md:min-h-[640px]`}>
              {video.videoUrl ? (
                <video src={video.videoUrl} poster={video.posterUrl} controls autoPlay playsInline className="absolute inset-0 z-20 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 z-10 grid place-items-center text-center text-white">
                  <div>
                    <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/30 bg-white/10"><PlayIcon className="h-8 w-8" /></span>
                    <p className="mt-5 text-xs uppercase tracking-[.22em] text-white/60">视频文件待替换</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between p-7 md:p-12">
              <div>
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.22em] text-moss"><span className="h-px w-7 bg-moss/50" />{video.category}</div>
                <h3 className="mt-7 text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">{video.title}</h3>
                <p className="mt-6 text-sm leading-7 text-black/55">{video.description}</p>
              </div>
              <div className="mt-12 border-t border-black/10 pt-6">
                <p className="text-xs leading-6 text-black/40">在 <code className="rounded bg-black/5 px-1.5 py-1">components/content.ts</code> 中填入视频链接，即可在此直接播放。</p>
              </div>
            </div>
            <button onClick={onClose} className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full bg-black/75 text-white transition-transform hover:rotate-90" aria-label="关闭视频详情"><CloseIcon /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContentShowcase() {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const stats = [
    ["50+", "口播内容策划与制作"],
    ["1W+", "单条内容播放量"],
    ["2000", "企业账号半年粉丝增长"],
    ["30%", "视频引流客户占比"],
  ];
  return (
    <section id="content" className="relative overflow-hidden bg-[#1b1f1b] py-24 text-white md:py-36">
      <div className="absolute -left-24 top-32 h-96 w-96 rounded-full bg-moss/25 blur-[120px]" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-wine/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="mb-14 grid gap-7 md:mb-20 md:grid-cols-[1.25fr_.75fr] md:items-end">
          <div>
            <SectionLabel light>Content works · 短视频内容力</SectionLabel>
            <h2 className="text-5xl font-semibold leading-[1.06] tracking-[-.055em] md:text-7xl">把复杂业务，<br /><span className="text-[#a7b6a8]">讲成客户愿意停下来的内容。</span></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">从业务理解、选题策划，到拍摄剪辑、口播出镜，把复杂服务转化成客户愿意停留、愿意咨询的内容。</p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.02fr_.98fr]">
          <Reveal className="h-full"><VideoArtwork video={videos[0]} featured onClick={() => setSelected(videos[0])} /></Reveal>
          <div className="grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.slice(1).map((video, index) => (
              <Reveal key={video.id} delay={index * 0.06} className={`h-full [&>article]:h-full ${index === 0 ? "row-span-2" : ""}`}><VideoArtwork video={video} onClick={() => setSelected(video)} /></Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[.035] p-6 md:p-8">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.22em] text-white/40">Content production flow</p>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-6">
            {["选题策划", "口播脚本", "出镜拍摄", "剪辑包装", "账号运营", "私域转化"].map((step, index) => (
              <div key={step} className="relative bg-[#202620] px-4 py-5 text-center text-sm"><span className="mr-2 text-[9px] text-white/30">0{index + 1}</span>{step}{index < 5 && <span className="absolute -right-1 top-1/2 z-10 hidden -translate-y-1/2 text-white/25 md:block">→</span>}</div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-2 border-y border-white/10 md:mt-20 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <div key={label} className="border-r border-white/10 px-3 py-7 last:border-0 md:px-8 md:py-10 md:first:pl-0">
              <p className="text-3xl font-semibold tracking-[-.05em] md:text-5xl">{value}</p>
              <p className="mt-2 text-[11px] leading-5 text-white/45 md:text-xs">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-[#d9d2c6] py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal className="mb-16 md:mb-24">
          <SectionLabel>Experience · 项目与经历</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">在真实业务里，<br />积累可复用的经验。</h2>
        </Reveal>
        <div className="space-y-6">
          {experiences.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.05}>
              <article className={`grid overflow-hidden rounded-[2rem] border border-black/10 bg-paper ${index % 2 === 1 ? "lg:grid-cols-[1.15fr_.85fr]" : "lg:grid-cols-[.85fr_1.15fr]"}`}>
                <div className={`relative min-h-[340px] ${index % 2 === 1 ? "lg:order-2" : ""} ${index === 2 ? "bg-wine" : "bg-ink"}`}>
                  {index < 2 ? <Image src={`/videos/case-0${index + 1}-poster.jpg`} alt={`${item.company}相关场景`} fill className="object-cover opacity-65" sizes="45vw" /> : <div className="absolute inset-0 page-grid opacity-30" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[.2em] text-white/70 backdrop-blur-md">Chapter 0{index + 1}</span>
                  <p className="absolute bottom-6 left-6 text-7xl font-semibold tracking-[-.08em] text-white/20">{item.period.slice(0,4)}</p>
                </div>
                <div className="p-7 md:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-semibold tracking-[.12em] text-moss">{item.period}</p><span className="h-1 w-1 rounded-full bg-black/25" /><p className="text-xs text-black/45">{item.role}</p></div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-.04em] md:text-5xl">{item.company}</h3>
                  <p className="mt-5 max-w-xl text-base font-medium leading-7 text-wine md:text-lg">{item.highlight}</p>
                  {index === 0 && <div className="mt-8 grid grid-cols-2 gap-2"><div className="rounded-xl bg-[#e5ded2] p-4"><strong className="block text-3xl">50+</strong><span className="text-xs text-black/45">视频制作</span></div><div className="rounded-xl bg-moss p-4 text-white"><strong className="block text-3xl">30%</strong><span className="text-xs text-white/55">视频引流占比</span></div></div>}
                  <div className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <div key={point} className="flex gap-3 text-sm leading-6 text-black/55"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-black/40" />{point}</div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="border-y border-black/10 bg-[#e9e4da] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal className="mb-14 md:mb-20">
          <SectionLabel>Process · 合作流程</SectionLabel>
          <h2 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">一次合作，<br />如何从沟通走向落地？</h2>
        </Reveal>
        <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[8%] right-[8%] top-[86px] hidden h-px bg-moss/25 lg:block" />
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.07}>
              <motion.article whileHover={{ y: -7 }} className={`group relative min-h-[390px] overflow-hidden rounded-[1.5rem] border border-black/10 p-6 transition-colors md:p-7 ${index === 0 ? "bg-moss text-white" : index === 3 ? "bg-wine text-white" : "bg-paper"}`}>
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-7xl font-semibold leading-none tracking-[-.08em] opacity-20 md:text-8xl">{step.number}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-current/20 text-lg">{["◎","◇","△","↗"][index]}</span>
                </div>
                <div className="absolute inset-x-6 bottom-7">
                  <p className="mb-4 text-[10px] uppercase tracking-[.2em] opacity-45">Step {step.number}</p><h3 className="text-2xl font-semibold md:text-3xl">{step.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${index === 0 || index === 3 ? "text-white/60" : "text-black/50"}`}>{step.text}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-[#18201b] py-24 text-white md:py-32">
      <div className="absolute -right-20 -top-32 h-[520px] w-[520px] rounded-full border border-white/10" />
      <div className="absolute -right-2 -top-12 h-[340px] w-[340px] rounded-full border border-white/10" />
      <div className="absolute bottom-0 left-0 text-[7rem] font-bold leading-none tracking-[-.08em] text-white/[.025] md:text-[15rem]">CONTACT</div>
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.08fr_.72fr]">
        <div><Reveal>
          <SectionLabel light>Let&apos;s talk · 联系合作</SectionLabel>
          <h2 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-.055em] md:text-8xl">让合作，<br />从一次认真沟通开始。</h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/60 md:text-base">无论是企业业务咨询、项目资源匹配，还是短视频内容合作，都欢迎直接联系。</p>
        </Reveal>
        <Reveal className="mt-12 flex flex-wrap gap-3" delay={0.08}>
          <a href="tel:15595750608" className="group flex items-center gap-5 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-1">立即沟通<ArrowIcon className="h-4 w-4" /></a>
          <a href="#content" className="flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm transition-colors hover:bg-white/10"><PlayIcon className="h-4 w-4" />查看短视频作品</a>
        </Reveal>
        <Reveal className="mt-20 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3" delay={0.12}>
          <a href="tel:15595750608" className="group"><p className="text-[10px] uppercase tracking-[.22em] text-white/40">Phone</p><p className="mt-3 text-xl transition-opacity group-hover:opacity-60">155 9575 0608</p></a>
          <a href="mailto:2736225743@qq.com" className="group"><p className="text-[10px] uppercase tracking-[.22em] text-white/40">Email</p><p className="mt-3 text-xl transition-opacity group-hover:opacity-60">2736225743@qq.com</p></a>
          <div><p className="text-[10px] uppercase tracking-[.22em] text-white/40">Location</p><p className="mt-3 text-xl">海口 · Haikou</p></div>
        </Reveal></div>
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10"><Image src="/videos/case-02-poster.jpg" alt="石新雨内容出镜形象" fill className="object-cover object-top opacity-80" sizes="38vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#18201b] via-transparent to-transparent" /><p className="absolute bottom-6 left-6 text-sm font-semibold tracking-[.12em]">SHI XINYU · HAIKOU</p></div>
          <div className="absolute -left-8 top-10 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl"><p className="text-[9px] uppercase tracking-[.2em] text-white/40">Available for</p><p className="mt-1 text-sm">商务合作 · 内容共创</p></div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#171a17] px-5 py-7 text-white/40 md:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 text-[11px] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} 石新雨 · Personal Business Portfolio</p>
        <p>法律及相关服务仅作咨询、信息匹配与合规对接，不构成结果承诺。</p>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Cooperation />
        <ContentShowcase />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
