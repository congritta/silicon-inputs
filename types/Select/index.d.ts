import React, {ReactNode} from "react";
import "./index.css";

type Option = {
  value: string;
  element: ReactNode;
};
export default function Select(props: {
  transitionDuration?: number;
  optionHeight?: number;
  gapBetweenSelectedOptionAndList?: number;
  value: string;
  options: Option[];
  onChange(value: string): void;
  wrapperClassName?: string;
  selectedOptionClassName?: string;
  optionsListClassName?: string;
  optionClassName?: string;
  notchIcon?: ReactNode;
}): React.JSX.Element;
export {};
