import { Request, Response } from "express";
//import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';  // Define una secret 

/*---------- METODO LOGIN -------*/
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usuario, password } = req.body; // Se cambia dni a usuario
    // Buscar el usuario por nombre de usuario (n_usu)
    const existingUser = await prisma.usuario.findFirst({
      where: { n_usu: usuario }, // Cambiamos a findFirst ya que n_usu no es único
    });
    const users = await prisma.usuario.findMany({
      where: { n_usu: usuario, estado: true },
    });

    // Verificar si el usuario existe
    if (!existingUser) {
      throw("s");
      res.status(404).json({
        message: "El usuario no existe",
      });
      return;
    }

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    let isPasswordValid = false;
    if (existingUser) {
      isPasswordValid = await bcrypt.compare(password, existingUser.password);
    }

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Credenciales incorrectas",
      });
      return;
    }

    // Generar un token
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser.dni, role: existingUser.rol_id },
        SECRET_KEY,
        { expiresIn: "1h" } // El token expira en 1 hora
      );
      res.status(200).json({
        message: "user",
        tipo: 'user',
        token,
        users,
      });
      return;
    }
  } catch (error) {

    try {
        const { usuario, password } = req.body;  // Se cambia dni a usuario
        // VALIDAR EL USUARIO
        if(!usuario){
          res.status(400).json({
            message: 'El uusario es obligatorio'
          })
        return;
    }
    
    //VALIDAR EL PASSWORD
    if(!password){
      res.status(400).json({
            message: 'La contrasenia es obligaroria'
          })
        return;
      }

      const user = await prisma.user.findUnique({where: {usuario}})
      
      // Comprobamos si el usuario existe
      if(!user){
        res.status(404).json({error: 'Usuario no encontrado'});
        return;
      }
      
      // Comparamos las password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch){
        res.status(401).json({
            error: 'Usuario y contrasenias no coinciden'
          })
        return;
      }
      
      if(passwordMatch && user)
        {
          const token = jwt.sign(
              { userId: usuario },
              SECRET_KEY,
              { expiresIn: '1h' }  // El token expira en 1 hora
            );   
          res.status(200).json({
            message: 'admin',
            tipo: 'admin',
            token,
            user,
          });
          return;
        }

    } catch (error) {
      console.error(error);
    res.status(500).json({
      message: "Error en el proceso de inicio de sesión",
    });
    }
    console.error(error);
    res.status(500).json({
      message: "Error en el proceso de inicio de sesión",
    });
  }
};

/*---------- CREAR USUARIO -------*/
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { dni, usuario, password, rol_id, id_sub } = req.body;

  try {
    // Verificar si el usuario con la misma combinación de dni, rol_id, id_sub ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: {
        dni_rol_id_subunidad_id_subuni: {
          dni: dni,
          rol_id: rol_id,
          subunidad_id_subuni: id_sub,
        },
      },
    });
    const dniUser = await prisma.usuario.findFirst({
      where: {
        dni: dni,
      },
    });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "El usuario con este rol y subunidad ya existe." });
    }
    if (dniUser) {
      const newUser = await prisma.usuario.create({
        data: {
          dni: dni,
          n_usu: usuario,
          password: dniUser.password,
          rol_id: rol_id,
          subunidad_id_subuni: id_sub,
          estado: true,
        },
      });
      res
        .status(201)
        .json({ message: "Usuario creado correctamente.", newUser });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      // Crear el nuevo usuario
      const newUser = await prisma.usuario.create({
        data: {
          dni: dni,
          n_usu: usuario,
          password: hashedPassword,
          rol_id: rol_id,
          subunidad_id_subuni: id_sub,
          estado: true,
        },
      });
      res
        .status(201)
        .json({ message: "Usuario creado correctamente.", newUser });
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Error al crear el usuario.", error });
  } finally {
    await prisma.$disconnect();
  }
};

export const AllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Usamos Prisma para obtener todos los usuarios con sus roles y permisos
    const users = await prisma.usuario.findMany({
      include: {
        rol: {},
        sub_uni: true, // Trae la subunidad asociada al usuario
      },
    });

    // Retornamos los usuarios con las relaciones
    res.json(users);
  } catch (error) {
    // Si hay un error, lo manejamos
    console.error(error);
    res.status(500).json({ error: "Algo salió mal al obtener los usuarios." });
  }
};

export const getUserwithDNI = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { dni } = req.params;
    const getRoles = await prisma.usuario.findFirst({
      where: { dni: dni, estado: true },
    });

    res.status(200).json(getRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los roles" });
  }
};
export const toggleUserState = async (req: Request, res: Response): Promise<void> => {
  const { dni, rol_id, subunidad_id_subuni, estado } = req.body; // Desestructurar todos los campos necesarios.

  // Validar datos básicos
  if (!dni || rol_id === undefined || subunidad_id_subuni === undefined || estado === undefined) {
    res.status(400).json({ message: 'Parámetros incompletos: dni, rol_id, subunidad_id_subuni o estado faltan.' });
    return;
  }

  try {
    // Verificar si el usuario existe
    const existingUser = await prisma.usuario.findUnique({
      where: {
        dni_rol_id_subunidad_id_subuni: { // Prisma utiliza este formato para claves primarias compuestas
          dni,
          rol_id,
          subunidad_id_subuni,
        },
      },
    });

    if (!existingUser) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Actualizar el estado del usuario
    const updatedUser = await prisma.usuario.update({
      where: {
        dni_rol_id_subunidad_id_subuni: {
          dni,
          rol_id,
          subunidad_id_subuni,
        },
      },
      data: { estado },
    });

    // Responder con los datos actualizados
    res.status(200).json({
      message: 'Estado del usuario actualizado correctamente.',
      updatedUser,
    });
  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};



/* 

  {
  "dni": "74652485",
  "usuario  ": "ssss",
  "password": "root",
  "rol_id": 1,
  "id_sub": 1
}
  */
