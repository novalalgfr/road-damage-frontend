export default function Navbar() {
	return (
		<header className="w-full p-4 z-50">
			<div className="max-w-7xl mx-auto flex justify-between items-center bg-black border-4 border-white shadow-brutal p-4 rounded-sm rotate-1 hover:rotate-0 transition-transform">
				<h1 className="text-2xl font-black uppercase tracking-tighter text-white">
					Road
					<span className="bg-[#ffcc00] text-black px-1 border-2 border-white ml-1 -rotate-3 inline-block">
						Damage
					</span>
					AI
				</h1>
				<nav className="font-mono text-sm font-bold uppercase hidden md:flex gap-6 text-white">
					<a
						href="#"
						className="hover:underline decoration-4 underline-offset-4 decoration-[#ff5500]"
					>
						Models
					</a>
					<a
						href="#"
						className="hover:underline decoration-4 underline-offset-4 decoration-[#ffcc00]"
					>
						Datasets
					</a>
				</nav>
			</div>
		</header>
	);
}
