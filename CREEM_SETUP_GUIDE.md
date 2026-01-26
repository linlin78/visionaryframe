# Creem 支付配置完整指南

## 📋 前置准备

1. 注册 Creem 账号：https://creem.io
2. 登录 Dashboard
3. 获取 API Key（在 Settings > API Keys）

## 🛒 创建产品

### 一、订阅产品（Subscriptions）

需要在 Creem 中创建 6 个订阅产品：

#### 1. Basic Monthly（基础月付）
- **产品名称**: Basic Plan (Monthly)
- **产品 ID**: `prod_sub_basic_monthly`
- **价格**: $9.9/月
- **价格 ID**: `price_sub_basic_monthly`
- **描述**: 100 积分/月，高清视频
- **计费模式**: Recurring (Monthly)

#### 2. Pro Monthly（专业月付）⭐ 推荐
- **产品名称**: Pro Plan (Monthly)
- **产品 ID**: `prod_sub_pro_monthly`
- **价格**: $29.9/月
- **价格 ID**: `price_sub_pro_monthly`
- **描述**: 500 积分/月，高清视频，无水印，商用授权
- **计费模式**: Recurring (Monthly)
- **推荐标签**: Popular

#### 3. Team Monthly（团队月付）
- **产品名称**: Team Plan (Monthly)
- **产品 ID**: `prod_sub_team_monthly`
- **价格**: $99.9/月
- **价格 ID**: `price_sub_team_monthly`
- **描述**: 2000 积分/月，所有功能，优先支持，API 访问
- **计费模式**: Recurring (Monthly)

#### 4. Basic Yearly（基础年付）
- **产品名称**: Basic Plan (Yearly)
- **产品 ID**: `prod_sub_basic_yearly`
- **价格**: $99/年
- **价格 ID**: `price_sub_basic_yearly`
- **描述**: 1200 积分/年（相当于 10 个月送 2 个月）
- **计费模式**: Recurring (Yearly)

#### 5. Pro Yearly（专业年付）⭐ 推荐
- **产品名称**: Pro Plan (Yearly)
- **产品 ID**: `prod_sub_pro_yearly`
- **价格**: $299/年
- **价格 ID**: `price_sub_pro_yearly`
- **描述**: 6000 积分/年（相当于 10 个月送 2 个月）
- **计费模式**: Recurring (Yearly)
- **推荐标签**: Popular

#### 6. Team Yearly（团队年付）
- **产品名称**: Team Plan (Yearly)
- **产品 ID**: `prod_sub_team_yearly`
- **价格**: $999/年
- **价格 ID**: `price_sub_team_yearly`
- **描述**: 24000 积分/年（相当于 10 个月送 2 个月）
- **计费模式**: Recurring (Yearly)

### 二、一次性积分包（One-time Purchase）

#### 7. Standard Pack（标准积分包）
- **产品名称**: Standard Credit Pack
- **产品 ID**: `prod_pack_standard`
- **价格**: $19.9
- **价格 ID**: `price_pack_standard`
- **积分数量**: 300 积分
- **描述**: 300 积分，有效期 365 天
- **计费模式**: One-time
- **限制**: 仅限订阅用户购买

## 🔧 在 Creem Dashboard 中创建产品的步骤

1. **登录 Creem Dashboard**
   ```
   https://creem.io/dashboard
   ```

2. **导航到 Products 页面**
   - 左侧菜单 > Products > Create Product

3. **填写产品信息**
   ```
   Product Name: [从上面的列表中选择]
   Product ID: [复制对应的 ID]
   Description: [填写产品描述]
   Pricing Type: Recurring / One-time
   Price: [填写价格]
   Billing Cycle: Monthly / Yearly (仅订阅产品)
   ```

4. **保存产品**
   - 点击 "Create Product"
   - 系统会生成 Product ID 和 Price ID

5. **复制 ID 到环境变量**
   - 复制 Product ID
   - 复制 Price ID
   - 更新 `.env.local` 文件

## 🔄 配置 Webhook

### 步骤：

1. **在 Creem Dashboard 中配置 Webhook**
   ```
   Webhook URL: https://visionaryframe.com/api/webhooks/creem
   ```

   **本地开发环境**（使用 ngrok）:
   ```
   Webhook URL: https://your-ngrok-url.ngrok-free.app/api/webhooks/creem
   ```

