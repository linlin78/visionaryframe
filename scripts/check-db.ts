import { db } from "@/db";
import { users, creditPackages, creditTransactions } from "@/db/schema";
import { eq } from "drizzle-orm";

async function checkDatabase() {
  console.log("🔍 检查数据库...\n");

  // 1. 查看所有用户
  console.log("📋 所有用户：");
  const allUsers = await db.select().from(users).orderBy(users.createdAt);
  console.log(`总共 ${allUsers.length} 个用户\n`);

  allUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name || '(未命名)}`);
    console.log(`   邮箱: ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   已验证: ${user.emailVerified ? '✅' : '❌'}`);
    console.log(`   管理员: ${user.isAdmin ? '✅' : '❌'}`);
    console.log(`   创建时间: ${user.createdAt}`);
    console.log("");
  });

  // 2. 查看最新的积分包
  console.log("\n💰 积分包（最新的 5 个）：");
  const credits = await db
    .select()
    .from(creditPackages)
    .orderBy(creditPackages.createdAt)
    .limit(5);

  credits.forEach((pkg, index) => {
    console.log(`${index + 1}. 用户ID: ${pkg.userId}`);
    console.log(`   初始积分: ${pkg.initialCredits}`);
    console.log(`   剩余积分: ${pkg.remainingCredits}`);
    console.log(`   冻结积分: ${pkg.frozenCredits}`);
    console.log(`   类型: ${pkg.transType}`);
    console.log(`   状态: ${pkg.status}`);
    console.log(`   过期时间: ${pkg.expiredAt}`);
    console.log("");
  });

  // 3. 查看最新的交易
  console.log("\n📝 交易记录（最新的 5 个）：");
  const transactions = await db
    .select()
    .from(creditTransactions)
    .orderBy(creditTransactions.createdAt)
    .limit(5);

  transactions.forEach((txn, index) => {
    console.log(`${index + 1}. ${txn.transType}`);
    console.log(`   用户ID: ${txn.userId}`);
    console.log(`   积分: ${txn.credits > 0 ? '+' : ''}${txn.credits}`);
    console.log(`   余额: ${txn.balanceAfter}`);
    console.log(`   备注: ${txn.remark || '(无)'}`);
    console.log(`   时间: ${txn.createdAt}`);
    console.log("");
  });

  // 4. 统计信息
  console.log("\n📊 统计信息：");
  console.log(`总用户数: ${allUsers.length}`);
  console.log(`总积分包数: ${credits.length}`);
  console.log(`总交易数: ${transactions.length}`);
}

checkDatabase()
  .then(() => {
    console.log("\n✅ 检查完成！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ 错误:", error);
    process.exit(1);
  });
