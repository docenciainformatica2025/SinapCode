'use server';

import { signIn } from "@/auth";

export async function socialLogin(provider: "google" | "github") {
    await signIn(provider, { redirectTo: "/dashboard" });
}

export async function adminLogin() {
    await signIn("credentials", {
        email: "admin@sinapcode.global",
        password: "password12345678",
        redirectTo: "/admin",
    });
}
