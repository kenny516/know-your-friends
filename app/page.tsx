"use client"
import dynamic from "next/dynamic";
import Image from "next/image";

export default function Home() {
    const Game = dynamic(() => import("@/components/game/Game"), { ssr: false })

    return (
        <div className="min-h-screen w-screen overflow-hidden">
            <nav className="fixed top-0 left-0 right-0 w-full bg-slate-800 p-4 flex items-center justify-between shadow-lg z-50">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/placeholder-logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h1 className="text-white text-xl font-semibold">Know Your Friends</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        Commencer
                    </button>
                </div>
            </nav>
            <div className="h-screen w-full pt-[72px]">
                <Game />
            </div>
        </div>
    );
}
