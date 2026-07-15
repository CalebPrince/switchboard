"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = { error: null };

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signUp,
    initialState,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Bring your own API keys, chat with any model.
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
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating account…" : "Sign up"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-accent underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
