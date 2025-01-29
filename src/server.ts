import express from "express";
import cors from "cors";
import petshopRoutes from "./routes/petshopRoutes";
import petRoutes from "./routes/petRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/petshops", petshopRoutes);
app.use("/pets", petRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
