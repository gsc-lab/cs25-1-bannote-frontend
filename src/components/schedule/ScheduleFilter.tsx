// src/components/schedule/ScheduleFillter.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Filter3Icon from '@mui/icons-material/Filter3';
import SellIcon from '@mui/icons-material/Sell';
import SchoolIcon from '@mui/icons-material/School';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

interface ScheduleFilterProps {
  onChange: (selectedTags: string[]) => void;
}

export const ScheduleFilter: React.FC<ScheduleFilterProps> = ({ onChange }) => {
  const tagGroups = [
    { title: "학년", icon: <Filter3Icon sx={{ color: "#172C66" }} />, tags: [
        { tag_id: "1", name: "1학년", icon: <SellIcon /> },
        { tag_id: "2", name: "2학년", icon: <SellIcon /> },
        { tag_id: "3", name: "3학년", icon: <SellIcon /> },
      ]},
    { title: "학과", icon: <SchoolIcon sx={{ color: "#172C66" }} />, tags: [
        { tag_id: "4", name: "글로벌시스템융합과", icon: <SellIcon /> },
        { tag_id: "5", name: "오늘은뭐할과", icon: <SellIcon /> },
      ]},
    { title: "수업", icon: <CoPresentIcon sx={{ color: "#172C66" }} />, tags: [
        { tag_id: "6", name: "특강", icon: <SellIcon /> },
        { tag_id: "7", name: "정규", icon: <SellIcon /> },
        { tag_id: "8", name: "이벤트", icon: <SellIcon /> },
        { tag_id: "9", name: "한국어", icon: <SellIcon /> },
        { tag_id: "10", name: "일본어", icon: <SellIcon /> },
        { tag_id: "11", name: "전공", icon: <SellIcon /> },
      ]},
    { title: "서비스", icon: <CleaningServicesIcon sx={{ color: "#172C66" }} />, tags: [
        { tag_id: "12", name: "청소", icon: <SellIcon /> },
        { tag_id: "13", name: "스터디룸", icon: <SellIcon /> },
      ]},
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      const newSelected = prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId];
      onChange(newSelected);
      return newSelected;
    });
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        border: "0.5px solid #172c66",
        background: "linear-gradient(180deg, #ffffff, #f6f6f9)",
        height: "92vh",
        width: "360px",
        p: 4,
        overflowY: "auto",
        boxShadow: "0 6px 18px rgba(23,44,102,0.12)",
      }}
    >
      <Typography
        sx={{
          mb: 3,
          fontWeight: 800,
          fontSize: 18,
          color: "#172C66",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <SellIcon sx={{mr:1}}/> 검색
      </Typography>

      {tagGroups.map(group => (
        <Box key={group.title} sx={{ mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {group.icon}
            <Typography
              sx={{
                ml: 1,
                fontWeight: 700,
                fontSize: 15,
                color: "#172C66",
              }}
            >
              {group.title}
            </Typography>
            <Box sx={{ flex: 1, height: 1, backgroundColor: "#e0e3f0", ml: 1, borderRadius: 0.5 }} />
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {group.tags.map(tag => {
              const selected = selectedTags.includes(tag.tag_id);
              return (
                <Chip
                  key={tag.tag_id}
                  icon={React.cloneElement(tag.icon, { sx: { fontSize: 18, color: selected ? "#fff" : "#172C66" } })}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                  onClick={() => toggleTag(tag.tag_id)}
                  sx={{
                    borderRadius: 2,
                    fontSize: 13,
                    height: 30,
                    pl: 0.8,
                    cursor: "pointer",
                    borderColor: "#172C66",
                    color: selected ? "#fff" : "#172C66",
                    backgroundColor: selected ? "#172C66" : "#fff",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#172C66",
                      color: "#fff",
                      "& .MuiChip-icon": { color: "#fff" },
                      transform: "scale(1.05)",
                    },
                    "& .MuiChip-icon": {
                      color: selected ? "#fff !important" : "#172C66 !important",
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
