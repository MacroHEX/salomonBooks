'use client'

import React from 'react';
import {useSession} from "next-auth/react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {Skeleton} from '@/components/ui/skeleton';
import Link from "next/link";

const PerfilPage = () => {
  const {data: session, status} = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        {status === 'loading' ? (
          <CardContent className="flex flex-col items-center space-y-4 py-8">
            <Skeleton className="h-24 w-24 rounded-full"/>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]"/>
              <Skeleton className="h-4 w-[200px]"/>
            </div>
          </CardContent>
        ) : !session ? (
          <CardContent className="flex flex-col items-center space-y-4 py-8">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src='https://cdn.donmai.us/original/ce/85/__mera_azusa_dracu_riot_drawn_by_makochan42__ce8575654661705e4cf5f390f7e58f95.png'
                alt='avatar'/>
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">No Iniciaste Sesión</h2>
            <p className="text-muted-foreground">Inicia Sesión para ver tu Perfil</p>
            <Link href='/login'>
              <Button>
                <LogIn className="mr-2 h-4 w-4"/> Iniciar Sesión
              </Button>
            </Link>
          </CardContent>
        ) : (
          <>
            <CardHeader className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? 'User'}/>
                <AvatarFallback>{session.user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{session.user?.name ?? 'Unknown User'}</h2>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">{session.user?.email ?? 'No email available'}</p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default PerfilPage;
