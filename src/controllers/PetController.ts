import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { v4 as uuidv4 } from "uuid";

// Criamos uma interface para extender o Request e adicionar petshop
interface RequestWithPetshop extends Request {
    petshop?: {
        id: string;
        pets: any[];
    };
}

export class PetController {
    static async create(req: RequestWithPetshop, res: Response) {
        const { name, type, description, deadlineVaccination } = req.body;
        const petshop = req.petshop;

        if (!petshop) {
            return res.status(400).json({ error: "Petshop not found in request" });
        }

        const pet = await prisma.pet.create({
            data: {
                id: uuidv4(),
                name,
                type,
                description,
                vaccinated: false,
                deadlineVaccination: new Date(deadlineVaccination),
                createdAt: new Date(),
                petshopId: petshop.id,
            },
        });

        return res.status(201).json(pet);
    }

    static async list(req: RequestWithPetshop, res: Response) {
        const petshop = req.petshop;

        if (!petshop) {
            return res.status(400).json({ error: "Petshop not found in request" });
        }

        return res.json(petshop.pets);
    }
}