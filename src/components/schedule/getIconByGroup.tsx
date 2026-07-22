// src/components/schedule/getIconByGroup.ts
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import CoPresentIcon from "@mui/icons-material/CoPresent";

interface Tag {
  tag_id: string;
  name: string;
}

export const getIconByGroup = (tags: Tag[]) => {
  // タグ名だけを配列に
  const tagNames = tags.map((t) => t.name);

  // 授業／講義タグ
  if (tagNames.some(name => 
        name.includes("수업") || 
        name.includes("강의") ||
        name.includes("특강") || 
        name.includes("한국어") ||
        name.includes("일본어") ||
        name.includes("영어") ||
        name.includes("전공") 
      )) {
    return <CoPresentIcon />;
  }

  // 清掃関連タグ
  if (tagNames.some(name =>
        name.includes("청소") ||
        name.includes("미화") ||
        name.includes("정리") ||
        name.includes("서비스")
      )) {
    return <CleaningServicesIcon />;
  }

  // デフォルト
  return <CrueltyFreeIcon />;
};
