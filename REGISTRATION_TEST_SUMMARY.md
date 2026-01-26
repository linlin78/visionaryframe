# ✅ 用户注册流程测试准备完成

## 🎯 测试准备就绪

所有测试工具和文档已创建完成，你现在可以开始测试用户注册流程了！

---

## 📊 系统状态验证

### ✅ 开发服务器
- **状态**: 运行中
- **地址**: http://localhost:3000
- **网络**: http://192.168.0.109:3000

### ✅ 数据库
- **状态**: 已连接
- **管理**: https://local.drizzle.studio
- **表结构**: 已同步

### ✅ API 端点
- **模型配置**: ✅ 正常（4 个模型可用）
- **认证端点**: ✅ 正常（需要登录）
- **用户信息**: ✅ 正常（需要登录）
- **积分余额**: ✅ 正常（需要登录）

---

## 🚀 开始测试

### 方式 1：使用浏览器测试（推荐）

1. **打开浏览器**
   ```
   http://localhost:3000
   ```

2. **注册新用户**
   - 点击 "Sign In"
   - 选择 "Continue with Google" 或 "Email"
   - 完成注册流程

3. **验证注册成功**
   - 检查右上角是否显示用户信息
   - 访问积分页面查看是否有 50 积分

4. **查看数据库**
   ```
   https://local.drizzle.studio
   ```
   - 查看 `user` 表 - 确认用户记录
   - 查看 `credit_packages` 表 - 确认积分赠送
   - 查看 `credit_transactions` 表 - 确认交易记录

### 方式 2：使用测试脚本

```bash
# API 测试
bash scripts/test-api.sh

# 系统验证
bash scripts/verify-setup.sh
```

---

## 📖 详细测试指南

| 文档 | 用途 |
|------|------|
| **scripts/test-registration.md** | 完整的注册流程测试步骤 |
| **scripts/test-api.sh** | API 端点快速测试 |
| **TESTING_GUIDE.md** | 系统功能测试指南 |
| **QUICKSTART.md** | 快速开始指南 |

---

## 🔍 关键检查点

### 1. 用户注册验证

**数据库检查**：
```sql
-- 查看 user 表
SELECT * FROM "user" ORDER BY "createdAt" DESC LIMIT 5;

-- 查看会话
SELECT * FROM session ORDER BY "createdAt" DESC;
```

**预期结果**：
- ✅ 用户记录已创建
- ✅ email = 你的注册邮箱
- ✅ emailVerified = true（Google OAuth）
- ✅ 会话记录存在

### 2. 积分赠送验证

**数据库检查**：
```sql
-- 查看积分包
SELECT * FROM credit_packages
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;

-- 查看交易记录
SELECT * FROM credit_transactions
WHERE "user_id" = '你的用户ID'
ORDER BY "createdAt" DESC;
```

**预期结果**：
- ✅ credit_packages 有 1 条 NEW_USER 记录
- ✅ initialCredits = 50
- ✅ remainingCredits = 50
- ✅ credit_transactions 有 1 条记录

**API 检查**：
```bash
# 登录后运行
curl http://localhost:3000/api/v1/credit/balance
```

**前端检查**：
```
http://localhost:3000/en/dashboard/credits
```

---

## ⚠️ 重要提示

### 关于积分自动赠送

根据代码分析，新用户积分赠送功能已实现（`creditService.grantNewUserCredits()`），但**可能不会自动触发**。

**如果发现没有自动获得积分**，有以下解决方案：

#### 方案 A：使用管理员脚本（最简单）
```bash
cd C:\codes1\videofly\videofly-template
pnpm script:add-credits
```

按提示输入信息即可。

#### 方案 B：在 Drizzle Studio 中手动添加
1. 打开 https://local.drizzle.studio
2. 在 `credit_packages` 表添加记录
3. 在 `credit_transactions` 表添加记录

详细步骤见：`scripts/test-registration.md` 第六步

#### 方案 C：创建自动触发机制
可以添加一个 API 端点或 Webhook，在用户注册时自动调用 `grantNewUserCredits()`。

---

## 📋 测试检查清单

完成注册后，检查以下项目：

### 用户记录
- [ ] user 表有新用户记录
- [ ] email 字段正确
- [ ] emailVerified = true（Google OAuth）
- [ ] name 字段有值
- [ ] createdAt 时间正确

### 会话记录
- [ ] session 表有活跃会话
- [ ] expiresAt 是未来时间
- [ ] userId 关联正确

### 积分记录
- [ ] credit_packages 表有 NEW_USER 记录
- [ ] initialCredits = 50
- [ ] remainingCredits = 50
- [ ] frozenCredits = 0
- [ ] status = 'ACTIVE'
- [ ] expiredAt = 30 天后

### 交易记录
- [ ] credit_transactions 表有记录
- [ ] transType = 'NEW_USER'
- [ ] credits = 50（正数）
- [ ] balanceAfter = 50

### 前端显示
- [ ] 登录成功
- [ ] 显示用户信息
- [ ] 积分页面显示 50 积分
- [ ] 交易历史正确

### API 验证
- [ ] /api/v1/user/me 返回用户信息
- [ ] /api/v1/credit/balance 返回 50
- [ ] /api/v1/credit/history 返回交易记录

---

## 🎊 开始测试吧！

**现在就可以打开浏览器开始测试了！**

```
http://localhost:3000
```

**测试建议**：
1. 先注册一个测试账号
2. 在 Drizzle Studio 中查看数据
3. 验证积分是否自动赠送
4. 如果没有，手动触发积分赠送
5. 完成所有检查清单项

---

## 📝 测试记录表

使用下面的表格记录你的测试结果：

| 检查项 | 结果 | 备注 |
|--------|------|------|
| 用户注册成功 | ☐ 是 ☐ 否 | |
| user 表有记录 | ☐ 是 ☐ 否 | |
| session 表有记录 | ☐ 是 ☐ 否 | |
| 自动获得 50 积分 | ☐ 是 ☐ 否 | |
| credit_packages 有记录 | ☐ 是 ☐ 否 | |
| credit_transactions 有记录 | ☐ 是 ☐ 否 | |
| 前端显示积分 | ☐ 是 ☐ 否 | |
| API 返回正确 | ☐ 是 ☐ 否 | |

**遇到的问题**：
___________________________________________________

**解决方案**：
___________________________________________________

---

## 🆘 需要帮助？

- 查看详细步骤：`scripts/test-registration.md`
- 查看故障排查：`TESTING_GUIDE.md`
- 查看快速指南：`QUICKSTART.md`
- 检查系统状态：运行 `bash scripts/verify-setup.sh`

---

**准备好了吗？打开浏览器开始测试吧！** 🚀
