'use client'

import React, {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Loader2} from "lucide-react"
import {signIn} from "next-auth/react";
import {toast} from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", {callbackUrl: "/"})
    } catch (error) {
      toast.error('Error al iniciar sesión, reintente nuevamente.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Inicio de Sesión</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            <img src='/imgs/google.png' className='h-6 w-auto pr-4' alt='alt'/>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Iniciar Sesión con Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}