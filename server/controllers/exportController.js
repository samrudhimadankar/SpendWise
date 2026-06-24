import ExcelJS from "exceljs";
import { Parser } from "json2csv";
import Transaction from "../models/Transaction.js";

const getExportData = async (userId) => {
  return Transaction.find({ user: userId }).sort({ date: -1 }).lean();
};

export const exportCSV = async (req, res) => {
  const transactions = await getExportData(req.user._id);

  const formatted = transactions.map((item) => ({
    Type: item.type,
    Category: item.category,
    Amount: item.amount,
    Date: new Date(item.date).toISOString().split("T")[0],
    "Payment Mode": item.paymentMode,
    Note: item.note || "",
  }));

  const parser = new Parser();
  const csv = parser.parse(formatted);

  res.header("Content-Type", "text/csv");
  res.attachment("spendwise-transactions.csv");
  res.send(csv);
};

export const exportExcel = async (req, res) => {
  const transactions = await getExportData(req.user._id);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions");

  worksheet.columns = [
    { header: "Type", key: "type", width: 15 },
    { header: "Category", key: "category", width: 20 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Date", key: "date", width: 18 },
    { header: "Payment Mode", key: "paymentMode", width: 20 },
    { header: "Note", key: "note", width: 35 },
  ];

  worksheet.getRow(1).font = { bold: true };

  transactions.forEach((item) => {
    worksheet.addRow({
      type: item.type,
      category: item.category,
      amount: item.amount,
      date: new Date(item.date).toISOString().split("T")[0],
      paymentMode: item.paymentMode,
      note: item.note || "",
    });
  });

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=spendwise-transactions.xlsx");

  await workbook.xlsx.write(res);
  res.end();
};
