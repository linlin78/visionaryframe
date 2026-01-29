# AI 模型演示视频资源指南

## ✅ 已完成的工作

### 1. 创建了视频配置文件
**文件位置：** `src/config/demo-videos.tsx`

包含所有 4 个 AI 模型的官方演示视频信息：
- ✅ Sora 2 (OpenAI)
- ✅ Wan 2.6 (阿里通义万象)
- ✅ Veo 3.1 (Google DeepMind)
- ✅ Seedance 1.5 Pro (字节跳动)

### 2. 创建了嵌入组件
**文件位置：** `src/components/demo/model-demos-showcase.tsx`

包含：
- ✅ YouTube 视频嵌入组件
- ✅ Bilibili 视频嵌入组件
- ✅ 完整的演示展示页面组件

---

## 🎬 使用方法

### 方法 1：使用完整的展示组件（推荐）

```tsx
import { ModelDemosShowcase } from "@/components/demo/model-demos-showcase";

export default function DemoPage() {
  return <ModelDemosShowcase />;
}
```

### 方法 2：单独使用某个模型视频

```tsx
import { DEMO_VIDEOS, EmbeddedYouTubeVideo } from "@/config/demo-videos";

// Sora 2 视频
<EmbeddedYouTubeVideo
  youtubeId={DEMO_VIDEOS["sora-2"].youtubeId}
  title="Sora 2 Demo"
/>

// Veo 3.1 视频
<EmbeddedYouTubeVideo
  youtubeId={DEMO_VIDEOS["veo-3.1"].youtubeId}
  title="Veo 3.1 Demo"
/>
```

---

## 📋 视频资源列表

### Sora 2 - OpenAI
- **YouTube ID:** `gzneGhpXwjU`
- **标题:** Introducing Sora 2
- **官网:** https://openai.com/index/sora-2/
- **观看链接:** https://www.youtube.com/watch?v=gzneGhpXwjU

### Wan 2.6 - 阿里通义万象
- **Bilibili ID:** `BV1vk4y1P7ai`
- **标题:** 通义万相 - AI 视频生成
- **官网:** https://tongyi.aliyun.com/wanxiang/
- **观看链接:** https://www.bilibili.com/video/BV1vk4y1P7ai

### Veo 3.1 - Google DeepMind
- **YouTube ID:** `Zv4Z7c-qgoM`
- **标题:** Veo 3.1 and Flow Platform
- **官网:** https://deepmind.google/models/veo/
- **观看链接:** https://www.youtube.com/watch?v=Zv4Z7c-qgoM

### Seedance 1.5 Pro - ByteDance
- **YouTube ID:** `b6mfdIGVmKk`
- **标题:** Seedance 1.5 Pro - Fluid Motion
- **官网:** https://seed.bytedance.com/en/seedance1_5_pro
- **观看链接:** https://www.youtube.com/watch?v=b6mfdIGVmKk

---

## 🎯 集成到现有页面

你可以将 `<ModelDemosShowcase />` 组件添加到任何页面，例如：

### 选项 1：添加到 demo 页面
```tsx
// src/app/[locale]/(marketing)/demo/page.tsx
import { ModelDemosShowcase } from "@/components/demo/model-demos-showcase";

export default function DemoPage() {
  return (
    <>
      {/* 现有内容 */}
      <ModelDemosShowcase />
    </>
  );
}
```

### 选项 2：添加到新的演示页面
```tsx
// src/app/[locale]/(marketing)/model-demos/page.tsx
import { ModelDemosShowcase } from "@/components/demo/model-demos-showcase";

export default function ModelDemosPage() {
  return <ModelDemosShowcase />;
}
```

---

## 📝 注意事项

### ✅ 优点
- **无需下载** - 视频直接从官方服务器加载
- **自动更新** - 官方更新视频时自动同步
- **节省空间** - 不占用服务器存储
- **高清质量** - 自动选择最佳质量
- **合法合规** - 使用官方嵌入代码

### ⚠️ 注意
- **需要网络** - 用户需要能访问 YouTube/Bilibili
- **可能需要代理** - 某些地区可能需要代理才能观看

---

## 🔧 如果确实需要下载视频

### 方法 1：在线下载器
访问以下网站：
- https://www.y2mate.com/youtube
- https://9convert.com/download

### 方法 2：使用 yt-dlp（已安装）
重启终端后运行：
```bash
# Sora 2
yt-dlp -f "best[ext=mp4]" "https://www.youtube.com/watch?v=gzneGhpXwjU"

# Veo 3.1
yt-dlp -f "best[ext=mp4]" "https://www.youtube.com/watch?v=Zv4Z7c-qgoM"

# Seedance 1.5 Pro
yt-dlp -f "best[ext=mp4]" "https://www.youtube.com/watch?v=b6mfdIGVmKk"
```

### 方法 3：Python 脚本
```python
pip install pytube
```

```python
from pytube import YouTube

yt = YouTube('https://www.youtube.com/watch?v=gzneGhpXwjU')
yt.streams.filter(file_extension='mp4').order_by('resolution').desc().first().download()
```

---

## 📞 需要帮助？

如果你想：
1. 将这些视频集成到特定的页面
2. 修改视频展示样式
3. 添加更多视频资源

请告诉我！
