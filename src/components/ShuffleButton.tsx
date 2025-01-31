import React from "react";

type ShuffleButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className="mt-4 rounded bg-blue-500 p-2 text-white disabled:bg-gray-400"
      onClick={onClick}
      disabled={disabled}
    >
      Shuffle
    </button>
  );
};

export default ShuffleButton;
