import { db, creditPackages, creditTransactions } from "@/db";
import { CreditTransType } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

async function addCreditsToUser() {
  const userEmail = "fanzulyx2s@gmail.com";
  const userId = "cLwES4iVNomzlPNMApTX27VFDkxjdARL";

  console.log("🔧 给用户添加积分...");
  console.log("邮箱:", userEmail);
  console.log("用户 ID:", userId);

  try {
    // 检查是否已有积分包
    const [existing] = await db
      .select()
      .from(creditPackages)
      .where(eq(creditPackages.userId, userId))
      .limit(1);

    if (existing) {
      console.log("\n⚠️  该用户已有积分包");
      console.log("现有积分:", existing.remainingCredits);
      console.log("不再重复添加");
      return;
    }

    // 创建积分包
    const now = new Date();
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 30); // 30天后

    const [creditPackage] = await db
      .insert(creditPackages)
      .values({
        userId: userId,
        initialCredits: 50,
        remainingCredits: 50,
        frozenCredits: 0,
        transType: CreditTransType.NEW_USER,
        status: "ACTIVE",
        expiredAt: expiredAt,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    console.log("\n✅ 积分包创建成功");
    console.log("积分包 ID:", creditPackage.id);

    // 创建交易记录
    const transNo = `NEW_USER_MANUAL_${userId}`;
    const [transaction] = await db
      .insert(creditTransactions)
      .values({
        transNo: transNo,
        userId: userId,
        transType: CreditTransType.NEW_USER,
        credits: 50,
        balanceAfter: 50,
        packageId: creditPackage.id,
        remark: "Manual new user credits - Google OAuth incomplete",
        createdAt: now,
      })
      .returning();

    console.log("\n✅ 交易记录创建成功");
    console.log("交易 ID:", transaction.id);

    console.log("\n" + "=".repeat(60));
    console.log("✅ 积分添加成功！");
    console.log("=".repeat(60));
    console.log("\n📊 用户积分信息：");
    console.log("   用户: 林勇 (fanzulyx2s@gmail.com)");
    console.log("   积分: +50");
    console.log("   总余额: 50");
    console.log("\n💡 提示：");
    console.log("   刷新浏览器页面，积分应该会更新！");

  } catch (error) {
    console.error("\n❌ 错误:", error);
    process.exit(1);
  }
}

addCreditsToUser()
  .then(() => {
    console.log("\n✅ 完成！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ 致命错误:", error);
    process.exit(1);
  });
