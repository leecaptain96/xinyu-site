export type VideoItem = {
  id: number;
  category: string;
  title: string;
  description: string;
  accent: "green" | "wine" | "sand" | "dark";
  number: string;
  videoUrl?: string;
  posterUrl?: string;
};

export const capabilities = [
  {
    number: "01",
    icon: "dialogue",
    title: "商务谈判与客户沟通",
    description:
      "与不同行业的企业主、负责人和客户沟通需求，快速抓住业务重点、建立信任，让合作从意向进入实际执行。",
    note: "需求洞察 · 信任建立 · 合作推进",
  },
  {
    number: "02",
    icon: "document",
    title: "法律服务与业务咨询",
    description:
      "基于经济法、行政法及法律服务背景，协助梳理合同、债务、婚姻财产与企业经营等常见需求，完成前期咨询和合规服务对接。",
    note: "前期咨询 · 需求梳理 · 合规对接",
  },
  {
    number: "03",
    icon: "connection",
    title: "项目资源对接",
    description:
      "围绕财税、企业服务、合规金融信息、信用与房产证照流程等需求，提供信息匹配、材料流程协助及合规机构合作对接。",
    note: "资源匹配 · 流程协助 · 项目衔接",
  },
  {
    number: "04",
    icon: "camera",
    title: "短视频与新媒体获客",
    description:
      "完成选题、脚本、拍摄、剪辑、口播出镜与直播表达，把复杂服务讲清楚，把专业能力变成客户愿意停留的内容。",
    note: "内容策划 · 出镜表达 · 线上获客",
  },
  {
    number: "05",
    icon: "camera",
    title: "直播表达与出镜",
    description:
      "适合企业业务讲解、专业知识口播、直播咨询与品牌内容表达，让镜头前的沟通自然、清晰、有信任感。",
    note: "直播咨询 · 品牌表达 · 镜头沟通",
  },
  {
    number: "06",
    icon: "connection",
    title: "企业客户开发",
    description:
      "具备线下拓客、企业陌拜、客户维护、合作推进与转介绍经验，把一次接触沉淀为长期合作关系。",
    note: "客户拓展 · 长期维护 · 转介绍",
  },
];

export const cooperation = [
  "法律服务咨询",
  "企业商务洽谈",
  "财税服务对接",
  "企业服务资源匹配",
  "合规金融信息咨询",
  "房产与证照流程咨询",
  "短视频账号运营",
  "企业口播内容打造",
  "直播出镜与业务讲解",
  "本地商业客户拓展",
];

export const videos: VideoItem[] = [
  {
    id: 1,
    number: "EP. 01",
    category: "法律知识口播",
    title: "滞纳金与违约金，有什么不同？",
    description: "从常见合同场景出发，讲清滞纳金与违约金的概念和区别。",
    accent: "green",
    videoUrl: "/videos/case-01.mp4",
    posterUrl: "/videos/case-01-poster.jpg",
  },
  {
    id: 2,
    number: "EP. 02",
    category: "债务问题解读",
    title: "债务人名下没有财产，怎么办？",
    description: "围绕常见债务困境，梳理可咨询、可推进的合规处理路径。",
    accent: "wine",
    videoUrl: "/videos/case-02.mp4",
    posterUrl: "/videos/case-02-poster.jpg",
  },
  {
    id: 3,
    number: "EP. 03",
    category: "案例解析",
    title: "婚姻财产分割避坑",
    description: "从真实高频问题出发，给出清晰的咨询路径。",
    accent: "sand",
    videoUrl: "",
  },
  {
    id: 4,
    number: "EP. 04",
    category: "内容获客",
    title: "如何让专业服务通过短视频获客",
    description: "把业务理解、内容表达与咨询转化连成闭环。",
    accent: "dark",
    videoUrl: "",
  },
  {
    id: 5,
    number: "EP. 05",
    category: "企业风控",
    title: "企业老板最容易忽略的法律风险",
    description: "把经营中的隐性风险，转化为可理解的行动提示。",
    accent: "green",
    videoUrl: "",
  },
  {
    id: 6,
    number: "EP. 06",
    category: "拍摄花絮",
    title: "一条专业口播，是怎样完成的？",
    description: "从选题脚本到出镜剪辑，记录内容生产现场。",
    accent: "wine",
    videoUrl: "",
  },
];

export const experiences = [
  {
    period: "2023.12 — 至今",
    company: "海南文律法务服务有限公司",
    role: "法律服务 / 新媒体运营",
    highlight: "从专业服务到内容获客，建立完整转化链路。",
    points: [
      "策划并拍摄法律口播视频 50+ 条",
      "创新“情景剧 + 法律解读”内容形式",
      "单条视频播放量 1W+",
      "建立线上引流与线下转化体系",
      "覆盖社区、写字楼及企业客户",
      "视频引流客户占公司总业务量 30%",
      "单月签约客户 6 家",
    ],
  },
  {
    period: "2022.09 — 2023.11",
    company: "海南获客魔方",
    role: "广告销售 / 企业客户开发",
    highlight: "把陌生客户开发，做成可持续的长期关系。",
    points: [
      "负责企业客户开发、业务沟通及方案推荐",
      "开拓餐饮行业客户渠道",
      "一个月内签下三家餐饮企业合作",
      "协助公司调整市场产品策略",
      "建立客户长期维护与转介绍关系",
    ],
  },
  {
    period: "2020.10 — 2023.06",
    company: "海南政法职业学院",
    role: "经济法专业",
    highlight: "法律理解力之外，也在持续训练组织与表达。",
    points: [
      "中共党员",
      "学生党支部党务干部",
      "参与法律宣传、公益活动及企业交流活动",
    ],
  },
];

export const processSteps = [
  { number: "01", title: "需求判断", text: "明确你的业务问题、目标客户与合作方向。" },
  { number: "02", title: "沟通与匹配", text: "梳理资源、服务路径与具体推进方式。" },
  { number: "03", title: "内容或项目执行", text: "进入内容制作、客户沟通或项目协同阶段。" },
  { number: "04", title: "跟进与优化", text: "根据反馈、线索和结果持续调整。" },
];
