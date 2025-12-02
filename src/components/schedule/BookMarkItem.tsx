import React from "react";
import { Box, Checkbox, styled, Typography } from "@mui/material";
import { Group } from "../../types/group";

// TODO: 눌렀을 때 그룹 설명 나오게 구현하기

export interface BookMarkItemProps {
  group: Group;
  isChecked: boolean;
  onToggle: (groupId: string) => void;
}

const BookMarkItem: React.FC<BookMarkItemProps> = ({
  group,
  isChecked,
  onToggle,
}) => {
  return (
    <BookMarkItemWrapper
      backgroundColor={group.color_default}
      isChecked={isChecked}
    >
      <Checkbox
        checked={isChecked}
        onChange={() => onToggle(group.group_id)}
        size="small"
        sx={{
          color: "#ffffff",
          "&.Mui-checked": {
            color: "#ffffff",
          },
        }}
      />
      <Typography sx={{ color: "#ffffff", fontWeight: 500 }}>
        {group.group_name}
      </Typography>
    </BookMarkItemWrapper>
  );
};

interface BookMarkItemWrapperProps {
  backgroundColor: string;
  isChecked: boolean;
}

const BookMarkItemWrapper = styled(Box)<BookMarkItemWrapperProps>(
  ({ backgroundColor, isChecked }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: backgroundColor,
    borderRadius: 8,
    marginBottom: 8,
    opacity: isChecked ? 1 : 0.5,
    transition: "opacity 0.2s",
  }),
);

export default BookMarkItem;
