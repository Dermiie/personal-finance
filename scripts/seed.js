import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// 🔐 Init Supabase
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

console.log("⚠️ Seeding database...");

// 🧠 CATEGORY → POT MAPPING (adjust if you want)
const categoryToPot = {
  "Dining Out": "Gift",
  Groceries: "Savings",
  Bills: "Savings",
  Transportation: "Holiday",
  Entertainment: "Concert Ticket",
  "Personal Care": "Holiday",
  Education: "Savings",
  Lifestyle: "Savings",
  Shopping: "Savings",
  General: "Savings",
};

async function seed() {
  try {
    // 🧹 RESET (safe re-run)
    await supabase.from("transactions").delete().neq("id", "");
    await supabase.from("budgets").delete().neq("id", "");
    await supabase.from("pots").delete().neq("id", "");
    console.log("🧹 Old data cleared");

    // 🪙 1. INSERT POTS
    const potsData = [
      { name: "Savings", balance: 159 },
      { name: "Concert Ticket", balance: 110 },
      { name: "Gift", balance: 110 },
      { name: "New Laptop", balance: 10 },
      { name: "Holiday", balance: 531 },
    ];

    const { data: pots, error: potError } = await supabase
      .from("pots")
      .insert(potsData)
      .select();

    if (potError) throw potError;

    const potMap = Object.fromEntries(pots.map((p) => [p.name, p.id]));

    console.log("✅ Pots inserted");

    // 📊 2. INSERT BUDGETS
    const budgetsData = [
      { name: "Entertainment", max: 50, potId: potMap["Concert Ticket"] },
      { name: "Bills", max: 750, potId: potMap["Savings"] },
      { name: "Dining Out", max: 75, potId: potMap["Gift"] },
      { name: "Personal Care", max: 100, potId: potMap["Holiday"] },
    ];

    const { data: budgets, error: budgetError } = await supabase
      .from("budgets")
      .insert(budgetsData)
      .select();

    if (budgetError) throw budgetError;

    const budgetMap = Object.fromEntries(budgets.map((b) => [b.name, b.id]));

    console.log("✅ Budgets inserted");

    // 💸 3. INSERT TRANSACTIONS (sample subset for safety)
    const rawTransactions = [
      { amount: 75.5, category: "General", date: "2024-08-19T14:23:11Z" },
      { amount: -55.5, category: "Dining Out", date: "2024-08-19T20:23:11Z" },
      { amount: -42.3, category: "General", date: "2024-08-18T09:45:32Z" },
      { amount: 120, category: "General", date: "2024-08-17T16:12:05Z" },
    ];

    const formattedTx = rawTransactions.map((tx) => {
      const potName = categoryToPot[tx.category] || "Savings";
      const potId = potMap[potName];

      if (tx.amount > 0) {
        return {
          type: "deposit",
          amount: tx.amount,
          toPotId: potId,
          created_at: tx.date,
        };
      } else {
        return {
          type: "expense",
          amount: Math.abs(tx.amount),
          fromPotId: potId,
          budgetId: budgetMap[tx.category] || null,
          created_at: tx.date,
        };
      }
    });

    const { error: txError } = await supabase
      .from("transactions")
      .insert(formattedTx);

    if (txError) throw txError;

    console.log("✅ Transactions inserted");

    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Error seeding:", err.message);
  }
}

seed();
