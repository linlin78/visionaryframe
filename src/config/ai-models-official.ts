/**
 * AI Models Official Website Configuration
 *
 * 所有模型的官网和案例展示页面
 * 直接链接到各模型的官方展示页面
 */

export const AI_MODELS_OFFICIAL = {
  /** Sora 2 - OpenAI */
  "sora-2": {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    // 官方主页
    officialWebsite: "https://openai.com/sora/",
    // 官方介绍页面
    announcement: "https://openai.com/index/sora-2/",
    // 官方社区案例库
    communityGallery: "https://community.openai.com/t/sora-gallery-share-your-creations/1048941",
    // 官方案例精选
    examplesBlog: "https://seo.ai/blog/openai-sora-examples",
    // 官方 YouTube 视频（用于嵌入）
    youtubeId: "gzneGhpXwjU",
    youtubeUrl: "https://www.youtube.com/watch?v=gzneGhpXwjU",
    // 本地演示视频
    localVideo: "/demo-videos/sora-2-demo.mp4",
    // 封面图片
    thumbnail: "https://openai.com/images/sora-hero.jpg",
    // 标语
    tagline: "A massive dragon perched on a coastal cliff, overlooking a stormy ocean with lightning strikes and cinematic sunbeams, epic fantasy movie style. 一只巨大的西方巨龙盘旋在海边悬崖峭壁之上，远处波涛汹涌的海面上伴随着闪电和丁达尔效应，画面极具史诗感和奇幻电影风格。",
    // 简化版提示词
    shortPrompt: "Dragon on coastal cliff, stormy ocean, lightning, cinematic fantasy",
    shortPromptZh: "龙在海岸悬崖上，风暴海洋，闪电，电影奇幻",
  },

  /** Wan 2.6 - Alibaba 通义万相 */
  "wan-2.6": {
    id: "wan-2.6",
    name: "Wan 2.6",
    provider: "阿里通义万象",
    // 官方主页
    officialWebsite: "https://tongyi.aliyun.com/wanxiang/",
    // 官方案例探索页面
    explorePage: "https://tongyi.aliyun.com/wan/explore/",
    // 官方活动页面
    activityPage: "https://tongyi.aliyun.com/wan/activity/muse-enlist",
    // 商业域名
    businessSite: "http://wanx.biz.aliyun.com/wan",
    // 本地演示视频
    localVideo: "/demo-videos/wan-26-demo.mp4",
    // 封面图片（使用阿里云官方图片）
    thumbnail: "https://tongyi.aliyun.com/static/wanxiang-og.jpg",
    // 标语
    tagline: "Cinematic close-up of a golden retriever in sunglasses and a bandana sitting next to a cat with a scarf, talking and looking at each other, super realistic cinematic feel. 室内暖光下，一只戴墨镜和爱心头巾的金毛与一只戴围巾的短毛猫并排坐着，它们开口说话并互相看向对方，画面呈超写实电影感。",
    // 简化版提示词
    shortPrompt: "Golden retriever with sunglasses and cat with scarf, talking together, cinematic",
    shortPromptZh: "戴墨镜金毛与围巾猫咪，对话互动，超写实电影感",
  },

  /** Veo 3.1 - Google DeepMind */
  "veo-3.1": {
    id: "veo-3.1",
    name: "Veo 3.1",
    provider: "Google DeepMind",
    // 官方主页
    officialWebsite: "https://deepmind.google/models/veo/",
    // 官方案例库
    galleryPage: "https://www.vo3ai.com/veo-gallery",
    // 提示词示例
    promptExamples: "https://skywork.ai/blog/google-veo-3-prompt-examples-2025/",
    // 官方 YouTube 视频（用于嵌入）
    youtubeId: "x_x-JAAKSvU",
    youtubeUrl: "https://www.youtube.com/watch?v=x_x-JAAKSvU",
    // 本地演示视频
    localVideo: "/demo-videos/veo-31-demo.mp4",
    // 封面图片
    thumbnail: "https://deepmind.google/models/veo/veo-hero.jpg",
    // 标语
    tagline: "Cinematic shot tracking from inside a dark wooden barn through the open doors, revealing a cowboy riding a horse away into a golden wheat field at sunset. 镜头从昏暗的木质谷仓内部穿过大门，向外展示一名牛仔在夕阳余晖下骑马穿过金色麦田的背影，画面充满温暖的电影感。",
    // 简化版提示词
    shortPrompt: "Cowboy riding horse into golden wheat field at sunset, cinematic barn exit",
    shortPromptZh: "牛仔骑马穿过金色麦田夕阳，谷仓镜头电影感",
  },

  /** Seedance 1.5 Pro - ByteDance */
  "seedance-1.5-pro": {
    id: "seedance-1.5-pro",
    name: "Seedance 1.5 Pro",
    provider: "ByteDance 字节跳动",
    // 官方主页
    officialWebsite: "https://seed.bytedance.com/en/seedance1_5_pro",
    // 官方团队主页
    teamWebsite: "https://seed.bytedance.com/en/",
    // 中文官网
    chineseWebsite: "https://seed.bytedance.com/zh/seedance",
    // 技术文档
    documentation: "https://docs.byteplus.com/en/docs/ModelArk/1631633",
    // 研究论文
    researchPaper: "https://arxiv.org/html/2506.09113v1",
    // 官方 YouTube 视频（用于嵌入）
    youtubeId: "b6mfdIGVmKk",
    youtubeUrl: "https://www.youtube.com/watch?v=b6mfdIGVmKk",
    // 本地演示视频
    localVideo: "/demo-videos/seedance-15-demo.mp4",
    // 封面图片
    thumbnail: "https://seed.bytedance.com/static/seedance-hero.jpg",
    // 标语
    tagline: "POV from a futuristic spaceship cockpit as an astronaut navigates a high-speed transition into a vibrant hyperspace starfield. 太空驾驶舱：在飞船驾驶舱内部视角，宇航员正全神贯注地驾驶，窗外星光拉伸形成进入超空间跃迁的视觉效果。",
    // 简化版提示词
    shortPrompt: "Spaceship cockpit POV, hyperspace jump transition, sci-fi",
    shortPromptZh: "飞船驾驶舱视角，超空间跃迁，科幻",
  },
};

/**
 * AI Model Card Component Props
 */
export interface ModelCardProps {
  modelId: string;
  className?: string;
}

/**
 * 获取模型配置
 */
export function getModelConfig(modelId: string) {
  return AI_MODELS_OFFICIAL[modelId as keyof typeof AI_MODELS_OFFICIAL];
}
