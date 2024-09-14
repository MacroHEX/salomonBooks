// app/api/libros/route.ts
import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

interface CustomError extends Error {
  message: string;
}

export async function GET() {
  try {
    const libros = await prisma.libro.findMany();
    return NextResponse.json(libros, {status: 200});
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json({message: `Error al listar los libros: ${err.message}`}, {status: 500});
  }
}
