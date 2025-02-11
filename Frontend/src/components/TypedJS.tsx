import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedJSProps {
  strings: string[];
  typeSpeed?: number;
  loop?: boolean;
}

const TypedJS: React.FC<TypedJSProps> = ({ strings, typeSpeed = 100, loop = false }) => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: strings,
      typeSpeed: typeSpeed,
      loop: loop,
      showCursor: false, // Hides blinking cursor if not looping
    });

    return () => typed.destroy();
  }, [strings, typeSpeed, loop]);

  return <span ref={el} />;
};

export default TypedJS;
