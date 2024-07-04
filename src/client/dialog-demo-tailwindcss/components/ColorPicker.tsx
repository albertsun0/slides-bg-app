import { colorSchemes } from '../assets/colors';

type ColorPickerProps = {
  setColor: (index: number) => void;
  selectedColor: number;
};

function ColorPicker({ setColor, selectedColor }: ColorPickerProps) {
  return (
    <div className="flex flex-col">
      {colorSchemes.map((color, i) => {
        return (
          <div
            onClick={() => setColor(i)}
            className={`${
              selectedColor === i ? 'bg-blue-100' : 'hover:bg-gray-100'
            } cursor-pointer flex flex-col p-2 rounded-sm`}
          >
            <div>{color.name}</div>
            <div className="flex flex-row space-x-1">
              {color.colors.map((c) => {
                return (
                  <div
                    className={`w-5 h-5 rounded-sm`}
                    style={{ backgroundColor: c }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ColorPicker;
