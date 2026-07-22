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
  Slide,
  Stack,
  Alert,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string>("");
  const [allowed, setAllowed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const tabs = ["학생", "직원"];
  const [value, setValue] = useState(0);

  const [userFamilyname, setUserFamilyname] = useState("");
  const [userGivenname, setUserGivenname] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [className, setClassName] = useState("");
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [errors, setErrors] = useState({
    userFamilyname: false,
    userGivenname: false,
    studentNumber: false,
    department: false,
    className: false,
  });

  const [departments, setDepartments] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const navy = "#172C66";
  const red = "#A10000";

  const maillErrorMsg = (
    <Typography
      sx={{
        color: red,
        padding: "2px",
        marginTop: "8px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "14px",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <ErrorOutlineIcon fontSize="small" />
      회원가입 요청 후 관리자의 승인이 필요합니다.
    </Typography>
  );

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

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/alloweddomains/check?email=${decoded.email}`);
        if (!response.ok) return setError(`Fetch error: ${response.status}`);
        const result = await response.json();
        setAllowed(result.allowed);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // スクロール禁止
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 学科取得
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${apiUrl}/departments?page=0&size=50`);
        const json = await res.json();
        setDepartments(json.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, []);

  // 学科選択時にクラス取得
  useEffect(() => {
    if (!department) {
      setClasses([]);
      return;
    }
    const dep = departments.find((d) => d.name === department);
    if (!dep) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/studentclasses?page=0&size=50&department_code=${dep.id}&status=active`
        );
        const data = await res.json();
        setClasses(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, [department, departments]);

  const handleGoLogin = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    const newErrors = {
      userFamilyname: !userFamilyname,
      userGivenname: !userGivenname,
      studentNumber: !studentNumber,
      department: !department,
      className: value === 0 ? !className : false,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    setSuccess(true);

    const credential = getCredentialFromURL();
    if (!credential) {
      console.error("No credential found");
      return;
    }

    const dep = departments.find((d) => d.name === department);
    const cls = classes.find((c) => c.name === className);

    const payload = {
      credential,
      user_code: studentNumber,
      user_email: userInfo?.email,
      family_name: userFamilyname,
      given_name: userGivenname,
      user_type: value === 0 ? "student" : "employee",
      profile_image_url: profileImage,
      student_class_code: value === 0 ? cls?.id || null : null,
      department_code: dep?.id || null,
    };

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      console.log("送信成功:", result);
      setTimeout(() => {
        window.location.href = `${apiUrl}/`;
      }, 1000);
    } catch (err) {
      console.error("送信失敗:", err);
    }
  };

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Typography sx={{ color: red }}>{error}</Typography>
      </Box>
    );

  if (!userInfo)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );

  return (
    <Box sx={{ minWidth: "100vw", minHeight: "100vh", background: "#FEF6E4" }}>
      <Box
        sx={{
          maxWidth: 420,
          mx: "auto",
          mt: 6,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          p: 2,
          border: `1px solid ${navy}`,
        }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 6,
            overflow: "hidden",
            border: `1px solid ${navy}`,
            backgroundColor: "white",
          }}
        >
          <img
            src="https://raw.githubusercontent.com/Saaatsuki/BanNote_Practice/main/frontend/src/assets/BanNote-logo.png"
            alt="BanNote Logo"
            style={{ width: "100%", objectFit: "cover" }}
          />

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
          {!allowed && maillErrorMsg}

          {/* Pill tabs */}
          <Box
            sx={{
              backgroundColor: navy,
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
                transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s",
                boxShadow: 1,
              }}
            />
            {tabs.map((label, index) => (
              <Box
                key={label}
                onClick={() => {
                  setValue(index);
                  if (index === 1) {
                    setDepartment("");
                    setClassName("");
                    setErrors((prev) => ({ ...prev, department: false, className: false }));
                  }
                }}
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
            {/* Profile */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, mb: 3 }}>
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

            {/* 名前 */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="성"
                variant="outlined"
                value={userFamilyname}
                onChange={(e) => setUserFamilyname(e.target.value)}
                error={errors.userFamilyname}
                helperText={errors.userFamilyname ? "성을 입력해주세요" : ""}
                InputLabelProps={{
                  sx: {
                    color: navy,
                    fontWeight: 500,
                    "&.Mui-focused": { color: navy, fontWeight: 600 },
                  },
                }}
                sx={{
                  flex: 1,
                  bgcolor: "white",
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
                helperText={errors.userGivenname ? "이름을 입력해주세요" : ""}
                InputLabelProps={{
                  sx: {
                    color: navy,
                    fontWeight: 500,
                    "&.Mui-focused": { color: navy, fontWeight: 600 },
                  },
                }}
                sx={{
                  flex: 1,
                  bgcolor: "white",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: navy },
                    "&:hover fieldset": { borderColor: navy },
                    "&.Mui-focused fieldset": { borderColor: navy },
                    "& input": { color: navy },
                  },
                }}
              />
            </Box>

            {/* 学生番号 */}
            <TextField
              fullWidth
              label={value === 1 ? "직원 번호" : "학생 번호"}
              variant="outlined"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value.replace(/[^0-9]/g, ""))}
              error={errors.studentNumber}
              InputLabelProps={{
                sx: {
                  color: errors.studentNumber ? red : navy,
                  "&.Mui-focused": { color: errors.studentNumber ? red : navy },
                },
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": { borderColor: errors.studentNumber ? red : navy },
                  "&.Mui-focused fieldset": { borderColor: errors.studentNumber ? red : navy },
                },
              }}
            />

            {/* 学科 */}
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
                label="학과"
                sx={{ backgroundColor: "white", color: navy }}
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
              disabled={value === 1 || !department || classes.length === 0}
            >
              <InputLabel id="class-label">{value === 1 ? "직원은 반을 선택할 필요 없습니다" : "반"}</InputLabel>
              <Select
                labelId="class-label"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                sx={{ backgroundColor: "white", color: navy }}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.name}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 0.5, mt: 1.5 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoLogin}
                sx={{
                  height: 50,
                  fontSize: 16,
                  color: navy,
                  borderColor: navy,
                  border: `2px solid ${navy}`,
                  borderRadius: 3,
                  "&:hover": { borderColor: "#0f1b45", background: "#f4f6fb" },
                }}
              >
                <ExitToAppIcon sx={{ mr: 1 }} /> 로그인 페이지
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                sx={{
                  height: 50,
                  fontSize: 17,
                  bgcolor: navy,
                  color: "white",
                  borderRadius: 3,
                  boxShadow: 3,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#0f1b45" },
                }}
              >
                등록
              </Button>
            </Box>

            {success && (
              <Slide in={success} direction="down" mountOnEnter unmountOnExit>
                <Stack
                  sx={{
                    position: "fixed",
                    top: 30,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1300,
                    width: "auto",
                    maxWidth: 400,
                  }}
                >
                  <Alert
                    variant="outlined"
                    severity="success"
                    sx={{ bgcolor: "white", color: navy, fontWeight: 500, borderColor: navy }}
                  >
                    {allowed ? (
                      <>
                        등록이 완료되었습니다! <br />
                        1초 후 홈 화면으로 이동합니다.
                      </>
                    ) : (
                      <>
                        회원가입 요청이 완료되었습니다.<br />
                        관리자가 승인할 때까지 기다려주세요
                      </>
                    )}
                  </Alert>
                </Stack>
              </Slide>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
