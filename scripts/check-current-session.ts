import { db, sessions, users } from "@/db";
import { eq } from "drizzle-orm";

async function checkCurrentSession() {
  console.log("🔍 检查当前会话...\n");

  // 查找 demo 用户的会话
  const demoSessions = await db
    .select()
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(users.email, "demo@visionaryframe.com"))
    .limit(5);

  console.log(`📋 demo@visionaryframe.com 的会话（${demoSessions.length} 个）：\n`);

  demoSessions.forEach((session: any, index) => {
    console.log(`${index + 1}. 会话 ID: ${session.sessions.id}`);
    console.log(`   用户 ID: ${session.sessions.userId}`);
    console.log(`   Token: ${session.sessions.token}`);
    console.log(`   过期时间: ${session.sessions.expiresAt}`);
    console.log(`   IP: ${session.sessions.ipAddress}`);
    console.log(`   用户代理: ${session.sessions.userAgent}`);
    console.log("");
  });

  // 检查所有活跃会话
  console.log("\n📊 所有用户统计：\n");

  const allUsers = await db.select().from(users);
  console.log(`总用户数: ${allUsers.length}\n`);

  allUsers.forEach((user) => {
    console.log(`- ${user.email} (${user.name || '未命名'})`);
  });
}

checkCurrentSession()
  .then(() => {
    console.log("\n✅ 检查完成！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ 错误:", error);
    process.exit(1);
  });
