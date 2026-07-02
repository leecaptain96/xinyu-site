"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { capabilities, capabilityTags, cases, experiences, heroStats, honors, marquee, navItems, process, scenes, videos, type VideoItem } from "./content";

const ease = [0.22, 1, 0.36, 1] as const;

function usePortfolioMotion(root: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const curtain = document.querySelector<HTMLElement>(".opening-curtain");
      if (reduced) {
        if (curtain) curtain.style.display = "none";
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .set(curtain, { display: "flex" })
        .fromTo(".opening-curtain__brand", { yPercent: 80, opacity: 0, letterSpacing: ".42em" }, { yPercent: 0, opacity: 1, letterSpacing: ".18em", duration: 1.05 })
        .fromTo(".opening-curtain__rule", { scaleX: 0 }, { scaleX: 1, duration: .9, ease: "power3.inOut" }, "-=.62")
        .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 1.35, ease: "power4.inOut" }, "+=.18")
        .set(curtain, { display: "none" })
        .fromTo("[data-opening-stage]", { clipPath: "inset(100% 0 0 0)", scale: .985 }, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.55 }, "-=.95")
        .fromTo(".hero-title-line", { yPercent: 120, scaleX: .76 }, { yPercent: 0, scaleX: 1, duration: 1.35, stagger: .16 }, "-=1.02")
        .fromTo("[data-hero-visual] img", { scale: 1.18, filter: "brightness(.72)" }, { scale: 1, filter: "brightness(1)", duration: 2.1 }, "-=1.28")
        .fromTo("[data-opening-meta], [data-opening-copy]", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .1 }, "-=1.35");

      const sections = gsap.utils.toArray<HTMLElement>("main > section:not(#top)");
      sections.forEach((section, index) => {
        const word = section.querySelector<HTMLElement>(".motion-word");
        const kicker = section.querySelector<HTMLElement>(".kicker");
        const heading = section.querySelector<HTMLElement>("h2");
        const cards = section.querySelectorAll<HTMLElement>("article, [data-motion-card]");
        const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 76%", once: true } });

        if (word) timeline.fromTo(word, { xPercent: index % 2 ? -30 : 30, scale: .74, opacity: 0, letterSpacing: "-.1em" }, { xPercent: 0, scale: 1, opacity: 1, letterSpacing: "-.055em", duration: 1.7, ease: "power4.out" });
        if (kicker) timeline.fromTo(kicker, { x: -46, opacity: 0 }, { x: 0, opacity: 1, duration: .9 }, "-=1.15");
        if (heading) timeline.fromTo(heading, { y: 86, scaleY: .7, opacity: 0, transformOrigin: "left bottom" }, { y: 0, scaleY: 1, opacity: 1, duration: 1.3 }, "-=.72");
        if (cards.length) timeline.fromTo(cards, { y: 88, opacity: 0, clipPath: "inset(0 0 16% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.15, stagger: .11, ease: "power3.out" }, "-=.48");

        section.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
          gsap.fromTo(image, { scale: 1.1 }, { scale: 1, duration: 1.65, ease: "power4.out", scrollTrigger: { trigger: image, start: "top 88%", once: true } });
          gsap.fromTo(image, { yPercent: 3 }, { yPercent: -3, ease: "none", scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 1.2 } });
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);
    return () => context.revert();
  }, [root]);
}

function OpeningCurtain() {
  return <div className="opening-curtain" aria-hidden="true"><div><span className="opening-curtain__brand">SHI XINYU</span><i className="opening-curtain__rule"/><small>BUSINESS · CONTENT · CONNECTION</small></div></div>;
}

function MotionWord({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`motion-word ${light ? "motion-word--light" : ""}`} aria-hidden="true">{children}</div>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .75, delay, ease }}>{children}</motion.div>;
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`kicker ${light ? "text-white/50" : "text-moss"}`}><span />{children}</div>;
}

