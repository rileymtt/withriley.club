import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller, FieldErrors, UseControllerProps } from "react-hook-form";

type Inputs = {
  base: string;
  quote: string;
  basePosition: number;
  quotePosition: number;
  qty: number;
  leverage: number;
  tp: number;
  sl: number;
  note: string;
  status: number;
  maxTpCount: number;
};

export default function AppTextField(
  props: UseControllerProps<Inputs> & {
    label: string;
    type: TextFieldProps["type"] | "select";
    options?: { value: any; label: any }[];
    errors?: FieldErrors;
    disabled?: boolean;
  }
) {
  const error = props.errors?.[props.name];

  if (props.type === "select") {
    return (
      <Controller
        {...props}
        render={({ field }) => (
          <FormControl fullWidth disabled={props.disabled}>
            <InputLabel>{props.label}</InputLabel>
            <Select {...field} label={props.label}>
              {props.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={Boolean(error)}>
              {error?.message?.toString()}
            </FormHelperText>
          </FormControl>
        )}
        defaultValue={""}
      />
    );
  }

  return (
    <Controller
      {...props}
      defaultValue={""}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            label={props.label}
            InputLabelProps={{
              shrink: Boolean(field.value) || field.value === 0,
            }}
            type={props.type}
            fullWidth
            disabled={props.disabled}
          />
          <FormHelperText error={Boolean(error)}>
            {error?.message?.toString()}
          </FormHelperText>
        </>
      )}
    />
  );
}
