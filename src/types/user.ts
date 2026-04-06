type Mode = "login" | "register";

export type Props = {
  mode: Mode;
  onClose: () => void;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
};
