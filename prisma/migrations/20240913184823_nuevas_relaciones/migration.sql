/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'USUARIO');

-- CreateEnum
CREATE TYPE "EstadoCopia" AS ENUM ('DISPONIBLE', 'RESERVADA', 'PERDIDA', 'DANADA');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('ACTIVA', 'DEVUELTA', 'CANCELADA');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editorial" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "totalCopias" INTEGER NOT NULL,
    "copiasDisponibles" INTEGER NOT NULL,
    "resumen" TEXT,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL,
    "imagenPortada" TEXT,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopiaLibro" (
    "id" SERIAL NOT NULL,
    "libroId" INTEGER NOT NULL,
    "codigoCopia" TEXT NOT NULL,
    "estado" "EstadoCopia" NOT NULL,
    "ubicacion" TEXT NOT NULL,

    CONSTRAINT "CopiaLibro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "libroId" INTEGER NOT NULL,
    "fechaReserva" TIMESTAMP(3) NOT NULL,
    "fechaDevolucion" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoReserva" NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Libro_isbn_key" ON "Libro"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "CopiaLibro_codigoCopia_key" ON "CopiaLibro"("codigoCopia");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CopiaLibro" ADD CONSTRAINT "CopiaLibro_libroId_fkey" FOREIGN KEY ("libroId") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_libroId_fkey" FOREIGN KEY ("libroId") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
