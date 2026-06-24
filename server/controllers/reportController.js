import Transaction from "../models/Transaction.js";

const getDateFilter = (userId, startDate, endDate) => {
  const filter = { user: userId };
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  return filter;
};

export const getMonthlySummary = async (req, res) => {
  const { year, month } = req.query;
  const selectedYear = Number(year) || new Date().getFullYear();
  const selectedMonth = Number(month) || new Date().getMonth() + 1;

  const startDate = new Date(selectedYear, selectedMonth - 1, 1);
  const endDate = new Date(selectedYear, selectedMonth, 0, 23, 59, 59);

  const result = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        date: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  const income = result.find((item) => item._id === "income")?.total || 0;
  const expense = result.find((item) => item._id === "expense")?.total || 0;

  const highestExpenseCategory = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
        date: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 1 },
  ]);

  res.json({
    year: selectedYear,
    month: selectedMonth,
    income,
    expense,
    balance: income - expense,
    savingsRate: income > 0 ? Number((((income - expense) / income) * 100).toFixed(2)) : 0,
    highestExpenseCategory: highestExpenseCategory[0] || null,
  });
};

export const getCategorySummary = async (req, res) => {
  const { startDate, endDate, type = "expense" } = req.query;
  const filter = getDateFilter(req.user._id, startDate, endDate);
  filter.type = type;

  const summary = await Transaction.aggregate([
    { $match: filter },
    { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { total: -1 } },
  ]);

  res.json(summary.map((item) => ({ category: item._id, total: item.total, count: item.count })));
};

export const getIncomeVsExpense = async (req, res) => {
  const { year } = req.query;
  const selectedYear = Number(year) || new Date().getFullYear();

  const data = await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        date: {
          $gte: new Date(selectedYear, 0, 1),
          $lte: new Date(selectedYear, 11, 31, 23, 59, 59),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.month": 1 } },
  ]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formatted = months.map((month, index) => {
    const income = data.find((item) => item._id.month === index + 1 && item._id.type === "income")?.total || 0;
    const expense = data.find((item) => item._id.month === index + 1 && item._id.type === "expense")?.total || 0;
    return { month, income, expense, balance: income - expense };
  });

  res.json(formatted);
};

export const getPaymentModeSummary = async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = getDateFilter(req.user._id, startDate, endDate);

  const summary = await Transaction.aggregate([
    { $match: filter },
    { $group: { _id: "$paymentMode", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { total: -1 } },
  ]);

  res.json(summary.map((item) => ({ paymentMode: item._id, total: item.total, count: item.count })));
};
