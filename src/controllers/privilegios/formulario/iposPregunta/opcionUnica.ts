import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposPregunta/opcionUnica'

// Crear OpcUni
export const createOpcUni = async (req: Request, res: Response): Promise<void> => {
    const { idp, txtOpc } = req.body;
    try {
        const opcUni = await prisma.create({
            data: { 
                idp:idp, 
                txtOpc:txtOpc },
        });
        res.status(201).json({ opcUni });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la opción única", details: error.message });
    }
};

// Obtener todas las OpcUni
export const getAllOpcUni = async (_req: Request, res: Response): Promise<void> => {
    try {
        const opcUniList = await prisma.findMany();
        res.status(200).json(opcUniList);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las opciones únicas", details: error.message });
    }
};

// Actualizar OpcUni
export const updateOpcUni = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción única
    const { txtOpc } = req.body;
    try {
        const opcUni = await prisma.update({
            where: { idoUni: parseInt(id, 10) },
            data: { txtOpc:txtOpc },
        });
        res.status(200).json({ opcUni });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la opción única", details: error.message });
    }
};

// Eliminar OpcUni
export const deleteOpcUni = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // ID de la opción única
    try {
        await prisma.delete({
            where: { idoUni: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Opción única eliminada correctamente" });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar la opción única", details: error.message });
    }
};


