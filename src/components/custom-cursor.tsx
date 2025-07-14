'use client';

import { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const followerPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isMounted) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      if (!isMounted) return;
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      if (!isMounted) return;
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      if (!isMounted) return;
      setIsVisible(false);
    };

    // Smooth follower animation
    const animateFollower = () => {
      if (!isMounted || !followerRef.current) return;

      const dx = mousePosition.x - followerPosition.current.x;
      const dy = mousePosition.y - followerPosition.current.y;
      
      followerPosition.current.x += dx * 0.15;
      followerPosition.current.y += dy * 0.15;

      followerRef.current.style.transform = `translate(${followerPosition.current.x - 16}px, ${followerPosition.current.y - 16}px)`;
      
      animationRef.current = requestAnimationFrame(animateFollower);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseOut);
    
    // Add hover events to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    const interactiveElements = addHoverListeners();
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animateFollower);

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      if (isMounted) {
        // Remove old listeners
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
        // Add new listeners
        addHoverListeners();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      isMounted = false;
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseOut);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      observer.disconnect();
    };
  }, [mousePosition.x, mousePosition.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out ${
          isHovering 
            ? 'scale-150 bg-brand-yellow shadow-yellow' 
            : 'bg-brand-blue'
        }`}
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Cursor Follower */}
      <div
        ref={followerRef}
        className={`fixed w-8 h-8 border rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out ${
          isHovering 
            ? 'scale-150 border-brand-yellow border-2' 
            : 'border-brand-blue border-1'
        }`}
        style={{
          opacity: 0.6,
        }}
      />
    </>
  );
}