import { useState } from "react";
import API from "../api/axios";

const ExpenseForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    paymentMode: "UPI",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = form.type === "income" ? ["Salary", "Freelance", "Gift", "Scholarship", "Other"] : ["Food", "Travel", "Shopping", "Bills", "Education", "Health", "Other"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await API.post("/transactions", { ...form, amount: Number(form.amount) });
      setMessage("Transaction added successfully.");
      setForm((prev) => ({ ...prev, amount: "", note: "" }));
      onCreated?.();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="input">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Amount</label>
          <input name="amount" value={form.amount} onChange={handleChange} type="number" min="1" className="input" placeholder="Enter amount" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
          <input name="date" value={form.date} onChange={handleChange} type="date" className="input" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Payment Mode</label>
          <select name="paymentMode" value={form.paymentMode} onChange={handleChange} className="input">
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Note</label>
          <input name="note" value={form.note} onChange={handleChange} className="input" placeholder="Optional note" />
        </div>
      </div>
      {message && <p className="text-sm text-slate-600">{message}</p>}
      <button disabled={loading} className="btn-primary">{loading ? "Saving..." : "Add Transaction"}</button>
    </form>
  );
};

export default ExpenseForm;
