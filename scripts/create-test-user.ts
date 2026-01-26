import { db, users } from "@/db";
import { creditService } from "@/services/credit";

async function createTestUser() {
  const testEmail = "test@visionaryframe.com";
  const testUserId = "test-user-" + Date.now();

  console.log("🔧 Creating test user...");
  console.log("Email:", testEmail);
  console.log("User ID:", testUserId);

  try {
    // 1. 创建用户
    const [user] = await db
      .insert(users)
      .values({
        id: testUserId,
        email: testEmail,
        name: "Test User",
        emailVerified: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    console.log("✅ User created:", user);

    // 2. 赠送积分
    console.log("🎁 Granting new user credits...");
    await creditService.grantNewUserCredits(testUserId);

    // 3. 查询积分余额
    const balance = await creditService.getBalance(testUserId);
    console.log("💰 Credit balance:", balance);

    console.log("\n✅ Test user created successfully!");
    console.log("\n📝 Login credentials:");
    console.log("  Email:", testEmail);
    console.log("  Note: You cannot login with this user via OAuth/Magic Link");
    console.log("  This user is for testing the database and credit system only.");

    console.log("\n🔍 View in Drizzle Studio:");
    console.log("  https://local.drizzle.studio");
    console.log("  Look for user_id:", testUserId);

  } catch (error) {
    console.error("❌ Error creating test user:", error);
    process.exit(1);
  }
}

createTestUser()
  .then(() => {
    console.log("\n✅ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  });
