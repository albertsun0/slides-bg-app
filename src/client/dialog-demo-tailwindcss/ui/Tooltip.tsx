import { useState } from 'react';
type TooltipProps = {
  content: string;
};

function Tooltip({ content }: TooltipProps) {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <div
        className={`absolute text-sm bg-gray-100 text-gray-800 rounded-sm py-1 z-40 left-0 px-4 mx-4 ${
          hover ? 'block' : 'hidden'
        }`}
      >
        {content}
      </div>
      <div
        className="rounded-sm bg-red-50 w-4 h-4 cursor-pointer"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        i
      </div>
    </div>
  );
}

export default Tooltip;
