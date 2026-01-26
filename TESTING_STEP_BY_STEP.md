# VideoFly 测试指南

## ✅ 当前状态

### 已完成的配置
- ✅ 数据库初始化（PostgreSQL + Drizzle ORM）
- ✅ 开发服务器运行（http://localhost:3000）
- ✅ 用户登录成功（fanzulyx2s@gmail.com / 林勇）
- ✅ 积分已添加（50 积分）
- ✅ 会话状态正常

### 已知问题
- ⚠️ Google OAuth 在本地网络环境下失败（fetch failed）
- ✅ 已通过直接添加积分解决

---

## 📋 测试步骤

### 1️⃣ 验证积分显示

**步骤：**
1. 打开浏览器访问：http://localhost:3000
2. 确认已登录（右上角显示：林勇 / fanzulyx2s@gmail.com）
3. 查看积分显示是否为 **50**

**预期结果：**
- 首页右上角显示：50 Credits
- 如果不是 50，刷新浏览器页面（Ctrl+R 或 F5）

**如何验证：**
- 打开浏览器控制台（F12）
- 在 Console 标签中运行：
```javascript
fetch('/api/v1/credit/balance')
  .then(r => r.json())
  .then(data => console.log('积分余额:', data))
```

**预期输出：**
```json
{
  "availableCredits": 50,
  "frozenCredits": 0,
  "usedCredits": 0
}
```

---

### 2️⃣ 测试积分历史记录

**步骤：**
1. 访问：http://localhost:3000/credits
2. 查看积分历史记录

**预期结果：**
- 显示一条记录：NEW_USER（新用户赠送）
- 积分变动：+50
- 余额：50
- 时间戳：刚才创建的时间

---

### 3️⃣ 测试视频生成功能

**重要提示：**
在本地测试视频生成需要配置 AI provider API key 和 webhook 回调。

#### 3.1 检查配置

查看 `.env.local` 文件确认以下配置：

```bash
# AI Provider API Keys
EVOLINK_API_KEY=your_evolink_api_key_here
KIE_API_KEY=your_kie_api_key_here

# Webhook 回调 URL（本地开发需要使用 ngrok）
AI_CALLBACK_URL=http://localhost:3000/api/v1/video/callback
AI_CALLBACK_SECRET=your_webhook_secret_here
```

#### 3.2 如果没有 API Key

你可以：
1. **暂时跳过视频生成测试**，继续测试其他功能
2. **申请 AI provider 的 API key**：
   - Evolink: https://evolink.com
   - Kie: https://kie.ai
3. **使用模拟数据测试 UI**

#### 3.3 如果有 API Key

**步骤：**
1. 访问：http://localhost:3000/image-to-video
2. 填写表单：
   - 输入提示词（Prompt）：例如 "A cat playing with a ball"
   - 选择模型：Sora 2 / Wan 2.6 / Veo 3.1 / Seedance 1.5 Pro
   - 选择时长：5s / 10s / 15s
   - 选择比例：16:9 / 9:16
   - 上传起始图片（可选）
3. 点击"生成视频"按钮

**预期结果：**
- 弹出确认对话框，显示消耗积分数量
- 确认后显示"生成中"状态
- 积分被冻结（frozenCredits 增加）
- 视频生成任务创建成功

**如何验证：**
```javascript
// 检查积分状态
fetch('/api/v1/credit/balance')
  .then(r => r.json())
  .then(data => console.log('积分状态:', data))

// 查询视频列表
fetch('/api/v1/video/list')
  .then(r => r.json())
  .then(data => console.log('视频列表:', data))
```

---

### 4️⃣ 测试视频列表功能

**步骤：**
1. 访问：http://localhost:3000/my-creations
2. 查看视频历史记录

**预期结果：**
- 显示所有生成的视频
- 每个视频卡片显示：
  - 缩略图
  - 提示词
  - 状态（PENDING / GENERATING / COMPLETED / FAILED）
  - 创建时间

---

### 5️⃣ 测试积分消耗流程

**完整流程测试（需要 AI API）：**

1. **初始状态：** 50 可用积分
2. **生成视频：** 假设消耗 10 积分
   - 可用积分：50 → 40
   - 冻结积分：0 → 10
3. **生成中：** 显示 10 积分冻结
4. **生成成功：**
   - 可用积分：40
   - 冻结积分：10 → 0
   - 已用积分：0 → 10
5. **生成失败：**
   - 可用积分：40 → 50
   - 冻结积分：10 → 0
   - 已用积分：0

**如何验证每个阶段：**
```javascript
// 定期检查积分状态
setInterval(() => {
  fetch('/api/v1/credit/balance')
    .then(r => r.json())
    .then(data => console.log('积分状态:', data))
}, 3000)
```

---

