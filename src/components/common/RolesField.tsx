import { Chip, Box } from "@mui/material";
import { useRecordContext } from "react-admin";

interface RolesFieldProps {
  source: string;
}

const RolesField = ({ source }: RolesFieldProps) => {
  const record = useRecordContext();

  if (!record || !record[source]) {
    return null;
  }

  const roles = Array.isArray(record[source])
    ? record[source]
    : record[source].split(",").map((role: string) => role.trim());

  return (
    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
      {roles.map((role: string, index: number) => (
        <Chip
          key={index}
          label={role}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default RolesField;
