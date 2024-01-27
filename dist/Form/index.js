import React from "react";
export default function SiliconForm(props) {
    /* DOM */
    return (React.createElement("form", { ...props, onSubmit: props.onSubmit ?? ((e) => e.preventDefault()) }));
}
//# sourceMappingURL=index.js.map