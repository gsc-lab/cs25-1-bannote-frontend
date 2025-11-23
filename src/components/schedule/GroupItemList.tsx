// src/components/schedule/GroupItemList.tsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { GroupItem, GroupData } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";
import groupsJson from "./groupsDate.json";

const LOCAL_KEY = "bookmarked_groups";

export const GroupItemList: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 初期ロード：localStorage から bookmark 状態を反映
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as string[];
    const initialGroups = groupsJson.groupsData.map((g: GroupData) => ({
      ...g,
      bookmark: savedBookmarks.includes(g.group_id),
    }));
    setGroups(initialGroups);
  }, []);

  const handleBookmarkToggle = async (group_id: string) => {
    console.log("clicked", group_id);
    try {
      const res = await fetch("http://localhost:4000/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id }),
      });
      const result = await res.json();
      if (result.success) {
        setGroups((prev) =>
          prev.map((g) => (g.group_id === group_id ? { ...g, bookmark: result.group.bookmark } : g))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };


  const filteredGroups =
    selectedTags.length === 0
      ? groups
      : groups.filter((group) => group.tags.some((tag) => selectedTags.includes(tag.tag_id)));

  return (
    <Box sx={{ display: "flex", backgroundColor: "#fef6e4", height: "100vh", p: 2, gap: 2, overflow: "hidden" }}>
      {/* 左側フィルター */}
      <Box sx={{ flex: 1 }}>
        <ScheduleFilter onChange={setSelectedTags} />
      </Box>

      {/* 右側カード集合 */}
      <Box
        sx={{
          flex: 4.5,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          alignContent: "flex-start",
          height: "100%",
          overflowY: "auto",
          pr: 1,
        }}
      >
        {filteredGroups.map((group) => (
          <GroupItem key={group.group_id} data={group} onBookmarkToggle={handleBookmarkToggle} />
        ))}
      </Box>
    </Box>
  );
};
