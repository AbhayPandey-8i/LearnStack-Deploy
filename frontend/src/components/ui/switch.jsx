import { useState } from "react";

function Switch({ id, onCheckedChange }) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
    onCheckedChange?.(!checked);
  };

  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none
        ${checked ? "bg-black" : "bg-gray-300 dark:bg-zinc-600"}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200
          ${checked ? "translate-x-[18px]" : "translate-x-[2px]"}`}
      />
    </button>
  );
}

export { Switch };