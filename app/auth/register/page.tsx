"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
    }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterInput) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/auth/register", data);
            if (response.data.success) {
                router.push("/auth/login?registered=true");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-slate-700/50">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        Créer un compte
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Username
                            </label>
                            <input
                                {...register("username")}
                                type="text"
                                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="John Doe"
                            />
                            {errors.username && (
                                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="votre@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Mot de passe
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <input
                                {...register("confirmPassword")}
                                type="password"
                                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Inscription..." : "S'inscrire"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        Déjà un compte ?
                        <Link
                            href="/auth/login"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}