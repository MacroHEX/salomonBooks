'use client';

import React from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const FormSchema = z.object({
  titulo: z.string(),
  autor: z.string(),
  editorial: z.string(),
  isbn: z.string(),
  totalCopias: z.number(),
  copiasDisponibles: z.number(),
  resumen: z.string(),
  fechaPublicacion: z.date(),
  imagenPortada: z.string(),
  categoria: z.string(),
});

const DashboardPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      titulo: '',
      autor: '',
      editorial: '',
      isbn: '',
      totalCopias: 10,
      copiasDisponibles: 10,
      resumen: '',
      fechaPublicacion: new Date(),
      imagenPortada: '',
      categoria: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {

    console.log(data);

    fetch('/api/libros/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then();
  }

  return (
    <div className="flex items-center justify-center pt-4">
      <Card className="w-[300px] md:w-[500px] shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Agregar Nuevo Libro</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="titulo"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autor"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="editorial"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Editorial</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalCopias"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Copias Totales</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copiasDisponibles"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Copias Disponibles</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resumen"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagenPortada"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Imagen URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoria"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Categoria(s)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
