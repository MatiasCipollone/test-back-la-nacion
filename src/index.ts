import express from "express";
import accountsRouter from "./routes/accounts";

const app = express();

app.use(express.json());

const PORT = 8080;

app.use("/api/accounts", accountsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
