export default function Footer() {
	return (
		<footer className="w-full p-4 mt-auto z-50">
			<div className="max-w-7xl mx-auto bg-black border-4 border-white shadow-brutal p-4 -rotate-1">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="font-mono text-sm font-bold text-white uppercase">
						© {new Date().getFullYear()} Nopall. All rights reserved.
					</p>
					<div className="font-mono text-xs font-bold bg-[#ff5500] text-white px-2 py-1 border-2 border-white">
						V 1.0.0
					</div>
				</div>
			</div>
		</footer>
	);
}
