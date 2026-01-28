/**
 * 全局代理配置
 *
 * 在应用启动时设置全局代理，让 Node.js 的所有 HTTP/HTTPS 请求
 * 自动通过 Clash 代理
 */

import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";

// 从环境变量读取代理配置
const httpProxy = process.env.HTTP_PROXY || process.env.http_proxy;
const httpsProxy = process.env.HTTPS_PROXY || process.env.https_proxy;

if (httpProxy || httpsProxy) {
  console.log("🌐 配置全局代理...");

  // 配置 HTTPS 代理
  if (httpsProxy) {
    const httpsAgent = new HttpsProxyAgent(httpsProxy);
    // 设置全局代理
    globalThis[Symbol.for("undici.globalDispatcher.1")] = httpsAgent;

    // 为 fetch API 设置代理
    if (!globalThis.fetch) {
      // 如果没有原生 fetch，使用 node-fetch
    } else {
      // Node.js 18+ 有原生 fetch，需要设置 agent
      const originalFetch = globalThis.fetch;
      globalThis.fetch = (url, options = {}) => {
        // 为 HTTPS 请求添加代理 agent
        if (typeof url === "string" && url.startsWith("https://")) {
          options.agent = httpsAgent;
        } else if (url instanceof URL && url.protocol === "https:") {
          options.agent = httpsAgent;
        }
        return originalFetch(url, options);
      };
    }

    console.log("   ✅ HTTPS 代理:", httpsProxy);
  }

  // 配置 HTTP 代理
  if (httpProxy) {
    const httpAgent = new HttpProxyAgent(httpProxy);
    console.log("   ✅ HTTP 代理:", httpProxy);
  }

  console.log("   ✅ 全局代理已启用\n");
} else {
  console.log("⚠️  未检测到代理配置（HTTP_PROXY/HTTPS_PROXY）");
  console.log("   如需访问 Google等服务，请在 .env.local 中配置代理\n");
}

export {};
