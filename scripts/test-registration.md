# 用户注册流程测试指南

## 📋 测试概述

本指南将帮助你完整测试用户注册流程，包括：
1. Google OAuth 注册
2. Magic Link 注册
3. 新用户积分赠送（可能需要手动触发）
4. 数据库记录验证

---

## 🔍 发现的问题

⚠️ **重要发现**：新用户积分赠送功能已实现（`creditService.grantNewUserCredits()`），但可能**没有自动触发**。

这意味着：
- ✅ 用户可以正常注册
- ✅ 数据库会创建用户记录
- ⚠️ **可能不会自动获得 50 积分**
- ✅ 可以手动触发积分赠送

---

## 🧪 测试步骤

### 第一步：打开浏览器和开发者工具

1. **打开浏览器**（推荐 Chrome）
2. **按 F12** 打开开发者工具
3. **切换到 Console 标签页**
4. **切换到 Network 标签页**

### 第二步：访问网站

在浏览器中访问：
```
http://localhost:3000
```

**预期结果：**
- ✅ 页面正常加载
- ✅ 显示首页内容
- ✅ 右上角显示 "Sign In" 按钮

### 第三步：测试 Google OAuth 注册

#### 3.1 点击注册按钮
1. 点击右上角 "Sign In"
2. 应该弹出登录模态框

#### 3.2 选择 Google OAuth
1. 点击 "Continue with Google"
2. 浏览器会跳转到 Google 登录页面

#### 3.3 完成登录
1. 选择或登录 Google 账号
2. 授权应用访问基本信息
3. 浏览器会跳转回网站

**预期结果：**
- ✅ 自动登录成功
- ✅ 右上角显示用户头像或名字
- ✅ "Sign In" 按钮变为用户菜单

**检查 Console：**
- 应该没有错误信息
- 可能有 Better Auth 的调试日志

**检查 Network：**
- 查找 `/api/auth/signin` 请求
- 查找 Google OAuth 回调请求

### 第四步：验证用户注册

#### 4.1 打开 Drizzle Studio

在浏览器中打开：
```
https://local.drizzle.studio
```

#### 4.2 查看 user 表

```sql
SELECT * FROM "user"
ORDER BY "createdAt" DESC
LIMIT 5;
```

**预期结果：**
应该看到刚才注册的用户记录：
- `id`: UUID 格式
- `email`: 你的 Google 邮箱
- `name`: 你的 Google 名字
- `emailVerified`: true
- `createdAt`: 刚才的时间
- `isAdmin`: false（除非是 contact@visionaryframe.com）

#### 4.3 查看 session 表

```sql
SELECT * FROM session
WHERE "userId" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**预期结果：**
应该有活跃的会话记录

### 第五步：检查积分赠送

#### 5.1 查看 credit_packages 表

```sql
SELECT * FROM credit_packages
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**可能的结果 A（自动赠送成功）：**
- ✅ 有 1 条记录
- ✅ `transType` = 'NEW_USER'
- ✅ `initialCredits` = 50
- ✅ `remainingCredits` = 50
- ✅ `frozenCredits` = 0
- ✅ `status` = 'ACTIVE'

**可能的结果 B（没有自动赠送）：**
- ❌ 没有记录
- ⚠️ 需要手动触发（见下一步）

#### 5.2 查看 credit_transactions 表

```sql
SELECT * FROM credit_transactions
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**可能的结果 A：**
- ✅ 有 1 条 NEW_USER 记录
- ✅ `credits` = 50

**可能的结果 B：**
- ❌ 没有记录

### 第六步：（可选）手动触发积分赠送

如果第五步发现没有自动赠送积分，使用以下方法手动触发：

#### 方法 A：使用管理员脚本（推荐）

```bash
cd C:\codes1\videofly\videofly-template

# 运行添加积分脚本
pnpm script:add-credits
```

按提示输入：
- 用户邮箱：你的注册邮箱
- 积分数量：50
- 交易类型：NEW_USER

#### 方法 B：直接在 Drizzle Studio 中操作

1. **打开 Drizzle Studio**: https://local.drizzle.studio
2. **进入 credit_packages 表**
3. **点击 "Add Row"**
4. **填写以下信息**：
   ```json
   {
     "userId": "你的用户ID",
     "initialCredits": 50,
     "remainingCredits": 50,
     "frozenCredits": 0,
     "transType": "NEW_USER",
     "status": "ACTIVE",
     "expiredAt": "2025-02-26 00:00:00"  // 30天后
   }
   ```
5. **点击 "Save"**

6. **进入 credit_transactions 表**
7. **点击 "Add Row"**
8. **填写以下信息**：
   ```json
   {
     "transNo": "NEW_USER_你的用户ID",
     "userId": "你的用户ID",
     "transType": "NEW_USER",
     "credits": 50,
     "balanceAfter": 50,
     "remark": "New user welcome credits"
   }
   ```
9. **点击 "Save"**

#### 方法 C：创建 API 端点手动调用

我们可以创建一个临时 API 端点来触发积分赠送。

### 第七步：验证积分余额

#### 7.1 通过 API 验证

在浏览器中访问：
```
http://localhost:3000/api/v1/credit/balance
```

**预期结果：**
```json
{
  "success": true,
  "data": {
    "available": 50,
    "frozen": 0,
    "used": 0,
    "total": 50
  }
}
```

#### 7.2 通过前端验证

1. 访问：http://localhost:3000/en/dashboard/credits
2. 应该显示：
   - 总积分：50
   - 可用积分：50
   - 冻结积分：0
   - 已用积分：0

---

## 📊 测试检查清单

### 用户注册
- [ ] Google OAuth 登录成功
- [ ] 数据库 user 表有记录
- [ ] emailVerified = true
- [ ] 数据库 session 表有记录

### 积分系统
- [ ] credit_packages 表有 NEW_USER 记录
- [ ] remainingCredits = 50
- [ ] frozenCredits = 0
- [ ] credit_transactions 表有记录
- [ ] API 返回余额 50
- [ ] 前端显示 50 积分

---

## 🐛 故障排查

### 问题 1：Google OAuth 失败

**可能原因：**
- Google Client ID 或 Secret 配置错误
- 回调 URL 不匹配

**解决方案：**
1. 检查 `.env.local` 中的 Google 凭证
2. 使用 Magic Link 代替

### 问题 2：没有自动获得积分

**可能原因：**
- 积分赠送逻辑没有自动触发
- 环境变量 `CREDIT_NEW_USER_ENABLED` 不是 true

**解决方案：**
1. 检查环境变量
2. 手动触发积分赠送（见第六步）
3. 创建自动触发的 Webhook 或 API 端点

### 问题 3：数据库没有记录

**可能原因：**
- 数据库连接失败
- 表结构未同步

**解决方案：**
1. 检查开发服务器日志
2. 运行 `pnpm db:push`
3. 检查 Drizzle Studio 是否可访问

---

## 🎯 下一步

完成注册测试后：
1. 测试积分查询功能
2. 测试视频生成功能
3. 测试积分扣减逻辑

---

## 📝 测试记录

**测试时间：** ___________

**测试方式：**
- [ ] Google OAuth
- [ ] Magic Link

**注册结果：**
- [ ] 成功
- [ ] 失败

**自动赠送积分：**
- [ ] 是（50 积分）
- [ ] 否（需要手动触发）

**手动触发方法：**
- [ ] 管理员脚本
- [ ] Drizzle Studio
- [ ] API 端点

**遇到的问题：**
___________________________________________________
___________________________________________________

**解决方案：**
___________________________________________________
___________________________________________________
