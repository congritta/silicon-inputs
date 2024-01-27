import React, {ComponentProps} from "react";

import "./index.css";

export default function SiliconButton(props: ComponentProps<"button"> & {}) {

  /* DOM */
  return (
    <button
      {...props}
      className={`silicon-button ${props.className ?? ""}`}
    />
  );
}