function Arrow() { return <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function Play() { return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M8 5.5v13l10-6.5-10-6.5Z"/></svg>; }

function GlobalAtmosphere() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 18, damping: 24 });
  const glowY = useSpring(mouseY, { stiffness: 18, damping: 24 });
  const { scrollY } = useScroll();
  const pathY = useTransform(scrollY, [0, 9000], [0, -140]);

  useEffect(() => {
    if (reduceMotion) return;
    const follow = (event: PointerEvent) => {
      mouseX.set((event.clientX / window.innerWidth - .5) * 26);
      mouseY.set((event.clientY / window.innerHeight - .5) * 18);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, [glowX, glowY, mouseX, mouseY, reduceMotion]);

  return <div className="global-atmosphere" aria-hidden="true">
    <motion.div className="ambient-glow ambient-glow-moss" style={{ x: glowX, y: glowY }} animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [.28, .38, .28] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}/>
    <motion.div className="ambient-glow ambient-glow-caramel" animate={reduceMotion ? undefined : { x: [0, -36, 0], y: [0, 22, 0] }} transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}/>
    <motion.svg className="ambient-paths" viewBox="0 0 1440 1000" preserveAspectRatio="none" style={{ y: pathY }}>
      <motion.path d="M-80 220 C260 40 420 430 760 265 S1200 60 1530 245" animate={reduceMotion ? undefined : { opacity: [.14, .24, .14] }} transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.path d="M-120 760 C260 590 460 920 830 690 S1190 520 1530 720" animate={reduceMotion ? undefined : { opacity: [.09, .18, .09] }} transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }}/>
      <path d="M180 1020 C390 790 650 870 850 680 S1180 390 1500 480" />
      {[0,1,2,3,4,5,6,7].map((node) => <motion.circle key={node} className={`ambient-node ambient-node-${node}`} r={node % 3 === 0 ? 3.2 : 2.2} animate={reduceMotion ? undefined : { cx: node % 2 ? [120, 690, 1380] : [1380, 710, 80], cy: node % 3 ? [260 + node * 34, 330 + node * 22, 250 + node * 30] : [760, 620, 740], opacity: [.12, .42, .12] }} transition={{ duration: 22 + node * 2, repeat: Infinity, ease: "linear", delay: node * -2.8 }}/>) }
    </motion.svg>
  </div>;
}

