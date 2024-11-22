import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/respuestaFecha'
// Crear RespuestaArchivo

// Crear RespuestaFecha
export const createRespuestaFecha = async (req: Request, res: Response): Promise<void> => {
    const { idres, fecha } = req.body;
    try {
        const respuestaFecha = await prisma.create({
            data: { idres, fecha },
        });
        res.status(201).json({ respuestaFecha });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta fecha", details: error.message });
    }
};

// Obtener todas las RespuestaFecha
export const getAllRespuestaFecha = async (_req: Request, res: Response): Promise<void> => {
    try {
        const respuestaFechaList = await prisma.findMany();
        res.status(200).json(respuestaFechaList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas fecha", details: error.message });
    }
};

// Actualizar RespuestaFecha
export const updateRespuestaFecha = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { fecha } = req.body;
    try {
        const respuestaFecha = await prisma.update({
            where: { id: parseInt(id, 10) },
            data: { fecha },
        });
        res.status(200).json({ respuestaFecha });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta fecha", details: error.message });
    }
};

// Eliminar RespuestaFecha
export const deleteRespuestaFecha = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { id: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta fecha eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta fecha", details: error.message });
    }
};
