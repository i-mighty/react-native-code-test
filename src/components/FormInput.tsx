import { InputProps, Input } from "@ui-kitten/components";
import React, { FC } from "react";
import { Control, useController } from "react-hook-form";

interface FormInputProps extends InputProps{
  name: `${string}`;
  control: Control;
}

const FormInput: FC<FormInputProps> = ({ control, name, ...props }) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name
  })
  

  return(
    <Input
      {...props}
      value={field.value}
      onChangeText={field.onChange}
    />
  )
}

export default FormInput;