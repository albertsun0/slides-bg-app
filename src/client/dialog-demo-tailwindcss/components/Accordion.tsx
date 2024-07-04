import React, { useState, useRef } from 'react';
import { lightTextOnColor } from '../assets/utils';

type AccordianProps = {
  color?: string;
  Children: React.ReactNode;
  title: string;
};

function Accordion({ title, color, Children }: AccordianProps) {
  const [expanded, setExapnded] = useState<boolean>(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        className={`p-4 w-full bg-gray-100 flex flex-row space-x-2 border-b cursor-pointer ${
          color && lightTextOnColor(color) ? 'text-white' : 'text-black'
        }`}
        onClick={() => setExapnded(!expanded)}
        style={{ backgroundColor: color }}
      >
        <div className="w-4">{expanded ? '-' : '+'}</div>
        <div>{title}</div>
      </div>
      <div
        onClick={() => setExapnded(false)}
        className={`overflow-hidden transition-all duration-500 ${
          expanded && 'border-b'
        }`}
        ref={contentHeight}
        style={
          expanded
            ? { height: contentHeight.current?.scrollHeight }
            : { height: '0px' }
        }
      >
        {Children}
      </div>
    </div>
  );
}

export default Accordion;
