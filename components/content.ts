export type VideoItem = {
  id: number;
  title: string;
  category: string;
  metric: string;
  poster?: string;
  video?: string;
  tone: "moss" | "wine" | "sand" | "ink";
};

export const navItems = [
  ["首页", "#top"], ["关于我", "#about"], ["核心能力", "#capabilities"],
  ["短视频作品", "#videos"], ["合作场景", "#scenes"], ["经历与成果", "#experience"],
  ["合作方式", "#process"], ["联系我", "#contact"],
] as const;

export const heroStats = [
  ["50+", "条内容策划与制作"], ["1W+", "单条最高播放"],
  ["30%", "视频引流业务占比"], ["20", "个社区 / 写字楼覆盖"],
];

export const marquee = ["法律服务", "商务洽谈", "企业客户开发", "项目衔接", "短视频拍摄", "口播出镜", "账号运营", "内容获客", "本地商家合作"];

export const capabilityTags = ["商务洽谈", "客户需求梳理", "企业客户开发", "法律服务沟通", "短视频策划", "拍摄剪辑", "口播出镜", "直播表达", "账号运营", "线下拓客", "项目资源匹配", "合作推进"];

export const capabilities = [
  { id: "01", title: "商务谈判与客户沟通", icon: "↗", featured: true, text: "能够与企业负责人、客户和合作方进行需求沟通，快速理解对方的业务重点、真实顾虑和合作条件。不只是介绍服务，而是把复杂的合作内容说清楚，并推动双方进入下一步。", tags: ["需求洞察", "商务表达", "合作推进"] },
  { id: "02", title: "法律服务与业务咨询沟通", icon: "§", text: "具备经济法和法律服务相关背景，参与合同、债务、婚姻财产、劳动纠纷等内容策划与客户沟通，可协助完成前期问题梳理、服务方向判断与专业机构对接。", tags: ["前期梳理", "风险沟通"] },
  { id: "03", title: "项目资源匹配与业务衔接", icon: "◎", text: "围绕真实需求，协助完成服务信息沟通、项目初步判断、合作机构匹配与流程衔接。", tags: ["财税服务资源", "企业服务咨询", "合规金融信息咨询", "房产与证照流程咨询"] },
  { id: "04", title: "短视频内容与企业获客", icon: "▶", text: "从业务梳理、选题策划、脚本撰写，到拍摄剪辑、口播出镜、账号运营，帮助企业把难理解的专业服务变成客户愿意停留和咨询的内容。", tags: ["内容策划", "拍摄剪辑", "账号运营"] },
  { id: "05", title: "主播出镜与直播表达", icon: "◉", text: "适合企业业务讲解、知识型口播、商家个人 IP 内容、直播咨询和品牌表达。", tags: ["口播出镜", "直播表达"] },
  { id: "06", title: "企业客户开发与线下拓客", icon: "＋", text: "具备商圈拓客、企业陌拜、客户维护、合作推进和转介绍经验，能够将线上内容与线下商务沟通结合。", tags: ["企业陌拜", "客户维护", "转介绍"] },
];

export const videos: VideoItem[] = [
  { id: 1, title: "合同纠纷应对指南", category: "法律知识口播", metric: "真实视频 · 可播放", poster: "/videos/case-01-poster.jpg", video: "/videos/case-01.mp4", tone: "moss" },
  { id: 2, title: "债务纠纷案例解析", category: "案例解析", metric: "带来 5 个有效咨询", poster: "/videos/case-02-poster.jpg", video: "/videos/case-02.mp4", tone: "wine" },
  { id: 3, title: "美尔居沙发｜门店口播推广", category: "商家账号 0→1", metric: "独立出镜 · 拍摄 · 剪辑", poster: "/videos/meierju-case-01-poster.jpg", video: "/videos/meierju-case-01.mp4", tone: "sand" },
  { id: 4, title: "美尔居沙发｜沉浸式产品演绎", category: "本地商家内容", metric: "独立策划 · 演绎 · 制作", poster: "/videos/meierju-case-02-poster.jpg", video: "/videos/meierju-case-02.mp4", tone: "ink" },
];

