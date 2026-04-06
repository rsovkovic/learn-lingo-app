import { type StylesConfig } from "react-select";

// Описуємо структуру опції
export interface SelectOption {
  value: string;
  label: string;
}

// Кастомні стилі для react-select (відповідають макету)
export const customStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "14px",
    height: "48px",
    minHeight: "48px",
    boxShadow: "none",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 18px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#121417",
    fontWeight: "500",
    fontSize: "18px",
  }),
  singleValue: (base) => ({
    ...base,
    fontWeight: "500",
    fontSize: "18px",
    color: "#121417",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "14px",
    padding: "14px 18px",
    marginTop: "4px",
    boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(18, 20, 23, 0.05)",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: "transparent",
    color: isSelected || isFocused ? "#121417" : "rgba(18, 20, 23, 0.2)",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    padding: "4px 0",
    transition: "color 0.2s ease",
    ":active": { backgroundColor: "transparent" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#121417",
    padding: "0 14px",
  }),
};
