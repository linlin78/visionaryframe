import { db, users, sessions } from "@/db";
import { creditService } from "@/services/credit";
import { nanoid } from "nanoid";

async function createLoginableUser() {
  const email = "demo@visionaryframe.com";
  const userId = "demo-user-" + Date.now();
  const sessionId = nanoid(32);

  console.log("🔧 创建可登录的演示用户...");
  console.log("邮箱:", email);
  console.log("用户 ID:", userId);

  try {
    // 1. 创建用户
    const [user] = await db
      .insert(users)
      .values({
        id: userId,
        email: email,
        name: "Demo User",
        emailVerified: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    console.log("\n✅ 用户创建成功");
    console.log("用户:", user);

    // 2. 创建会话（7天有效）
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const [session] = await db
      .insert(sessions)
      .values({
        id: sessionId,
        userId: userId,
        token: nanoid(32),
        expiresAt: expiresAt,
        ipAddress: "127.0.0.1",
        userAgent: "Demo Login",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    console.log("\n✅ 会话创建成功");
    console.log("会话 ID:", session.id);
    console.log("过期时间:", session.expiresAt);

    // 3. 赠送积分
    console.log("\n🎁 赠送积分...");
    await creditService.grantNewUserCredits(userId);

    // 4. 查询积分余额
    const balance = await creditService.getBalance(userId);
    console.log("\n💰 积分余额:", balance);

    console.log("\n" + "=".repeat(60));
    console.log("✅ 演示用户创建成功！");
    console.log("=".repeat(60));
    console.log("\n📝 登录凭证：");
    console.log("  邮箱:", email);
    console.log("  会话 ID:", session.id);
    console.log("  会话 Token:", session.token);
    console.log("\n💡 提示：");
    console.log("  1. 打开浏览器开发者工具（F12）");
    console.log("  2. 进入 Application > Cookies");
    console.log("  3. 添加以下 Cookie：");
    console.log("     Name: better-auth.session_token");
    console.log("     Value:", session.token);
    console.log("     Domain: localhost");
    console.log("\n🔗 访问网站：");
    console.log("  http://localhost:3000");
    console.log("  然后刷新页面，你会自动登录！");

  } catch (error) {
    console.error("\n❌ 错误:", error);
    process.exit(1);
  }
}

createLoginableUser()
  .then(() => {
    console.log("\n✅ 完成！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ 致命错误:", error);
    process.exit(1);
  });
