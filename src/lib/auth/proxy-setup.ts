/**
 * 全局代理配置
 *
 * 让 Node.js 的所有 HTTP/HTTPS 请求自动通过 Clash 代理
 * 必须运行 Clash（全局模式或规则模式都可以）
 * 规则模式也能工作，因为代理是从 localhost:7897 发出的
 */

import { HttpsProxyAgent } from "https-proxy-agent";
import https from "https";

// 读取代理配置
const httpProxy = process.env.HTTP_PROXY || process.env.http_proxy;
const httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy;

if (httpProxy || httpsProxy) {
  console.log("🌐 配置全局代理...");

  // 为所有 HTTPS 请求设置代理 agent
  if (httpsProxy) {
    const httpsAgent = new HttpsProxyAgent(httpsProxy);

    // 设置全局 https agent（影响所有 https 请求，包括 fetch）
    https.globalAgent = httpsAgent;

    console.log("   ✅ HTTPS 代理:", httpsProxy);
  }

  console.log("   ✅ 全局代理已启用\n");
} else {
  console.log("⚠️  未检测到代理配置（HTTP_PROXY/HTTPS_PROXY）");
  console.log("   如需访问 Google 等服务，请在 .env.local 中配置代理\n");
}

export {};
