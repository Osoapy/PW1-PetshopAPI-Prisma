import { Request, Response, NextFunction } from "express";
import prisma from "../models/prismaClient";

export async function petshopMiddleware(req: Request, res: Response, next: NextFunction) {
    const { petshopId } = req.body; // Supondo que venha no body, altere conforme necessário

    if (!petshopId) {
        return res.status(400).json({ error: "Missing petshopId" });
    }

    const petshop = await prisma.petshop.findUnique({ where: { id: petshopId }, include: { pets: true } });

    if (!petshop) {
        return res.status(404).json({ error: "Petshop not found" });
    }

    // @ts-ignore Adicionando temporariamente ao req
    req.petshop = petshop;

    next();
}

import { Petshop } from "@prisma/client"; // Importa o tipo do Prisma

export interface RequestWithPetshop extends Request {
    petshop?: Petshop;
}

