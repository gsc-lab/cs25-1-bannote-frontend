// src/schedule/ScheduleMain.tsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ScheduleAddGroupItem } from './ScheduleAddGroupItem';
import { MyCalendar } from "./MainCarendar";

export const ScheduleMain = () => {
  return (
    // <Box
    //   sx={{
    //     // Height: "50vh",
    //     display: "flex",
    //     gap: 3, // 左右の間隔
    //     p: 3, // ページ全体の余白
    //     backgroundColor: "#f5f6fa",
    //     boxSizing: "border-box",
    //   }}
    // >

    <MyCalendar />
  );
};
