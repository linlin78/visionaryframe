# 🎬 视频生成测试指南

## ✅ 配置检查清单

- [x] Evolink API Key 已配置
- [x] AI Callback URL 已配置
- [x] HMAC Secret 已配置
- [x] 积分余额：50
- [x] 开发服务器运行中

---

## 🚀 开始测试视频生成

### 步骤 1: 打开视频生成页面

访问：**http://localhost:3000/image-to-video**

你应该能看到：
- 提示词输入框（Prompt）
- 模型选择器（Sora 2, Wan 2.6, Veo 3.1, Seedance 1.5 Pro）
- 时长选择（5s, 10s, 15s）
- 比例选择（16:9, 9:16）
- 起始图片上传（可选）
- "生成视频" 按钮

---

### 步骤 2: 填写表单（第一个测试）

**简单测试（推荐先用这个）:**

1. **提示词**: `A cute cat playing with a red ball`
2. **模型**: Sora 2 (默认)
3. **时长**: 5s
4. **比例**: 16:9
5. **起始图片**: 暂时不上传

---

### 步骤 3: 点击"生成视频"

点击按钮后，你应该看到：

1. **确认对话框**弹出
   - 显示消耗积分数量
   - Sora 2 + 5s ≈ 10-15 积分
   - 点击"确认"

2. **状态变化**:
   - 按钮显示"生成中..."
   - 或者显示进度条
   - 或者跳转到"我的创作"页面

---

### 步骤 4: 检查积分变化

**打开浏览器控制台（F12），运行：**

```javascript
// 检查积分状态
fetch('/api/v1/credit/balance')
  .then(r => r.json())
  .then(data => console.log('积分状态:', data))
```

**预期结果（生成中）：**
```json
{
  "availableCredits": 35-40,  // 剩余可用积分
  "frozenCredits": 10-15,     // 冻结的积分
  "usedCredits": 0            // 已消耗的积分
}
```

---

### 步骤 5: 监控生成进度

**访问"我的创作"页面：**
http://localhost:3000/my-creations

你应该看到：
- 新创建的视频卡片
- 状态：**PENDING** 或 **GENERATING**
- 提示词：A cute cat playing with a red ball
- 创建时间：刚刚

---

### 步骤 6: 等待生成完成

**两种可能的情况：**

#### 情况 A: 生成成功 ✅

1. 状态变为 **COMPLETED**
2. 显示视频缩略图
3. 可以播放视频
4. 积分状态更新：
   ```json
   {
     "availableCredits": 35-40,
     "frozenCredits": 0,
     "usedCredits": 10-15
   }
   ```

#### 情况 B: 生成失败 ❌

1. 状态变为 **FAILED**
2. 显示错误信息
3. 积分被释放：
   ```json
   {
     "availableCredits": 50,  // 恢复原样
     "frozenCredits": 0,
     "usedCredits": 0
   }
   ```

---

## 🔍 调试命令

### 检查视频列表

```javascript
fetch('/api/v1/video/list')
  .then(r => r.json())
  .then(data => console.log('视频列表:', data))
```

### 检查单个视频状态

```javascript
// 替换 VIDEO_UUID 为实际的视频 UUID
fetch('/api/v1/video/VIDEO_UUID')
  .then(r => r.json())
  .then(data => console.log('视频详情:', data))
```

### 轮询视频状态（自动更新）

```javascript
// 每 3 秒检查一次状态
setInterval(() => {
  fetch('/api/v1/video/list')
    .then(r => r.json())
    .then(data => {
      data.videos.forEach(video => {
        console.log(`视频 ${video.uuid}: ${video.status}`);
      });
    });
}, 3000);
```

---

## ⚠️ 可能遇到的问题

### 问题 1: Webhook 回调失败

**症状：**
- 视频状态一直是 **GENERATING**
- 从未变成 **COMPLETED** 或 **FAILED**

**原因：**
Evolink 无法访问你的 `localhost:3000`（AI provider 的服务器在外网）

**解决方案：**

**选项 1: 使用 ngrok（推荐）**

1. 安装 ngrok: https://ngrok.com/download
2. 运行 ngrok:
   ```bash
   ngrok http 3000
   ```
3. 复制 ngrok 提供的公网 URL（例如：`https://abc123.ngrok.io`）
4. 修改 `.env.local`:
   ```bash
   AI_CALLBACK_URL=https://abc123.ngrok.io/api/v1/video/callback
   ```
5. 重启开发服务器：`Ctrl+C` 停止，然后 `pnpm dev`

**选项 2: 手动轮询（临时方案）**

如果不想用 ngrok，可以手动查询视频状态：
```javascript
// 每 5 秒轮询一次
const checkStatus = async () => {
  const response = await fetch('/api/v1/video/list');
  const data = await response.json();

  data.videos.forEach(video => {
    if (video.status === 'GENERATING' || video.status === 'PENDING') {
      console.log(`视频 ${video.uuid} 仍在生成中...`);
      // 刷新页面查看最新状态
    }
  });
};

setInterval(checkStatus, 5000);
```

---

### 问题 2: API Key 无效

**症状：**
- 错误消息：`Unauthorized` 或 `Invalid API key`
- HTTP 401 错误

**解决方案：**
1. 检查 API key 是否正确复制
2. 确认 API key 未过期
3. 检查 Evolink 账户余额

---

### 问题 3: 积分不足

**症状：**
- 错误消息：`Insufficient credits`
- HTTP 400 错误

**解决方案：**
1. 检查当前积分余额
2. 运行脚本添加积分：
   ```bash
   pnpm script:add-credits
   ```

---

### 问题 4: 提示词被拒绝

**症状：**
- 错误消息：`Prompt rejected` 或 `Content policy violation`

**解决方案：**
- Evolink 有内容审核政策
- 避免使用不当内容
- 尝试不同的提示词

---

## 📊 测试检查清单

### 第一次测试（简单）

- [ ] 页面加载正常
- [ ] 填写表单：`A cute cat playing with a red ball`
- [ ] 点击"生成视频"
- [ ] 确认对话框显示正确的积分消耗
- [ ] 积分被冻结
- [ ] 视频出现在"我的创作"列表
- [ ] 状态正确更新

### 第二次测试（带图片）

- [ ] 上传起始图片
- [ ] 填写提示词
- [ ] 生成视频
- [ ] 检查图片是否被正确使用

### 第三次测试（不同参数）

- [ ] 尝试不同模型（Wan 2.6, Veo 3.1）
- [ ] 尝试不同时长（10s, 15s）
- [ ] 尝试不同比例（9:16）
- [ ] 检查积分消耗是否正确

---

## 🎯 成功标准

如果看到以下结果，说明测试成功：

✅ **视频生成成功**:
- 状态：COMPLETED
- 有视频 URL
- 可以播放视频
- 积分正确扣除

✅ **积分系统工作正常**:
- 生成前：50 可用
- 生成中：X 可用 + Y 冻结
- 生成后：(50-Y) 可用 + 0 冻结 + Y 已用

✅ **错误处理正确**:
- 失败时积分被释放
- 错误消息清晰

---

## 🚀 下一步

测试成功后，你可以：

1. **尝试更复杂的提示词**
   - 多个主体
   - 特定风格
   - 运动描述

2. **测试图片转视频**
   - 上传自己的图片
   - 基于图片生成视频

3. **批量测试**
   - 连续生成多个视频
   - 检查积分 FIFO 消耗

4. **测试支付流程**
   - 配置 Creem
   - 测试购买积分包

---

**准备好开始测试了吗？** 🎬

访问 http://localhost:3000/image-to-video 开始你的第一个视频生成！
