#!/usr/bin/env tsx
/**
 * 列出所有用户
 */

import { db } from "@/db";
import { users, creditPackages } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { CreditPackageStatus } from "@/db/schema";

async function run() {
  try {
    // 1. 查询所有用户
    const allUsers = await db.select().from(users);

    if (allUsers.length === 0) {
      console.log("❌ No users found");
      process.exit(1);
      return;
    }

    console.log(`\n📋 All Users (${allUsers.length} total):`);
    console.log("─".repeat(80));

    for (const user of allUsers) {
      console.log(`👤 Email: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.name || "N/A"}`);
      console.log(`   Admin: ${user.isAdmin ? "Yes" : "No"}`);
      console.log(`   Created: ${user.createdAt.toISOString().substring(0, 10)}`);

      // 查询该用户的可用积分
      const packages = await db
        .select()
        .from(creditPackages)
        .where(eq(creditPackages.userId, user.id));

      let availableCredits = 0;
      const now = new Date();

      for (const pkg of packages) {
        if (!pkg.expiredAt || pkg.expiredAt > now) {
          if (pkg.status === CreditPackageStatus.ACTIVE) {
            availableCredits += pkg.remainingCredits;
          }
        }
      }

      console.log(`   Available Credits: ${availableCredits}`);
      console.log();
    }

    console.log("─".repeat(80));
    console.log("✅ Use: pnpm script:add-credits <email> <amount> [reason]");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run().then(() => process.exit(0));
