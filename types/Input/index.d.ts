import React, {ComponentProps} from "react";
import "./index.css";

export default function SiliconInput(props: ComponentProps<"input"> & {
  type: "text" | "password" | "date";
}): React.JSX.Element;
