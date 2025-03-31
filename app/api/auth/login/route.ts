import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { API_URL } from "@/lib/config";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = loginSchema.parse(body);

        // Appel à l'API externe pour la connexion
        const response = await axios.post(`${API_URL}/auth/login`, validatedData);

        if (response.status === 200) {
            return NextResponse.json({
                success: true,
                message: "Connexion réussie",
                data: response.data
            });
        } else {
            throw new Error("Identifiants invalides");
        }
    } catch (error) {
        console.error("Erreur de connexion:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Erreur lors de la connexion"
            },
            { status: 401 }
        );
    }
}