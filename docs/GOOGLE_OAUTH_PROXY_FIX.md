# Google OAuth 登录错误修复指南

## 📋 问题总结

### 错误信息
```
Google 登录显示 "fetch failed" 错误
```

### 根本原因
**Node.js 原生的 `fetch` 和 `http/https` 模块不会自动读取 `HTTP_PROXY` 环境变量。**

即使 `.env.local` 中配置了：
```bash
HTTP_PROXY=http://127.0.0.1:10808
HTTPS_PROXY=http://127.0.0.1:10808
```

Node.js 的 HTTP 请求仍然**不会自动使用代理**，导致无法连接到 Google OAuth API。

---

## ✅ 解决方案（已实施）

### 第一步：安装代理支持库

```bash
pnpm add https-proxy-agent http-proxy-agent
```

### 第二步：创建全局代理配置

**文件**：`src/scripts/setup-proxy.mjs`

这个文件会在应用启动时：
1. 读取 `HTTP_PROXY` 和 `HTTPS_PROXY` 环境变量
2. 配置全局代理 agent
3. 覆盖全局 `fetch` 函数，自动使用代理

### 第三步：在应用启动时导入代理配置

**文件**：`src/app/layout.tsx`

在文件最顶部添加：
```typescript
// 导入全局代理配置（必须在最前面）
import "@/scripts/setup-proxy";
```

### 第四步：确认 Clash 配置

#### 1. Clash 客户端设置
- ✅ 确认 Clash 正在运行
- ✅ 确认 Mixed Port 或 HTTP Port（你的配置：10808）
- ✅ 开启 **Allow LAN**（允许局域网连接）

#### 2. Clash 模式
- ✅ **Global Mode**（全局模式）- 所有流量走代理
- ✅ **Rule Mode**（规则模式）- 规则不阻止 Google 请求

---

## 🧪 验证方法

### 测试 1：使用测试脚本

```bash
cd videofly-template
node scripts/test-google-connection.mjs
```

**预期输出**：
```
🧪 测试 Google OAuth 连接...

1. 检查环境变量:
   GOOGLE_CLIENT_ID: 888168027131-bn8c9sv...
   GOOGLE_CLIENT_SECRET: 已设置
   HTTP_PROXY: http://127.0.0.1:10808

2. 测试连接到 Google OAuth API...
   ✅ 成功连接到 Google!
   响应状态: 200
   Issuer: https://accounts.google.com

✅ 测试成功！Google OAuth 连接正常！
```

### 测试 2：实际登录测试

1. 访问：http://localhost:3003/zh
2. 点击右上角 **"登录"** 按钮
3. 选择 **"Continue with Google"**
4. 完成 Google OAuth 授权流程

---

## 🔧 故障排查

### 如果测试脚本仍然失败

#### 错误：`Connect Timeout Error`

**原因**：代理无法连接

**解决方法**：
1. **确认 Clash 正在运行**
   ```bash
   # 检查端口是否监听
   netstat -ano | findstr "10808"
   ```

2. **确认 Clash 配置**
   - 打开 Clash 客户端
   - 查看 **Settings** → **Port**
   - 确认端口号（你的配置：10808）
   - 开启 **Allow LAN**

3. **切换到全局模式**
   - 在 Clash 中切换到 **Global Mode**
   - 测试是否能连接

4. **检查防火墙**
   - 确认 Windows 防火墙没有阻止 Node.js
   - 确认防火墙没有阻止 Clash

#### 错误：`ECONNREFUSED`

**原因**：代理端口错误

**解决方法**：
1. 确认 Clash 的实际端口号
2. 更新 `.env.local` 中的 `HTTP_PROXY` 和 `HTTPS_PROXY`

---

## 📝 配置文件清单

### 已修改/新增的文件

1. **`.env.local`**
   ```bash
   HTTP_PROXY=http://127.0.0.1:10808
   HTTPS_PROXY=http://127.0.0.1:10808
   ```

2. **`src/scripts/setup-proxy.mjs`**（新增）
   - 全局代理配置脚本

3. **`src/app/layout.tsx`**
   - 导入全局代理配置

4. **`scripts/test-google-connection.mjs`**（新增）
   - 测试脚本

5. **`package.json`**
   - 新增依赖：`https-proxy-agent`, `http-proxy-agent`

---

## 🎯 下一步操作

### 立即可做
1. ✅ 访问 http://localhost:3003/zh
2. ✅ 点击"登录"按钮
3. ✅ 选择 Google 登录
4. ✅ 完成登录流程

### 如果仍然失败
1. 运行测试脚本：`node scripts/test-google-connection.mjs`
2. 查看具体错误信息
3. 根据错误信息进行故障排查

---

## 💡 常见问题 FAQ

### Q1：为什么需要安装 https-proxy-agent？

**A**：Node.js 原生不支持自动使用环境变量中的代理设置。`https-proxy-agent` 提供了这个功能。

### Q2：Clash 必须运行吗？

**A**：是的。如果 Clash 不运行，Node.js 无法通过代理连接到 Google。

### Q3：可以用其他代理软件吗？

**A**：可以。只要代理软件支持 HTTP/HTTPS 代理，并且：
1. 确认代理端口号
2. 在 `.env.local` 中更新 `HTTP_PROXY` 端口
3. 确认代理软件的 **Allow LAN** 已开启

### Q4：生产环境怎么办？

**A**：生产环境部署到 Vercel 后：
1. 不需要 Clash 代理
2. 可以删除 `.env.local` 中的 `HTTP_PROXY` 配置
3. 或者只在本地开发时使用代理

### Q5：为什么端口一直在变（3000 → 3001 → 3002 → 3003）？

**A**：因为旧的开发服务器进程没有正确关闭。解决方法：
```bash
# Windows 找到并关闭占用 3000 端口的进程
netstat -ano | findstr ":3000"
taskkill /F /PID <进程ID>
```

---

## ✅ 完成检查清单

- [x] 安装 `https-proxy-agent` 和 `http-proxy-agent`
- [x] 创建 `src/scripts/setup-proxy.mjs`
- [x] 在 `src/app/layout.tsx` 中导入代理配置
- [x] 确认 `.env.local` 中配置了 `HTTP_PROXY` 和 `HTTPS_PROXY`
- [x] 确认 Clash 正在运行
- [x] 重启开发服务器
- [ ] 运行测试脚本验证
- [ ] 实际测试 Google 登录

---

## 🚀 现在可以测试了！

1. **访问**：http://localhost:3003/zh
2. **点击**："登录" 按钮
3. **选择**："Continue with Google"
4. **完成**：Google OAuth 授权流程

如果成功，你应该能够正常登录了！🎉
