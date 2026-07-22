import { Avatar } from "@mui/material";
import { useRecordContext } from "react-admin";

const AvatarField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <Avatar src={record[source]} />;
};

export default AvatarField;
