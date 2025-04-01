"use client"
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, stagger } from "framer-motion";
import { Users, BarChart, LogOut, Gamepad2 } from "lucide-react";

export default function Home() {
    const Game = dynamic(() => import("@/components/game/Game"), { ssr: false })

    const navContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };
    
    const navItem = {
        hidden: { y: -20, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: { 
                type: "spring", 
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen w-screen overflow-hidden">
            <motion.nav 
                className="fixed top-0 left-0 right-0 w-full p-4 flex items-center justify-between z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                    duration: 0.6, 
                    type: "spring", 
                    stiffness: 90,
                    mass: 0.6
                }}
            >
              
                <div className="flex items-center space-x-4">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ 
                            scale: 1.03, 
                            rotate: [0, 1, 0],
                            transition: { duration: 0.3, repeat: 0 } 
                        }}
                        className="flex items-center gap-2"
                    >
                        <motion.div
                            animate={{ 
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <Gamepad2 className="h-7 w-7 text-yellow-400 drop-shadow-glow" />
                        </motion.div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent drop-shadow-glow">Know Your Friends</h1>
                    </motion.div>
                </div>
                
                <motion.div 
                    className="flex items-center space-x-6"
                    variants={navContainer}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={navItem}>
                        <Link href="/friends" className="relative px-3 py-2 group flex items-center gap-2">
                            <motion.span 
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500/60 to-blue-500/60 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-neon"
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10
                                    }
                                }}
                                whileTap={{ scale: 0.98 }}
                            ></motion.span>
                            <motion.div
                                whileHover={{
                                    y: -2,
                                    transition: { repeat: Infinity, repeatType: "mirror", duration: 0.5 }
                                }}
                            >
                                <Users className="h-4 w-4 text-cyan-300 group-hover:text-white drop-shadow-glow" />
                            </motion.div>
                            <motion.span 
                                className="text-white font-medium transition-colors drop-shadow-glow border-b border-cyan-400/70"
                                whileHover={{
                                    borderBottomWidth: "2px",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Amis
                            </motion.span>
                        </Link>
                    </motion.div>
                    
                    <motion.div variants={navItem}>
                        <Link href="/stats" className="relative px-3 py-2 group flex items-center gap-2">
                            <motion.span 
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-fuchsia-500/60 to-purple-500/60 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-neon"
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10
                                    }
                                }}
                                whileTap={{ scale: 0.98 }}
                            ></motion.span>
                            <motion.div
                                whileHover={{
                                    rotate: [0, -10, 10, 0],
                                    transition: { duration: 0.5 }
                                }}
                            >
                                <BarChart className="h-4 w-4 text-fuchsia-300 group-hover:text-white drop-shadow-glow" />
                            </motion.div>
                            <motion.span 
                                className="text-white font-medium transition-colors drop-shadow-glow border-b border-fuchsia-400/70"
                                whileHover={{
                                    borderBottomWidth: "2px",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Statistiques
                            </motion.span>
                        </Link>
                    </motion.div>
                    
                    <motion.div variants={navItem}>
                        <motion.button 
                            whileHover={{ 
                                boxShadow: "0 0 15px 2px rgba(255, 100, 50, 0.6)",
                                scale: 1.05,
                                transition: {
                                    duration: 0.2,
                                    type: "spring",
                                    stiffness: 500
                                }
                            }}
                            whileTap={{ 
                                scale: 0.95, 
                                boxShadow: "0 0 5px 1px rgba(255, 100, 50, 0.3)"
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-red-500/80 to-orange-400/80 hover:from-red-400/90 hover:to-yellow-400/90 text-white rounded-full font-medium transition-all duration-300 shadow-neon border border-white/20 flex items-center gap-2 cursor-pointer"
                            onClick={() => console.log("Déconnexion")}
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                whileHover={{
                                    x: [0, -2, 2, 0],
                                    transition: { repeat: Infinity, repeatType: "loop", duration: 0.4 }
                                }}
                            >
                                <LogOut className="h-4 w-4" />
                            </motion.div>
                            Déconnecter
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.nav>
            <div className="h-screen w-full">
                <Game />
            </div>
        </div>
    );
}
