import Hero from './components/home/Hero';
import InputArea from './components/input/InputArea';

export default function Home() {
	return (
		<div className="w-full max-w-5xl flex flex-col items-center gap-16 relative min-h-[60vh]">
			<div className="absolute top-10 -left-10 w-64 h-8 bg-construction-tape -rotate-6 border-y-4 border-white z-0"></div>
			<div className="absolute bottom-10 -right-12 w-80 h-8 bg-construction-tape rotate-12 border-y-4 border-white z-0 opacity-80"></div>

			<Hero />

			<InputArea />
		</div>
	);
}
