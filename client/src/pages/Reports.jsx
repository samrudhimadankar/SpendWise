import { useEffect, useState } from "react";
import API from "../api/axios";
import ExpenseTable from "../components/ExpenseTable";
import { BalanceLineChart, CategoryPieChart, IncomeExpenseBarChart, PaymentAreaChart } from "../components/Charts";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const fetchReports = async () => {
    const query = new URLSearchParams();
    if (type) query.append("type", type);
    if (search) query.append("search", search);

    const [transactionsRes, categoryRes, monthlyRes, paymentRes] = await Promise.all([
      API.get(`/transactions?${query.toString()}`),
      API.get("/reports/category-summary"),
      API.get("/reports/income-vs-expense"),
      API.get("/reports/payment-mode-summary"),
    ]);

    setTransactions(transactionsRes.data);
    setCategoryData(categoryRes.data);
    setMonthlyData(monthlyRes.data);
    setPaymentData(paymentRes.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const downloadFile = async (format) => {
    const response = await API.get(`/export/${format}`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", format === "csv" ? "spendwise-transactions.csv" : "spendwise-transactions.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Filter, analyze and export your financial records.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadFile("csv")} className="btn-primary">Export CSV</button>
          <button onClick={() => downloadFile("excel")} className="btn-primary bg-emerald-600 hover:bg-emerald-700">Export Excel</button>
        </div>
      </div>

      <section className="card grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <input className="input" placeholder="Search category, note or mode" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={fetchReports} className="btn-primary">Apply Filter</button>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categoryData} />
        <IncomeExpenseBarChart data={monthlyData} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <BalanceLineChart data={monthlyData} />
        <PaymentAreaChart data={paymentData} />
      </section>

      <ExpenseTable transactions={transactions} onChanged={fetchReports} />
    </main>
  );
};

export default Reports;
