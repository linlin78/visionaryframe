# Google OAuth 配置指南

## 问题排查步骤

### 1. 检查环境变量配置

确保在 `videofly-template/.env.local` 文件中配置了以下变量：

```bash
# Google OAuth - 必需
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Better Auth - 必需
BETTER_AUTH_SECRET=your-random-secret-key-here

# App URL - 必需
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. 创建 Google OAuth 应用

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 **Google+ API** 或 **Google Identity Services**
4. 进入 **凭据** → **创建凭据** → **OAuth 客户端 ID**
5. 选择应用类型：**Web 应用**
6. 配置授权重定向 URI：
   - 开发环境：`http://localhost:3000/api/auth/callback/google`
   - 生产环境：`https://yourdomain.com/api/auth/callback/google`

### 3. 获取客户端凭据

创建 OAuth 客户端后，你会获得：
- **客户端 ID**：类似 `123456789-abc.apps.googleusercontent.com`
- **客户端密钥**：类似 `GOCSPX-xxxxxxxxxxxxx`

将这些值填入 `.env.local` 文件。

### 4. 检查浏览器控制台错误

打开浏览器开发者工具（F12），查看 Console 标签页，检查是否有以下错误：

- `GOOGLE_CLIENT_ID is required` - 环境变量未配置
- `redirect_uri_mismatch` - 回调 URL 配置不匹配
- `invalid_client` - 客户端 ID 或密钥错误

### 5. 验证配置

重启开发服务器：

```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
cd videofly-template
pnpm dev
```

### 6. 测试 Google 登录

1. 访问登录页面：`http://localhost:3000/zh/login` 或 `http://localhost:3000/en/login`
2. 点击 "Continue with Google" 按钮
3. 应该会跳转到 Google 登录页面
4. 登录后应该会重定向回你的应用

## 常见问题

### 问题 1: 点击按钮没有反应

**可能原因：**
- 环境变量未正确加载
- 浏览器控制台有 JavaScript 错误

**解决方法：**
- 检查 `.env.local` 文件是否存在且格式正确
- 重启开发服务器
- 清除浏览器缓存

### 问题 2: 重定向 URI 不匹配错误

**错误信息：** `redirect_uri_mismatch`

**解决方法：**
1. 检查 Google Cloud Console 中的授权重定向 URI 是否包含：
   - `http://localhost:3000/api/auth/callback/google`
2. 确保 URI 完全匹配（包括协议、端口、路径）
3. 保存后等待几分钟让更改生效

### 问题 3: 无效的客户端错误

**错误信息：** `invalid_client`

**解决方法：**
- 检查 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET` 是否正确
- 确保没有多余的空格或引号
- 重新生成客户端密钥（如果怀疑泄露）

### 问题 4: 环境变量验证失败

**错误信息：** 应用启动时提示环境变量缺失

**解决方法：**
- 确保 `.env.local` 文件在 `videofly-template` 目录下
- 检查变量名是否正确（区分大小写）
- 确保所有必需变量都已配置

## 快速检查清单

- [ ] `.env.local` 文件存在
- [ ] `GOOGLE_CLIENT_ID` 已配置
- [ ] `GOOGLE_CLIENT_SECRET` 已配置
- [ ] `BETTER_AUTH_SECRET` 已配置
- [ ] `NEXT_PUBLIC_APP_URL` 已配置
- [ ] Google Cloud Console 中已创建 OAuth 客户端
- [ ] 回调 URL 已添加到 Google Cloud Console
- [ ] 开发服务器已重启
- [ ] 浏览器控制台无错误

## 需要帮助？

如果以上步骤都无法解决问题，请检查：

1. **服务器日志**：查看终端中 Next.js 的启动日志
2. **浏览器网络请求**：在 Network 标签页查看 `/api/auth` 相关的请求
3. **Better Auth 日志**：开发模式下会在控制台输出详细的认证日志
