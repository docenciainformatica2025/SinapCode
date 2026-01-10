'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { RegistrationGate } from '@/components/gates/registration-gate';

interface VideoPlayerWithGateProps {
    videoUrl: string;
    courseSlug: string;
    lessonId: string;
}

export function VideoPlayerWithGate({ videoUrl, courseSlug, lessonId }: VideoPlayerWithGateProps) {
    const { isGuest } = useAuth();
    const [currentTime, setCurrentTime] = useState(0);
    const [showGate, setShowGate] = useState(false);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

    const MAX_PREVIEW_TIME = 120; // 2 minutes for guests

    useEffect(() => {
        if (!videoElement || !isGuest) return;

        const handleTimeUpdate = () => {
            const time = videoElement.currentTime;
            setCurrentTime(time);

            if (time >= MAX_PREVIEW_TIME) {
                videoElement.pause();
                setShowGate(true);
            }
        };

        videoElement.addEventListener('timeupdate', handleTimeUpdate);
        return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    }, [videoElement, isGuest]);

    return (
        <div className="relative">
            {/* Video Player */}
            <video
                ref={setVideoElement}
                src={videoUrl}
                controls
                className="w-full rounded-xl"
                poster="https://images.unsplash.com/photo-1526379095098-d400fdbfbf08?auto=format&fit=crop&q=80"
            >
                Tu navegador no soporta video HTML5.
            </video>

            {/* Preview Timer (for guests) */}
            {isGuest && currentTime > 0 && currentTime < MAX_PREVIEW_TIME && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur rounded-full text-xs font-bold text-white">
                    Preview: {Math.floor(MAX_PREVIEW_TIME - currentTime)}s restantes
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
