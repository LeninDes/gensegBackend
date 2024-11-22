import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposPregunta/opcionMultiple'

// Crear OpcMul
export const createOpcMul = async (req: Request, res: Response): Promise<void> => {
    const { idp, txtOpc } = req.body;
    try {
        const opcMul = await prisma.create({
            data: { idp, txtOpc },
        });
        res.status(201).json({ opcMul });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la opción múltiple", details: error.message });
    }
};

// Obtener todas las OpcMul
export const getAllOpcMul = async (_req: Request, res: Response): Promise<void> => {
    try {
        const opcMulList = await prisma.findMany();
        res.status(200).json(opcMulList);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las opciones múltiples", details: error.message });
    }
};

// Actualizar OpcMul
export const updateOpcMul = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción múltiple
    const { txtOpc } = req.body;
    try {
        const opcMul = await prisma.update({
            where: { idomul: parseInt(id, 10) },
            data: { txtOpc },
        });
        res.status(200).json({ opcMul });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la opción múltiple", details: error.message });
    }
};

// Eliminar OpcMul
export const deleteOpcMul = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción múltiple
    try {
        await prisma.delete({
            where: { idomul: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Opción múltiple eliminada correctamente" });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la opción múltiple", details: error.message });
    }
};
