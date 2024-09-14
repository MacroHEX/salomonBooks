"use client"

import {useState} from "react"
import Link from "next/link"
import {Book, Menu, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Book className="h-8 w-8 mr-2"/>
            <span className="font-bold text-lg hidden sm:inline">Salomon Books</span>
          </Link>

          {/* Center text - hidden on small screens */}
          <div className="hidden md:block font-semibold text-xl">Libros</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <UserMenu/>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="py-2">
              <UserMenu/>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
