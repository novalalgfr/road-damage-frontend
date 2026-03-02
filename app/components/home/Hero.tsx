export default function Hero() {
	return (
		<section className="relative z-10 flex flex-col items-center text-center gap-6 mt-10">
			<div className="font-mono text-sm font-bold bg-[#ffcc00] text-black px-4 py-2 border-4 border-white shadow-brutal -rotate-2">
				[ STATUS: MODEL DEPLOYED & READY ]
			</div>

			<h2 className="text-6xl md:text-8xl font-black uppercase leading-none text-white">
				Detect <br />
				<span className="bg-[#ff5500] text-white px-4 inline-block -rotate-2 border-4 border-white mt-2">
					Road Damage
				</span>
			</h2>

			<p className="font-mono text-lg max-w-xl font-bold bg-black text-white p-4 border-4 border-white shadow-brutal mt-4 rotate-1">
				Upload road imagery. Let the Deep Learning architecture map damage points, potholes, and cracks
				instantly.
			</p>
		</section>
	);
}
