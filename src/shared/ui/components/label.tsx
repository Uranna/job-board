import React, { FC, PropsWithChildren } from "react";
import { Input, InputProps } from "../primitives/input";

type LabelProps = PropsWithChildren & {
  label: string;
  error?: string;
  inputProps: InputProps;
};

export const Label: FC<LabelProps> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <label>
        <p  className="text-sm font-medium text-gray-400 mb-2">{props.label}</p>
        <Input 
          {...props.inputProps} 
          className={`${props.inputProps?.className || ''}`}
        />
      </label>
      {props.error && (
        <p className="text-sm ml-3 text-red-500">{props.error}</p>
      )}
    </div>
  );
};