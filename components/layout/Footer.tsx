import React from 'react';
import {Facebook, Instagram, Twitter} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-yellow-300 text-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl font-bold">Salomon Books</h1>
            <p className="mt-2">Si estás leyendo esto que tengas un buen día</p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-xl font-semibold mb-4">Siguenos</h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-800 hover:text-gray-600">
                <Facebook/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-800 hover:text-gray-600">
                <Twitter/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-800 hover:text-gray-600">
                <Instagram/>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-400 pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Salomon Books. Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
