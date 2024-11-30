import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRes = async (req: Request, res: Response): Promise<void> => {
    const { dni, idf } = req.body;
    try {
        const result = await prisma.res.create({
            data: { 
                dni:dni,
                idf: idf },
        });
        res.status(201).json({ result });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta", details: error.message });
    }
};

export const getAllRes = async (_req: Request, res: Response): Promise<void> => {
    try {
        const results = await prisma.res.findMany();
        res.status(200).json(results);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas", details: error.message });
    }
};

export const updateRes = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { dni } = req.body;
    try {
        const result = await prisma.res.update({
            where: { idres: parseInt(id, 10) },
            data: { dni:dni },
        });
        res.status(200).json({ result });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta", details: error.message });
    }
};

export const deleteRes = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.res.delete({
            where: { idres: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta eliminada" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta", details: error.message });
    }
};
