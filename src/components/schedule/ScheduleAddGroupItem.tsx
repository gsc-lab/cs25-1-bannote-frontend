// src/components/schedule/ScheduleAddGroupItem.tsx
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { groupsData } from "./groupsData";

export const ScheduleAddGroupItem = () => {
  const LOCAL_KEY = "bookmarked_groups";

  const [groups, setGroups] = useState(groupsData); // groupsData を状態化

  // 🔹 localStorage からブックマークを読み込み
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    const parsed: number[] = saved ? JSON.parse(saved) : [];

    // groupsData に bookmark を反映
    const updatedGroups = groupsData.map(g => ({
      ...g,
      bookmark: parsed.includes(g.group_id)
    }));
    setGroups(updatedGroups);
  }, []);

  // 🔹 ブックマーク切り替え
  const toggleBookmark = (id: string) => {
    const updatedGroups = groups.map(g =>
      g.group_id === id ? { ...g, bookmark: !g.bookmark } : g
    );
    setGroups(updatedGroups);

    // localStorage も更新
    const bookmarkedIds = updatedGroups
      .filter(g => g.bookmark)
      .map(g => g.group_id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(bookmarkedIds));
  };

  // 🔹 ブックマークされたグループだけ表示
  const displayGroups = groups.filter(g => g.bookmark);

  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
        ブックマークしたグループ
      </Typography>

      {displayGroups.length === 0 && (
        <Typography sx={{ color: "#777" }}>
          ブックマークしたグループはありません。
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {groups.map(group => (
          <Box
            key={group.group_id}
            sx={{
              maxWidth: 200,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 0.8,
              borderRadius: 2,
              border: "1px solid #d0d7e2",
              background: group.bookmark ? "#eaf0ff" : "#f7f9fc",
            }}
            onClick={() => toggleBookmark(group.group_id)} // クリックで切替
          >
            {/* チェックボックス */}
            <Checkbox
              size="small"
              checked={group.bookmark}
              onChange={() => toggleBookmark(group.group_id)}
            />

            {/* 色 */}
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: group.color_default,
                border: "1px solid #aaa",
              }}
            />

            {/* 名前 */}
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              {group.group_name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
