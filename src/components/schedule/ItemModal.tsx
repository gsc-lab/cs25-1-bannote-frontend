// src/components/schedule/ItemModal.tsx

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ItemModalProps {
  open: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <h2>ハローワールド！</h2>
        <Button variant="contained" onClick={onClose}>
          閉じる
        </Button>
      </Box>
    </Modal>
  );
};
