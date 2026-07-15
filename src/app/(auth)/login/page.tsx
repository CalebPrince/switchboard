"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, type AuthActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    signIn,
    initialState,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Log in
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Sign in to continue chatting.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/signup" className="text-accent underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
