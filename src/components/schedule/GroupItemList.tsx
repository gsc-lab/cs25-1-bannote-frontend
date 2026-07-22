// src/components/schedule/GroupItemList.tsx
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { GroupItem, GroupData } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";
import { useGetList } from "react-admin";

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

  const handleBookmarkToggle = async (group_id: string, status: boolean) => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").user_code;
    console.log("clicked", group_id, status, userId);
    try {
      let res;
      if (status) {
        res = await fetch(`/api/group_member/${group_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
      } else {
        res = await fetch(`/api/group_member/${group_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
      }

      if (res.ok) {
        setGroups((prev) =>
          prev.map((g) =>
            g.id === group_id ? { ...g, bookmark: !status } : g,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              key={group.id}
              data={group}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
