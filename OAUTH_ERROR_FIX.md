# 🔧 Google OAuth 错误修复指南

## ❌ 错误信息

```
http://localhost:3000/api/auth/error?error=please_restart_the_process
```

**根本原因**：
```
TypeError: fetch failed
at validateAuthorizationCode
```

这是因为 Node.js 环境下的 `fetch` 无法访问 Google OAuth API，通常是由于：
1. 网络连接问题
2. Node.js 版本兼容性问题
3. Better Auth 的 fetch 配置问题

---

## ✅ 解决方案

### 方案 1：使用 Magic Link 代替（推荐）

由于 Google OAuth 遇到了问题，我们可以先使用 Magic Link（邮箱魔法链接）来测试注册流程。

**步骤**：

1. **访问登录页面**
   ```
   http://localhost:3000/login
   ```

2. **选择邮箱登录**
   - 点击 "Sign In"
   - 切换到 "Email" 选项卡
   - 输入你的邮箱地址
   - 点击 "Send Magic Link"

3. **检查邮箱**
   - 查看收件箱（包括垃圾邮件文件夹）
   - 找到来自 "contact@visionaryframe.com" 的邮件
   - 点击邮件中的魔法链接

4. **完成登录**
   - 浏览器会自动打开并登录
   - 跳转到首页或仪表板

**优点**：
- ✅ 不依赖 Google OAuth
- ✅ 可以直接测试注册流程
- ✅ 同样会自动验证邮箱

---

### 方案 2：修复 Google OAuth（可选）

如果你一定要使用 Google OAuth，可以尝试以下方法：

#### 方法 A：更新 Node.js 版本

确保你使用的是 Node.js 18+：
```bash
node --version
```

如果不是 18+，请升级：
```bash
# 使用 nvm 升级
nvm install 18
nvm use 18
```

#### 方法 B：配置代理（如果在公司网络）

如果你在公司网络或有防火墙，可能需要配置代理：

1. **设置环境变量**（在 `.env.local` 中）：
   ```bash
   HTTP_PROXY=http://your-proxy:port
   HTTPS_PROXY=http://your-proxy:port
   ```

2. **重启开发服务器**：
   ```bash
   # 停止当前服务器（Ctrl+C）
   pnpm dev
   ```

#### 方法 C：使用 undici fetch（更可靠）

修改 Better Auth 配置以使用 undici 的 fetch：

检查 `src/lib/auth/auth.ts`，确保有正确的 fetch 配置。

---

### 方案 3：跳过 Google OAuth，直接测试其他功能

既然我们的主要目标是测试系统功能，可以：

1. **暂时跳过 Google OAuth**
   - 使用 Magic Link 注册
   - 或者直接在数据库中创建测试用户

2. **手动创建测试用户**

在 Drizzle Studio 中操作：
```sql
-- 在 user 表中插入测试用户
INSERT INTO "user" (id, email, "name", "emailVerified", "createdAt", "updatedAt", "isAdmin")
VALUES (
  'test-user-id',
  'test@example.com',
  'Test User',
  true,
  NOW(),
  NOW(),
  false
);
```

3. **手动创建会话**
```sql
-- 在 session 表中插入会话
INSERT INTO session (id, "userId", token, "expiresAt", "createdAt", "updatedAt")
VALUES (
  'test-session-id',
  'test-user-id',
  'test-session-token',
  NOW() + INTERVAL '7 days',
  NOW(),
  NOW()
);
```

---

## 🚀 推荐做法

**暂时使用 Magic Link 测试**

Magic Link 是最简单可靠的方法：

1. ✅ 不依赖第三方服务
2. ✅ 可以测试完整的注册流程
3. ✅ 同样会验证邮箱
4. ✅ 会自动获得 50 积分

---

## 📝 Magic Link 测试步骤

### 第一步：打开登录页面
```
http://localhost:3000/login
```

### 第二步：输入邮箱
- 输入一个真实的邮箱地址
- 点击 "Send Magic Link"

### 第三步：检查邮箱
- 打开你的邮箱客户端
- 查找来自 "contact@visionaryframe.com" 的邮件
- 邮件标题可能是："Sign-in link for VideoFly" 或 "Activate your account"

### 第四步：点击链接
- 点击邮件中的魔法链接
- 浏览器会自动打开并登录

### 第五步：验证登录成功
- 检查右上角是否显示用户信息
- 访问积分页面查看是否有 50 积分

---

## ⚠️ 注意事项

### 关于邮件发送

Resend 邮件服务已在 `.env.local` 中配置：
```bash
RESEND_API_KEY=re_di9RdRY7_AA6XiH8QXSbtUdmps7BEeHHA
RESEND_FROM=contact@visionaryframe.com
```

如果没收到邮件：
1. 检查垃圾邮件文件夹
2. 确认邮箱地址正确
3. 查看开发服务器日志
4. 检查 Resend API Key 是否有效

### 关于邮箱验证

- Magic Link 会自动验证邮箱
- Google OAuth 也会自动验证邮箱
- 两种方式都会设置 `emailVerified = true`

---

## 🎯 下一步

使用 Magic Link 成功注册后：

1. **验证用户记录**
   - 打开 https://local.drizzle.studio
   - 查看 user 表
   - 确认用户已创建

2. **检查积分**
   - 访问 http://localhost:3000/en/dashboard/credits
   - 查看是否有 50 积分

3. **继续测试**
   - 测试视频生成功能
   - 测试积分扣减

---

## 💡 总结

**遇到 Google OAuth 错误时，使用 Magic Link 是最快的解决方案！**

✅ Magic Link 可以：
- 测试完整的注册流程
- 验证邮箱地址
- 自动赠送积分
- 无需依赖 Google

**现在就试试 Magic Link 吧！**

```
http://localhost:3000/login
```

---

需要帮助？查看：
- `TESTING_GUIDE.md` - 完整测试指南
- `scripts/test-registration.md` - 注册流程测试
