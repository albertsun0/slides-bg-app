import React, { useState, useRef } from 'react';
import { lightTextOnColor } from '../assets/utils';

type AccordianProps = {
  color?: string;
  Children: React.ReactNode;
  title: string;
  collapseOnClick?: boolean;
  update?: string;
  contentHeight?: number;
};

function Accordion({
  title,
  color,
  Children,
  collapseOnClick,
  contentHeight,
}: AccordianProps) {
  const [expanded, setExapnded] = useState<boolean>(false);
  const content = useRef<HTMLDivElement>(null);
  if (contentHeight === undefined) {
    contentHeight = content.current?.scrollHeight;
  }
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
        onClick={() => {
          if (collapseOnClick) {
            setExapnded(false);
          }
        }}
        className={`overflow-hidden transition-all duration-500 ${
          expanded && 'border-b'
        }`}
        ref={content}
        style={
          expanded
            ? {
                height: contentHeight,
              }
            : { height: '0px' }
        }
      >
        {Children}
      </div>
    </div>
  );
}

export default Accordion;
