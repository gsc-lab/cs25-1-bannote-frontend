// src/components/schedule/GroupItemList.tsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { GroupItem, GroupData } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";
import groupsJson from "./groupsDate.json";
import { useGetList } from "react-admin";

const LOCAL_KEY = "bookmarked_groups";

export const GroupItemList: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // useGetList를 통해 데이터 호출 (filter 변경 시 자동으로 재요청)
  const { data, isLoading } = useGetList("schedule-groups", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "group_name", order: "ASC" },
    filter: selectedTags.length > 0 ? { tag_names: selectedTags } : {},
  });

  useEffect(() => {
    if (data) {
      setGroups(data);
    }
  }, [data]);

  const handleBookmarkToggle = (group_id: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.group_id === group_id ? { ...g, bookmark: !g.bookmark } : g,
      ),
    );

    const savedBookmarks = JSON.parse(
      localStorage.getItem(LOCAL_KEY) || "[]",
    ) as string[];
    const updated = savedBookmarks.includes(group_id)
      ? savedBookmarks.filter((id) => id !== group_id)
      : [...savedBookmarks, group_id];

    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
  };

  // const handleBookmarkToggle = async (group_id: string) => {
  //   console.log("clicked", group_id);
  //   try {
  //     const res = await fetch("http://localhost:4000/bookmark", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ group_id }),
  //     });
  //     const result = await res.json();
  //     if (result.success) {
  //       setGroups((prev) =>
  //         prev.map((g) => (g.group_id === group_id ? { ...g, bookmark: result.group.bookmark } : g))
  //       );
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fef6e4",
        height: "100vh",
        p: 2,
        gap: 2,
        overflow: "hidden",
      }}
    >
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
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          groups.map((group) => (
            <GroupItem
              key={group.group_id}
              data={group}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
