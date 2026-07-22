// src/components/common/ColorInput.tsx
import { useInput, InputProps } from "react-admin";
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { useState } from "react";

interface ColorInputProps extends Omit<InputProps, 'source'> {
  source: string;
  label?: string;
  helperText?: string;
}

export const ColorInput = ({ source, label, helperText, ...rest }: ColorInputProps) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useInput({ source, ...rest });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl fullWidth error={invalid}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: error ? "error.main" : "text.secondary",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1.5,
          border: 1,
          borderColor: error
            ? "error.main"
            : isFocused
            ? "primary.main"
            : "divider",
          borderRadius: 1,
          transition: "all 0.2s",
          backgroundColor: "background.paper",
          "&:hover": {
            borderColor: error ? "error.main" : "primary.main",
          },
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
            backgroundColor: field.value || "#000000",
            flexShrink: 0,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
          }}
        />
        <input
          {...field}
          type="color"
          value={field.value || "#000000"}
          onChange={(e) => field.onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            field.onBlur();
            setIsFocused(false);
          }}
          style={{
            width: "100%",
            height: 40,
            border: "none",
            cursor: "pointer",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            color: "text.secondary",
            minWidth: 80,
            textAlign: "right",
          }}
        >
          {field.value?.toUpperCase() || "#000000"}
        </Typography>
      </Box>
      {(error?.message || helperText) && (
        <FormHelperText error={invalid}>
          {error?.message || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
