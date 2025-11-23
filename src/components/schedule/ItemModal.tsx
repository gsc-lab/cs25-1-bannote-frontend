// src/components/schedule/ItemModal.tsx
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SellIcon from "@mui/icons-material/Sell";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Button from "@mui/material/Button";
import { GroupData } from "./GroupItem";
import { getIconByGroup } from "./getIconByGroup";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";



interface ItemModalProps {
  open: boolean;
  onClose: () => void;
  data: GroupData | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, data }) => {
  if (!data) return null;

  return (
    <Modal open={open} onClose={onClose}>
        <AnimatePresence>
            {open && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                position: "absolute",
                top: "25%",
                left: "45%",
                transform: "translate(-50%, -50%)",
                width: 600,
                maxHeight: "80vh",
                }}
            >
                <Box
                sx={{
                    overflowY: "auto",
                    borderRadius: "20px",
                    p: 4,
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 10px 40px rgba(23, 44, 102, 0.25)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    position: "relative",
                }}
                >

            <Box
            onClick={onClose}
            sx={{
                position: "absolute",
                top: 18,
                left: 18,
                cursor: "pointer",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { background: "rgba(23,44,102,0.1)" },
            }}
            >
            <CloseIcon sx={{ fontSize: 26, color: "#172C66" }} />
            </Box>


            {/* Bookmark */}
            <Box sx={{ position: "absolute", right: 24, top: 24, cursor: "pointer" }}>
            {data.bookmark ? (
                <TurnedInIcon sx={{ fontSize: 30, color: "#ff9800" }} />
            ) : (
                <TurnedInNotIcon sx={{ fontSize: 30, color: "#172C66" }} />
            )}
            </Box>

            {/* Header */}
            <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
            }}
            >
            <Box
                sx={{
                width: 64,
                height: 64,
                borderRadius: "18px",
                background: "#eef3ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(23,44,102,0.2)",
                }}
            >
                {React.cloneElement(getIconByGroup(data.tags), {
                sx: { fontSize: 34, color: "#172C66" },
                })}
            </Box>
            </Box>

            {/* Title */}
            <Typography
            sx={{ fontSize: 26, fontWeight: 900, color: "#172C66", textAlign: "center", mb: 2 }}
            >
            {data.group_name}
            </Typography>

            {/* Description */}
            <Typography
            sx={{
                fontSize: 15,
                color: "#4a5b7c",
                textAlign: "center",
                lineHeight: 1.7,
                mb: 3,
            }}
            >
            {data.group_description}
            </Typography>

            {/* Tags */}
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {data.tags.map((tag) => (
                <Chip
                key={tag.tag_id}
                label={tag.name}
                icon={<SellIcon sx={{ fontSize: 14 }} />}
                size="medium"
                variant="outlined"
                sx={{
                    borderColor: "#172C66",
                    color: "#172C66",
                    backgroundColor: "#eef3ff",
                    borderRadius: "10px",
                    fontSize: 13,
                    "&:hover": {
                    backgroundColor: "#172C66",
                    color: "#fff",
                    "& .MuiChip-icon": { color: "#fff" },
                    },
                }}
                />
            ))}
            </Box>

            {/* Colors */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 28, height: 6, borderRadius: 3, background: data.color_default }} />
                <Typography sx={{ fontSize: 12 }}>default</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 28, height: 6, borderRadius: 3, background: data.color_highlight }} />
                <Typography sx={{ fontSize: 12 }}>highlight</Typography>
            </Box>
            </Box>

            {/* Close button
            <Button
            variant="contained"
            onClick={onClose}
            sx={{
                mt: 3,
                mx: "auto",     
                display: "block",
                width: 180,
                height: 48,
                fontSize: 16,
                borderRadius: 3,
                backgroundColor: "#172C66",
                "&:hover": { backgroundColor: "#0f1b45" },
            }}
            >
            閉じる
            </Button> */}
                </Box>
            </motion.div>
            )}
        </AnimatePresence>
    </Modal>
  );
};
