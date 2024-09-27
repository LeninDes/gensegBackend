import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Agregar un nuevo permiso
export const nuevoPermiso = async (req: Request, res: Response, next: NextFunction) => {
    const { name, status } = req.body;

    try {
        const nuevoPermiso = await prisma.permission.create({
            data: {
                name,
                status: status ?? true, // Si no se envía status, por defecto será `true`
            }
        });
        res.json({ mensaje: 'Se agregó un nuevo permiso', data: nuevoPermiso });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Obtener todos los permisos
export const obtenerPermisos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permisos = await prisma.permission.findMany();
        res.json(permisos);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Obtener un permiso por ID
export const obtenerPermiso = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const permiso = await prisma.permission.findUnique({
            where: { id: Number(id) }
        });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'El permiso no existe' });
        }

        res.json(permiso);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Actualizar un permiso
export const actualizarPermiso = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const permisoActualizado = await prisma.permission.update({
            where: { id: Number(id) },
            data: {
                name,
                status
            }
        });

        res.json({ mensaje: 'Permiso actualizado correctamente', data: permisoActualizado });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Eliminar un permiso
export const eliminarPermiso = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        await prisma.permission.delete({
            where: { id: Number(id) }
        });
        res.json({ mensaje: 'Permiso eliminado correctamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
