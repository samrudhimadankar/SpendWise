import express from "express";
import { exportCSV, exportExcel } from "../controllers/exportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/csv", exportCSV);
router.get("/excel", exportExcel);

export default router;
