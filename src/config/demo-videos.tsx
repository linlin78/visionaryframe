/**
 * AI Model Demo Videos Configuration
 *
 * 所有模型的官方演示视频嵌入链接
 */

export const DEMO_VIDEOS = {
  /** Sora 2 - OpenAI */
  "sora-2": {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    youtubeId: "gzneGhpXwjU", // Introducing Sora 2
    title: "Sora 2 - Introducing Sora 2",
    embedUrl: "https://www.youtube.com/embed/gzneGhpXwjU",
    watchUrl: "https://www.youtube.com/watch?v=gzneGhpXwjU",
    thumbnail: "https://img.youtube.com/vi/gzneGhpXwjU/maxresdefault.jpg",
  },

  /** Wan 2.6 - Alibaba */
  "wan-2.6": {
    id: "wan-2.6",
    name: "Wan 2.6",
    provider: "Alibaba Tongyi",
    youtubeId: "BV1vk4y1P7ai", // 通义万相介绍
    title: "通义万相 - AI 视频生成",
    embedUrl: "https://www.bilibili.com/embed/BV1vk4y1P7ai",
    watchUrl: "https://www.bilibili.com/video/BV1vk4y1P7ai",
    thumbnail: "https://i0.hdslb.com/bfs/archive/your-thumbnail.jpg", // Bilibili thumbnails need manual check
  },

  /** Veo 3.1 - Google DeepMind */
  "veo-3.1": {
    id: "veo-3.1",
    name: "Veo 3.1",
    provider: "Google DeepMind",
    youtubeId: "Zv4Z7c-qgoM", // Veo 3.1 and Flow Platform
    title: "Veo 3.1 and Flow Platform",
    embedUrl: "https://www.youtube.com/embed/Zv4Z7c-qgoM",
    watchUrl: "https://www.youtube.com/watch?v=Zv4Z7c-qgoM",
    thumbnail: "https://img.youtube.com/vi/Zv4Z7c-qgoM/maxresdefault.jpg",
  },

  /** Seedance 1.5 Pro - ByteDance */
  "seedance-1.5-pro": {
    id: "seedance-1.5-pro",
    name: "Seedance 1.5 Pro",
    provider: "ByteDance",
    youtubeId: "b6mfdIGVmKk", // Seedance 1.5 Pro Demo
    title: "Seedance 1.5 Pro - Fluid Motion",
    embedUrl: "https://www.youtube.com/embed/b6mfdIGVmKk",
    watchUrl: "https://www.youtube.com/watch?v=b6mfdIGVmKk",
    thumbnail: "https://img.youtube.com/vi/b6mfdIGVmKk/maxresdefault.jpg",
  },
};

/**
 * YouTube 嵌入式视频组件
 */
export function EmbeddedYouTubeVideo({
  youtubeId,
  title,
  className = "",
}: {
  youtubeId: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

/**
 * Bilibili 嵌入式视频组件
 */
export function EmbeddedBilibiliVideo({
  bvid,
  title,
  className = "",
}: {
  bvid: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video bg-black rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
        title={title}
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        scrolling="no"
        border="0"
        frameBorder="no"
      />
    </div>
  );
}
