import { useState, useRef, useEffect } from "react";
import css from "./CustomDropdown.module.css";

interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface Props<T> {
  label: string;
  options: Option<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  width?: string;
}

export default function CustomDropdown<T>({
  label,
  options,
  selectedValue,
  onChange,
  width = "200px",
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={css.dropdownContainer} style={{ width }} ref={dropdownRef}>
      <p className={css.label}>{label}</p>

      <button
        type="button"
        className={css.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={css.value}>{currentOption?.label || "All"}</span>
        <svg className={`${css.icon} ${isOpen ? css.iconOpen : ""}`}>
          <use href="/chevron-down.svg" />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.menu}>
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={`
                ${css.item} 
                ${selectedValue === option.value ? css.itemSelected : ""} 
                ${option.disabled ? css.itemDisabled : ""}
              `}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
