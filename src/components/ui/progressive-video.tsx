'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';

interface ProgressiveVideoProps {
  src: string;
  /** Smaller encode served to screens up to 767px wide. */
  mobileSrc?: string;
  poster?: string;
  fallbackImage?: string;
  className?: string;
  style?: React.CSSProperties;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  onError?: (error: unknown) => void;
  priority?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  captionSrc?: string;
  captionLabel?: string;
  /** Accessible name for the pause/play control. */
  label?: string;
}

/**
 * Background video with lazy loading, a poster image, a mobile-sized source and a
 * pause control (WCAG 2.2.2: looping motion longer than 5s must be pausable). Autoplay
 * is skipped for visitors who prefer reduced motion or have Data Saver on.
 */
export default function ProgressiveVideo({
  src,
  mobileSrc,
  poster,
  fallbackImage,
  className = '',
  style = {},
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  controls = false,
  onError,
  priority = false,
  preload = 'none',
  captionSrc,
  captionLabel = 'English',
  label = 'background video',
}: ProgressiveVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allowAutoplay, setAllowAutoplay] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduceMotion || saveData) setAllowAutoplay(false);

    // With `priority` the sources are server-rendered, so the browser can fire loadeddata
    // and play before React hydrates and attaches handlers. Sync from the element instead.
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setIsLoaded(true);
    if (reduceMotion || saveData) {
      video.pause();
    } else if (!video.paused) {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (priority || shouldLoad || !videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  if (hasError && fallbackImage) {
    return (
      <div className={`relative ${className}`} style={style}>
        <Image src={fallbackImage} alt="" fill className="object-cover" priority={priority} sizes="100vw" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {!isLoaded && poster && (
        <Image src={poster} alt="" fill className="object-cover" priority={priority} sizes="100vw" />
      )}

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={muted}
        loop={loop}
        autoPlay={allowAutoplay && shouldLoad}
        playsInline={playsInline}
        controls={controls}
        preload={preload}
        aria-hidden={controls ? undefined : true}
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(error) => {
          setHasError(true);
          onError?.(error);
        }}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      >
        {shouldLoad && mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />}
        {shouldLoad && <source src={src} type="video/mp4" />}
        {captionSrc && <track kind="captions" src={captionSrc} srcLang="en" label={captionLabel} />}
      </video>

      {!controls && isLoaded && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
          className="absolute bottom-4 right-4 z-30 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9A625]"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
      )}
    </div>
  );
}
