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
  OutlinedInput
} from "@mui/material";

interface UserInfo {
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");

  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
    department: false,
    className: false,
  });

  // 学科・クラス用 state
const [departments, setDepartments] = useState<any[]>([]);
const [classes, setClasses] = useState<any[]>([]);

  const navy = "#172C66";
  const red = "#A10000";

  // 初期ユーザー情報・許可チェック
  useEffect(() => {
    const credential = getCredentialFromURL();
    if (!credential) return setError("No credential found in URL");

    const decoded = decodeJWT(credential);
    if (!decoded) return setError("Failed to decode credential");

    setUserInfo(decoded);
    setUserFamilyname(decoded.family_name);
    setUserGivenname(decoded.given_name);
    setProfileImage(decoded.picture);
    setLoading(true);

    const fetchData = async (decoded: any) => {
      try {
        const response = await fetch(`${apiUrl}/alloweddomains/check?email=${decoded.email}`);
        if (!response.ok) return setError(`Fetch error: ${response.status}`);
        const result = await response.json();
        setAllowed(result.allowed);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(decoded);
  }, [loading]);

  // スクロール禁止
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  // 学科取得
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${apiUrl}/departments?page=0&size=50`);
        const json = await res.json();
        setDepartments(json.data || []);
        console.log(json);
        
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, []);

  // 学科選択時にクラス取得
  useEffect(() => {
    // 学科一覧取得
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${apiUrl}/departments?page=0&size=10`);
        const data = await res.json();
        setDepartments(data.data); // data.data が学科配列
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // department が選択されたらクラスを取得
    if (!department) {
      setClasses([]);
      return;
    }

    const dep = departments.find((d) => d.name === department);
    if (!dep) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(`${apiUrl}/studentclasses?page=0&size=10&department_code=${dep.id}&status=active`);
        const data = await res.json();
        setClasses(data.data); // data.data がクラス配列
      } catch (err) {
        console.error(err);
      }
    };

    fetchClasses();
  }, [department, departments]);

  const handleRegister = () => {
    const newErrors = {
      userFamilyname: !userFamilyname,
      userGivenname: !userGivenname,
      studentNumber: !studentNumber,
      department: !department,
      className: !className,
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
        <Typography sx={{ color: red }}>{error}</Typography>
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
    <Box sx={{ minWidth:"100vw", minHeight:"100vh", background: "#FEF6E4" }}>
      <Box sx={{ maxWidth: 420, mx: "auto", mt: 6, borderRadius: 3, backgroundColor:"#ffffff", p: 2, border: `1px solid ${navy}` }}>
        <Card sx={{ borderRadius: 3, boxShadow: 6, overflow: "hidden", border: `1px solid ${navy}`, backgroundColor: "white" }}>
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
              backgroundColor: allowed ? navy : red,
              py: 0.8,
              fontSize: 15,
            }}
          >
            {userInfo.email}
          </Typography>

          {/* Pill tabs */}
          <Box sx={{ backgroundColor: navy, p: 0.5, borderRadius: "12px", display: "flex", position: "relative", gap: 1, mt: 2, mx: 2 }}>
            <Box
              sx={{
                position: "absolute",
                top: 4,
                bottom: 4,
                left: `calc((100% / ${tabs.length}) * ${value} + 4px)`,
                width: `calc((100% / ${tabs.length}) - 8px)`,
                backgroundColor: "white",
                borderRadius: "10px",
                transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s",
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
                  color: value === index ? navy : "white",
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
              <Avatar src={profileImage} alt={userInfo.name} sx={{ width: 80, height: 80 }} />

              <input
                type="file"
                accept="image/*"
                id="profile-image-input"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProfileImage(URL.createObjectURL(file));
                }}
              />

              <Button
                variant="outlined"
                sx={{ borderColor: navy, color: navy }}
                onClick={() => document.getElementById("profile-image-input")?.click()}
              >
                이미지 변경
              </Button>
            </Box>

            {/* 이름入力 */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="성"
                variant="outlined"
                value={userFamilyname}
                onChange={(e) => setUserFamilyname(e.target.value)}
                error={errors.userFamilyname}
                helperText={errors.userFamilyname ? "성을 입력해주세요 (Family Name)" : ""}
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  "& .MuiInputLabel-root": { color: navy },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: navy },
                    "&:hover fieldset": { borderColor: navy },
                    "&.Mui-focused fieldset": { borderColor: navy },
                    "& input": { color: navy },
                  },
                }}
              />
              <TextField
                label="이름"
                variant="outlined"
                value={userGivenname}
                onChange={(e) => setUserGivenname(e.target.value)}
                error={errors.userGivenname}
                helperText={errors.userGivenname ? "이름을 입력해주세요 (Given Name)" : ""}
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  "& .MuiInputLabel-root": { color: navy },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: navy },
                    "&:hover fieldset": { borderColor: navy },
                    "&.Mui-focused fieldset": { borderColor: navy },
                    "& input": { color: navy },
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
                "& .MuiInputLabel-root": { color: navy },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: navy },
                  "&:hover fieldset": { borderColor: navy },
                  // "&.Mui-focused fieldset": { borderColor: navy },
                  "& input": { color: navy },
                },
              }}
            />

  {/* 학과 */}
  <FormControl fullWidth error={errors.department} sx={{ mb: 2 }}>
    <InputLabel
      id="department-label"
      sx={{
        color: errors.department ? red : navy,
        "&.Mui-focused": { color: errors.department ? red : navy },
      }}
    >
      학과
    </InputLabel>
    <Select
      labelId="department-label"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      label="학과"  // ラベル浮く
      sx={{
        backgroundColor: "white",
        color: navy,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "& .MuiSelect-icon": { color: navy },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#fefefe", // 明るい背景
            color: navy,
          },
        },
      }}
    >
      {departments.map((dep) => (
        <MenuItem key={dep.id} value={dep.name}>
          {dep.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* クラス */}
  <FormControl
    fullWidth
    error={errors.className}
    sx={{ mb: 2 }}
    disabled={!department || classes.length === 0}
  >
    <InputLabel
      id="class-label"
      sx={{
        color: errors.className ? red : navy,
        "&.Mui-focused": { color: errors.className ? red : navy },
      }}
    >
      반
    </InputLabel>
    <Select
      labelId="class-label"
      value={className}
      onChange={(e) => setClassName(e.target.value)}
      label="반"
      sx={{
        backgroundColor: "white",
        color: navy,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        "& .MuiSelect-icon": { color: navy },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "#fefefe", // 明るい背景
          },
        },
      }}
    >
      {classes.map((cls) => (
        <MenuItem key={cls.id} value={cls.name}>
          {cls.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>


            {/* 등록ボタン */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              sx={{ mt: 3, height: 50, fontSize: 17, bgcolor: navy, color: "white", borderRadius: 3, boxShadow: 3, "&:hover": { bgcolor: "#0f1b45" } }}
            >
              등록
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
