import { Geist } from 'next/font/google';
import type { Metadata } from 'next';

import './globals.css';

import Sidebar from '@/app/components/sidebar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Metrify',
    description: 'Social media analytics dashboard'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} antialiased`}>
                <Sidebar />
                <main className="ml-[var(--sidebar-width)] min-h-screen p-8">{children}</main>
            </body>
        </html>
    );
}
