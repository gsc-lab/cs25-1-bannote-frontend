// src/components/schedule/ScheduleAddGroupItem.tsx
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { groupsData } from "./groupsData";

export const ScheduleAddGroupItem = () => {
  const LOCAL_KEY = "bookmarked_groups";

  const [bookmarkedGroups, setBookmarkedGroups] = useState<number[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  // 🔹 localStorage からブックマークを読み込み
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    setBookmarkedGroups(parsed);
    setCheckedItems(parsed); // 初期状態は全てチェック

    // 🔥 他コンポーネントで localStorage が更新されたら反映
    const handleStorage = () => {
      const updated = localStorage.getItem(LOCAL_KEY);
      const parsedUpdated = updated ? JSON.parse(updated) : [];
      setBookmarkedGroups(parsedUpdated);
      setCheckedItems(parsedUpdated);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🔹 チェックボックス切り替え
  const toggleCheck = (id: number) => {
    setCheckedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id) // 外す
        : [...prev, id]                    // 追加
    );
  };

  // 🔹 ブックマークされたグループだけ表示
  const displayGroups = groupsData.filter(group =>
    bookmarkedGroups.includes(group.id)
  );

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
        {displayGroups.map((group) => (
          <Box
            key={group.id}
            sx={{
              maxWidth: 200,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 0.8,
              borderRadius: 2,
              border: "1px solid #d0d7e2",
              background: "#f7f9fc",
            }}
          >
            {/* チェックボックス */}
            <Checkbox
              size="small"
              checked={checkedItems.includes(group.id)}
              onChange={() => toggleCheck(group.id)}
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
