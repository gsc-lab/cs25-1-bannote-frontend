// src/components/common/UserSearch.tsx
import React, { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { useInput, InputProps } from "react-admin";

interface User {
  user_code: string;
  user_name: string;
  user_email: string;
  family_name: string;
  given_name: string;
  profile_image_url: string;
}

interface UserSearchProps {
  label?: string;
  placeholder?: string;
  onSelect?: (userCodes: string[]) => void;
  value?: string[];
  fullWidth?: boolean;
  multiple?: boolean;
  // React Admin props
  source?: string;
  defaultValue?: string[];
}

export const UserSearch: React.FC<UserSearchProps & Partial<InputProps>> = ({
  label = "사용자 검색",
  placeholder = "이름을 입력하세요",
  onSelect,
  value: valueProp,
  fullWidth = true,
  multiple = true,
  source,
  defaultValue = [],
  ...rest
}) => {
  // React Admin integration
  const input = source ? useInput({ source, defaultValue, ...rest }) : null;

  const userCodes = input ? input.field.value || [] : valueProp || [];

  // user_code 배열을 User 객체 배열로 변환 (선택된 사용자 표시용)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const onChange = input
    ? (newUserCodes: string[]) => {
        input.field.onChange(newUserCodes);
        onSelect?.(newUserCodes);
      }
    : onSelect || (() => {});

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // user_code 배열로 User 정보 조회 (기본값 설정용)
  useEffect(() => {
    if (!userCodes || userCodes.length === 0) {
      setSelectedUsers([]);
      return;
    }

    // 이미 selectedUsers에 있는 user_code는 제외
    const existingCodes = selectedUsers.map((u) => u.user_code);
    const missingCodes = userCodes.filter(
      (code: string) => !existingCodes.includes(code),
    );

    if (missingCodes.length === 0) {
      // userCodes에서 제거된 사용자 필터링
      setSelectedUsers((prev) =>
        prev.filter((u) => userCodes.includes(u.user_code)),
      );
      return;
    }

    // 각 user_code마다 개별 API 호출로 사용자 정보 조회
    const fetchUsers = async () => {
      try {
        const userPromises = missingCodes.map((code: string) =>
          fetch(`/api/users/${code}`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch user ${code}`);
            return res.json();
          }),
        );

        const results = await Promise.all(userPromises);
        const newUsers = results
          .filter((result) => result && result.data)
          .map((result) => result.data);

        // 기존 selectedUsers와 새로 조회한 사용자 합치기
        setSelectedUsers((prev) => [
          ...prev.filter((u) => userCodes.includes(u.user_code)),
          ...newUsers,
        ]);
      } catch (error) {
        console.error("사용자 정보 조회 오류:", error);
      }
    };

    fetchUsers();
  }, [userCodes]);

  // Debounce를 위한 useEffect
  useEffect(() => {
    console.log(inputValue, inputValue.length);

    if (inputValue.length === 0) {
      setOptions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        // fetch로 직접 API 요청
        const response = await fetch(
          `/api/users/search?q=${encodeURIComponent(inputValue)}&page=0&size=30`,
        );
        if (!response.ok) {
          throw new Error("검색 실패");
        }
        const data = await response.json();

        setOptions(data.data || []);
      } catch (error) {
        console.error("사용자 검색 오류:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Autocomplete
      multiple={multiple}
      fullWidth={fullWidth}
      options={options}
      loading={loading}
      value={selectedUsers}
      inputValue={inputValue}
      filterOptions={(x) => x}
      disableCloseOnSelect
      onInputChange={(_event, newInputValue, reason) => {
        // 'reset' reason일 때는 입력값 초기화하지 않음
        if (reason !== "reset") {
          setInputValue(newInputValue);
        }
      }}
      onChange={(_event, newValue) => {
        const users = newValue as User[];
        setSelectedUsers(users);
        // user_code 배열만 추출해서 전달
        const codes = users.map((user) => user.user_code);
        onChange(codes);
      }}
      getOptionLabel={(option) => `${option.user_name}`}
      isOptionEqualToValue={(option, value) =>
        option.user_code === value.user_code
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={input?.fieldState?.invalid}
          helperText={input?.fieldState?.error?.message}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.user_code}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={option.profile_image_url} />
            <Box>
              <Typography variant="body1">
                {option.family_name} {option.given_name}{" "}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  ({option.user_code})
                </Typography>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.user_email}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      noOptionsText={
        inputValue.length === 0 ? "검색어를 입력하세요" : "검색 결과가 없습니다"
      }
    />
  );
};
