import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpenseTable from "../components/ExpenseTable";
import SummaryCard from "../components/SummaryCard";
import { BalanceLineChart, CategoryPieChart, IncomeExpenseBarChart } from "../components/Charts";
import { formatCurrency } from "../utils/formatCurrency";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [summaryRes, transactionRes, categoryRes, monthlyRes] = await Promise.all([
        API.get("/reports/monthly-summary"),
        API.get("/transactions"),
        API.get("/reports/category-summary"),
        API.get("/reports/income-vs-expense"),
      ]);
      setSummary(summaryRes.data);
      setTransactions(transactionRes.data.slice(0, 8));
      setCategoryData(categoryRes.data);
      setMonthlyData(monthlyRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">SpendWise Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold">Track money clearly. Spend smarter.</h1>
        <p className="mt-2 max-w-2xl text-indigo-50">Monitor income, expenses, savings and category patterns from one full-stack analytics dashboard.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <SummaryCard title="Total Income" value={formatCurrency(summary?.income)} helper="This month" />
        <SummaryCard title="Total Expense" value={formatCurrency(summary?.expense)} helper="This month" />
        <SummaryCard title="Balance" value={formatCurrency(summary?.balance)} helper="Income minus expenses" />
        <SummaryCard title="Savings Rate" value={`${summary?.savingsRate || 0}%`} helper="Monthly performance" />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categoryData} />
        <IncomeExpenseBarChart data={monthlyData} />
      </section>

      <BalanceLineChart data={monthlyData} />
      <ExpenseTable transactions={transactions} onChanged={fetchDashboard} />
    </main>
  );
};

export default Dashboard;
