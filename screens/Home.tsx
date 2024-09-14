'use client'

import React, {useEffect, useState} from 'react';
import BookCard from "@/components/cards/BookCard";
import {useSession} from "next-auth/react";
import {ILibro} from "@/interfaces/ILibros";
import {Skeleton} from "@/components/ui/skeleton";

const Home = () => {
  const {data: session} = useSession();
  const [libros, setLibros] = useState<ILibro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/libros")
      .then((res) => res.json())
      .then((data) => {
        setLibros(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al buscar los libros", err);
        setLoading(false);
      });
  }, []);

  const skeletons = Array.from({length: 9});

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Novedades</h1>
        <div className="flex justify-center gap-4 flex-wrap">
          {loading ? (
            skeletons.map((_, index) => (
              <Skeleton key={index} className="rounded-lg shadow-lg w-40 md:w-80 h-[256px] md:h-[512px]"/>
            ))
          ) : (
            libros.map((libro) => (
              <BookCard key={libro.id} book={libro}/>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
