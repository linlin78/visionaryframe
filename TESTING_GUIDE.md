# VideoFly 测试指南

## 🎉 当前状态

✅ **阶段一已完成**：
- ✅ 环境变量配置完成
- ✅ 数据库初始化完成
- ✅ 开发服务器已启动（http://localhost:3000）
- ✅ Drizzle Studio 已启动（https://local.drizzle.studio）

## 🚀 开始测试

### 步骤 1：测试用户认证

#### 1.1 访问网站
在浏览器中打开：
```
http://localhost:3000
```

#### 1.2 注册新用户
1. 点击右上角的 "Sign In" 按钮
2. 选择以下任一方式注册：
   - **Google OAuth**：点击 "Continue with Google"
   - **Magic Link**：输入邮箱，点击发送魔法链接

#### 1.3 验证注册
- 注册成功后，应该自动登录
- 检查邮箱是否收到了欢迎邮件（Resend）

#### 1.4 检查数据库
打开 Drizzle Studio（https://local.drizzle.studio）：
- 查看 `user` 表，确认新用户已创建
- 查看 `credit_packages` 表，确认新用户获得了 50 积分
- 查看 `credit_transactions` 表，确认有 NEW_USER 类型的交易记录

**预期结果：**
- 新用户自动获得 50 积分
- 积分有效期 30 天
- 交易记录显示：`trans_type = 'NEW_USER'`

---

### 步骤 2：测试积分系统

#### 2.1 查看积分余额
1. 登录后，访问用户仪表板：http://localhost:3000/en/dashboard
2. 点击 "Credits" 菜单
3. 查看积分余额和交易历史

#### 2.2 检查积分详情
应该显示：
- **可用积分**: 50
- **冻结积分**: 0
- **已用积分**: 0
- **积分包详情**: 1 个激活的积分包
  - 初始积分: 50
  - 剩余积分: 50
  - 过期时间: 30 天后

#### 2.3 查看交易历史
应该显示：
- 1 条 `NEW_USER` 类型的交易
- 交易金额: +50 积分
- 交易时间: 注册时间

**预期结果：**
- 积分显示正确
- 交易历史完整
- 过期时间准确

---

### 步骤 3：测试视频生成流程

#### 3.1 访问视频生成页面
1. 访问：http://localhost:3000/en/demo
2. 或者直接访问：http://localhost:3000/en/image-to-video

#### 3.2 选择模型和参数
1. **选择模型**：从 4 个模型中选择一个
   - Sora 2（10-15s）
   - Wan 2.6（5-15s）
   - Veo 3.1 Fast（4-8s）
   - Seedance 1.5 Pro（4-12s）

2. **设置参数**：
   - 时长（Duration）
   - 宽高比（Aspect Ratio）
   - 画质（Quality）- 如果支持

3. **输入提示词**（Prompt）：
   ```
   A beautiful sunset over the ocean, cinematic quality, 4K
   ```

4. **（可选）上传起始图片**：
   - 如果选择图片转视频，上传一张图片

#### 3.3 生成视频
1. 点击 "Generate" 按钮
2. 确认积分消耗提示
3. 等待视频生成

#### 3.4 监控生成过程
应该看到：
- **状态变化**：PENDING → GENERATING → COMPLETED
- **进度提示**：显示预计等待时间
- **积分冻结**：生成期间，相应积分被冻结

#### 3.5 检查数据库
在 Drizzle Studio 中：
1. **查看 `videos` 表**：
   ```sql
   SELECT * FROM videos WHERE user_id = '你的用户ID' ORDER BY created_at DESC;
   ```
   应该看到新创建的视频记录

2. **查看 `credit_holds` 表**：
   ```sql
   SELECT * FROM credit_holds WHERE user_id = '你的用户ID';
   ```
   应该看到积分冻结记录

3. **查看 `credit_packages` 表**：
   ```sql
   SELECT * FROM credit_packages WHERE user_id = '你的用户ID';
   ```
   `frozen_credits` 应该增加，`remaining_credits` 减少

#### 3.6 等待 Webhook 回调
由于是本地开发环境，AI 服务无法直接回调 localhost。

**解决方案（可选）：**
1. 使用 ngrok 创建公网隧道：
   ```bash
   ngrok http 3000
   ```

2. 更新 `.env.local`：
   ```bash
   AI_CALLBACK_URL=https://your-ngrok-url.ngrok-free.app/api/v1/video/callback
   ```

3. 重启开发服务器

**或者手动完成生成（测试用）：**
在 Drizzle Studio 中手动更新视频状态：
```sql
-- 模拟视频生成完成
UPDATE videos
SET status = 'COMPLETED',
    video_url = 'https://example.com/test-video.mp4',
    thumbnail_url = 'https://example.com/test-thumb.jpg',
    completed_at = NOW(),
    updated_at = NOW()
WHERE uuid = 'video_uuid';
```

#### 3.7 查看生成的视频
1. 访问：http://localhost:3000/en/my-creations
2. 应该看到刚刚生成的视频
3. 点击播放视频

**预期结果：**
- 视频成功生成
- 积分正确扣除
- 视频保存到数据库和 R2
- 可以在"我的作品"中查看

---

### 步骤 4：测试积分不足场景

#### 4.1 生成多个视频
使用剩余的积分（50 - 已用积分）继续生成视频，直到积分不足。

