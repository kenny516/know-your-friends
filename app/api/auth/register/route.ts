import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { API_URL } from "@/lib/config";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        // Appel à l'API externe pour l'inscription
        const response = await axios.post(`${API_URL}/auth/register`, validatedData);

        if (response.status === 201 || response.status === 200) {
            return NextResponse.json({
                success: true,
                message: "Inscription réussie",
                data: response.data
            });
        } else {
            throw new Error("Erreur lors de l'inscription");
        }
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Erreur lors de l'inscription"
            },
            { status: 400 }
        );
    }
}