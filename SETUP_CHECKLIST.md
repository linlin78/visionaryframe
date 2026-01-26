# VideoFly 环境配置检查清单

## ✅ 已完成的配置

- [x] **数据库**: Neon PostgreSQL
- [x] **Better Auth Secret**: 已生成
- [x] **Google OAuth**: 已配置
- [x] **Resend 邮件服务**: 已配置
- [x] **Cloudflare R2 存储**: 已配置
- [x] **Evolink AI 服务**: 已配置 API Key
- [x] **管理员邮箱**: contact@visionaryframe.com
- [x] **AI Callback URL**: localhost:3000（开发环境）
- [x] **HMAC Secret**: 已生成安全密钥

## ⚠️ 需要手动配置的部分

### 1. Creem 支付配置（必需）

你需要到 [Creem.io](https://creem.io/dashboard) 创建产品和价格：

#### 订阅产品（需要创建 6 个）

**月付订阅：**
1. Basic Monthly - $9.9/月
   - 产品 ID: `prod_sub_basic_monthly`
   - 价格 ID: `price_sub_basic_monthly`

2. Pro Monthly - $29.9/月（推荐）
   - 产品 ID: `prod_sub_pro_monthly`
   - 价格 ID: `price_sub_pro_monthly`

3. Team Monthly - $99.9/月
   - 产品 ID: `prod_sub_team_monthly`
   - 价格 ID: `price_sub_team_monthly`

**年付订阅：**
4. Basic Yearly - $99/年
   - 产品 ID: `prod_sub_basic_yearly`
   - 价格 ID: `price_sub_basic_yearly`

5. Pro Yearly - $299/年（推荐）
   - 产品 ID: `prod_sub_pro_yearly`
   - 价格 ID: `price_sub_pro_yearly`

6. Team Yearly - $999/年
   - 产品 ID: `prod_sub_team_yearly`
   - 价格 ID: `price_sub_team_yearly`

#### 一次性积分包（需要创建 1 个）

7. Standard Pack - $19.9
   - 产品 ID: `prod_pack_standard`
   - 价格 ID: `price_pack_standard`
   - 积分: 300

**操作步骤：**
1. 登录 Creem Dashboard
2. 创建上述 7 个产品
3. 复制真实的产品 ID 和价格 ID
4. 替换 `.env.local` 中的占位符

**还需要配置：**
- `CREEM_API_KEY`: 从 Creem Dashboard 获取
- `CREEM_WEBHOOK_SECRET`: 配置 Webhook 后获取

#### 配置 Webhook

在 Creem Dashboard 中设置 Webhook URL：
```
https://your-domain.com/api/webhooks/creem
```

本地开发可以使用 ngrok:
```
https://your-ngrok-url.ngrok-free.app/api/webhooks/creem
```

### 2. Kie.ai API Key（可选）

如果需要使用 Kie 作为备用 AI 提供商：
1. 访问 [Kie.ai](https://kie.ai)
2. 注册并获取 API Key
3. 更新 `.env.local` 中的 `KIE_API_KEY`

### 3. PostHog 分析（可选）

如果需要用户行为分析：
1. 访问 [PostHog](https://app.posthog.com)
2. 创建项目
3. 更新 `.env.local` 中的 `NEXT_PUBLIC_POSTHOG_KEY`

## 🚀 生产环境部署时需要修改

当部署到生产环境时，需要修改以下配置：

```bash
# 1. APP URL
NEXT_PUBLIC_APP_URL='https://visionaryframe.com'

# 2. AI Callback URL
AI_CALLBACK_URL='https://visionaryframe.com/api/v1/video/callback'

# 3. Creem Webhook URL
# 在 Creem Dashboard 中更新为: https://visionaryframe.com/api/webhooks/creem
```

## 📝 配置验证

运行以下命令验证配置是否正确：

```bash
# 1. 检查环境变量加载
pnpm dev

# 2. 检查数据库连接
pnpm db:studio

# 3. 测试 AI API
curl -X POST http://localhost:3000/api/v1/video/generate
```

## 🔐 安全提醒

- ⚠️ **永远不要**将 `.env.local` 提交到 Git
- ⚠️ 生产环境使用强密码和安全的 HMAC 密钥
- ⚠️ 定期轮换 API Keys
- ⚠️ 确保 Webhook 验证已启用

## 📞 需要帮助？

如果配置过程中遇到问题：
1. 查看 CLAUDE.md 了解项目架构
2. 检查环境变量是否正确加载
3. 查看服务器日志获取错误信息
