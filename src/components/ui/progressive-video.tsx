'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, AlertCircle, Loader2 } from 'lucide-react';

interface ProgressiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  style?: React.CSSProperties;
  fallbackImage?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: string) => void;
  onLoadedData?: () => void;
}

export default function ProgressiveVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  style,
  fallbackImage,
  onLoadStart,
  onCanPlay,
  onError,
  onLoadedData
}: ProgressiveVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      onLoadStart?.();
    };

    const handleCanPlay = () => {
      setCanPlay(true);
      setIsLoading(false);
      onCanPlay?.();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.('Video failed to load');
    };

    const handleLoadedData = () => {
      onLoadedData?.();
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onLoadStart, onCanPlay, onError, onLoadedData]);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setHasError(true);
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          canPlay ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload="none"
        poster={poster}
        style={style}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          {poster ? (
            <img 
              src={poster} 
              alt="Video poster"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : fallbackImage ? (
            <img 
              src={fallbackImage} 
              alt="Video fallback"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 w-full h-full" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading video...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
          {fallbackImage ? (
            <img 
              src={fallbackImage} 
              alt="Video fallback"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 w-full h-full" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-sm mb-3">Video failed to load</p>
              <button 
                onClick={playVideo}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-sm"
              >
                <Play className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}