import { Response, NextFunction } from "express";
import prisma from "../models/prismaClient";
import { RequestWithPetshop } from "./petshopMiddleware"; // Importe a interface personalizada

export const checkExistsUserAccount = async (req: RequestWithPetshop, res: Response, next: NextFunction) => {
    const { cnpj } = req.headers;

    if (!cnpj) {
        return res.status(400).json({ error: "CNPJ header is required" });
    }

    const petshop = await prisma.petshop.findUnique({
        where: { cnpj: String(cnpj) },
        include: { pets: true },
    });

    if (!petshop) {
        return res.status(404).json({ error: "Petshop not found" });
    }

    req.petshop = petshop; // Agora o TypeScript não reclamará
    next();
};
