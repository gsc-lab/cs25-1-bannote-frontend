// src/schedule/ScheduleMain.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { MyCalendar } from "./MainCalendar";
import { BookMarks } from "./BookMarks";

export const ScheduleMain = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "null")?.user_code;
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  const handleSelectedGroupsChange = (groupIds: string[]) => {
    setSelectedGroupIds(groupIds);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        minHeight: "95vh",
        maxHeight: "96vh",
        p: 3,
        background: "linear-gradient(135deg, #fef6e4 0%, #fef6e4 100%)",
      }}
    >
      {/* 왼쪽 북마크 사이드바 */}
      <BookMarks
        userId={userId}
        onSelectedGroupsChange={handleSelectedGroupsChange}
      />

      {/* 메인 캘린더 */}
      <MyCalendar selectedGroupIds={selectedGroupIds} />
    </Box>
  );
};
