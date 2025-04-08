type ButtonProps = {
  text: string;
  onClick: () => void;
};

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-md border text-sm p-1 px-2 hover:bg-blue-100 transition-all duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
