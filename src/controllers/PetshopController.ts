import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { v4 as uuidv4 } from "uuid";

export class PetshopController {
    static async create(req: Request, res: Response) {
        const { name, cnpj } = req.body;

        // Valida o formato do CNPJ
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!cnpjRegex.test(cnpj)) {
            return res.status(400).json({ error: "Invalid CNPJ format" });
        }

        // Verifica se o Petshop já existe
        const existingPetshop = await prisma.petshop.findUnique({ where: { cnpj } });
        if (existingPetshop) {
            return res.status(400).json({ error: "Petshop with this CNPJ already exists" });
        }

        const petshop = await prisma.petshop.create({
            data: { id: uuidv4(), name, cnpj, pets: { create: [] } },
        });

        return res.status(201).json(petshop);
    }
}
