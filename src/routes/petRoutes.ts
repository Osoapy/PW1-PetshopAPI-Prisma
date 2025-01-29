import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Rota de pets funcionando!" });
});

export default router;
