import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  const { type, category, amount, date, paymentMode, note } = req.body;

  if (!type || !category || !amount || !date) {
    return res.status(400).json({ message: "Type, category, amount and date are required" });
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    category,
    amount,
    date,
    paymentMode,
    note,
  });

  res.status(201).json(transaction);
};

export const getTransactions = async (req, res) => {
  const { type, category, startDate, endDate, search } = req.query;

  const filter = { user: req.user._id };

  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  if (search) {
    filter.$or = [
      { category: { $regex: search, $options: "i" } },
      { note: { $regex: search, $options: "i" } },
      { paymentMode: { $regex: search, $options: "i" } },
    ];
  }

  const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 });
  res.json(transactions);
};

export const getTransactionById = async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json(transaction);
};

export const updateTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const fields = ["type", "category", "amount", "date", "paymentMode", "note"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      transaction[field] = req.body[field];
    }
  });

  const updated = await transaction.save();
  res.json(updated);
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  await transaction.deleteOne();
  res.json({ message: "Transaction deleted successfully" });
};