#### 4.2 尝试超额生成
当积分不足时：
1. 再次点击 "Generate"
2. 应该看到错误提示："积分不足"
3. 引导用户购买积分包或订阅

**预期结果：**
- 无法生成视频
- 显示友好的错误提示
- 提供购买积分的入口

---

### 步骤 5：测试支付流程（需要 Creem 配置）

**注意**：此步骤需要先完成 Creem 支付配置（参考 `CREEM_SETUP_GUIDE.md`）

#### 5.1 测试订阅支付
1. 访问定价页面：http://localhost:3000/en/pricing
2. 选择一个订阅计划（如 Pro Monthly）
3. 点击 "Subscribe" 按钮
4. 跳转到 Creem 支付页面
5. 完成支付（测试模式）
6. 等待 Webhook 回调

#### 5.2 验证支付结果
1. 检查邮箱是否收到支付确认邮件
2. 在 Drizzle Studio 中查看：
   - `creem_subscriptions` 表：应该有新记录
   - `credit_packages` 表：应该有新的积分包
   - `credit_transactions` 表：应该有 SUBSCRIPTION 类型的交易

3. 在前端查看积分余额，应该已增加

**预期结果：**
- 支付成功
- 积分自动到账
- 订阅状态更新
- 交易记录完整

#### 5.3 测试积分包购买
1. 在积分页面（Credits）点击 "Buy More Credits"
2. 选择 Standard Pack（$19.9, 300 积分）
3. 完成支付
4. 验证积分增加

---

## 🐛 常见问题排查

### 问题 1：无法注册/登录
**检查：**
- Better Auth Secret 是否正确配置
- Google OAuth 凭证是否有效
- 数据库连接是否正常

**解决方案：**
- 查看 `pnpm dev` 的控制台输出
- 检查浏览器控制台的错误信息
- 查看数据库 `user` 表是否有记录

### 问题 2：注册后没有获得积分
**检查：**
- 环境变量 `CREDIT_NEW_USER_ENABLED=true`
- 环境变量 `CREDIT_NEW_USER_AMOUNT=50`

**解决方案：**
- 重启开发服务器
- 检查积分服务的日志
- 手动添加积分（使用管理员脚本）

### 问题 3：视频生成失败
**检查：**
- Evolink API Key 是否有效
- 积分是否足够
- AI Callback URL 是否正确

**解决方案：**
- 查看 API 调用日志
- 检查 Evolink Dashboard 中的任务状态
- 验证 Webhook 配置

### 问题 4：Webhook 无法接收
**检查：**
- 本地开发环境需要使用 ngrok
- AI_CALLBACK_URL 必须是公网可访问的地址

**解决方案：**
```bash
# 安装 ngrok
npm install -g ngrok

# 启动隧道
ngrok http 3000

# 复制 ngrok URL，更新 .env.local
AI_CALLBACK_URL=https://xxx.ngrok-free.app/api/v1/video/callback
```

### 问题 5：支付后积分未到账
**检查：**
- Creem Webhook 是否正确配置
- Webhook Secret 是否正确
- Webhook URL 是否可访问

**解决方案：**
- 查看 Creem Dashboard 的 Webhook 日志
- 检查服务器日志中的 Webhook 处理记录
- 验证 Webhook 签名

---

## 📊 测试检查清单

### 基础功能
- [ ] 用户注册（Google OAuth）
- [ ] 用户注册（Magic Link）
- [ ] 新用户获得 50 积分
- [ ] 查看积分余额
- [ ] 查看积分交易历史
- [ ] 查看积分包详情

### 视频生成
- [ ] 选择不同模型
- [ ] 设置不同参数
- [ ] 文本转视频
- [ ] 图片转视频
- [ ] 查看生成进度
- [ ] 查看已生成的视频
- [ ] 删除视频
- [ ] 积分正确扣除

### 支付（需要 Creem 配置）
- [ ] 订阅月付计划
- [ ] 订阅年付计划
- [ ] 购买积分包
- [ ] 支付后积分到账
- [ ] Webhook 正常处理
- [ ] 邮件通知发送

### 管理员功能
- [ ] 访问管理员面板
- [ ] 查看所有用户
- [ ] 查看所有视频
- [ ] 手动添加积分
- [ ] 查看系统统计

---

## 🎯 下一步

完成基础测试后：
1. **修复发现的 Bug**
2. **完善前端 UI/UX**
3. **添加更多测试**
4. **准备生产环境部署**
5. **配置域名和 CDN**
6. **上线运营**

---

## 📝 测试记录

在测试过程中，记录以下信息：

| 功能 | 测试时间 | 测试结果 | 问题描述 | 解决方案 |
|------|---------|---------|---------|---------|
| 用户注册 | | ✅/❌ | | |
| 积分系统 | | ✅/❌ | | |
| 视频生成 | | ✅/❌ | | |
| 支付流程 | | ✅/❌ | | |

---

## 💡 提示

- **保持耐心**：首次测试可能遇到各种问题，这是正常的
- **查看日志**：服务器日志和浏览器控制台是调试的好帮手
- **使用 Drizzle Studio**：直接查看数据库是最直接的验证方式
- **逐步测试**：不要一次性测试所有功能，循序渐进
- **记录问题**：发现问题时，记录详细的错误信息和复现步骤

---

需要帮助？查看：
- `CLAUDE.md` - 项目架构文档
- `SETUP_CHECKLIST.md` - 配置检查清单
- `CREEM_SETUP_GUIDE.md` - Creem 配置指南
