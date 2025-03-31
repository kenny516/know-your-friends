"use client"
import dynamic from "next/dynamic";


export default function Home() {
    const Game = dynamic(() => import("@/components/game/Game"), { ssr: false })

    return (
        <div className="h-screen w-screen">
            <Game />
        </div>
    );
}
