#!/usr/bin/env tsx
/**
 * 检查 Google OAuth 配置
 * 运行: pnpm tsx scripts/check-google-oauth.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// 加载 .env.local 文件
config({ path: resolve(process.cwd(), ".env.local") });

const requiredVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

console.log("🔍 检查 Google OAuth 配置...\n");

let hasErrors = false;

// 检查必需的环境变量
for (const [key, value] of Object.entries(requiredVars)) {
  if (!value || value.trim() === "") {
    console.error(`❌ ${key}: 未配置或为空`);
    hasErrors = true;
  } else {
    // 隐藏敏感信息，只显示部分
    const displayValue =
      key === "GOOGLE_CLIENT_SECRET" || key === "BETTER_AUTH_SECRET"
        ? `${value.substring(0, 8)}...`
        : value;
    console.log(`✅ ${key}: ${displayValue}`);
  }
}

console.log("\n📋 配置检查结果：");

if (hasErrors) {
  console.error("\n❌ 发现配置问题！请检查以下内容：");
  console.error("1. 确保 .env.local 文件存在于项目根目录");
  console.error("2. 确保所有必需的环境变量都已配置");
  console.error("3. 参考 GOOGLE_OAUTH_SETUP.md 进行配置\n");
  process.exit(1);
} else {
  console.log("\n✅ 所有必需的环境变量都已配置！");
  console.log("\n📝 下一步：");
  console.log("1. 确保 Google Cloud Console 中已创建 OAuth 客户端");
  console.log(
    `2. 回调 URL 应配置为: ${requiredVars.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`
  );
  console.log("3. 重启开发服务器: pnpm dev\n");
  process.exit(0);
}
