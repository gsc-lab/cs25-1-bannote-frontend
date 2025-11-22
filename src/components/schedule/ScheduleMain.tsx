// src/schedule/ScheduleMain.tsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ScheduleAddGroupItem } from './ScheduleAddGroupItem'

export const ScheduleMain = () => {
  return (
    <Box
      sx={{
        // height: "100vh",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "#f0f2f5",
      }}
    >
        <ScheduleAddGroupItem />
        <Typography
            variant="h3"
            sx={{ color: "#172C66", fontWeight: "bold" }}
        >
            ハローワールド
        </Typography>
    </Box>
  );
};
