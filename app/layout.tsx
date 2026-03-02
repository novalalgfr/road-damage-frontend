import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
	title: 'Road Damage AI | Nopall',
	description: 'Road damage detection using Deep Learning.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${spaceGrotesk.variable} ${spaceMono.variable} font-sans min-h-screen flex flex-col relative my-8`}
			>
				<Navbar />

				<main className="flex-grow flex flex-col items-center justify-center p-6 mt-8">{children}</main>

				<Footer />
			</body>
		</html>
	);
}
