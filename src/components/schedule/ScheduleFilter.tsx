// src/components/schedule/ScheduleFillter.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Filter3Icon from "@mui/icons-material/Filter3";
import SellIcon from "@mui/icons-material/Sell";
import SchoolIcon from "@mui/icons-material/School";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import tagListJson from "./tagList.json";

interface ScheduleFilterProps {
  onChange: (selectedTags: string[]) => void;
}

export const ScheduleFilter: React.FC<ScheduleFilterProps> = ({ onChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 🔹 JSONからタグ情報をカテゴリ別に整理
  const tagGroups = [
    {
      title: "학년",
      icon: <Filter3Icon sx={{ color: "#172C66" }} />,
      tags: tagListJson.tag_list_response.tags
        .filter((t) => ["1", "2", "3"].includes(t.tag_id))
        .map((t) => ({ ...t, icon: <SellIcon /> })),
    },
    {
      title: "학과",
      icon: <SchoolIcon sx={{ color: "#172C66" }} />,
      tags: tagListJson.tag_list_response.tags
        .filter((t) => ["4", "5"].includes(t.tag_id))
        .map((t) => ({ ...t, icon: <SellIcon /> })),
    },
    {
      title: "수업",
      icon: <CoPresentIcon sx={{ color: "#172C66" }} />,
      tags: tagListJson.tag_list_response.tags
        .filter((t) => ["6", "7", "8", "9", "10", "11"].includes(t.tag_id))
        .map((t) => ({ ...t, icon: <SellIcon /> })),
    },
    {
      title: "서비스",
      icon: <CleaningServicesIcon sx={{ color: "#172C66" }} />,
      tags: tagListJson.tag_list_response.tags
        .filter((t) => ["12", "13"].includes(t.tag_id))
        .map((t) => ({ ...t, icon: <SellIcon /> })),
    },
  ];

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) => {
      const newSelected = prev.includes(tagName)
        ? prev.filter((name) => name !== tagName)
        : [...prev, tagName];
      onChange(newSelected);
      return newSelected;
    });
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        border: "0.5px solid #c8d2f3ff",
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
          fontWeight: 700,
          fontSize: 18,
          color: "#172c66",
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SellIcon sx={{ fontSize: 22 }} />
        즐겨찾기
      </Typography>
      <Box
        sx={{ width: "100%", height: 2, backgroundColor: "#dee3f5", mb: 5 }}
      />

      {tagGroups.map((group) => (
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
            <Box
              sx={{
                flex: 1,
                height: 1,
                backgroundColor: "#e0e3f0",
                ml: 1,
                borderRadius: 0.5,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {group.tags.map((tag) => {
              const selected = selectedTags.includes(tag.name);
              return (
                <Chip
                  key={tag.tag_id}
                  icon={React.cloneElement(tag.icon, {
                    sx: { fontSize: 18, color: selected ? "#fff" : "#172C66" },
                  })}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                  onClick={() => toggleTag(tag.name)}
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
                      color: "#172C66",
                      "& .MuiChip-icon": { color: "#172C66" },
                      transform: "scale(1.05)",
                    },
                    "& .MuiChip-icon": {
                      color: selected
                        ? "#fff !important"
                        : "#172C66 !important",
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