function HeroConnections() {
  const reduceMotion = useReducedMotion();
  return <div className="hero-connections" aria-hidden="true">
    <motion.div className="hero-halo" animate={reduceMotion ? undefined : { scale: [1, 1.055, 1], x: [0, 12, 0], y: [0, -8, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}/>
    <svg viewBox="0 0 620 760" preserveAspectRatio="none">
      <path d="M54 170 C210 70 355 175 552 114" />
      <path d="M32 475 C180 380 344 525 594 424" />
      <path d="M210 690 C320 575 472 650 620 555" />
      {[{x:[70,280,540],y:[165,120,116],d:0},{x:[38,270,585],y:[470,450,426],d:-7},{x:[215,405,610],y:[685,615,558],d:-13}].map((point,index)=><motion.circle key={index} r="3" animate={reduceMotion ? undefined : { cx: point.x, cy: point.y, opacity: [.18,.72,.18] }} transition={{ duration: 20 + index * 5, repeat: Infinity, ease: "linear", delay: point.d }}/>) }
    </svg>
  </div>;
}

function DarkConnections() {
  const reduceMotion = useReducedMotion();
  return <div className="dark-connections" aria-hidden="true"><svg viewBox="0 0 1440 900" preserveAspectRatio="none">
    <motion.path d="M-100 180 C280 40 480 360 810 205 S1190 70 1540 260" animate={reduceMotion ? undefined : { opacity: [.08,.16,.08] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}/>
    <motion.path d="M-100 710 C250 520 520 820 890 625 S1260 520 1540 650" animate={reduceMotion ? undefined : { opacity: [.05,.12,.05] }} transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}/>
    {[0,1,2,3].map((node)=><motion.circle key={node} r="2.5" animate={reduceMotion ? undefined : { cx: [-20, 460 + node * 80, 1460], cy: [180 + node * 150, 225 + node * 120, 205 + node * 135], opacity: [.08,.42,.08] }} transition={{ duration: 24 + node * 4, repeat: Infinity, ease: "linear", delay: node * -5 }}/>) }
  </svg></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-black/10 bg-[#f3f0e9]/90 py-3 shadow-sm backdrop-blur-xl" : "py-5"}`}>
    <div className="wrap flex items-center justify-between">
      <a href="#top" className="flex items-center gap-3" aria-label="返回首页"><span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm text-white">石</span><span><b className="block text-[15px] tracking-[.18em]">石新雨</b><small className="block text-[8px] tracking-[.2em] text-black/40">BUSINESS CONNECTOR</small></span></a>
      <nav className="hidden items-center gap-5 xl:flex">{navItems.map(([label, href]) => <a key={href} href={href} className="text-xs text-black/55 hover:text-black">{label}</a>)}</nav>
      <a href="#contact" className="btn-dark !hidden md:!flex">发起合作咨询 <Arrow /></a>
      <button className="grid h-10 w-10 place-items-center rounded-full border border-black/15 md:hidden" onClick={() => setOpen(!open)} aria-label="菜单"><span className="text-lg">{open ? "×" : "≡"}</span></button>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-4 mt-3 rounded-2xl border border-black/10 bg-paper p-5 shadow-xl md:hidden">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex justify-between border-b border-black/10 py-3">{label}<span>↗</span></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="paper-surface relative overflow-hidden border-b border-black/10 pt-24 md:pt-28">
    <div className="wrap pb-12 md:pb-16">
      <motion.div data-opening-stage initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease }} className="hero-editorial relative overflow-hidden rounded-[2rem] bg-[#17221c] text-white shadow-[0_35px_90px_rgba(28,36,31,.16)] md:rounded-[2.5rem]">
        <div data-opening-meta className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-9"><span className="text-[10px] font-semibold tracking-[.28em] text-white/65">SHI XINYU · PERSONAL BRAND</span><span className="text-[9px] tracking-[.2em] text-white/35">HAIKOU / 2026</span></div>
        <div className="grid min-h-[700px] md:grid-cols-[1.08fr_.92fr]">
          <div className="relative z-10 flex flex-col justify-end px-6 pb-10 pt-28 md:px-9 md:pb-12 lg:px-12 lg:pb-14">
            <div className="absolute left-6 top-28 text-[clamp(4.5rem,11vw,10.5rem)] font-semibold leading-none tracking-[-.09em] text-white/[.035] md:left-9">CONNECT</div>
            <Kicker light>BUSINESS · LEGAL SERVICE · CONTENT</Kicker>
            <h1 className="display max-w-3xl text-[3rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[6rem]"><span className="hero-title-mask"><span className="hero-title-line">让复杂的业务，</span></span><span className="hero-title-mask"><em className="hero-title-line !text-[#b7c4ba]">变成清晰的合作。</em></span></h1>
            <div data-opening-copy><p className="mt-7 max-w-xl text-sm font-medium leading-7 text-white/75 md:text-base">法律服务背景｜商务谈判与项目对接｜短视频内容表达与企业获客</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">先理解业务，再梳理需求、匹配路径、推进合作，让一次沟通真正走到结果。</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="btn-light" href="#capabilities">查看合作方向 <Arrow/></a><a className="btn-ghost" href="#videos"><Play/> 短视频作品</a></div></div>
            <div className="mt-10 grid grid-cols-3 border-t border-white/10 pt-5 text-[9px] tracking-[.14em] text-white/35"><span>01 / 理解需求</span><span>02 / 连接资源</span><span>03 / 推进落地</span></div>
          </div>
          <motion.div data-hero-visual initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: .12, ease }} className="relative min-h-[580px] overflow-hidden md:min-h-full"><HeroConnections/>
            <Image src="/images/shi-xinyu-hero.png" alt="石新雨商务形象照片" fill priority className="object-cover object-top" sizes="(max-width:768px) 100vw,46vw"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#17221c]/85 via-transparent to-black/10 md:bg-gradient-to-r md:from-[#17221c] md:via-transparent md:to-transparent"/>
            <div className="absolute bottom-7 left-6 right-6 z-10 flex items-end justify-between md:left-auto md:right-7"><div><small className="tracking-[.2em] text-white/50">BUSINESS CONNECTOR</small><p className="mt-2 text-xl font-semibold">石新雨 / SHI XINYU</p></div><span className="rounded-full border border-white/25 bg-black/15 px-3 py-2 text-[10px] backdrop-blur">海口</span></div>
          </motion.div>
        </div>
      </motion.div>
      <Reveal className="grid gap-8 border-b border-black/10 py-10 md:grid-cols-[1.2fr_.8fr] md:items-end md:py-14">
        <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-.055em] md:text-5xl lg:text-6xl">懂业务逻辑，懂老板沟通，<br/><span className="text-moss">也懂怎么把内容变成客户线索。</span></h2>
        <div><p className="text-sm leading-7 text-black/55">我的角色不是单一销售，也不是只做内容，而是在客户需求、专业服务、合作资源与内容表达之间建立连接。</p><p className="mt-4 text-[10px] tracking-[.18em] text-black/35">COMMUNICATE · CONNECT · DELIVER</p></div>
      </Reveal>
    </div>
    <div className="overflow-hidden border-y border-black/10 bg-[#e6dfd3] py-4"><div className="marquee">{[...marquee,...marquee].map((x,i)=><span key={i}>✦ {x}</span>)}</div></div>
    <div className="wrap grid grid-cols-2 md:grid-cols-4">{heroStats.map(([v,l])=><div key={l} className="border-r border-black/10 py-8 last:border-0 md:py-11"><b className="block text-4xl tracking-[-.06em] md:text-6xl">{v}</b><span className="mt-2 block text-xs text-black/45">{l}</span></div>)}</div>
  </section>;
}

