// src/schedule/MainCalendar.tsx
import React, { useState, useCallback, useEffect } from "react";
import { Calendar, dayjsLocalizer, SlotInfo, Event } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

import tagListJson from "./tagList.json";
import { getVisibleDateRange } from "../../utils/dateUtils";
import { useGetList } from "react-admin";

// TAG_OPTIONSをJSONから作成
const TAG_OPTIONS = tagListJson.tag_list_response.tags;

// dayjs localizer 설정
const localizer = dayjsLocalizer(dayjs);

// react-big-calendar용 DnD Calendar
const DnDCalendar = withDragAndDrop(Calendar);

// 이벤트 타입 정의
export interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  tags?: string[];
  description?: string;
  resourceId?: string;
}

interface MyCalendarProps {
  selectedGroupIds: string[];
}

export const MyCalendar: React.FC<MyCalendarProps> = ({ selectedGroupIds }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs().add(1, "hour"));
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // 캘린더 뷰와 날짜 추적용 상태
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<string>("week");

  // 현재 보이는 날짜 범위 계산
  const dateRange = getVisibleDateRange(currentDate, currentView);

  // 스케줄 데이터 가져오기 (filter가 변경될 때마다 자동 재요청)
  const { data, isLoading, error } = useGetList("schedule", {
    pagination: { page: 1, perPage: 1000 },
    filter: {
      group_ids: selectedGroupIds.join(","),
      start_date: dayjs(dateRange.start).format("YYYY-MM-DDT00:00:00"),
      end_date: dayjs(dateRange.end).format("YYYY-MM-DDT23:59:59"),
    },
  });

  // 데이터가 로드되면 이벤트 상태 업데이트
  useEffect(() => {
    if (data) {
      console.log("Loaded schedule data:", data);

      // TODO: 받아온 데이터를 CalendarEvent 형식으로 변환
      // const calendarEvents = data.map(item => ({
      //   id: item.id,
      //   title: item.title,
      //   start: new Date(item.start_time),
      //   end: new Date(item.end_time),
      //   ...
      // }));
      // setEvents(calendarEvents);
    }
  }, [data]);

  // 날짜 선택 핸들러
  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setTitle("");
    setTags([]);
    setDescription("");
    setStart(dayjs(slotInfo.start));
    setEnd(dayjs(slotInfo.end));
    setOpen(true);
  }, []);

  // 모달 닫기
  const handleClose = () => setOpen(false);

  // 이벤트 추가
  const handleAddEvent = () => {
    if (!title || !start || !end) return;

    const newEvent: CalendarEvent = {
      id: `new-${Date.now()}`,
      title,
      start: start.toDate(),
      end: end.toDate(),
      tags,
      description,
    };

    setEvents((prev) => [...prev, newEvent]);
    setOpen(false);
  };

  // 이벤트 드래그 앤 드롭 (캘린더 내부)
  const moveEvent = useCallback(({ event, start, end }: any) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id);
      if (!existing) return prev;
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [
        ...filtered,
        { ...existing, start: new Date(start), end: new Date(end) },
      ];
    });
  }, []);

  // 이벤트 리사이즈
  const resizeEvent = useCallback(({ event, start, end }: any) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id);
      if (!existing) return prev;
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [
        ...filtered,
        { ...existing, start: new Date(start), end: new Date(end) },
      ];
    });
  }, []);

  // 한국어 메시지
  const messages = {
    allDay: "종일",
    previous: "이전",
    next: "다음",
    today: "오늘",
    month: "월",
    week: "주",
    day: "일",
    agenda: "일정",
    date: "날짜",
    time: "시간",
    event: "이벤트",
    noEventsInRange: "이 범위에는 이벤트가 없습니다.",
    showMore: (total: number) => `+${total} 더보기`,
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* -------- 캘린더 -------- */}
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          overflow: "hidden",
          p: 2,
          height: "100%",
          "& .rbc-calendar": {
            height: "calc(95vh - 60px)",
          },
          "& .rbc-toolbar button": {
            backgroundColor: "#5b71ad",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 16px",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#394b78",
            },
            "&:active, &.rbc-active": {
              backgroundColor: "#001845",
            },
          },
          "& .rbc-toolbar-label": {
            fontSize: "22px",
            fontWeight: 600,
            color: "#1c2974",
          },
          "& .rbc-event": {
            backgroundColor: "#5b71ad",
            borderRadius: "4px",
          },
          "& .rbc-today": {
            backgroundColor: "#e2e8ff",
          },
        }}
      >
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          resizable
          onSelectSlot={handleSelectSlot}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          draggableAccessor={() => true}
          messages={messages}
          step={15}
          scrollToTime={new Date(1970, 1, 1, 9, 0, 0)}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          view={currentView as any}
          onView={(newView) => setCurrentView(newView)}
          defaultView="week"
          views={["month", "week", "day", "agenda"]}
        />
      </Box>

      {/* -------- モーダル -------- */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            fontSize: 20,
            background: "#e2e8ff",
            color: "#1c2974",
          }}
        >
          <LocalFloristIcon sx={{ mr: 1 }} /> 예정 추가
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="주제"
            id="outlined-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="시작 시간"
              value={start}
              onChange={setStart}
            />
            <DateTimePicker label="종료 시간" value={end} onChange={setEnd} />
          </LocalizationProvider>

          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel shrink>태그</InputLabel>
            <Select
              multiple
              label="태그"
              value={tags}
              onChange={(e) =>
                setTags(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value,
                )
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      size="small"
                      key={value}
                      label={value}
                      onDelete={() =>
                        setTags((prev) => prev.filter((tag) => tag !== value))
                      }
                      clickable
                    />
                  ))}
                </Box>
              )}
              sx={{
                "& .MuiSelect-select": {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  minHeight: 50,
                },
              }}
            >
              {TAG_OPTIONS.map((t) => (
                <MenuItem key={t.tag_id} value={t.name}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="메모"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>취소</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#5b71ad" }}
            onClick={handleAddEvent}
          >
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
