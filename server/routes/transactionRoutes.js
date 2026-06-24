import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").post(createTransaction).get(getTransactions);
router.route("/:id").get(getTransactionById).put(updateTransaction).delete(deleteTransaction);

export default router;
