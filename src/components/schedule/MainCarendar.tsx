// src/schedule/MainCalendar.tsx
import React, { useEffect, useState, useRef } from 'react';
import FullCalendar, { EventInput, DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
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
  Typography,
  Chip,
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import groupsJson from './groupsDate.json';
import tagListJson from './tagList.json';

// TAG_OPTIONSをJSONから作成
const TAG_OPTIONS = tagListJson.tag_list_response.tags;

export const MyCalendar = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs().add(1, 'hour'));
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const externalEventsRef = useRef<HTMLDivElement>(null);

  // ドラッグ可能イベントを初期化
  useEffect(() => {
    if (externalEventsRef.current) {
      new Draggable(externalEventsRef.current, {
        itemSelector: '.fc-external-event',
        eventData: function (eventEl) {
          return { title: eventEl.innerText, duration: '01:00' };
        },
      });
    }
  }, []);

  const handleSelect = (info: DateSelectArg) => {
    setSelectedInfo(info);
    setTitle('');
    setTags([]);
    setDescription('');
    setStart(dayjs(info.start));
    setEnd(info.end ? dayjs(info.end) : dayjs(info.start).add(1, 'hour'));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddEvent = () => {
    if (!title || !start || !end) return;

    const newEvent: EventInput = {
      id: `new-${Date.now()}`,
      title,
      start: start.toDate(),
      end: end.toDate(),
      editable: true,
      extendedProps: { tags, description },
    };

    setEvents((prev) => [...prev, newEvent]);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        minHeight: '95vh',
        p: 3,
        background: 'linear-gradient(135deg, #fef6e4 0%, #fef6e4 100%)',
      }}
    >
      {/* -------- 左サイド（外部イベント / ブックマーク） ---------- */}
      <Box
        ref={externalEventsRef}
        sx={{
          width: 260,
          backgroundColor: '#ffffff',
          borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          p: 2.3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: '#2c3d7a',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <BookmarksIcon sx={{ fontSize: 22 }} />
          즐겨찾기
        </Typography>
        <Box sx={{ width: '100%', height: 2, backgroundColor: '#dee3f5', mb: 2 }} />

        {/* groupsJson の bookmark:true のイベントを表示 */}
        {groupsJson.groupsData
          .filter((group) => group.bookmark)
          .map((group) => (
            <Chip
              key={group.group_id}
              label={group.group_name}
              sx={{
                width: '100%',
                mb: 1,
                cursor: 'pointer',
                backgroundColor: group.color_default || '#5b71ad',
                color: '#fff',
              }}
              className="fc-external-event"
            />
          ))}
      </Box>

      {/* -------- カレンダー -------- */}
      <Box
        sx={{
          flex: 1,
          background: '#ffffff',
          borderRadius: 4,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          p: 2,
          '& .fc-button': {
            backgroundColor: '#5b71ad',
            border: 'none',
            color: '#fff',
            borderRadius: '8px',
            textTransform: 'none',
            transition: '0.2s',
          },
          '& .fc-button:hover': { backgroundColor: '#394b78' },
          '& .fc-button-active': { backgroundColor: '#001845' },
          '& .fc-toolbar-title': { fontSize: '22px', fontWeight: 600, color: '#1c2974' },
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{ today: '오늘', month: '월', week: '주', day: '일' }}
          editable
          selectable
          select={handleSelect}
          events={events}
        />
      </Box>

      {/* -------- モーダル -------- */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: 20,
            background: '#e2e8ff',
            color: '#1c2974',
          }}
        >
          <LocalFloristIcon sx={{ mr: 1 }} /> 예정 추가
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="주제"
            id="outlined-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="시작 시간" value={start} onChange={setStart} />
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
                  typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
                )
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      size="small"
                      key={value}
                      label={value}
                      onDelete={() => setTags((prev) => prev.filter((tag) => tag !== value))}
                      clickable
                    />
                  ))}
                </Box>
              )}
              sx={{
                '& .MuiSelect-select': { display: 'flex', flexWrap: 'wrap', gap: 0.5, minHeight: 50 },
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
          <Button variant="contained" sx={{ bgcolor: '#5b71ad' }} onClick={handleAddEvent}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
