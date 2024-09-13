import {prisma} from "@/lib/prisma";

interface LibroCreateInput {
  titulo: string;
  autor: string;
  editorial: string;
  isbn: string;
  totalCopias: number;
  copiasDisponibles: number;
  resumen?: string;
  fechaPublicacion: Date;
  imagenPortada?: string;
  categoria: string;
}

interface CustomError extends Error {
  message: string;
}

export async function addLibro(input: LibroCreateInput) {
  try {
    return await prisma.libro.create({
      data: {
        titulo: input.titulo,
        autor: input.autor,
        editorial: input.editorial,
        isbn: input.isbn,
        totalCopias: input.totalCopias,
        copiasDisponibles: input.copiasDisponibles,
        resumen: input.resumen,
        fechaPublicacion: input.fechaPublicacion,
        imagenPortada: input.imagenPortada,
        categoria: input.categoria,
      },
    });
  } catch (error) {
    const err = error as CustomError;
    throw new Error(`Failed to add libro: ${err.message}`);
  }
}

export async function getLibros() {
  try {
    return await prisma.libro.findMany();
  } catch (error) {
    const err = error as CustomError;
    throw new Error(`Failed to retrieve libros: ${err.message}`);
  }
}

export async function getLibroById(id: number) {
  try {
    const libro = await prisma.libro.findUnique({
      where: {id},
    });

    if (!libro) {
      throw new Error("Libro not found");
    }

    return libro;
  } catch (error) {
    const err = error as CustomError;
    throw new Error(`Failed to retrieve libro: ${err.message}`);
  }
}

export async function updateLibro(id: number, input: Partial<LibroCreateInput>) {
  try {
    return await prisma.libro.update({
      where: {id},
      data: {
        ...input,
      },
    });
  } catch (error) {
    const err = error as CustomError;
    throw new Error(`Failed to update libro: ${err.message}`);
  }
}

export async function deleteLibro(id: number) {
  try {
    return await prisma.libro.delete({
      where: {id},
    });
  } catch (error) {
    const err = error as CustomError;
    throw new Error(`Failed to delete libro: ${err.message}`);
  }
}
