// src/components/schedule/GroupItem.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import SellIcon from '@mui/icons-material/Sell';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { getIconByGroup } from "./getIconByGroup";



interface Tag {
  tag_id: string;
  name: string;
}

interface GroupData {
  group_name: string;
  group_description: string;
  color_default: string;
  color_highlight: string;
  tags: Tag[];
}

interface GroupItemProps {
  data: GroupData;
}

export const GroupItem: React.FC<GroupItemProps> = ({ data }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    // <Card
    //   sx={{
    //     width: 270,
    //     height: 100,
    //     borderRadius: 3,
    //     p: 1.5,
    //     display: "flex",
    //     gap: 1.5,
    //     alignItems: "center",
    //     cursor: "pointer",
    //     transition: "all 0.25s ease",
    //     backgroundColor: "#ffffff",
    //     border: `1px solid #172c66`,
    //     boxShadow: "0 4px 12px rgba(23,44,102,0.08)",
    //     "&:hover": {
    //       boxShadow: "0 8px 20px rgba(23,44,102,0.15)",
    //       transform: "translateY(-2px)",
    //     },
    //   }}
    // >
    //   {/* 左アイコン */}
    //   <Box
    //     sx={{
    //       width: 50,
    //       height: 50,
    //       borderRadius: "50%",
    //       backgroundColor: "#172c66",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       flexShrink: 0,
    //       boxShadow: "0 3px 8px rgba(23,44,102,0.2)",
    //       border: `1px solid : "#172c66"}`,
    //     }}
    //   >
    //     <CoPresentIcon sx={{ fontSize: 24, color: "#fff" }} />
    //   </Box>

    //   {/* 右コンテンツ */}
    //   <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
    //     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //         <Typography
    //           sx={{
    //             fontSize: 16,
    //             fontWeight: 700,
    //             color: "#172C66",
    //             whiteSpace: "nowrap",
    //             overflow: "hidden",
    //             textOverflow: "ellipsis"
    //           }}
    //         >
    //           {data.group_name}
    //         </Typography>
    //         <Box sx={{ display: "flex", gap: 0.4 }}>
    //           <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: data.color_default }} />
    //           <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: data.color_highlight }} />
    //         </Box>
    //       </Box>

    //       <Box
    //         onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
    //         sx={{ cursor: "pointer" }}
    //       >
    //         {bookmarked ? (
    //           <TurnedInIcon sx={{ color: "#172C66", fontSize: 24 }} />
    //         ) : (
    //           <TurnedInNotIcon sx={{ color: "#172C66", fontSize: 24 }} />
    //         )}
    //       </Box>
    //     </Box>

    //     <Typography
    //       sx={{
    //         fontSize: 12,
    //         color: "#5A6B8C",
    //         lineHeight: 1.2,
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         whiteSpace: "nowrap",
    //       }}
    //     >
    //       {data.group_description}
    //     </Typography>

    //     <Box sx={{ display: "flex", gap: 0.3, flexWrap: "wrap", mt: 0.5 }}>
    //       {data.tags.map((tag) => (
    //         <Chip
    //           key={tag.tag_id}
    //           icon={<SellIcon sx={{ fontSize: 14 }} />}
    //           label={tag.name}
    //           size="small"
    //           variant="outlined"
    //           sx={{
    //             borderRadius: 1.5,
    //             fontSize: 10,
    //             height: 22,
    //             pl: 0.5,
    //             borderColor: "#172C66",
    //             color: "#172C66",
    //             backgroundColor: "#fff",
    //             "& .MuiChip-icon": { color: "#172C66", fontSize: 14 },
    //             "&:hover": {
    //               backgroundColor: "#EEF3FF",
    //               borderColor: "#172C66",
    //             },
    //           }}
    //         />
    //       ))}
    //     </Box>
    //   </Box>
    // </Card>
<Card
  sx={{
    width: 300,
    Height: 110,
    borderRadius: 4,
    p: 2,
    display: "flex",
    gap: 2,
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    background: `linear-gradient(145deg, #ffffff, #f4f6fc)`,
    border: `1px solid #172c66`,
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
      background: `linear-gradient(145deg, #172C66, #1f3b8a)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 4px 12px rgba(23,44,102,0.2)",
    }}
  >
    {React.cloneElement(getIconByGroup(data.tags), {
      sx: { fontSize: 26, color: "#fff" }
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

      <Box
        onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
        sx={{ cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.2)" } }}
      >
        {bookmarked ? (
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
