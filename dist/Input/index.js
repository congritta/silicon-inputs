import React from "react";
import './index.css';
export default function SiliconInput(props) {
    /* DOM */
    return (React.createElement("input", { ...props, className: `silicon-input ${props.className ?? ''}` }));
}
//# sourceMappingURL=index.js.map