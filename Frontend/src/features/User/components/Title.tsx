import React from "react";

interface TitleProps {
  mainText: string;
  highlightText?: string;
}

const Title: React.FC<TitleProps> = ({ mainText, highlightText }) => {
  return (
    <div>
      <h2 className="text-2xl font-light mb-4">
        {highlightText && <span className="text-gray-800 font-bold">{highlightText} </span>}
        {mainText}
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 border-black w-16"></div>
      </div>
    </div>
  );
};

export default Title;
