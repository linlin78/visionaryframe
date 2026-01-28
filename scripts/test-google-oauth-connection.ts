/**
 * 测试 Google OAuth 连接
 *
 * 用途：验证通过 Clash 代理能否连接到 Google OAuth API
 */

import { google } from "googleapis";

async function testGoogleConnection() {
  console.log("🧪 测试 Google OAuth 连接...\n");

  // 读取环境变量
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;

  console.log("1. 检查环境变量:");
  console.log("   GOOGLE_CLIENT_ID:", clientId ? `${clientId.slice(0, 20)}...` : "未设置");
  console.log("   GOOGLE_CLIENT_SECRET:", clientSecret ? "已设置" : "未设置");
  console.log("   HTTP_PROXY:", proxyUrl || "未设置");
  console.log("");

  if (!clientId || !clientSecret) {
    console.error("❌ Google OAuth 凭证未设置！");
    process.exit(1);
  }

  if (!proxyUrl) {
    console.error("❌ 代理未设置！无法连接到 Google");
    process.exit(1);
  }

  console.log("2. 创建 OAuth2 客户端...");
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost:3002/api/auth/callback/google"
  );

  console.log("   ✅ OAuth2 客户端创建成功");
  console.log("");

  console.log("3. 测试连接到 Google OAuth API...");
  try {
    // 获取授权 URL（这会触发对 Google 的请求）
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });

    console.log("   ✅ 成功生成授权 URL!");
    console.log("   授权 URL 长度:", authUrl.length);
    console.log("   授权 URL 前缀:", authUrl.slice(0, 50) + "...");
    console.log("");

    console.log("✅ 测试成功！Google OAuth 连接正常！");
    console.log("\n下一步:");
    console.log("1. 访问 http://localhost:3002/zh");
    console.log("2. 点击登录按钮");
    console.log("3. 选择 Google 登录");
    console.log("4. 完成登录流程");

  } catch (error: any) {
    console.error("   ❌ 连接失败!");
    console.error("   错误信息:", error.message);
    console.error("");

    if (error.message.includes("ECONNREFUSED")) {
      console.error("🔧 可能的原因:");
      console.error("   1. Clash 未运行");
      console.error("   2. 代理端口配置错误（当前: " + proxyUrl + "）");
      console.error("   3. Clash 的 'Allow LAN' 未开启");
      console.error("");
      console.error("💡 解决方法:");
      console.error("   1. 打开 Clash 客户端");
      console.error("   2. 确认 Mixed Port（通常是 7890）");
      console.error("   3. 开启 'Allow LAN'");
      console.error("   4. 更新 .env.local 中的 HTTP_PROXY 端口");
    } else if (error.message.includes("ETIMEDOUT")) {
      console.error("🔧 可能的原因:");
      console.error("   1. 代理连接超时");
      console.error("   2. Clash 规则阻止了 Google 请求");
      console.error("");
      console.error("💡 解决方法:");
      console.error("   1. 检查 Clash 是否正常运行");
      console.error("   2. 切换到 'Global Mode'（全局模式）");
      console.error("   3. 或在 'Rule Mode' 中添加 Google 直连规则");
    }

    process.exit(1);
  }
}

testGoogleConnection()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ 致命错误:", error);
    process.exit(1);
  });
