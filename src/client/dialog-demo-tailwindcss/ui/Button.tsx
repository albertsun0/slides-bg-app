type ButtonProps = {
  text: string;
  onClick: () => void;
};

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="bg-blue-100 rounded-md p-1 px-2 hover:bg-blue-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
