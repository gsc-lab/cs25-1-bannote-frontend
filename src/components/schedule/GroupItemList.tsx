// src/components/schedule/GroupItemList.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { GroupItem } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";
import { groupsData } from "./groupsData";


export const GroupItemList = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredGroups = selectedTags.length === 0
    ? groupsData
    : groupsData.filter(group =>
        group.tags.some(tag => selectedTags.includes(tag.tag_id))
      );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fef6e4",
        height: "100vh", // ページ全体高さ固定
        p: 2,
        gap: 2,
        overflow: "hidden", // ページ全体はスクロールしない
      }}
    >
      {/* 左側フィルター */}
      <Box sx={{ flex: 1 }}>
        <ScheduleFilter onChange={setSelectedTags} />
      </Box>

      {/* 右側カードの集合 */}
      <Box
        sx={{
          flex: 4.5,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          alignContent: "flex-start",
          height: "100%",       // 親 Box 高さに合わせる
          overflowY: "auto",    // Y軸スクロール
          pr: 1,                // スクロールバー対策の右padding
        }}
      >
        {filteredGroups.map(group => (
          <GroupItem key={group.id} data={group} />
        ))}
      </Box>
    </Box>
  );
};
