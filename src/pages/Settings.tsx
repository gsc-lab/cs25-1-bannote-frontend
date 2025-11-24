// src/pages/Settings.tsx
import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
  Stack,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";

const navy = "#172C66";
const lightGray = "#F9FAFB";

interface SettingsProps {
  userInfo?: {
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
    role: string;
    department?: string;
    className?: string;
    studentNumber?: string;
    statusMsg?: string;
  };
}

const apiUrl = import.meta.env.VITE_API_URL;

const Settings = (props: SettingsProps) => {
  const location = useLocation();
  const passedUserInfo = location.state?.userInfo as SettingsProps["userInfo"];

  const user = passedUserInfo || props.userInfo || {
    email: "",
    family_name: "",
    given_name: "",
    picture: "",
    role: "",
    department: "",
    className: "",
    studentNumber: "",
    statusMsg: "",
  };

  const [profileImage, setProfileImage] = useState(user.picture);
  const [lastName, setLastName] = useState(user.family_name);
  const [firstName, setFirstName] = useState(user.given_name);
  const [statusMsg, setStatusMsg] = useState(user.statusMsg);
  const [department, setDepartment] = useState(user.department);
  const [className, setClassName] = useState(user.className);
  const [studentNumber, setStudentNumber] = useState(user.studentNumber);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleSave = async () => {
    try {
      const payload = {
        family_name: lastName,
        given_name: firstName,
        profile_image_url: profileImage,
        statusMsg,
        department,
        className,
        studentNumber,
      };

      const response = await fetch(`${apiUrl}/users/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setSnackbarSeverity("success");
      setSnackbarMessage("프로필 정보가 성공적으로 업데이트되었습니다!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setSnackbarSeverity("error");
      setSnackbarMessage("프로필 정보 업데이트에 실패했습니다.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", alignItems: "flex-start", p: 5 }}>
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: 1100,
          borderRadius: 4,
          p: 4,
          display: "flex",
          gap: 4,
          background: "#FFFFFF",
        }}
      >
        {/* LEFT PROFILE CARD */}
        <Card
          sx={{
            flex: 4,
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={profileImage}
            sx={{
              width: 140,
              height: 140,
              mb: 2,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
            }}
          />
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
          <IconButton sx={{ color: navy, mb: 2 }} onClick={() => document.getElementById("profile-image-input")?.click()}>
            <PhotoCameraIcon sx={{ fontSize: 28 }} />
          </IconButton>

          <Divider sx={{ width: "80%", my: 2 }} />

          <Stack spacing={2} sx={{ width: "100%" }}>
            <DetailItem
              icon={<EmailIcon color="primary" />}
              label="이메일"
              value={user.email}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarSeverity={setSnackbarSeverity}
            />
            <DetailItem
              icon={<SchoolIcon color="primary" />}
              label="학과 / 반"
              value={`${department || ""} / ${className || ""}`}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarSeverity={setSnackbarSeverity}
            />
            <DetailItem
              icon={<PersonIcon color="primary" />}
              label="역할"
              value={user.role}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarSeverity={setSnackbarSeverity}
            />
            <DetailItem
              icon={<BadgeIcon color="primary" />}
              label="학생 번호"
              value={studentNumber || ""}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarSeverity={setSnackbarSeverity}
            />
          </Stack>
        </Card>

        {/* RIGHT FORM AREA */}
        <Card
          sx={{
            flex: 6,
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ color: navy, fontWeight: 700, mb: 3 }}>
            프로필 정보 수정
          </Typography>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="성" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <TextField fullWidth label="이름" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Box>
            <TextField
              fullWidth
              label="상태 메시지"
              multiline
              rows={4}
              value={statusMsg}
              onChange={(e) => setStatusMsg(e.target.value)}
              inputProps={{ maxLength: 125 }}
            />
          </Stack>
          <TextField fullWidth label="학생 번호" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="학과" value={department} onChange={(e) => setDepartment(e.target.value)} sx={{ mt: 2 }} />
          <TextField fullWidth label="반" value={className} onChange={(e) => setClassName(e.target.value)} sx={{ mt: 2 }} />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, bgcolor: navy, color: "#fff", height: 56, fontSize: 18, fontWeight: 700, borderRadius: 2 }}
            onClick={handleSave}
          >
            저장하기
          </Button>
        </Card>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
}

const DetailItem = ({ icon, label, value, setSnackbarMessage, setSnackbarOpen, setSnackbarSeverity }: DetailItemProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setSnackbarMessage(`${label} 복사 완료: ${value}`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        {icon}
        <Typography fontWeight="bold" sx={{ color: navy }}>
          {label}
        </Typography>
      </Stack>
      <Typography
        sx={{
          p: 1.2,
          border: `1px solid ${lightGray}`,
          borderRadius: 2,
          background: "#FAFAFA",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#F0F0F0" },
        }}
        onClick={handleCopy}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default Settings;
