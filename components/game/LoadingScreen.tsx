interface LoadingScreenProps {
    progress?: number
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Chargement...</h2>
                <div className="w-64 h-2 bg-gray-700 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    )
}

