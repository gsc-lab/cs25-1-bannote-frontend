// src/components/schedule/GroupItem.tsx
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SellIcon from '@mui/icons-material/Sell';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { getIconByGroup } from "./getIconByGroup";

export interface Tag {
  tag_id: string;
  name: string;
}

export interface GroupData {
  group_id: string;
  group_name: string;
  group_description: string;
  color_default: string;
  color_highlight: string;
  tags: Tag[];
  bookmark: boolean;
}

interface GroupItemProps {
  data: GroupData;
  onBookmarkToggle: (group_id: string) => void;
}

export const GroupItem: React.FC<GroupItemProps> = ({ data, onBookmarkToggle }) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 110,
        borderRadius: 4,
        p: 2,
        display: "flex",
        gap: 2,
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.25s ease",
        background: `linear-gradient(145deg, #ffffff, #f4f6fc)`,
        border: `0.1px solid #aebeecff`,
        boxShadow: "0 6px 18px rgba(23,44,102,0.1)",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(23,44,102,0.18)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* 左アイコン */}
      <Box
        sx={{
          width: 55,
          height: 55,
          borderRadius: "50%",
          background: `${data.color_default}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(23,44,102,0.2)",
        }}
      >
        {React.cloneElement(getIconByGroup(data.tags), {
          sx: {
            fontSize: 26,
            color: data.color_default.toLowerCase() === "#172c66" ? "#b6c4e9" : "#2e4480",
          },
        })}
      </Box>

      {/* コンテンツ */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.7 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#172C66",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.group_name}
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: data.color_default }} />
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: data.color_highlight }} />
            </Box>
          </Box>

          {/* ブックマーク */}
          <Box
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(data.group_id);
            }}
            sx={{ cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.2)" } }}
          >
            {data.bookmark ? (
              <TurnedInIcon sx={{ color: "#ff9800", fontSize: 24 }} />
            ) : (
              <TurnedInNotIcon sx={{ color: "#172C66", fontSize: 24 }} />
            )}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            color: "#5A6B8C",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data.group_description}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
          {data.tags.map((tag) => (
            <Chip
              key={tag.tag_id}
              icon={<SellIcon sx={{ fontSize: 14 }} />}
              label={tag.name}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontSize: 11,
                height: 24,
                pl: 0.7,
                borderColor: "#172C66",
                color: "#172C66",
                backgroundColor: "#eef3ff",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "#172C66",
                  color: "#fff",
                  "& .MuiChip-icon": { color: "#fff" },
                },
                "& .MuiChip-icon": { color: "#172C66", fontSize: 14 },
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};
