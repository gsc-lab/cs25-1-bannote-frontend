// src/pages/RegisterPage.tsx
import { useEffect, useState } from "react";
import { decodeJWT, getCredentialFromURL } from "../utils/jwt";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface UserInfo {
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
}

export const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  // Pill tabs
  const tabs = ["학생", "직원"];
  const [value, setValue] = useState(0);

  // Form state
  const [userFamilyname, setUserFamilyname] = useState("");
  const [userGivenname, setUserGivenname] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [className, setClassName] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [errors, setErrors] = useState({
    userFamilyname: false,
    userGivenname: false,
    studentNumber: false,
  });

  useEffect(() => {
    const credential = getCredentialFromURL();
    if (!credential) return setError("No credential found in URL");

    const decoded = decodeJWT(credential);
    if (!decoded) return setError("Failed to decode credential");

    setUserInfo(decoded);
    setUserFamilyname(decoded.family_name);
    setUserGivenname(decoded.given_name);
    setProfileImage(decoded.picture);
  }, []);

  const handleRegister = () => {
    const newErrors = {
      userFamilyname: !userFamilyname,
      userGivenname: !userGivenname,
      studentNumber: !studentNumber,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((v) => v)) return;

    console.log({
      userFamilyname,
      userGivenname,
      studentNumber,
      department,
      className,
      profileImage,
    });
    alert("등록 완료!");
  };

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography sx={{ color: "#A10000" }}>{error}</Typography>
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        borderRadius: 3,
        backgroundColor: "#ffffffff",
        p: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 6,
          overflow: "hidden",
          border: "1px solid #172C66",
          backgroundColor: "white" 
        }}
      >
        {/* Logo */}
        <img
          src="https://raw.githubusercontent.com/Saaatsuki/BanNote_Practice/main/frontend/src/assets/BanNote-logo.png"
          alt="BanNote Logo"
          style={{ width: "100%", objectFit: "cover" }}
        />

        {/* Email bar */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "white",
            backgroundColor: "#172C66",
            py: 0.8,
            fontSize: 15,
          }}
        >
          {userInfo.email}
        </Typography>

        {/* Pill tabs */}
        <Box
          sx={{
            backgroundColor: "#172C66",
            p: 0.5,
            borderRadius: "12px",
            display: "flex",
            position: "relative",
            gap: 1,
            mt: 2,
            mx: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: `calc((100% / ${tabs.length}) * ${value} + 4px)`,
              width: `calc((100% / ${tabs.length}) - 8px)`,
              backgroundColor: "white",
              borderRadius: "10px",
              transition:
                "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s",
              boxShadow: 1,
            }}
          />
          {tabs.map((label, index) => (
            <Box
              key={label}
              onClick={() => setValue(index)}
              sx={{
                flex: 1,
                textAlign: "center",
                zIndex: 2,
                py: 1,
                borderRadius: "11px",
                cursor: "pointer",
                color: value === index ? "#172C66" : "white",
                fontWeight: 600,
                transition: "color 0.3s",
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        <CardContent>
          {/* Profile image */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Avatar
              src={profileImage}
              alt={userInfo.name}
              sx={{ width: 80, height: 80 }}
            />
            <Button
              variant="outlined"
              sx={{ borderColor: "#172C66", color: "#172C66" }}
              onClick={() => alert("이미지 선택 가능")}
            >
              이미지 변경
            </Button>
          </Box>

          {/* 이름 입력 */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="성"
              variant="outlined"
              value={userFamilyname}
              onChange={(e) => setUserFamilyname(e.target.value)}
              error={errors.userFamilyname}
              helperText={
                errors.userFamilyname ? "성을 입력해주세요 (Family Name)" : ""
              }
              sx={{
                flex: 1,
                bgcolor: "white",
                "& .MuiInputLabel-root": { color: "#172C66" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#172C66" },
                  "&:hover fieldset": { borderColor: "#172C66" },
                  "&.Mui-focused fieldset": { borderColor: "#172C66" },
                  "& input": { color: "#172C66" },
                },
              }}
            />
            <TextField
              label="이름"
              variant="outlined"
              value={userGivenname}
              onChange={(e) => setUserGivenname(e.target.value)}
              error={errors.userGivenname}
              helperText={
                errors.userGivenname ? "이름을 입력해주세요 (Given Name)" : ""
              }
              sx={{
                flex: 1,
                bgcolor: "white",
                "& .MuiInputLabel-root": { color: "#172C66" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#172C66" },
                  "&:hover fieldset": { borderColor: "#172C66" },
                  "&.Mui-focused fieldset": { borderColor: "#172C66" },
                  "& input": { color: "#172C66" },
                },
              }}
            />
          </Box>

          {/* 학생번호 */}
          <TextField
            fullWidth
            label="학생 번호"
            variant="outlined"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            error={errors.studentNumber}
            helperText={errors.studentNumber ? "학생 번호를 입력해주세요" : ""}
            sx={{
              mb: 2,
              bgcolor: "white",
              "& .MuiInputLabel-root": { color: "#172C66" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#172C66" },
                "&:hover fieldset": { borderColor: "#172C66" },
                "&.Mui-focused fieldset": { borderColor: "#172C66" },
                "& input": { color: "#172C66" },
              },
            }}
          />

          {/* 학과 */}
          <FormControl fullWidth sx={{ mb: 2, bgcolor: "white" }}>
            <InputLabel
              id="department-label"
              sx={{ color: "#172C66" }}
            >
              학과
            </InputLabel>
            <Select
              labelId="department-label"
              id="department-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              sx={{
                bgcolor: "white",
                color: "#172C66", // 選択済みテキスト色
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" }, // 枠線
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" },
                "& .MuiSelect-icon": { color: "#172C66" }, // ドロップダウン矢印
              }}
            >
              <MenuItem value="글로벌시스템융합과">글로벌시스템융합과</MenuItem>
              <MenuItem value="오늘은뭐할과">오늘은뭐할과</MenuItem>
              <MenuItem value="물주실수있을과">물주실수있을과</MenuItem>
            </Select>
          </FormControl>

          {/* 클래스 */}
          <FormControl fullWidth sx={{ mb: 2, bgcolor: "white" }}>
            <InputLabel
              id="class-label"
              sx={{ color: "#172C66" }}
            >
              반
            </InputLabel>
            <Select
              labelId="class-label"
              id="class-select"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              disabled={!department}
              sx={{
                bgcolor: "white",
                color: "#172C66",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#172C66" },
                "& .MuiSelect-icon": { color: "#172C66" },
              }}
            >
              {department === "글로벌시스템융합과" && (
                <>
                  <MenuItem value="2024-A">2024-A</MenuItem>
                  <MenuItem value="2024-B">2024-B</MenuItem>
                </>
              )}
              {department === "오늘은뭐할과" && (
                <>
                  <MenuItem value="2024-C">2024-C</MenuItem>
                  <MenuItem value="2024-D">2024-D</MenuItem>
                </>
              )}
              {department === "물주실수있을과" && (
                <>
                  <MenuItem value="2025-A">2025-A</MenuItem>
                  <MenuItem value="2025-B">2025-B</MenuItem>
                </>
              )}
            </Select>
          </FormControl>


          {/* 등록ボタン */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegister}
            sx={{
              mt: 3,
              height: 50,
              fontSize: 17,
              bgcolor: "#172C66",
              color:"white",
              borderRadius: 3,
              boxShadow: 3,
              "&:hover": { bgcolor: "#0f1b45" },
            }}
          >
            등록
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
