import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getQuestionsByFormUni = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const questions = await prisma.prg.findMany({
            where: { idf: Number(id) },
            include: {
                opcmul: true,
                opcuni: true,
                opcdes: true,
            },
        });
        console.log(questions);
        res.status(200).json({ questions });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las preguntas', error: error.message });
    }
};

export const handleDynamicQuestions = async (req: Request, res: Response): Promise<void> => {
    const {idf, questions} = req.body; // El array JSON que envía el frontend
    
    try {
        // Iterar sobre cada pregunta en el JSON
        for (const question of questions) {
            const { type, questionText, options } = question;

            // Identificar el tipo de pregunta y guardarla en la tabla correspondiente
            if (type === 'text') {
                // Insertar pregunta de texto
                await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });
            } else if (type === 'multipleChoice') {
                // Insertar pregunta de opción múltiple
                const newQuestion = await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });

                // Insertar las opciones asociadas
                if (options && options.length > 0) {
                    await prisma.opcMul.createMany({
                        data: options.map((option: string) => ({
                            idp: newQuestion.idp,
                            txtOpc: option,
                        })),
                    });
                }
            }else if (type === 'singleChoice') {
                // Insertar pregunta de opción single -> simple
                const newQuestion = await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });

                // Insertar las opciones asociadas
                if (options && options.length > 0) {
                    await prisma.opcUni.createMany({
                        data: options.map((option: string) => ({
                            idp: newQuestion.idp,
                            txtOpc: option,
                        })),
                    });
                }
            }else if (type === 'dropdown') {
                // Insertar pregunta de opción dropdown -> desplegable
                const newQuestion = await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });

                // Insertar las opciones asociadas
                if (options && options.length > 0) {
                    await prisma.opcDes.createMany({
                        data: options.map((option: string) => ({
                            idp: newQuestion.idp,
                            txtOpc: option,
                        })),
                    });
                }
            }else if (type === 'date') {
                // Insertar pregunta de tipo date
                await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });

            }else if (type === 'archive') {
                // Insertar pregunta de tipo archive
                await prisma.prg.create({
                    data: {
                        idf: Number(idf),
                        nmPrg: questionText,
                        type,
                    },
                });
            } else {
                // Manejo para otros tipos de preguntas si es necesario
                res.status(400).json({ message: `Tipo de pregunta no soportado: ${type}` });
                return;
            }
        }

        res.status(201).json({ message: 'Preguntas guardadas exitosamente' });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar las preguntas', error: error.message });
    }
};


export const getQuestionsByForm = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const questions = await prisma.prg.findMany({
            where: { idf: Number(id) },
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
                    options: opcmul.map((option) => option.txtOpc),
                };
            }

            if (type === "singleChoice") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcuni.map((option) => option.txtOpc),
                };
            }

            if (type === "dropdown") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcdes.map((option) => option.txtOpc),
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

export const updateQuestionsByForm = async (req: Request, res: Response) => {
    const { questions } = req.body; // Recibe el ID del formulario y las preguntas
    const { id } = req.params;
    const idfor = Number(id);
    console.log(questions);
    if (!idfor || !questions) {
        return res.status(400).json({ error: 'El ID del formulario y las preguntas son requeridos.' });
    }

    try {
        for (const question of questions) {
            const { id, type, questionText, options } = question;

            // Actualizar o crear la pregunta
            const updatedQuestion = await prisma.prg.upsert({
                where: { idp: id || 0 }, // Si no hay ID, se crea una nueva pregunta
                update: {
                    type: type,
                    nmPrg: questionText,
                },
                create: {
                    idf: Number(idfor),
                    type: type,
                    nmPrg: questionText,
                },
            });

            // Eliminar opciones antiguas dependiendo del tipo
            if (type === 'multipleChoice') {
                await prisma.opcMul.deleteMany({ where: { idp: updatedQuestion.idp } });
            } else if (type === 'singleChoice') {
                await prisma.opcUni.deleteMany({ where: { idp: updatedQuestion.idp } });
            } else if (type === 'dropdown') {
                await prisma.opcDes.deleteMany({ where: { idp: updatedQuestion.idp} });
            }

            // Crear nuevas opciones
            if (options && options.length > 0) {
                const optionsData = options.map((option: string) => ({
                    idp: updatedQuestion.idp,
                    txtOpc: option,
                }));

                if (type === 'multipleChoice') {
                    await prisma.opcMul.createMany({data: optionsData});
                } else if (type === 'singleChoice') {
                    await prisma.opcUni.createMany({ data: optionsData });
                } else if (type === 'dropdown') {
                    await prisma.opcDes.createMany({ data: optionsData });
                }
            }
        }

        res.status(200).json({ message: 'Preguntas actualizadas correctamente.' });
    } catch (error) {
        console.error('Error al manejar las preguntas dinámicas:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar las preguntas.' });
    }
};