### 6️⃣ 测试定价页面

**步骤：**
1. 访问：http://localhost:3000/pricing
2. 查看定价方案

**预期结果：**
- 显示三个套餐：Basic / Pro / Team
- 每个套餐显示：
  - 价格（月付/年付）
  - 积分数量
  - 功能列表
- 显示一次性积分包选项

---

### 7️⃣ 测试积分过期警告

**注意：** 当前积分包设置为 30 天后过期，暂时无法测试过期警告。

**未来测试方法：**
1. 等待 30 天
2. 或者手动修改数据库中的 `expiredAt` 字段为过去的时间
3. 访问网站，检查是否显示过期警告

---

## 🔧 调试工具

### 浏览器控制台命令

```javascript
// 1. 检查当前会话
fetch('/api/auth/get-session')
  .then(r => r.json())
  .then(data => console.log('当前用户:', data))

// 2. 检查积分余额
fetch('/api/v1/credit/balance')
  .then(r => r.json())
  .then(data => console.log('积分余额:', data))

// 3. 检查积分历史
fetch('/api/v1/credit/history')
  .then(r => r.json())
  .then(data => console.log('积分历史:', data))

// 4. 检查视频列表
fetch('/api/v1/video/list')
  .then(r => r.json())
  .then(data => console.log('视频列表:', data))

// 5. 检查可用模型
fetch('/api/v1/config/models')
  .then(r => r.json())
  .then(data => console.log('可用模型:', data))
```

### 数据库查询（使用 Drizzle Studio）

1. 打开 Drizzle Studio：
   ```bash
   pnpm db:studio
   ```
2. 访问：http://localhost:4983
3. 查看表：
   - `user` - 用户表
   - `session` - 会话表
   - `credit_packages` - 积分包表
   - `credit_transactions` - 积分交易记录
   - `credit_holds` - 积分冻结记录
   - `videos` - 视频记录

---

## 📊 测试检查清单

### 基础功能
- [ ] 首页加载正常
- [ ] 用户登录状态正确
- [ ] 积分显示为 50
- [ ] 积分历史记录显示正确

### 页面导航
- [ ] 导航栏菜单可点击
- [ ] 所有页面可正常访问：
  - [ ] 首页（/）
  - [ ] 定价页（/pricing）
  - [ ] 我的创作（/my-creations）
  - [ ] 积分页面（/credits）
  - [ ] 图片转视频（/image-to-video）

### 积分系统
- [ ] 积分余额 API 返回正确
- [ ] 积分历史 API 返回正确
- [ ] 新用户赠送积分功能正常

### UI/UX
- [ ] 响应式设计（移动端/桌面端）
- [ ] 加载状态显示
- [ ] 错误提示友好
- [ ] Toast 通知正常

---

## 🐛 常见问题

### Q1: 积分显示为 0

**解决方案：**
1. 刷新浏览器页面
2. 清除浏览器 Cookie 并重新登录
3. 检查控制台是否有 401 错误
4. 运行积分检查脚本：
   ```bash
   pnpm script:check-credits fanzulyx2s@gmail.com
   ```

### Q2: 视频生成失败

**可能原因：**
1. AI provider API key 未配置或无效
2. Webhook 回调 URL 配置错误
3. 积分不足
4. 网络问题

**调试步骤：**
1. 检查 `.env.local` 配置
2. 查看浏览器控制台错误
3. 查看开发服务器日志（`pnpm dev` 输出）
4. 检查 AI provider API 是否可用

### Q3: 登录后自动退出

**解决方案：**
1. 检查会话过期时间
2. 清除浏览器 Cookie
3. 重新登录
4. 检查数据库中的 session 表

### Q4: Magic Link 发送失败

**可能原因：**
1. Resend API key 未配置
2. 邮箱地址格式错误
3. 网络问题

**解决方案：**
1. 检查 `.env.local` 中的 `RESEND_API_KEY`
2. 检查 `RESEND_FROM` 配置
3. 查看 Resend Dashboard 发送记录

---

## 🚀 下一步

完成基础测试后，你可以：

1. **配置 AI Provider**：
   - 申请 Evolink 或 Kie 的 API key
   - 配置 webhook 回调（使用 ngrok）
   - 测试完整的视频生成流程

2. **配置支付系统**：
   - 注册 Creem 账号
   - 配置 Creem API key
   - 测试支付流程

3. **部署到生产环境**：
   - 配置生产数据库
   - 配置域名和 SSL
   - 设置环境变量
   - 部署到 Vercel/Railway 等

---

## 📝 反馈

如果在测试过程中遇到任何问题，请记录：
1. 具体操作步骤
2. 预期结果 vs 实际结果
3. 浏览器控制台错误
4. 服务器日志错误

这将帮助我们快速定位和解决问题！
