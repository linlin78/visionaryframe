# 🎬 视频生成快速测试指南

## ✅ 已修复的问题

1. **API Schema 更新**：现在支持所有模型（sora-2, wan-2.6, veo-3.1, seedance-1.5-pro）
2. **时长验证**：添加了模型和时长的兼容性验证
3. **错误提示**：当选择不支持的时长时，会显示清晰的错误消息

---

## 🚀 立即测试（推荐配置）

### 测试 1: Wan 2.6（支持 5 秒）✅ 推荐

**配置：**
- 提示词：`A cute cat playing with a red ball`
- 模型：**Wan 2.6**
- 时长：**5 秒**
- 比例：16:9
- 质量默认

**原因：** Wan 2.6 支持 5 秒，积分消耗最少（约 5-7 积分）

---

### 测试 2: Sora 2（需要 10 秒以上）✅

**配置：**
- 提示词：`A beautiful sunset over the ocean`
- 模型：**Sora 2**
- 时长：**10 秒**（不能选 5 秒！）
- 比例：16:9

**原因：** Sora 2 只支持 10s 和 15s

---

### 测试 3: Veo 3.1 Fast（短视频）✅

**配置：**
- 提示词：`A dog running in the park`
- 模型：**Veo 3.1 Fast**
- 时长：**4 秒**或 **6 秒**
- 比例：16:9

**原因：** Veo 3.1 生成快速，适合短视频

---

## ⚠️ 常见错误及解决方案

### 错误 1: "Model sora-2 does not support duration 5s"

**原因：** Sora 2 只支持 10s 和 15s

**解决：**
- 选择 **Wan 2.6** 或 **Veo 3.1** 来生成 5 秒视频
- 或者选择 **Sora 2** + **10 秒**

---

### 错误 2: "Invalid API key" 或 "Unauthorized"

**原因：** Evolink API key 无效

**解决：**
1. 检查 `.env.local` 中的 `EVOLINK_API_KEY`
2. 确认 API key 正确且未过期
3. 检查 Evolink 账户余额

---

### 错误 3: "Insufficient credits"

**原因：** 积分不足

**解决：**
```bash
# 添加更多积分
pnpm script:add-credits
```

---

## 🔍 实时监控

**在浏览器控制台运行（F12 -> Console）：**

```javascript
// 监控积分和视频状态
setInterval(() => {
  Promise.all([
    fetch('/api/v1/credit/balance').then(r => r.json()),
    fetch('/api/v1/video/list').then(r => r.json())
  ]).then(([credits, videos]) => {
    console.clear();
    console.log('💰 积分:', credits);
    console.log('🎬 视频:', videos.videos.map(v => ({
      uuid: v.uuid.slice(0, 8),
      status: v.status,
      prompt: v.prompt.slice(0, 30)
    })));
  });
}, 5000);
```

---

## 📊 积分消耗参考

| 模型 | 时长 | 积分消耗 |
|------|------|---------|
| Wan 2.6 | 5s | ~5-7 |
| Wan 2.6 | 10s | ~10-14 |
| Sora 2 | 10s | ~15-20 |
| Sora 2 | 15s | ~20-30 |
| Veo 3.1 | 4s | ~3-5 |
| Seedance 1.5 Pro | 5s | ~8-12 |

---

## ✅ 测试检查清单

### 第一次测试（推荐）
- [ ] 访问 http://localhost:3000/image-to-video
- [ ] 选择 **Wan 2.6** 模型
- [ ] 选择 **5 秒** 时长
- [ ] 输入提示词：`A cute cat playing with a red ball`
- [ ] 点击"生成视频"
- [ ] 确认对话框显示正确的积分消耗
- [ ] 等待视频生成完成（可能需要 1-3 分钟）

### 验证步骤
- [ ] 访问"我的创作"页面
- [ ] 查看视频状态（应该显示 GENERATING -> COMPLETED）
- [ ] 检查积分是否正确扣除
- [ ] 播放视频确认正常

---

## 🎯 预期结果

### 成功的标志：
1. ✅ 视频出现在"我的创作"列表
2. ✅ 状态从 PENDING -> GENERATING -> COMPLETED
3. ✅ 积分正确扣除（可用积分减少，已用积分增加）
4. ✅ 视频可以播放
5. ✅ 显示缩略图

### 失败的标志：
1. ❌ 状态一直卡在 GENERATING
2. ❌ 状态变为 FAILED
3. ❌ 错误消息显示

---

## 💡 提示

1. **第一次测试**建议使用 **Wan 2.6 + 5秒**，积分消耗最少
2. **耐心等待**：视频生成通常需要 1-3 分钟
3. **监控状态**：使用上面的监控命令实时查看进度
4. **刷新页面**：如果状态没更新，尝试刷新浏览器

---

**准备好了吗？访问 http://localhost:3000/image-to-video 开始测试！** 🚀