2. **生成 Webhook Secret**
   - Creem 会自动生成一个 Webhook Secret
   - 复制这个 Secret

3. **更新环境变量**
   ```bash
   CREEM_API_KEY=creem_sk_your_actual_api_key
   CREEM_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
   ```

## 📝 更新 .env.local

完成产品和 Webhook 创建后，更新 `.env.local` 文件：

```bash
# -----------------------------------------------------------------------------
# Creem (Default Billing)
# -----------------------------------------------------------------------------
CREEM_API_KEY="creem_sk_你实际的API密钥"
CREEM_WEBHOOK_SECRET="whsec_你实际的Webhook密钥"

# -----------------------------------------------------------------------------
# Creem Subscription Products
# -----------------------------------------------------------------------------

# Monthly Subscriptions
NEXT_PUBLIC_CREEM_PRODUCT_SUB_BASIC_MONTHLY=prod_sub_basic_monthly
NEXT_PUBLIC_CREEM_PRICE_SUB_BASIC_MONTHLY=price_sub_basic_monthly_实际的

NEXT_PUBLIC_CREEM_PRODUCT_SUB_PRO_MONTHLY=prod_sub_pro_monthly
NEXT_PUBLIC_CREEM_PRICE_SUB_PRO_MONTHLY=price_sub_pro_monthly_实际的

NEXT_PUBLIC_CREEM_PRODUCT_SUB_TEAM_MONTHLY=prod_sub_team_monthly
NEXT_PUBLIC_CREEM_PRICE_SUB_TEAM_MONTHLY=price_sub_team_monthly_实际的

# Yearly Subscriptions
NEXT_PUBLIC_CREEM_PRODUCT_SUB_BASIC_YEARLY=prod_sub_basic_yearly
NEXT_PUBLIC_CREEM_PRICE_SUB_BASIC_YEARLY=price_sub_basic_yearly_实际的

NEXT_PUBLIC_CREEM_PRODUCT_SUB_PRO_YEARLY=prod_sub_pro_yearly
NEXT_PUBLIC_CREEM_PRICE_SUB_PRO_YEARLY=price_sub_pro_yearly_实际的

NEXT_PUBLIC_CREEM_PRODUCT_SUB_TEAM_YEARLY=prod_sub_team_yearly
NEXT_PUBLIC_CREEM_PRICE_SUB_TEAM_YEARLY=price_sub_team_yearly_实际的

# One-time Credit Packages
NEXT_PUBLIC_CREEM_PRODUCT_PACK_STANDARD=prod_pack_standard
NEXT_PUBLIC_CREEM_PRICE_PACK_STANDARD=price_pack_standard_实际的
```

## ✅ 验证配置

完成配置后，运行以下命令验证：

```bash
# 1. 重启开发服务器
pnpm dev

# 2. 检查环境变量是否正确加载
# 在浏览器中访问: http://localhost:3000/api/v1/config/models

# 3. 测试支付流程（需要前端配合）
```

## 🧪 测试支付流程（可选）

Creem 提供测试模式，你可以：

1. 在 Creem Dashboard 中启用 Test Mode
2. 使用测试卡号进行支付测试
3. 验证 Webhook 是否正常接收
4. 检查积分是否正确增加

## 📞 需要帮助？

- Creem 文档: https://docs.creem.io
- 查看 `.env.example` 了解所有配置项
- 检查服务器日志获取错误信息

## ⚠️ 重要提示

1. **产品 ID 和价格 ID 必须匹配**
   - 环境变量中的 ID 必须与 Creem 后台的一致

2. **Webhook URL 的要求**
   - 必须是 HTTPS（生产环境）
   - 必须能够公网访问（不能是 localhost）
   - 本地开发使用 ngrok 或类似工具

3. **Webhook Secret 的安全**
   - 不要泄露 Webhook Secret
   - 定期轮换 Secret
   - 验证 Webhook 签名（代码已实现）

4. **测试模式 vs 生产模式**
   - 测试模式不会产生真实交易
   - 生产环境需要切换 API Key
   - Webhook URL 也需要相应更改

## 🚀 下一步

配置完 Creem 后：
1. 测试用户注册流程
2. 测试订阅支付
3. 测试积分包购买
4. 验证 Webhook 回调
5. 检查积分是否正确到账
