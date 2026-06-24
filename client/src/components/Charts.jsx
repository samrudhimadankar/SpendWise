import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/formatCurrency";

const tooltipFormatter = (value) => formatCurrency(value);
const colors = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#64748b"];

export const CategoryPieChart = ({ data }) => (
  <div className="card">
    <h2 className="text-lg font-bold text-slate-900">Category-wise Expenses</h2>
    <p className="text-sm text-slate-500">Where your money is going.</p>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="category" innerRadius={60} outerRadius={95} paddingAngle={3}>
            {data.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const IncomeExpenseBarChart = ({ data }) => (
  <div className="card">
    <h2 className="text-lg font-bold text-slate-900">Income vs Expense</h2>
    <p className="text-sm text-slate-500">Monthly comparison for the current year.</p>
    <div className="mt-4 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const BalanceLineChart = ({ data }) => (
  <div className="card">
    <h2 className="text-lg font-bold text-slate-900">Balance Trend</h2>
    <p className="text-sm text-slate-500">Savings or deficit month by month.</p>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip formatter={tooltipFormatter} />
          <Line type="monotone" dataKey="balance" name="Balance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const PaymentAreaChart = ({ data }) => (
  <div className="card">
    <h2 className="text-lg font-bold text-slate-900">Payment Mode Usage</h2>
    <p className="text-sm text-slate-500">Total transaction value by payment method.</p>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="paymentMode" />
          <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
          <Tooltip formatter={tooltipFormatter} />
          <Area type="monotone" dataKey="total" name="Amount" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);
