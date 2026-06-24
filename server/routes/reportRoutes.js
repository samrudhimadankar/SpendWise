import express from "express";
import {
  getCategorySummary,
  getIncomeVsExpense,
  getMonthlySummary,
  getPaymentModeSummary,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/monthly-summary", getMonthlySummary);
router.get("/category-summary", getCategorySummary);
router.get("/income-vs-expense", getIncomeVsExpense);
router.get("/payment-mode-summary", getPaymentModeSummary);

export default router;
