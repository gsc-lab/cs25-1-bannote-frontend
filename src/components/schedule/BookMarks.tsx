// src/components/schedule/BookMarks.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Group, GroupMemberResponse } from "../../types/group";
import BookMarkItem from "./BookMarkItem";

interface BookMarksProps {
  userId?: string;
  onSelectedGroupsChange?: (groupIds: string[]) => void;
}

export const BookMarks: React.FC<BookMarksProps> = ({
  userId = "",
  onSelectedGroupsChange,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/group_member?user_id=${userId}`);

        if (!response.ok) {
          throw new Error("그룹 데이터를 가져오는데 실패했습니다.");
        }

        const data: GroupMemberResponse = await response.json();
        setGroups(data.data);

        // 기본적으로 모든 그룹을 선택 상태로 설정
        const allGroupIds = data.data.map((group) => group.group_id);
        setSelectedGroupIds(allGroupIds);
        onSelectedGroupsChange?.(allGroupIds);

        setError(null);
      } catch (err) {
        console.error("그룹 데이터 fetch 에러:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId]);

  // 선택된 그룹 ID가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onSelectedGroupsChange?.(selectedGroupIds);
  }, [selectedGroupIds]);

  // 그룹 선택/해제 토글
  const handleToggleGroup = (groupId: string) => {
    setSelectedGroupIds((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        p: 2.3,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 18,
          color: "#2c3d7a",
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <BookmarksIcon sx={{ fontSize: 22 }} />
        그룹 목록
      </Typography>
      <Box
        sx={{ width: "100%", height: 2, backgroundColor: "#dee3f5", mb: 2 }}
      />

      {/* 로딩 상태 */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={30} />
        </Box>
      )}

      {/* 에러 상태 */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 그룹 목록 */}
      {!loading && !error && groups.length === 0 && (
        <Typography sx={{ textAlign: "center", color: "#999", py: 2 }}>
          그룹이 없습니다
        </Typography>
      )}

      {/* 그룹 목록 (체크박스) */}
      {!loading &&
        !error &&
        groups.map((group) => (
          <BookMarkItem
            key={group.group_id}
            group={group}
            isChecked={selectedGroupIds.includes(group.group_id)}
            onToggle={handleToggleGroup}
          />
        ))}
    </Box>
  );
};