export const scenes = [
  { num: "01", title: "企业老板商务洽谈", tag: "BUSINESS", text: "理解经营需求，梳理合作重点，让沟通从“认识一下”走到“下一步怎么合作”。" },
  { num: "02", title: "法律服务客户沟通", tag: "LEGAL SERVICE", text: "把复杂问题说清楚，帮助客户理解自己的情况、服务方向与下一步准备内容。" },
  { num: "03", title: "项目资源匹配", tag: "CONNECTION", text: "围绕具体需求，协助对接合规服务、合作机构与执行路径，减少无效沟通。" },
  { num: "04", title: "短视频与个人 IP 合作", tag: "CONTENT", text: "用内容、镜头和表达，帮助企业老板、业务负责人或主播建立专业感和客户信任。" },
];

export const experiences = [
  { period: "2023.12 — 至今", company: "海南文律法务服务有限公司", role: "法律服务 / 新媒体运营", summary: "从法律内容传播到客户咨询转化，完成线上短视频与线下业务的联动。", stats: [["50+", "内容制作"], ["1W+", "单条最高播放"], ["20", "社区 / 写字楼"], ["6家", "单月最高签约"], ["30%", "视频引流占比"]] },
  { period: "2022.09 — 2023.11", company: "海南获客魔方", role: "广告销售 / 企业客户开发", summary: "服务企业客户，完成业务沟通、线上拓客方案推荐和长期客户维护。", stats: [["3家", "一个月签约餐饮企业"], ["长期", "客户维护与转介绍"], ["餐饮", "行业渠道开拓"]] },
];

export const process = [
  { num: "01", title: "需求判断", text: "明确企业行业、当前问题、目标客户和合作方向。" },
  { num: "02", title: "路径梳理", text: "判断需要法律服务沟通、资源匹配、客户开发还是内容获客。" },
  { num: "03", title: "执行推进", text: "进入客户沟通、项目衔接、内容制作、拍摄剪辑或合作协同。" },
  { num: "04", title: "跟进优化", text: "围绕客户反馈、咨询线索、内容数据和业务结果持续调整。" },
];

export const honors = ["普通话二级甲等", "优秀共青团干部", "三好学生", "学院二等奖", "抄党章优秀奖", "法律宣传交流会企业嘉奖", "社区普法公益活动", "关爱留守儿童公益活动", "学生党支部党务干部经历"];

export const cases = [
  { no: "CASE 01", title: "法律知识口播内容系列", type: "短视频策划 / 拍摄 / 剪辑 / 出镜", problem: "将合同、婚姻财产、债务纠纷等复杂主题转化为易理解的短视频内容。", result: "50+ 内容制作，单条最高播放 1W+。", tags: ["法律内容传播", "口播"] },
  { no: "CASE 02", title: "线上内容与线下客户转化", type: "企业账号运营 / 客户咨询引流", problem: "建立“线上引流 + 线下转化”的业务路径。", result: "短视频引流客户占公司总业务量约 30%。", tags: ["账号运营", "线索转化"] },
  { no: "CASE 03", title: "餐饮企业客户开发", type: "商务拓展 / 企业客户沟通", problem: "开拓餐饮行业渠道并推进企业合作。", result: "一个月签下三家餐饮企业合作。", tags: ["企业客户", "商务沟通"] },
  { no: "CASE 04", title: "风险手册 / 宣传物料", type: "内容梳理 / 物料设计", problem: "将合同、债务等风险信息整理成便于线下沟通的内容物料。", result: "已完成相关风险手册类物料设计。", tags: ["线下物料", "风险沟通"] },
  { no: "CASE 05", title: "美尔居沙发账号从 0 到 1", type: "商家账号搭建 / 短视频全案", problem: "从账号定位和内容方向开始，持续制作能讲清产品、展现门店体验的推广内容。", result: "独立完成账号搭建、选题、出镜、拍摄、现场演绎与剪辑。", tags: ["本地商家", "全程出镜", "独立制作"] },
];
