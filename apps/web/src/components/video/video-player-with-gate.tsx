'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { RegistrationGate } from '@/components/gates/registration-gate';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerWithGateProps {
    videoUrl: string;
    courseSlug: string;
    lessonId: string;
    title?: string;
}

export function VideoPlayerWithGate({ videoUrl, courseSlug, lessonId, title }: VideoPlayerWithGateProps) {
    const { isGuest } = useAuth();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showGate, setShowGate] = useState(false);

    const MAX_PREVIEW_TIME = 120; // 2 minutes for guests
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial Setup & Time Update
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const current = video.currentTime;
            const duration = video.duration;
            setCurrentTime(current);
            setProgress((current / duration) * 100);

            // Gate Logic
            if (isGuest && current >= MAX_PREVIEW_TIME) {
                video.pause();
                setIsPlaying(false);
                setShowGate(true);
            }
        };

        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [isGuest]);

    // Controls Visibility Handler
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        }
    };

    // Actions
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
        setProgress(parseFloat(e.target.value));
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Format Time Helper
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            ref={containerRef}
            className="group relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Main Video Element */}
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                onClick={togglePlay}
                poster="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80"
            />

            {/* Premium Overlay Play Button (Centered) */}
            <AnimatePresence>
                {!isPlaying && !showGate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                    >
                        <button
                            onClick={togglePlay}
                            className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/90 text-white hover:bg-primary hover:scale-110 transition-all shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                        >
                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Controls Bar */}
            <AnimatePresence>
                {showControls && !showGate && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 pb-6 pt-12 flex flex-col gap-2"
                    >
                        {/* Progress Bar */}
                        <div className="relative group/progress h-1.5 hover:h-2.5 transition-all bg-white/20 rounded-full cursor-pointer">
                            <div
                                className="absolute h-full bg-primary rounded-full"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-4">
                                <button onClick={togglePlay} className="text-white hover:text-primary transition">
                                    {isPlaying ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    )}
                                </button>

                                <div className="flex items-center gap-2 group/vol">
                                    <button onClick={toggleMute} className="text-white hover:text-primary transition">
                                        {isMuted ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                        )}
                                    </button>
                                </div>

                                <span className="text-xs text-white/80 font-mono">
                                    {videoRef.current ? formatTime(videoRef.current.currentTime) : '00:00'} / {videoRef.current ? formatTime(videoRef.current.duration) : '00:00'}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={toggleFullscreen} className="text-white hover:text-primary transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Guest Preview Timer Overlay */}
            {isGuest && currentTime > 0 && currentTime < MAX_PREVIEW_TIME && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur rounded-full border border-white/10 flex items-center gap-2 z-20">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs font-bold text-white">
                        Vista Previa: {Math.floor(MAX_PREVIEW_TIME - currentTime)}s
                    </span>
                </div>
            )}

            {/* Registration Gate */}
            <RegistrationGate
                isOpen={showGate}
                onClose={() => setShowGate(false)}
                reason="video_limit"
            />
        </div>
    );
}
