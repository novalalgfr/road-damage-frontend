'use client';

import { useState, useCallback, useRef } from 'react';
import { Camera, Upload, RefreshCw, X, Eye, Scan, ImagePlus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useDropzone, FileRejection } from 'react-dropzone';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

type InputMode = 'file' | 'camera';
type ViewMode = 'original' | 'detected';

const dataURLtoFile = (dataurl: string, filename: string) => {
	const arr = dataurl.split(',');
	const match = arr[0].match(/:(.*?);/);
	const mime = match ? match[1] : 'image/jpeg';
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};

export default function InputArea() {
	const [mode, setMode] = useState<InputMode>('file');
	const [image, setImage] = useState<string | null>(null);
	const [fileToUpload, setFileToUpload] = useState<File | null>(null);
	const [detectedImage, setDetectedImage] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [result, setResult] = useState<boolean>(false);
	const [activeView, setActiveView] = useState<ViewMode>('original');
	const [notification, setNotification] = useState<string | null>(null);

	const webcamRef = useRef<Webcam>(null);

	const videoConstraints = {
		facingMode: 'environment'
	};

	const showNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => setNotification(null), 4000);
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setFileToUpload(file);
			setNotification(null);
			setResult(false);
			setActiveView('original');
			setDetectedImage(null);
		}
	}, []);

	const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
		const file = fileRejections[0];
		const error = file.errors[0];
		if (error.code === 'file-too-large') {
			showNotification('FILE TOO LARGE! MAX 5MB.');
		} else if (error.code === 'file-invalid-type') {
			showNotification('INVALID FORMAT! USE JPG OR PNG.');
		} else {
			showNotification(error.message.toUpperCase());
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDropRejected,
		accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
		maxSize: 5 * 1024 * 1024,
		multiple: false
	});

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			setImage(imageSrc);
			const file = dataURLtoFile(imageSrc, 'camera-capture.jpg');
			setFileToUpload(file);
			setNotification(null);
			setResult(false);
			setDetectedImage(null);
			setActiveView('original');
		}
	}, [webcamRef]);

	const handleGenerate = async () => {
		if (!fileToUpload) {
			showNotification('ERROR: PLEASE INSERT ROAD IMAGE FIRST!');
			return;
		}
		setIsProcessing(true);
		setActiveView('original');
		setResult(false);

		const formData = new FormData();
		formData.append('file', fileToUpload);

		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

		try {
			const response = await fetch(`${baseUrl}/predict`, {
				method: 'POST',
				body: formData
			});
			const data = await response.json();

			if (response.ok && data.status === 'success') {
				setDetectedImage(data.detect_url);
				setResult(true);
				setActiveView('detected');
			} else {
				showNotification(data.error || 'FAILED TO PROCESS IMAGE.');
			}
		} catch (error) {
			console.error(error);
			showNotification('SERVER ERROR: BACKEND NOT RESPONDING.');
		} finally {
			setIsProcessing(false);
		}
	};

	const handleReset = () => {
		setImage(null);
		setFileToUpload(null);
		setResult(false);
		setDetectedImage(null);
		setActiveView('original');
		setNotification(null);
	};

	return (
		<div className="relative w-full max-w-4xl mx-auto mt-12 mb-20 z-10">
			<div className="flex pl-4 gap-2 relative z-20">
				<button
					onClick={() => {
						setMode('file');
						handleReset();
					}}
					className={clsx(
						'px-6 py-3 text-sm font-black font-mono uppercase tracking-wider border-4 border-b-0 border-white rounded-t-sm transition-colors cursor-pointer',
						mode === 'file' ? 'bg-[#ffcc00] text-black' : 'bg-black text-white hover:bg-[#1a1a1a]'
					)}
				>
					<div className="flex items-center gap-2">
						<Upload
							size={18}
							strokeWidth={3}
						/>{' '}
						FILE_UPLOAD
					</div>
				</button>
				<button
					onClick={() => {
						setMode('camera');
						handleReset();
					}}
					className={clsx(
						'px-6 py-3 text-sm font-black font-mono uppercase tracking-wider border-4 border-b-0 border-white rounded-t-sm transition-colors cursor-pointer',
						mode === 'camera' ? 'bg-[#ffcc00] text-black' : 'bg-black text-white hover:bg-[#1a1a1a]'
					)}
				>
					<div className="flex items-center gap-2">
						<Camera
							size={18}
							strokeWidth={3}
						/>{' '}
						LIVE_CAM
					</div>
				</button>
			</div>

			<div className="bg-[#0a0a0a] border-4 border-white p-6 sm:p-8 shadow-brutal min-h-[450px] relative z-10">
				<div className="absolute -top-4 right-4 bg-[#ff5500] border-4 border-white px-4 py-1 z-20 rotate-2">
					<span className="font-mono text-xs font-black text-white tracking-widest uppercase">
						INPUT_ZONE
					</span>
				</div>

				{!image ? (
					mode === 'file' ? (
						<div
							{...getRootProps()}
							className={clsx(
								'w-full h-[350px] border-4 border-dashed border-white rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group',
								isDragActive ? 'bg-[#333333] text-white' : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
							)}
						>
							<input {...getInputProps()} />
							<div className="mb-4">
								<ImagePlus
									size={60}
									strokeWidth={1.5}
								/>
							</div>
							<h3 className="font-black uppercase text-3xl mb-2">Drop Road Image</h3>
							<p className="font-mono font-bold text-sm text-gray-400 group-hover:text-white transition-colors">
								Or click to browse directory
							</p>
							<p className="font-mono text-xs mt-4 bg-black text-white px-2 py-1">
								SUPPORTS JPG, PNG (MAX 5MB)
							</p>
						</div>
					) : (
						<div className="w-full h-[350px] bg-black border-4 border-white relative overflow-hidden group">
							<Webcam
								audio={false}
								ref={webcamRef}
								videoConstraints={videoConstraints}
								screenshotFormat="image/jpeg"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 border-[10px] border-transparent group-hover:border-[#ff5500]/50 transition-colors pointer-events-none" />
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-[#ffcc00] pointer-events-none animate-pulse" />
							<button
								onClick={capture}
								className="cursor-pointer absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#ff5500] hover:bg-[#db4900] text-white font-black uppercase font-mono px-6 py-3 border-4 border-white shadow-brutal active:bg-black transition-all"
							>
								Capture Frame
							</button>
						</div>
					)
				) : (
					<div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
						<div className="bg-black p-4 border-4 border-white shadow-brutal transform -rotate-1 relative w-full sm:w-[600px]">
							<div className="relative w-full aspect-video bg-[#1a1a1a] border-4 border-white overflow-hidden">
								<Image
									src={image}
									alt="Original Road"
									width={0}
									height={0}
									sizes="100vw"
									className="w-full h-full object-contain"
									unoptimized
								/>
								{result && activeView === 'detected' && detectedImage && (
									<div className="absolute inset-0 z-10 bg-black/50">
										<Image
											src={detectedImage}
											alt="Detection Result"
											fill
											className="object-contain"
											unoptimized
										/>
									</div>
								)}
							</div>
							<div className="flex justify-between items-center mt-4">
								<span className="font-mono text-xs font-bold text-[#ffcc00] uppercase bg-white/10 px-2 py-1">
									IMG_ID: #RD-{new Date().getFullYear()}
								</span>
								<span className="font-mono text-xs font-black text-white uppercase tracking-widest border border-white px-2 py-1">
									{activeView} MODE
								</span>
							</div>
						</div>

						<div className="mt-10 flex flex-col items-center gap-6 w-full max-w-[600px]">
							{result && (
								<div className="flex justify-center gap-4 p-2 bg-[#1a1a1a] border-4 border-white">
									<button
										onClick={() => setActiveView('original')}
										className={clsx(
											'cursor-pointer flex items-center gap-2 px-4 py-2 font-mono text-sm font-black uppercase border-2 transition-all',
											activeView === 'original'
												? 'bg-[#ffcc00] text-black border-[#ffcc00]'
												: 'bg-transparent text-white border-transparent hover:border-white'
										)}
									>
										<Eye size={16} /> ORIGINAL
									</button>
									<button
										onClick={() => setActiveView('detected')}
										className={clsx(
											'cursor-pointer flex items-center gap-2 px-4 py-2 font-mono text-sm font-black uppercase border-2 transition-all',
											activeView === 'detected'
												? 'bg-[#ffcc00] text-black border-[#ffcc00]'
												: 'bg-transparent text-white border-transparent hover:border-white'
										)}
									>
										<Scan size={16} /> DETECTED
									</button>
								</div>
							)}

							<div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
								<button
									onClick={handleReset}
									className="cursor-pointer px-6 py-3 font-mono text-sm font-black text-white bg-black border-4 border-white shadow-brutal hover:bg-white hover:text-black transition-colors uppercase"
								>
									{result ? 'New Scan' : 'Cancel'}
								</button>

								{!result && (
									<button
										onClick={handleGenerate}
										disabled={isProcessing}
										className="cursor-pointer px-8 py-3 bg-[#ff5500] text-white font-mono text-sm font-black border-4 border-white hover:bg-[#ffcc00] hover:text-black transition-colors uppercase flex items-center justify-center gap-2 shadow-brutal active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isProcessing ? (
											<RefreshCw
												className="animate-spin"
												size={18}
												strokeWidth={3}
											/>
										) : (
											<CheckCircle2
												size={18}
												strokeWidth={3}
											/>
										)}
										{isProcessing ? 'ANALYZING...' : 'RUN YOLO MODEL'}
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			<AnimatePresence>
				{notification && (
					<motion.div
						initial={{ opacity: 0, rotate: 5, y: 50 }}
						animate={{ opacity: 1, rotate: -2, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						className="fixed bottom-10 right-10 z-50"
					>
						<div className="bg-[#ffcc00] text-black p-4 border-4 border-white shadow-brutal flex flex-col gap-2 max-w-sm">
							<div className="flex justify-between items-start border-b-4 border-black pb-2">
								<div className="flex items-center gap-2">
									<AlertTriangle strokeWidth={3} />
									<h4 className="font-black font-mono text-lg uppercase tracking-tight">
										SYSTEM ALERT
									</h4>
								</div>
								<button
									onClick={() => setNotification(null)}
									className="hover:scale-110"
								>
									<X strokeWidth={3} />
								</button>
							</div>
							<p className="font-mono font-bold text-sm">{notification}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