function About() { return <section id="about" className="section bg-paper"><MotionWord>ABOUT</MotionWord><div className="wrap grid gap-14 lg:grid-cols-[1.08fr_.92fr]">
  <Reveal><Kicker>ABOUT · 关于我</Kicker><h2 className="title">不是只会沟通，<br/><em>而是知道怎么把合作推进下去。</em></h2><div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-8 text-black/60"><p className="text-xl font-medium text-ink">我不是单纯的销售，也不是只讲专业的法律服务人员。我的角色，更像是合作中的连接器。</p><p>一端是企业主、客户和真实业务需求；另一端是法律服务、内容传播、企业服务和合作资源。我会先理解客户真正的问题，再梳理重点、匹配方向和推进路径。</p><p>从线下企业拜访、客户维护，到短视频策划、口播出镜、账号运营，我始终关注：业务有没有被讲清楚，客户有没有建立信任，合作有没有真正发生。</p></div></Reveal>
  <Reveal className="grid gap-3 sm:grid-cols-2" delay={.1}>{[["身份","法律服务 × 商务拓展 × 内容表达"],["服务对象","企业主 / 创业者 / 个体经营者 / 合作机构"],["工作方式","沟通 / 梳理 / 匹配 / 推进 / 落地"],["所在城市","海口 · HAIKOU"]].map(([a,b],i)=><div data-motion-card key={a} className={`rounded-[1.5rem] p-6 ${i===0?'bg-moss text-white':i===3?'bg-wine text-white':'border border-black/10 bg-white/40'}`}><small className="tracking-[.18em] opacity-50">{a}</small><p className="mt-12 text-xl font-semibold leading-8">{b}</p></div>)}</Reveal>
  <Reveal className="lg:col-span-2"><div className="mt-4 flex flex-wrap gap-2 border-t border-black/10 pt-8">{capabilityTags.map((x,i)=><span key={x} className={`tag ${i===0||i===8?'bg-ink text-white':''}`}>{x}</span>)}</div></Reveal>
  </div></section>; }

function Capabilities() { return <section id="capabilities" className="section bg-[#e4ddd1]"><MotionWord>CAPABILITIES</MotionWord><div className="wrap"><Reveal><Kicker>CAPABILITIES · 核心能力</Kicker><h2 className="title">连接需求、资源与表达，<br/><em>让业务往前走。</em></h2></Reveal><div className="mt-14 grid auto-rows-auto gap-4 lg:grid-cols-3">{capabilities.map((c,i)=><Reveal key={c.id} delay={i*.04} className={c.featured?'lg:col-span-2 lg:row-span-2':''}><motion.article whileHover={{ y:-6 }} className={`flex h-full min-h-[310px] flex-col rounded-[2rem] border border-black/10 p-7 md:p-9 ${c.featured?'bg-ink text-white lg:min-h-[640px]':'bg-paper'}`}><div className="flex justify-between"><span className="text-xs opacity-40">{c.id}</span><span className="text-2xl">{c.icon}</span></div><div className="mt-auto"><h3 className={`${c.featured?'text-4xl md:text-6xl':'text-2xl md:text-3xl'} font-semibold tracking-[-.05em]`}>{c.title}</h3><p className={`mt-5 max-w-2xl text-sm leading-7 ${c.featured?'text-white/55':'text-black/55'}`}>{c.text}</p><div className="mt-6 flex flex-wrap gap-2">{c.tags.map(t=><span className="rounded-full border border-current/15 px-3 py-1.5 text-[10px] opacity-70" key={t}>{t}</span>)}</div></div></motion.article></Reveal>)}</div></div></section>; }

