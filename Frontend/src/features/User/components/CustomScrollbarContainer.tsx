import { ReactNode, useEffect, useRef } from 'react';

interface CustomScrollbarContainerProps {
  children: ReactNode;
  className?: string; // Add className prop
}

const CustomScrollbarContainer = ({ children, className }: CustomScrollbarContainerProps) => {
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollThumb = scrollThumbRef.current;

    if (!scrollContainer || !scrollThumb) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollableHeight = scrollHeight - clientHeight;
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbPosition = (scrollTop / scrollableHeight) * (clientHeight - thumbHeight);

      scrollThumb.style.height = `${thumbHeight}px`;
      scrollThumb.style.transform = `translateY(${thumbPosition}px)`;
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`custom-scrollbar-wrapper ${className}`}>
      <style>{`
        /* Apply to all scrollbars */
        .custom-scrollbar-wrapper {
          position: relative;
          overflow: hidden;
        }

        .custom-scrollbar-wrapper .overflow-auto {
          overflow: auto;
          scrollbar-width: none; /* Hide default scrollbar in Firefox */
          -ms-overflow-style: none; /* Hide default scrollbar in IE/Edge */
        }

        .custom-scrollbar-wrapper .overflow-auto::-webkit-scrollbar {
          display: none; /* Hide default scrollbar in Webkit browsers */
        }

        .custom-scrollbar-wrapper .scrollbar-thumb {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          background: #ec4899;
          border-radius: 8px; /* Rounded corners for the thumb */
          transition: height 0.2s ease;
        }
      `}</style>
      <div className="overflow-auto" ref={scrollContainerRef}>
        {children}
      </div>
      <div className="scrollbar-thumb" ref={scrollThumbRef} />
    </div>
  );
};

export default CustomScrollbarContainer;