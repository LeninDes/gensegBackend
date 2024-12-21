import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


export const createProject = async (req: Request, res: Response) => {
    const { plan, dni, id_rol, subunidad, EP } = req.body;

    if (!plan || !dni || !id_rol || !subunidad || !EP) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    const date = new Date();
    date.setHours(date.getHours() - 5);

    try {
        // Crear proyecto
        const newProject = await prisma.project.create({
            data: {
                plan,
                dni: dni,
                id_rol: Number(id_rol),
                subunidad_id_subuni: Number(subunidad),
                estado: "Pendiente",// actualizar este estado posteriormente
                escuelaProfesional: EP,
                fInit: date,
            },
        });

        await prisma.project.update({
            where:{
                idproj: newProject.idproj,
            },
            data:{
                idString: String(1000+newProject.idproj)
            }
        })

        res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject, idproj: newProject.idproj });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Ocurrió un error al crear el proyecto.' });
    }
};


export const getQuestionsByFormActive = async (req: Request, res: Response): Promise<void> => {

    try {
        const form = await prisma.form.findFirst({ where: {estado: true}});

        const questions = await prisma.prg.findMany({
            where: { idf: Number(form?.idf) },
            include: {
                opcmul: true, // Incluye opciones de preguntas de tipo 'multipleChoice'
                opcuni: true, // Incluye opciones de preguntas de tipo 'singleChoice'
                opcdes: true, // Incluye opciones de preguntas de tipo 'dropdown'
            },
        });

        // Transformar las preguntas en un formato legible
        const formattedQuestions = questions.map((question) => {
            const { idp, type, nmPrg, opcmul, opcuni, opcdes } = question;

            if (type === "multipleChoice") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcmul.map((option) => ({idop: option.idomul, optionTxt: option.txtOpc})),
                };
            }

            if (type === "singleChoice") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcuni.map((option) => ({idop: option.idoUni, optionTxt: option.txtOpc})),
                };
            }

            if (type === "dropdown") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcdes.map((option) => ({idop: option.idodes, optionTxt: option.txtOpc})),
                };
            }

            return {
                id: idp,
                type,
                questionText: nmPrg,
            };
        });
        res.status(200).json(formattedQuestions);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
    }
};

export const getProjectBySubUnidad = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Obtener los proyectos de una subunidad 
        const projectSubUnidad = await prisma.project.findMany({
            where:{
                subunidad_id_subuni: Number(id)
            }
        })
        if(!projectSubUnidad){
            return res.status(400).json({ message: "Nigun proyecto con el id de sub unidad proporcionado" });
        }
        res.status(201).json({ message: 'Obtenido los proyectos de la sub unidad', projects: projectSubUnidad });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Ocurrió un error al obtener los proyectos.' });
    }
};


export const getActivitysByProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Asumimos que el ID viene en los parámetros de la ruta
    try {
        // Validar que se proporciona el ID
        if (!id) {
            res.status(400).json({ message: 'El ID es obligatorio' });
        }
        // Convertir el ID a número (si es necesario)
        const projId = parseInt(id);

        // Verificar que el registro existe
        const ActivitysByProject = await prisma.actividad.findMany({
            where: { idproj: projId },
        });

        // Manejo si `existingSubUnidad` es null
        if (!ActivitysByProject) {
            res.status(404).json({ message: 'No existe actividades de este proyecto' });
        }
        // Datos del projecto
        const datasProject = await prisma.project.findMany({
            where:{
                idproj: projId
            }
        })
        // Manejo si existe o es null
        if (!datasProject) {
            res.status(404).json({ message: 'No existe datos del proyecto' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({ message: 'Actividades del proyecto', actividades: ActivitysByProject, datos: datasProject});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: 'Hubo un error al eliminar el formulario',
            error: error.message,
        });
    }

}


export const getProjectByUserSubUnidad = async (req: Request, res: Response): Promise<void> => {
    const {  dni, idsub } = req.params; // Asumimos que el ID viene en los parámetros de la ruta
    try {
        // Validar que se proporciona el ID
        if (!idsub || !dni) {
            res.status(400).json({ message: 'Los datos son requeridos' });
        }
        // Convertir el ID a número (si es necesario)
        const idSub = parseInt(idsub);

        // Verificar que el registro existe
        const projectsByUserSubUnidad = await prisma.project.findMany({
            where: { 
                subunidad_id_subuni: idSub, 
                dni: dni
            },
            select:{
                idproj:true,
                estado: true,
                escuelaProfesional: true,
                idString: true,
                fFin: true,
                fInit: true
                
            }
        });

        // Manejo si es null
        if (!projectsByUserSubUnidad) {
            res.status(404).json({ message: 'No existe proyectos' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({ message: 'Actividades del proyecto',  projectSubUnidad:projectsByUserSubUnidad});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: 'Hubo un error al eliminar el formulario',
            error: error.message,
        });
    }

}


export const getProjectAllBySubunidad = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: 'El ID de la subunidad es requerido' });
            return;
        }

        const projects = await prisma.project.findMany({
            where: {
                subunidad_id_subuni: Number(id),
            },
            select: {
                estado: true,
                fInit: true,
            },
        });

        if (!projects || projects.length === 0) {
            res.status(404).json({ message: 'No se encontraron proyectos' });
            return;
        }

        // Transformación de datos
        const transformedProjects = projects.map((project) => {
            // Verificar si fInit no es null
            const formattedDate = project.fInit
                ? (() => {
                      const date = new Date(project.fInit);
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajustar mes
                      const day = String(date.getDate()).padStart(2, '0'); // Día con 2 dígitos
                      return `${year}-${month}-${day}`; // Formatear fecha
                  })()
                : null; // Si fInit es null, devolver null como fecha

            return {
                date: formattedDate,
                completado: project.estado === 'Completado' ? 1 : 0,
                pendiente: project.estado === 'Pendiente' ? 1 : 0,
                archivado: project.estado === 'Archivado' ? 1 : 0,
                curso: project.estado === 'Curso' ? 1 : 0,
            };
        });

        res.status(200).json(transformedProjects);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

