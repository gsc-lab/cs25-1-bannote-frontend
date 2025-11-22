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
  Typography
} from '@mui/material';
import Chip from '@mui/material/Chip';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const TAG_OPTIONS = [
  { id: '1', name: '仕事' },
  { id: '2', name: 'プライベート' },
  { id: '3', name: '勉強' }
];

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

  useEffect(() => {
    if (externalEventsRef.current) {
      new Draggable(externalEventsRef.current, {
        itemSelector: '.fc-external-event',
        eventData: function(eventEl) {
          return { title: eventEl.innerText, duration: '01:00' };
        }
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
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
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
      extendedProps: { tags, description }
    };

    setEvents(prev => [...prev, newEvent]);
    setOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      gap: 1,
      Height: '97vh',
      p: 3,
      background: 'linear-gradient(135deg, #fef6e4 0%, #fef6e4 100%)'
    }}>
      
      {/* -------- 左サイド（外部イベント） ---------- */}
      <Box

        ref={externalEventsRef}
        sx={{
        //   border: "0.5px solid #172c66",
          width: 260,
          backgroundColor: '#ffffff',
          borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          p: 2.3
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#2c3d7a', mb: 1 }}>
          ⭐ 즐겨찾기
        </Typography>
        <Box sx={{ width: '100%', height: 2, backgroundColor: '#dee3f5', mb: 2 }} />

        {/* ここにお気に入りイベントカードを配置 */}
      </Box>

      {/* -------- カレンダー -------- */}
      <Box sx={{
        // border: "0.5px solid #172c66",

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
          transition: '0.2s'
        },
        '& .fc-button:hover': { backgroundColor: '#394b78' },
        '& .fc-button-active': { backgroundColor: '#3e4f70ff' },
        '& .fc-toolbar-title': { fontSize: '22px', fontWeight: 600, color: '#1c2974' }
      }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          buttonText={{ today: '오늘', month: '월', week: '주', day: '일' }}
          editable selectable select={handleSelect} events={events}
        />
      </Box>

      {/* -------- モーダル -------- */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
            display: 'flex', alignItems: 'center',
            fontWeight: 700, fontSize: 20,
            background: '#e2e8ff', color: '#1c2974',
        }}>
          <LocalFloristIcon sx={{ mr: 1 }} /> 예정 추가
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField label="주제" id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />

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
                            setTags(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)
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
                        "& .MuiSelect-select": { display: "flex", flexWrap: "wrap", gap: 0.5, minHeight: 50 },
                        }}
                    >
                        {TAG_OPTIONS.map((t) => (
                        <MenuItem key={t.id} value={t.name}>
                            {t.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

          <TextField label="메모" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>취소</Button>
          <Button variant="contained" sx={{ bgcolor: '#5b71ad' }} onClick={handleAddEvent}>추가</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