function VideoCard({ item, featured, onClick }: { item: VideoItem; featured?: boolean; onClick:()=>void }) { return <button data-motion-card onClick={onClick} className={`video-${item.tone} group relative h-full min-h-[300px] w-full overflow-hidden rounded-[1.6rem] text-left ${featured?'min-h-[640px]':''}`}>
  {item.poster ? <Image src={item.poster} alt={item.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" sizes={featured?'50vw':'28vw'}/> : <><div className="absolute inset-0 opacity-30 hero-grid"/><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-bold text-white/5">{String(item.id).padStart(2,'0')}</div></>}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"/><span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-transform group-hover:scale-110"><Play/></span><div className="absolute inset-x-6 bottom-6 text-white"><span className="text-[10px] tracking-[.18em] text-white/50">{item.category} · {item.metric}</span><h3 className={`${featured?'mt-3 text-4xl md:text-5xl':'mt-2 text-2xl'} font-semibold tracking-[-.04em]`}>{item.title}</h3></div>
  {!item.poster && <span className="absolute left-5 top-5 rounded-full border border-white/20 px-3 py-1.5 text-[9px] text-white/60">素材可替换</span>}
  </button>; }

function VideoShowcase() {
 const [selected,setSelected]=useState<VideoItem|null>(null);
 return <section id="videos" className="section relative overflow-hidden bg-[#18201b] text-white"><MotionWord light>CONTENT</MotionWord><DarkConnections/><div className="absolute -left-48 top-10 h-96 w-96 rounded-full bg-moss/40 blur-[130px]"/><div className="wrap relative"><Reveal className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><Kicker light>SHORT VIDEO · 作品重点</Kicker><h2 className="title text-white">把复杂业务，<br/><em className="text-[#aebcaf]">讲成客户愿意停下来的内容。</em></h2></div><p className="text-sm leading-7 text-white/50">很多企业不是业务不够好，而是客户听不懂、记不住。我会先理解业务本身，再通过短视频、口播、情景表达和账号运营，把专业能力翻译成客户听得懂的语言。</p></Reveal>
 <Reveal className="mt-14" delay={.05}><div className="mb-8 grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="text-[10px] tracking-[.2em] text-[#bda998]">TWO ACCOUNTS · 0→1</p><h3 className="mt-4 text-3xl font-semibold md:text-5xl">两个从 0 开始的账号，<br/>最后都指向获客。</h3></div><div><p className="text-sm leading-8 text-white/55">美尔居家居和法律行业账号，都是我从 0 到 1 参与搭建并持续运营的代表项目。从账号定位、内容方向、选题脚本，到出镜、拍摄、剪辑和发布调整，我都深度参与。</p><p className="mt-3 text-sm font-medium leading-7 text-white/80">做账号不是为了把作品堆满，而是围绕客户咨询、到店意向和业务成交设计内容。这两个账号都带来了明显的获客与业务转化。</p><p className="mt-3 text-xs leading-6 text-white/35">我还参与过其他行业的出镜与内容制作，这里不一一展开，只展示两个最具代表性的 0→1 案例。</p></div></div><div className="grid gap-5 md:grid-cols-2">{[{name:"美尔居家居",type:"本地家居 / 门店获客",image:"/images/douyin-meierju-account.jpg",stats:[["3129","粉丝"],["1.3万","获赞"]],desc:"从账号定位到门店内容持续发布，围绕沙发产品、空间体验和到店咨询做内容。"},{name:"法律行业账号",type:"法律内容传播 / 咨询获客",image:"/images/douyin-legal-account.jpg",stats:[["148","作品"],["1323","获赞"]],desc:"把难理解的专业问题变成用户听得懂的口播内容，持续承接线上咨询线索。"}].map((account,i)=><article key={account.name} className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[.045]"><div className="relative aspect-[4/5] overflow-hidden"><Image src={account.image} alt={`${account.name}抖音账号运营截图`} fill className="object-cover object-top" sizes="(max-width:768px) 90vw,45vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"/><span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[9px] tracking-[.16em] backdrop-blur">ACCOUNT 0{i+1} · 0→1</span><div className="absolute inset-x-6 bottom-6"><p className="text-[10px] tracking-[.18em] text-white/50">{account.type}</p><h4 className="mt-2 text-3xl font-semibold">{account.name}</h4><div className="mt-5 flex gap-8">{account.stats.map(([value,label])=><div key={label}><b className="block text-2xl">{value}</b><span className="text-[10px] text-white/45">{label} · 截图数据</span></div>)}</div></div></div><div className="p-6"><p className="text-sm leading-7 text-white/55">{account.desc}</p><div className="mt-5 flex flex-wrap gap-2">{["账号搭建","内容运营","出镜表达","拍摄剪辑","获客转化"].map(x=><span key={x} className="rounded-full border border-white/12 px-3 py-1.5 text-[9px] text-white/50">{x}</span>)}</div></div></article>)}</div></Reveal>
 <div className="mt-5 grid gap-4 md:grid-cols-2">{videos.map((v,i)=><Reveal key={v.id} delay={i*.05} className="h-full"><VideoCard item={v} featured onClick={()=>setSelected(v)}/></Reveal>)}</div>
 <Reveal className="mt-14"><div className="flex flex-wrap items-center gap-y-3 rounded-2xl border border-white/10 bg-white/[.03] p-5">{["业务梳理","选题策划","口播脚本","出镜拍摄","剪辑包装","账号运营","咨询转化"].map((x,i)=><div key={x} className="flex items-center text-xs text-white/65"><span className="px-3 py-2">{x}</span>{i<6&&<span className="text-white/20">→</span>}</div>)}</div></Reveal>
 <Reveal className="mt-10 grid grid-cols-2 border-y border-white/10 md:grid-cols-4">{[["50+","条法律口播内容"],["1W+","单条最高播放"],["5个","有效咨询来自单条内容"],["30%","业务线索来自视频引流"]].map(([v,l])=><div key={l} className="border-r border-white/10 py-8"><b className="text-4xl md:text-5xl">{v}</b><p className="mt-2 text-xs text-white/40">{l}</p></div>)}</Reveal>
 </div><AnimatePresence>{selected&&<motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-black" initial={{scale:.94}} animate={{scale:1}} onClick={e=>e.stopPropagation()}>{selected.video?<video src={selected.video} poster={selected.poster} controls autoPlay className="aspect-[9/16] w-full object-contain"/>:<div className={`video-${selected.tone} grid aspect-[9/16] place-items-center p-10 text-center`}><div><p className="text-xs text-white/40">视频素材待替换</p><h3 className="mt-4 text-3xl font-semibold">{selected.title}</h3></div></div>}<button onClick={()=>setSelected(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/70">×</button></motion.div></motion.div>}</AnimatePresence></section>;
}

function Scenes() { return <section id="scenes" className="section bg-paper"><MotionWord>SCENARIOS</MotionWord><div className="wrap"><Reveal><Kicker>SCENARIOS · 合作场景</Kicker><h2 className="title">不同的业务，<br/><em>需要不同的沟通方式。</em></h2></Reveal><div className="mt-14 space-y-3">{scenes.map((s,i)=><Reveal key={s.num} delay={i*.03}><motion.article whileHover={{x:6}} className="group grid min-h-[210px] overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#e7e0d5] md:grid-cols-[150px_1fr_1fr]"><div className={`grid place-items-center text-6xl font-semibold text-white/30 ${i%2?'bg-wine':'bg-moss'}`}>{s.num}</div><div className="flex flex-col justify-center p-7"><small className="text-[10px] tracking-[.2em] text-black/40">{s.tag}</small><h3 className="mt-3 text-2xl font-semibold md:text-4xl">{s.title}</h3></div><div className="flex items-center border-t border-black/10 p-7 text-sm leading-7 text-black/55 md:border-l md:border-t-0">{s.text}</div></motion.article></Reveal>)}</div></div></section>; }

function Experience() { return <section id="experience" className="section bg-[#d8d0c3]"><MotionWord>EXPERIENCE</MotionWord><div className="wrap"><Reveal><Kicker>EXPERIENCE · 经历与成果</Kicker><h2 className="title">真实业务里，<br/><em>积累可复用的经验。</em></h2></Reveal><div className="mt-14 space-y-5">{experiences.map((e,i)=><Reveal key={e.company}><article className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-paper lg:grid-cols-[.62fr_1.38fr]"><div className={`relative min-h-[320px] p-8 text-white md:min-h-[340px] ${i===0?'bg-[linear-gradient(135deg,#1f332a_0%,#647267_55%,#1b2923_100%)]':i===1?'bg-[#6b6258]':'bg-ink'}`}><small className="relative z-10 tracking-[.18em] text-white/75">CHAPTER 0{i+1}</small><p className="absolute bottom-7 left-8 z-10 text-5xl font-semibold tracking-[-.07em] text-white/40">{e.period.slice(0,4)}</p>{i<2&&<Image src={i===1?'/images/shi-xinyu-hero.png':'/images/shi-xinyu-content-creator.jpg'} alt={i===1?'石新雨商务形象照片':'石新雨内容创作与拍摄工作形象'} fill className={i===1?'object-cover object-[center_28%] opacity-55 mix-blend-luminosity':'object-cover object-[center_24%] opacity-85 saturate-[.72] contrast-[1.04]'} sizes="35vw"/>}{i===0&&<div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(14,34,27,.66)_0%,rgba(53,77,63,.08)_48%,rgba(12,27,21,.42)_100%)]"/>}</div><div className="p-7 md:p-10"><div className="flex flex-wrap gap-3 text-xs"><b className="text-moss">{e.period}</b><span className="text-black/35">{e.role}</span></div><h3 className="mt-5 text-3xl font-semibold tracking-[-.04em] md:text-5xl">{e.company}</h3><p className="mt-4 max-w-2xl leading-7 text-black/55">{e.summary}</p><div className="mt-8 flex flex-wrap gap-2">{e.stats.map(([v,l])=><div key={l} className="min-w-[135px] rounded-xl bg-[#e7e0d5] p-4"><b className="block text-2xl">{v}</b><span className="mt-1 block text-[10px] text-black/45">{l}</span></div>)}</div></div></article></Reveal>)}</div></div></section>; }

function Process() { return <section id="process" className="section bg-paper"><MotionWord>PROCESS</MotionWord><div className="wrap"><Reveal><Kicker>PROCESS · 合作方式</Kicker><h2 className="title">一次合作，<br/><em>如何从沟通走向落地？</em></h2></Reveal><div className="relative mt-14 grid gap-3 lg:grid-cols-4"><div className="absolute left-[8%] right-[8%] top-16 hidden h-px bg-black/15 lg:block"/>{process.map((p,i)=><Reveal key={p.num} delay={i*.06}><motion.article whileHover={{y:-6}} className={`relative flex min-h-[370px] flex-col rounded-[1.7rem] border border-black/10 p-7 ${i===0?'bg-moss text-white':i===3?'bg-wine text-white':'bg-[#e7e0d5]'}`}><div className="relative z-10 flex justify-between"><b className="text-7xl tracking-[-.08em] opacity-20">{p.num}</b><span className="grid h-10 w-10 place-items-center rounded-full border border-current/20">{['◌','◇','△','↗'][i]}</span></div><div className="mt-auto"><small className="opacity-40">STEP {p.num}</small><h3 className="mt-3 text-3xl font-semibold">{p.title}</h3><p className="mt-4 text-sm leading-7 opacity-60">{p.text}</p></div></motion.article></Reveal>)}</div></div></section>; }

function Trust() { return <section className="section border-y border-black/10 bg-[#e7e0d5]"><MotionWord>TRUST</MotionWord><div className="wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><Reveal><Kicker>TRUST · 长期积累</Kicker><h2 className="title">专业能力之外，<br/><em>也有长期积累。</em></h2><p className="mt-6 text-sm leading-7 text-black/50">荣誉、校园工作与公益经历，共同构成做事的底色。证书与活动图片位置均可在后续替换为真实素材。</p><div className="mt-8 border-t border-black/10 pt-6"><p className="text-[10px] tracking-[.18em] text-black/35">EDUCATION · 教育背景</p><p className="mt-3 font-semibold">海南政法职业学院 · 经济法专业</p><p className="mt-1 text-xs text-black/45">2020.10 — 2023.06</p></div></Reveal><Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3">{honors.map((h,i)=><div data-motion-card key={h} className={`flex min-h-[150px] flex-col justify-between rounded-[1.4rem] p-5 ${i===0?'bg-moss text-white':i===5?'bg-wine text-white':'border border-black/10 bg-paper'}`}><span className="text-[9px] tracking-[.18em] opacity-40">0{i+1} / RECORD</span><h3 className="text-lg font-semibold leading-7">{h}</h3></div>)}</Reveal></div></section>; }

function Cases() { return <section className="section bg-paper"><MotionWord>CASES</MotionWord><div className="wrap"><Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><Kicker>CASE LIBRARY · 案例库</Kicker><h2 className="title">把过程与结果，<br/><em>整理成可持续更新的案例。</em></h2></div><span className="text-xs text-black/40">图片 / 视频 / 数据截图 / 客户反馈均已预留</span></Reveal><div className="mt-14 grid gap-4 md:grid-cols-2">{cases.map((c,i)=><Reveal key={c.no} delay={i*.04}><motion.article whileHover={{y:-5}} className="overflow-hidden rounded-[1.8rem] border border-black/10 bg-[#e8e1d6]"><div className={`relative h-48 ${i%2?'bg-wine':'bg-moss'}`}><div className="absolute inset-0 hero-grid opacity-20"/><span className="absolute left-6 top-6 text-xs tracking-[.2em] text-white/50">{c.no}</span><span className="absolute bottom-6 right-6 rounded-full border border-white/20 px-3 py-1.5 text-[9px] text-white/60">素材待替换</span></div><div className="p-7"><small className="text-[10px] tracking-[.14em] text-moss">{c.type}</small><h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{c.title}</h3><p className="mt-5 text-sm leading-7 text-black/55">{c.problem}</p><div className="mt-6 border-t border-black/10 pt-5"><b className="text-sm">成果｜{c.result}</b></div><div className="mt-5 flex gap-2">{c.tags.map(t=><span key={t} className="tag !px-3 !py-1.5 !text-[9px]">{t}</span>)}</div></div></motion.article></Reveal>)}</div></div></section>; }

function Contact() { return <section id="contact" className="section relative overflow-hidden bg-[#161d19] text-white"><MotionWord light>CONTACT</MotionWord><DarkConnections/><div className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full border border-white/10"/><div className="wrap relative grid gap-14 lg:grid-cols-[.85fr_1.15fr]"><Reveal><Kicker light>CONTACT · 联系我</Kicker><h2 className="title text-white">让合作，<br/><em className="text-[#aebcaf]">从一次认真沟通开始。</em></h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/55">无论你需要的是企业客户沟通、内容表达、短视频获客、法律服务前期沟通，还是项目资源匹配，都可以从一次清晰的需求沟通开始。</p><div className="mt-12 space-y-4 border-t border-white/10 pt-8 text-sm"><p><span className="inline-block w-20 text-white/35">姓名</span>石新雨</p><p><span className="inline-block w-20 text-white/35">电话</span><a href="tel:15595750608">15595750608</a></p><p><span className="inline-block w-20 text-white/35">邮箱</span><a href="mailto:2736225743@qq.com">2736225743@qq.com</a></p><p><span className="inline-block w-20 text-white/35">所在地</span>海口</p></div></Reveal>
  <Reveal delay={.1}><form className="rounded-[2rem] border border-white/10 bg-white/[.05] p-6 md:p-9" onSubmit={e=>e.preventDefault()}><div className="grid gap-4 sm:grid-cols-2"><label>企业名称<input placeholder="请输入企业或个人名称"/></label><label>所属行业<input placeholder="例如：餐饮 / 企业服务"/></label><label>需求类型<select defaultValue=""><option value="" disabled>请选择合作方向</option>{["法律服务沟通","短视频内容制作","企业个人 IP","企业客户开发","项目资源匹配","其他合作"].map(x=><option key={x}>{x}</option>)}</select></label><label>联系方式<input placeholder="手机 / 微信"/></label><label className="sm:col-span-2">当前业务问题<textarea rows={4} placeholder="请简单描述目前的问题与目标"/></label><label className="sm:col-span-2">预算范围（可选）<input placeholder="可先留空，沟通后判断"/></label></div><div className="mt-6 flex flex-wrap gap-3"><a href="mailto:2736225743@qq.com?subject=官网合作咨询" className="btn-light">发起合作咨询 <Arrow/></a><a href="#videos" className="btn-ghost"><Play/> 查看短视频作品</a></div><p className="mt-5 text-[10px] leading-5 text-white/30">当前为静态展示表单。点击咨询按钮将唤起邮件，正式上线时可接入合规表单服务。</p></form></Reveal></div></section>; }

export function HomePage() { const pageRef = useRef<HTMLDivElement>(null); usePortfolioMotion(pageRef); return <div ref={pageRef}><OpeningCurtain/><GlobalAtmosphere/><Header/><main className="relative z-10"><Hero/><About/><Capabilities/><VideoShowcase/><Scenes/><Experience/><Process/><Trust/><Cases/><Contact/></main><footer className="relative z-10 bg-[#111512] py-7 text-white/35"><div className="wrap flex flex-col gap-2 text-[10px] md:flex-row md:justify-between"><p>© 2026 石新雨 · PERSONAL BUSINESS BRAND</p><p>法律及相关服务仅作前期沟通、信息匹配与专业机构协作，不构成结果承诺。</p></div></footer></div>; }
