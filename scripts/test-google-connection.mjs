/**
 * 测试 Google OAuth 连接
 *
 * 用途：验证通过 Clash 代理能否连接到 Google OAuth API
 */

import { config } from "dotenv";
// 加载 .env.local
config({ path: ".env.local" });

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

  console.log("2. 测试连接到 Google OAuth API...");
  try {
    // 测试连接到 Google OAuth 端点
    const response = await fetch("https://accounts.google.com/.well-known/openid-configuration", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("   ✅ 成功连接到 Google!");
      console.log("   响应状态:", response.status);
      console.log("   Issuer:", data.issuer);
      console.log("");

      console.log("✅ 测试成功！Google OAuth 连接正常！");
      console.log("\n下一步:");
      console.log("1. 访问 http://localhost:3002/zh");
      console.log("2. 点击登录按钮");
      console.log("3. 选择 Google 登录");
      console.log("4. 完成登录流程");
    } else {
      console.error("   ❌ 连接失败!");
      console.error("   响应状态:", response.status);
      process.exit(1);
    }

  } catch (error) {
    console.error("   ❌ 连接失败!");
    console.error("   错误信息:", error.message);
    console.error("");

    if (error.cause) {
      console.error("   原始错误:", error.cause.message);
    }

    console.error("");
    console.error("🔧 可能的原因:");
    console.error("   1. Clash 未运行");
    console.error("   2. 代理端口配置错误（当前: " + proxyUrl + "）");
    console.error("   3. Clash 的 'Allow LAN' 未开启");
    console.error("   4. Clash 规则模式阻止了 Google 请求");
    console.error("");
    console.error("💡 解决方法:");
    console.error("   1. 打开 Clash 客户端，确认正在运行");
    console.error("   2. 查看 Clash 的 Mixed Port 端口（通常是 7890）");
    console.error("   3. 开启 'Allow LAN'（允许局域网连接）");
    console.error("   4. 切换到 'Global Mode'（全局模式）测试");
    console.error("   5. 或在 .env.local 中更新 HTTP_PROXY 端口");

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
