import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

interface CustomError extends Error {
  message: string;
}

export async function GET() {
  try {
    const libros = await prisma.libro.findMany();

    const response = NextResponse.json(libros, {status: 200});
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json(
      {message: `Error al listar los libros: ${err.message}`},
      {status: 500}
    );
  }
}
