import { db, users } from "@/db";

async function checkAllUsers() {
  console.log("🔍 检查所有用户...\n");

  const allUsers = await db.select().from(users);

  console.log(`总用户数: ${allUsers.length}\n`);

  allUsers.forEach((user, index) => {
    console.log(`${index + 1}. ID: ${user.id}`);
    console.log(`   邮箱: "${user.email}"`);
    console.log(`   长度: ${user.email?.length || 0}`);
    console.log(`   名字: "${user.name || '(未命名)'}"`);
    console.log(`   邮箱验证: ${user.emailVerified ? '✅' : '❌'}`);
    console.log(`   创建时间: ${user.createdAt}`);
    console.log("");
  });
}

checkAllUsers()
  .then(() => {
    console.log("\n✅ 检查完成！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ 错误:", error);
    process.exit(1);
  });
