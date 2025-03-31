import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Know Your Friends",
    description: "Une plateforme pour rencontrer des amis",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="dark">
            <body className="dark:bg-slate-900">
                {children}
            </body>
        </html>
    );
}
