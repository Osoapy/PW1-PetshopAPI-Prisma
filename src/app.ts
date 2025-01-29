import express from "express";
import petshopRoutes from "./routes/petshopRoutes";
import petRoutes from "./routes/petRoutes";

const app = express();

app.use(express.json());
app.use(petshopRoutes);
app.use(petRoutes);

export default app;
