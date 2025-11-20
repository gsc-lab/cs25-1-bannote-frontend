// src/components/schedule/GroupItemList.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { GroupItem } from "./GroupItem";
import { ScheduleFilter } from "./ScheduleFilter";
import { getIconByGroup } from "./getIconByGroup";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import CoPresentIcon from "@mui/icons-material/CoPresent";



// const getIconByGroup = (group_name: string) => {
//   if (group_name.includes("수업") || group_name.includes("강의")) {
//     return <CoPresentIcon />;
//   }
//   if (group_name.includes("청소") || group_name.includes("서비스")) {
//     return <CleaningServicesIcon />;
//   }
//   return <CrueltyFreeIcon />;
// };


const groupsData = [
  { id: 1,  group_name: "정규수업", group_description: "정규 수업입니다.", color_default: "#2196F3", color_highlight: "#64B5F6", tags: [{ tag_id: "2", name: "특강" }] },
  { id: 2,  group_name: "심화수업", group_description: "심화 수업입니다.", color_default: "#F44336", color_highlight: "#FFCDD2", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 3,  group_name: "특별강의", group_description: "특별 강의입니다.", color_default: "#4CAF50", color_highlight: "#C8E6C9", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 4,  group_name: "온라인수업", group_description: "온라인 수업입니다.", color_default: "#FF9800", color_highlight: "#FFE0B2", tags: [{ tag_id: "4", name: "온라인" }] },
  { id: 5,  group_name: "심화한국어", group_description: "한국어 집중수업", color_default: "#9C27B0", color_highlight: "#E1BEE7", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 6,  group_name: "특강일본어", group_description: "일본어 특강", color_default: "#00BCD4", color_highlight: "#B2EBF2", tags: [{ tag_id: "10", name: "일본어" }] },
  { id: 7,  group_name: "이벤트수업", group_description: "이벤트 수업입니다.", color_default: "#FF5722", color_highlight: "#FFCCBC", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 8,  group_name: "기초수업", group_description: "기초 학습용 수업", color_default: "#3F51B5", color_highlight: "#C5CAE9", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 9,  group_name: "심화일본어", group_description: "일본어 심화수업", color_default: "#E91E63", color_highlight: "#F8BBD0", tags: [{ tag_id: "10", name: "일본어" }] },
  { id: 10, group_name: "특강영어", group_description: "영어 특강 수업", color_default: "#009688", color_highlight: "#B2DFDB", tags: [{ tag_id: "11", name: "영어" }] },
  { id: 11, group_name: "온라인이벤트", group_description: "온라인 이벤트 수업", color_default: "#FFEB3B", color_highlight: "#FFF9C4", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 12, group_name: "중급수업", group_description: "중급 수준 수업", color_default: "#795548", color_highlight: "#D7CCC8", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 13, group_name: "기본특강", group_description: "기본 특강 수업", color_default: "#607D8B", color_highlight: "#CFD8DC", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 14, group_name: "심화영어", group_description: "영어 집중 수업", color_default: "#673AB7", color_highlight: "#D1C4E9", tags: [{ tag_id: "11", name: "영어" }] },
  { id: 15, group_name: "이벤트특강", group_description: "이벤트 특강 수업", color_default: "#FFC107", color_highlight: "#FFECB3", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 16, group_name: "온라인한국어", group_description: "온라인 한국어 수업", color_default: "#0097A7", color_highlight: "#B2EBF2", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 17, group_name: "심화특강", group_description: "심화 특강 수업", color_default: "#D32F2F", color_highlight: "#FFCDD2", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 18, group_name: "온라인영어수업", group_description: "온라인 영어수업", color_default: "#00ACC1", color_highlight: "#B2EBF2", tags: [{ tag_id: "11", name: "영어" }] },
  { id: 19, group_name: "기초한국어", group_description: "기초 한국어 수업", color_default: "#8BC34A", color_highlight: "#DCEDC8", tags: [{ tag_id: "3", name: "한국어" }] },
  { id: 20, group_name: "중급일본어", group_description: "중급 일본어 수업", color_default: "#F06292", color_highlight: "#F8BBD0", tags: [{ tag_id: "10", name: "일본어" }] },
  { id: 21, group_name: "특별영어", group_description: "특별 영어 수업", color_default: "#FF6F00", color_highlight: "#FFE0B2", tags: [{ tag_id: "11", name: "영어" }] },
  { id: 22, group_name: "온라인심화", group_description: "온라인 심화 수업", color_default: "#009688", color_highlight: "#B2DFDB", tags: [{ tag_id: "5", name: "심화" }] },
  { id: 23, group_name: "기초특강", group_description: "기초 특강 수업", color_default: "#3F51B5", color_highlight: "#C5CAE9", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 24, group_name: "심화이벤트", group_description: "심화 이벤트 수업", color_default: "#E91E63", color_highlight: "#F8BBD0", tags: [{ tag_id: "8", name: "이벤트" }] },
  { id: 25, group_name: "온라인특강", group_description: "온라인 특강 수업", color_default: "#00BCD4", color_highlight: "#B2EBF2", tags: [{ tag_id: "7", name: "특강" }] },
  { id: 26, group_name: "청소서비스", group_description: "방 청소 및 정리 서비스", color_default: "#A5D6A7", color_highlight: "#C8E6C9", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 27, group_name: "사무실청소", group_description: "사무실 청소 지원", color_default: "#81C784", color_highlight: "#C8E6C9", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 28, group_name: "빨래대행", group_description: "세탁 및 건조 서비스", color_default: "#4DD0E1", color_highlight: "#B2EBF2", tags: [{ tag_id: "21", name: "세탁" }] },
  { id: 29, group_name: "이사청소", group_description: "입주 전 청소 서비스", color_default: "#26A69A", color_highlight: "#B2DFDB", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 30, group_name: "정원관리", group_description: "정원 정리/관리 서비스", color_default: "#66BB6A", color_highlight: "#C8E6C9", tags: [{ tag_id: "22", name: "정원" }] },
  { id: 31, group_name: "애완동물케어", group_description: "반려동물 케어 서비스", color_default: "#FF8A65", color_highlight: "#FFCCBC", tags: [{ tag_id: "23", name: "동물" }] },
  { id: 32, group_name: "가전수리", group_description: "가전제품 수리 서비스", color_default: "#90A4AE", color_highlight: "#CFD8DC", tags: [{ tag_id: "24", name: "수리" }] },
  { id: 33, group_name: "집보기대행", group_description: "집 확인 및 관리 서비스", color_default: "#BCAAA4", color_highlight: "#D7CCC8", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 34, group_name: "퇴실청소", group_description: "퇴실시 필요한 청소", color_default: "#FFAB91", color_highlight: "#FFCCBC", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 35, group_name: "프리미엄청소", group_description: "고급 청소 서비스", color_default: "#EF9A9A", color_highlight: "#FFCDD2", tags: [{ tag_id: "20", name: "서비스" }] },
  { id: 36, group_name: "자연보호모임", group_description: "환경 보호 활동 그룹", color_default: "#AED581", color_highlight: "#DCEDC8", tags: [{ tag_id: "30", name: "환경" }] },
  { id: 37, group_name: "동물사랑회", group_description: "동물 보호 활동", color_default: "#FFCC80", color_highlight: "#FFE0B2", tags: [{ tag_id: "23", name: "동물" }] },
  { id: 38, group_name: "헬스커뮤니티", group_description: "헬스 운동 모임", color_default: "#80CBC4", color_highlight: "#B2DFDB", tags: [{ tag_id: "31", name: "운동" }] },
  { id: 39, group_name: "미식회", group_description: "맛집 탐방 모임", color_default: "#CE93D8", color_highlight: "#E1BEE7", tags: [{ tag_id: "32", name: "음식" }] },
  { id: 40, group_name: "취미공유회", group_description: "취미 공유 커뮤니티", color_default: "#B39DDB", color_highlight: "#D1C4E9", tags: [{ tag_id: "33", name: "취미" }] },
];

// {getIconByGroup(data.group_name)}


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
