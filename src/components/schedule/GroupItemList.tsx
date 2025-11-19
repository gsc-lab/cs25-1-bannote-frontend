// src/components/schedule/GroupItemList.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { GroupItem } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";

const groupsData = [
  { id: 1, group_name: "정규수업", group_description: "정규 수업입니다.", color_default: "#2196F3", color_highlight: "#64B5F6", tags: [{ tag_id: "2", name: "특강" }, { tag_id: "3", name: "한국어" }, { tag_id: "4", name: "온라인" }] },
  { id: 2, group_name: "심화수업", group_description: "심화 수업입니다.", color_default: "#F44336", color_highlight: "#FFCDD2", tags: [{ tag_id: "5", name: "심화" }, { tag_id: "6", name: "한국어" }] },
  { id: 3, group_name: "특별강의", group_description: "특별 강의입니다.", color_default: "#4CAF50", color_highlight: "#C8E6C9", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 4, group_name: "온라인수업", group_description: "온라인 수업입니다.", color_default: "#FF9800", color_highlight: "#FFE0B2", tags: [{ tag_id: "4", name: "온라인" }] },
  { id: 5, group_name: "심화한국어", group_description: "한국어 집중수업", color_default: "#9C27B0", color_highlight: "#E1BEE7", tags: [{ tag_id: "6", name: "한국어" }, { tag_id: "5", name: "심화" }] },
  { id: 6, group_name: "특강일본어", group_description: "일본어 특강", color_default: "#00BCD4", color_highlight: "#B2EBF2", tags: [{ tag_id: "7", name: "특강" }, { tag_id: "10", name: "일본어" }] },
  { id: 7, group_name: "이벤트수업", group_description: "이벤트 수업입니다.", color_default: "#FF5722", color_highlight: "#FFCCBC", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 8, group_name: "기초수업", group_description: "기초 학습용 수업", color_default: "#3F51B5", color_highlight: "#C5CAE9", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 9, group_name: "심화일본어", group_description: "일본어 심화수업", color_default: "#E91E63", color_highlight: "#F8BBD0", tags: [{ tag_id: "6", name: "한국어" }, { tag_id: "10", name: "일본어" }] },
  { id: 10, group_name: "특강영어", group_description: "영어 특강 수업", color_default: "#009688", color_highlight: "#B2DFDB", tags: [{ tag_id: "7", name: "특강" }, { tag_id: "11", name: "영어" }] },
  { id: 11, group_name: "온라인이벤트", group_description: "온라인 이벤트 수업", color_default: "#FFEB3B", color_highlight: "#FFF9C4", tags: [{ tag_id: "4", name: "온라인" }, { tag_id: "8", name: "이벤트" }] },
  { id: 12, group_name: "중급수업", group_description: "중급 수준 수업", color_default: "#795548", color_highlight: "#D7CCC8", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 13, group_name: "기본특강", group_description: "기본 특강 수업", color_default: "#607D8B", color_highlight: "#CFD8DC", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 14, group_name: "심화영어", group_description: "영어 집중 수업", color_default: "#673AB7", color_highlight: "#D1C4E9", tags: [{ tag_id: "6", name: "한국어" }, { tag_id: "11", name: "영어" }] },
  { id: 15, group_name: "이벤트특강", group_description: "이벤트 특강 수업", color_default: "#FFC107", color_highlight: "#FFECB3", tags: [{ tag_id: "7", name: "특강" }, { tag_id: "8", name: "이벤트" }] },
  { id: 16, group_name: "온라인한국어", group_description: "온라인 한국어 수업", color_default: "#0097A7", color_highlight: "#B2EBF2", tags: [{ tag_id: "3", name: "한국어" }, { tag_id: "4", name: "온라인" }] },
  { id: 17, group_name: "심화특강", group_description: "심화 특강 수업", color_default: "#D32F2F", color_highlight: "#FFCDD2", tags: [{ tag_id: "5", name: "심화" }, { tag_id: "7", name: "특강" }] },
  { id: 18, group_name: "온라인이벤트영어", group_description: "온라인 이벤트 영어 수업", color_default: "#00ACC1", color_highlight: "#B2EBF2", tags: [{ tag_id: "4", name: "온라인" }, { tag_id: "8", name: "이벤트" }, { tag_id: "11", name: "영어" }] },
  { id: 19, group_name: "기초한국어", group_description: "기초 한국어 수업", color_default: "#8BC34A", color_highlight: "#DCEDC8", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 20, group_name: "중급일본어", group_description: "중급 일본어 수업", color_default: "#F06292", color_highlight: "#F8BBD0", tags: [{ tag_id: "10", name: "일본어" }] },
  { id: 21, group_name: "특별영어", group_description: "특별 영어 수업", color_default: "#FF6F00", color_highlight: "#FFE0B2", tags: [{ tag_id: "11", name: "영어" }] },
  { id: 22, group_name: "온라인심화", group_description: "온라인 심화 수업", color_default: "#009688", color_highlight: "#B2DFDB", tags: [{ tag_id: "4", name: "온라인" }, { tag_id: "5", name: "심화" }] },
  { id: 23, group_name: "기초특강", group_description: "기초 특강 수업", color_default: "#3F51B5", color_highlight: "#C5CAE9", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 24, group_name: "심화이벤트", group_description: "심화 이벤트 수업", color_default: "#E91E63", color_highlight: "#F8BBD0", tags: [{ tag_id: "5", name: "심화" }, { tag_id: "8", name: "이벤트" }] },
  { id: 25, group_name: "온라인특강", group_description: "온라인 특강 수업", color_default: "#00BCD4", color_highlight: "#B2EBF2", tags: [{ tag_id: "4", name: "온라인" }, { tag_id: "7", name: "특강" }] },
  { id: 26, group_name: "심화영어온라인", group_description: "심화 영어 온라인 수업", color_default: "#9C27B0", color_highlight: "#E1BEE7", tags: [{ tag_id: "5", name: "심화" }, { tag_id: "11", name: "영어" }, { tag_id: "4", name: "온라인" }] },
  { id: 27, group_name: "특강이벤트한국어", group_description: "특강 이벤트 한국어 수업", color_default: "#FF5722", color_highlight: "#FFCCBC", tags: [{ tag_id: "7", name: "특강" }, { tag_id: "8", name: "이벤트" }, { tag_id: "3", name: "한국어" }] },
  { id: 28, group_name: "기초온라인", group_description: "기초 온라인 수업", color_default: "#607D8B", color_highlight: "#CFD8DC", tags: [{ tag_id: "3", name: "한국어" }, { tag_id: "4", name: "온라인" }] },
  { id: 29, group_name: "중급심화", group_description: "중급 심화 수업", color_default: "#795548", color_highlight: "#D7CCC8", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 30, group_name: "특별온라인", group_description: "특별 온라인 수업", color_default: "#FF9800", color_highlight: "#FFE0B2", tags: [{ tag_id: "4", name: "온라인" }] },
  { id: 31, group_name: "이벤트특별", group_description: "이벤트 특별 수업", color_default: "#F44336", color_highlight: "#FFCDD2", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 32, group_name: "온라인일본어", group_description: "온라인 일본어 수업", color_default: "#00BCD4", color_highlight: "#B2EBF2", tags: [{ tag_id: "10", name: "일본어" }, { tag_id: "4", name: "온라인" }] },
  { id: 33, group_name: "심화특강일본어", group_description: "심화 특강 일본어 수업", color_default: "#9C27B0", color_highlight: "#E1BEE7", tags: [{ tag_id: "5", name: "심화" }, { tag_id: "7", name: "특강" }, { tag_id: "10", name: "일본어" }] },
  { id: 34, group_name: "기초특강영어", group_description: "기초 특강 영어 수업", color_default: "#4CAF50", color_highlight: "#C8E6C9", tags: [{ tag_id: "7", name: "특강" }, { tag_id: "11", name: "영어" }] },
  { id: 35, group_name: "이벤트온라인특강", group_description: "이벤트 온라인 특강 수업", color_default: "#FF5722", color_highlight: "#FFCCBC", tags: [{ tag_id: "8", name: "이벤트" }, { tag_id: "4", name: "온라인" }, { tag_id: "7", name: "특강" }] },

];

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
