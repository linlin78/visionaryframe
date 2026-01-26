# 用户认证和积分系统测试脚本

## 🎯 测试目标

验证以下功能：
1. 用户注册（Google OAuth）
2. 新用户自动获得 50 积分
3. 积分查询和交易历史
4. 数据库记录完整性

---

## 📋 测试步骤

### 步骤 1：访问网站

在浏览器中打开：
```
http://localhost:3000
```

**预期结果：**
- ✅ 页面正常加载
- ✅ 显示首页（中英双语）
- ✅ 右上角显示 "Sign In" 按钮

---

### 步骤 2：注册新用户

#### 方式 A：使用 Google OAuth（推荐）

1. **点击 "Sign In" 按钮**
2. **选择 "Continue with Google"**
3. **选择或登录 Google 账号**
4. **授权应用访问邮箱信息**

#### 方式 B：使用 Magic Link

1. **点击 "Sign In" 按钮**
2. **选择 "Email" 选项卡**
3. **输入邮箱地址**
4. **点击 "Send Magic Link"**
5. **检查邮箱，点击链接登录**

**预期结果：**
- ✅ 成功登录
- ✅ 自动跳转到首页或仪表板
- ✅ 右上角显示用户头像或名字
- ✅ "Sign In" 按钮变为用户菜单

---

### 步骤 3：验证数据库记录

#### 3.1 打开 Drizzle Studio

在浏览器中打开：
```
https://local.drizzle.studio
```

#### 3.2 查看 user 表

```sql
-- 查询最新注册的用户
SELECT * FROM "user"
ORDER BY "createdAt" DESC
LIMIT 1;
```

**预期结果：**
- ✅ 找到刚注册的用户记录
- ✅ email 字段是你的 Google 邮箱
- ✅ emailVerified = true（Google OAuth 自动验证）
- ✅ isAdmin = false（除非是 contact@visionaryframe.com）
- ✅ createdAt 时间是刚才

#### 3.3 查看 session 表

```sql
-- 查询当前会话
SELECT * FROM session
WHERE "userId" = '你的用户ID'
ORDER BY "createdAt" DESC
LIMIT 1;
```

**预期结果：**
- ✅ 有活跃的会话记录
- ✅ expiresAt 是未来时间

---

### 步骤 4：验证积分赠送

#### 4.1 查看 credit_packages 表

```sql
-- 查询该用户的积分包
SELECT * FROM credit_packages
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**预期结果：**
应该有 **1 条记录**，字段如下：
- ✅ userId = 你的用户ID
- ✅ initialCredits = 50
- ✅ remainingCredits = 50
- ✅ frozenCredits = 0
- ✅ transType = 'NEW_USER'
- ✅ status = 'ACTIVE'
- ✅ expiredAt = 当前时间 + 30 天

#### 4.2 查看 credit_transactions 表

```sql
-- 查询积分交易记录
SELECT * FROM credit_transactions
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**预期结果：**
应该有 **1 条记录**：
- ✅ userId = 你的用户ID
- ✅ transType = 'NEW_USER'
- ✅ credits = 50（正数，表示增加）
- ✅ balanceAfter = 50
- ✅ remark 类似 "New user gift" 或 "新用户赠送"

#### 4.3 通过 API 验证

在浏览器中打开：
```
http://localhost:3000/api/v1/credit/balance
```

**预期结果：**
返回 JSON：
```json
{
  "available": 50,
  "frozen": 0,
  "used": 0,
  "total": 50
}
```

---

### 步骤 5：在前端查看积分

#### 5.1 访问积分页面

```
http://localhost:3000/en/dashboard/credits
```

**预期结果：**
- ✅ 显示总积分：50
- ✅ 显示可用积分：50
- ✅ 显示冻结积分：0
- ✅ 显示已用积分：0

#### 5.2 查看积分包详情

应该显示：
- **积分包名称**: New User Gift（或类似）
- **初始积分**: 50
- **剩余积分**: 50
- **状态**: Active（激活）
- **过期时间**: 30 天后的日期

#### 5.3 查看交易历史

应该显示：
- **日期**: 刚才的注册时间
- **类型**: NEW_USER
- **金额**: +50 积分
- **备注**: 新用户赠送

---

## 🔍 故障排查

### 问题 1：注册后没有获得积分

**可能原因：**
- 环境变量 `CREDIT_NEW_USER_ENABLED` 不是 true
- 积分服务出错

**检查方法：**
1. 查看 `.env.local`：
   ```bash
   CREDIT_NEW_USER_ENABLED=true
   CREDIT_NEW_USER_AMOUNT=50
   CREDIT_NEW_USER_EXPIRY_DAYS=30
   ```

2. 查看开发服务器日志（控制台）
3. 检查数据库是否有错误记录

**解决方案：**
- 重启开发服务器：`Ctrl+C` 然后 `pnpm dev`
- 手动添加积分：
  ```bash
  pnpm script:add-credits
  ```

### 问题 2：Google OAuth 失败

**可能原因：**
- Google OAuth 凭证配置错误
- 回调 URL 不匹配

**检查方法：**
1. 查看 `.env.local` 中的 Google 凭证：
   ```bash
   GOOGLE_CLIENT_ID=xxx
   GOOGLE_CLIENT_SECRET=xxx
   ```

2. 查看 Google Console 的回调 URL：
   - 应该包含：`http://localhost:3000/api/auth/callback/google`

**解决方案：**
- 确认 Google Console 配置正确
- 使用 Magic Link 代替

### 问题 3：页面显示错误

**可能原因：**
- 前端代码错误
- 环境变量未正确加载

**检查方法：**
1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 查看网络请求是否成功

**解决方案：**
- 刷新页面
- 清除浏览器缓存
- 检查开发服务器日志

---

## ✅ 测试检查清单

完成以下检查项：

### 数据库验证
- [ ] user 表有新用户记录
- [ ] email 字段正确
- [ ] emailVerified = true
- [ ] session 表有活跃会话
- [ ] credit_packages 表有 1 条 NEW_USER 记录
- [ ] remainingCredits = 50
- [ ] frozenCredits = 0
- [ ] credit_transactions 表有 1 条记录
- [ ] transType = 'NEW_USER'
- [ ] credits = 50

### 前端验证
- [ ] 登录成功
- [ ] 右上角显示用户信息
- [ ] 积分页面显示 50 积分
- [ ] 积分包详情正确
- [ ] 交易历史正确

### API 验证
- [ ] `/api/v1/credit/balance` 返回正确
- [ ] `/api/v1/user/me` 返回用户信息
- [ ] `/api/v1/credit/history` 返回交易历史

---

## 🎊 成功标志

如果看到以下结果，说明测试通过：

1. ✅ 用户成功注册并登录
2. ✅ 数据库有完整的用户和积分记录
3. ✅ 前端正确显示 50 积分
4. ✅ 积分包状态为 ACTIVE
5. ✅ 交易历史显示 NEW_USER 记录

---

## 📝 测试记录

**测试时间：** ___________

**测试方式：**
- [ ] Google OAuth
- [ ] Magic Link

**测试结果：**
- [ ] 通过
- [ ] 失败

**遇到的问题：**
___________________________________________________
___________________________________________________

**解决方案：**
___________________________________________________
___________________________________________________

---

**下一步：** 测试视频生成功能 →
