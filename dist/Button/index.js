import React from "react";
import './index.css';
export default function SiliconButton(props) {
    /* DOM */
    return (React.createElement("button", { ...props, className: `silicon-button ${props.className ?? ''}` }));
}
//# sourceMappingURL=index.js.map