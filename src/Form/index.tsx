import React, {ComponentProps} from "react";

export default function SiliconForm(props: ComponentProps<"form">) {

  /* DOM */
  return (
    <form
      {...props}
      onSubmit={props.onSubmit ?? ((e) => e.preventDefault())}
    />
  );
}
