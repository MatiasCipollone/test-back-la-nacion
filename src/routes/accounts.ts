import express from "express";
import * as accountServices from "../services/accountsServices";

const router = express.Router();

router.get("/tourism", (_req, res) => {
  res.send(accountServices.getTourismAccounts());
});

router.get("/voucher", (_req, res) => {
  res.send(accountServices.getVoucherAccounts());
});

export default router;
