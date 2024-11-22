import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposPregunta/opcionDesplegable'
// Crear OpcDes
export const createOpcDes = async (req: Request, res: Response): Promise<void> => {
    const { idp, txtOpc } = req.body;
    try {
        const opcDes = await prisma.create({
            data: { idp, txtOpc },
        });
        res.status(201).json({ opcDes });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la opción descriptiva", details: error.message });
    }
};

// Obtener todas las OpcDes
export const getAllOpcDes = async (_req: Request, res: Response): Promise<void> => {
    try {
        const opcDesList = await prisma.findMany();
        res.status(200).json(opcDesList);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las opciones descriptivas", details: error.message });
    }
};

// Actualizar OpcDes
export const updateOpcDes = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción descriptiva
    const { txtOpc } = req.body;
    try {
        const opcDes = await prisma.update({
            where: { idodes: parseInt(id, 10) },
            data: { txtOpc },
        });
        res.status(200).json({ opcDes });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la opción descriptiva", details: error.message });
    }
};

// Eliminar OpcDes
export const deleteOpcDes = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción descriptiva
    try {
        await prisma.delete({
            where: { idodes: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Opción descriptiva eliminada correctamente" });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la opción descriptiva", details: error.message });
    }
};
