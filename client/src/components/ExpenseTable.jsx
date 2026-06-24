import { format } from "date-fns";
import API from "../api/axios";
import { formatCurrency } from "../utils/formatCurrency";

const ExpenseTable = ({ transactions, onChanged }) => {
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this transaction?");
    if (!confirmed) return;

    await API.delete(`/transactions/${id}`);
    onChanged?.();
  };

  return (
    <div className="card overflow-hidden p-0">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
        <p className="text-sm text-slate-500">Your latest income and expense entries.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Mode</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 && (
              <tr>
                <td colSpan="6" className="px-5 py-8 text-center text-slate-500">No transactions yet.</td>
              </tr>
            )}
            {transactions.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-slate-600">{format(new Date(item.date), "dd MMM yyyy")}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-slate-800">{item.category}</td>
                <td className="px-5 py-4 text-slate-600">{item.paymentMode}</td>
                <td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(item.amount)}</td>
                <td className="px-5 py-4">
                  <button onClick={() => handleDelete(item._id)} className="text-sm font-semibold text-rose-600 hover:text-rose-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
