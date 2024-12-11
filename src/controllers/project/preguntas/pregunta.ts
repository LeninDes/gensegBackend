import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    const {idf, name, tipo } = req.body;

    try {
        
        const newQuestion = await prisma.prg.create({
            data: {
                idf: Number(idf),
                nmPrg: name,
                type: tipo,
            },
        });
        res.status(201).json({ message: 'Pregunta creada con éxito', question: newQuestion });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la pregunta', error: error.message });
    }
};

export const getQuestionsByForm = async (req: Request, res: Response): Promise<void> => {
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
        res.status(200).json({ questions });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las preguntas', error: error.message });
    }
};

export const addOptions = async (req: Request, res: Response): Promise<void> => {
    const { idp, options, type } = req.body;

    try {
        if (type === 'multiple') {
            await prisma.opcMul.createMany({
                data: options.map((txtOpc: string) => ({ idp, txtOpc })),
            });
        } else if (type === 'unique') {
            await prisma.opcUni.createMany({
                data: options.map((txtOpc: string) => ({ idp, txtOpc })),
            });
        } else if (type === 'descriptive') {
            await prisma.opcDes.createMany({
                data: options.map((txtOpc: string) => ({ idp, txtOpc })),
            });
        } else {
            res.status(400).json({ message: 'Tipo de pregunta no válido' });
            return;
        }

        res.status(201).json({ message: 'Opciones añadidas con éxito' });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar opciones', error: error.message });
    }
};

export const handleDynamicQuestions = async (req: Request, res: Response): Promise<void> => {
    const {idf, questions} = req.body; // El array JSON que envía el frontend
    console.log(" ----- ");
    console.log(idf);
    console.log(" ====== ");
    console.log(questions);
    console.log(" --------");
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
