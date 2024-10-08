'use client'

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Users} from "lucide-react";


const UserMenu = () => {
  // ::: Estados
  //
  const {data: session} = useSession();

  // ::: Componente
  //
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {session && <AvatarImage src={session.user?.image ? session.user?.image : '/'} alt="@username"/>}
            <AvatarFallback>
              <Users className='text-stone-500 hover:text-stone-800'/>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {!session ?
          <>
            <DropdownMenuItem>
              <Link href='/login'>
                Iniciar Sesión
              </Link>
            </DropdownMenuItem>
          </> :
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                {session && <p className="text-sm leading-none">{session.user?.name}</p>}
                {session && <p className="text-sm font-thin leading-none">{session.user?.email}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>

            <DropdownMenuItem>
              <Link href='/perfil'>
                Perfil
              </Link>
            </DropdownMenuItem>

            {session.user.role === 'ADMIN' &&
                <DropdownMenuItem>
                    <Link href='/dashboard'>
                        Panel Admin
                    </Link>
                </DropdownMenuItem>
            }
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <button onClick={() => signOut()}>
                Salir
              </button>
            </DropdownMenuItem>
          </>
        }

      </DropdownMenuContent>
    </DropdownMenu>

  );
};

export default UserMenu;