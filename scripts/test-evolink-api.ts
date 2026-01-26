import { getProvider } from "@/ai";

async function testEvolinkAPI() {
  console.log("🧪 测试 Evolink API 连接...\n");

  const apiKey = process.env.EVOLINK_API_KEY;
  console.log("1. 检查环境变量:");
  console.log("   EVOLINK_API_KEY:", apiKey ? `${apiKey.slice(0, 10)}...` : "未设置");
  console.log("");

  if (!apiKey) {
    console.error("❌ EVOLINK_API_KEY 未设置！");
    process.exit(1);
  }

  console.log("2. 创建 provider 实例...");
  try {
    const provider = getProvider("evolink");
    console.log("   ✅ Provider 创建成功");
    console.log("   Provider name:", provider.name);
  } catch (error) {
    console.error("   ❌ 创建 provider 失败:", error);
    process.exit(1);
  }
  console.log("");

  console.log("3. 测试 API 连接...");
  try {
    const response = await fetch("https://api.evolink.ai/v1/videos/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sora-2",
        prompt: "A test video",
        aspect_ratio: "16:9",
        duration: 5,
        remove_watermark: true,
      }),
    });

    console.log("   Status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("   ❌ API 请求失败:");
      console.error("   Error:", error);
    } else {
      const data = await response.json();
      console.log("   ✅ API 请求成功！");
      console.log("   Response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("   ❌ 网络错误:", error);
  }
  console.log("");

  console.log("✅ 测试完成！");
}

testEvolinkAPI()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ 致命错误:", error);
    process.exit(1);
  });
