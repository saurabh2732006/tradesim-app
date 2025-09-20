"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14 8V6H9.5C8.12 6 7 7.12 7 8.5C7 9.88 8.12 11 9.5 11H12V13H8"/>
      <path d="M9 16C9.82843 16 10.5 15.3284 10.5 14.5C10.5 13.6716 9.82843 13 9 13C8.17157 13 7.5 13.6716 7.5 14.5C7.5 15.3284 8.17157 16 9 16Z" fill="currentColor"/>
      <path d="M15 16C15.8284 16 16.5 15.3284 16.5 14.5C16.5 13.6716 15.8284 13 15 13C14.1716 13 13.5 13.6716 13.5 14.5C13.5 15.3284 14.1716 16 15 16Z" fill="currentColor"/>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("trader@tradesim.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
      // The redirect is handled by the AuthProvider
    } catch (err) {
      setError("Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm animate-fade-in-up" style={{animationDuration: '1s'}}>
        <CardHeader className="text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
             <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
               <Logo className="size-6" />
             </div>
             <h1 className="font-headline text-2xl font-semibold">TradeSim</h1>
           </div>
          <CardTitle className="font-headline text-xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
