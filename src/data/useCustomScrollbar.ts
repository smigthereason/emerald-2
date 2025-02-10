// // useCustomScrollbar.ts
// import { useEffect, useRef } from 'react';

// const useCustomScrollbar = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const scrollTrack = document.createElement('div');
//     scrollTrack.className = 'custom-scrollbar-track';

//     const scrollThumb = document.createElement('div');
//     scrollThumb.className = 'custom-scrollbar-thumb';

//     scrollTrack.appendChild(scrollThumb);
//     container.appendChild(scrollTrack);

//     const updateScrollThumb = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       const scrollableHeight = scrollHeight - clientHeight;
//       const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
//       const thumbPosition = (scrollTop / scrollableHeight) * (clientHeight - thumbHeight);

//       scrollThumb.style.height = `${thumbHeight}px`;
//       scrollThumb.style.transform = `translateY(${thumbPosition}px)`;
//     };

//     container.addEventListener('scroll', updateScrollThumb);
//     window.addEventListener('resize', updateScrollThumb);
//     updateScrollThumb(); // Initialize scrollbar thumb height

//     return () => {
//       container.removeEventListener('scroll', updateScrollThumb);
//       window.removeEventListener('resize', updateScrollThumb);
//     };
//   }, []);

//   return containerRef;
// };

// export default useCustomScrollbar;

import { useEffect, useRef } from "react";

const useCustomScrollbar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollThumb = thumbRef.current;
    if (!container || !scrollThumb) return;

    const updateScrollThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollableHeight = scrollHeight - clientHeight;
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbPosition = (scrollTop / scrollableHeight) * (clientHeight - thumbHeight);

      scrollThumb.style.height = `${thumbHeight}px`;
      scrollThumb.style.transform = `translateY(${thumbPosition}px)`;
    };

    container.addEventListener("scroll", updateScrollThumb);
    window.addEventListener("resize", updateScrollThumb);
    updateScrollThumb(); // Initialize scrollbar thumb height

    return () => {
      container.removeEventListener("scroll", updateScrollThumb);
      window.removeEventListener("resize", updateScrollThumb);
    };
  }, []);

  return { containerRef, thumbRef };
};

export default useCustomScrollbar;
