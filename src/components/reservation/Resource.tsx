import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useGetList } from "react-admin";
import CreateResourceModal from "./CreateReservationModal";
import UpdateReservationModal from "./UpdateReservationModal";
import { useCreateReservationModal } from "../../hooks/useCreateReservationModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Box } from "@mui/material";

type User = {
  code: string;
  name: string;
};

export type Event = {
  id: string; // 예약 코드 code
  title: string; // 예약 목적 purpose
  start: Date; // 예약 시작 시간 start_time
  end: Date; // 예약 종료 시간 end_time
  resourceId: number; // room_id
  priority: number; // 우선순위
  users: User[]; // 예약한 사용자 목록
  allDay?: boolean;
};

const localizer = dayjsLocalizer(dayjs);

const DragAndDropCalendar = withDragAndDrop(Calendar);

// Custom Toolbar with DatePicker
const CustomToolbar = ({ label, onNavigate, date }: any) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  useEffect(() => {
    setSelectedDate(dayjs(date));
  }, [date]);

  const handleDateChange = (newDate: any) => {
    if (newDate) {
      setSelectedDate(newDate);
      onNavigate("DATE", newDate.toDate());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Button onClick={() => onNavigate("PREV")}>이전</Button>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
        <Button onClick={() => onNavigate("TODAY")}>오늘</Button>
      </Box>
      <Button onClick={() => onNavigate("NEXT")}>다음</Button>
    </Box>
  );
};

// resize, move 시 서버에 업데이트 요청
const updateReservation = async (
  eventId: string,
  startDate: Date,
  endDate: Date,
  resourceId: number,
  purpose?: string,
) => {
  const start_time = dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss[Z]");
  const end_time = dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss[Z]");

  await fetch(`/api/reservations/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_time,
      end_time,
      room_id: resourceId,
      purpose,
    }),
  });
};

// 예약 불러오기
const getReservations = async (
  startDate: Date,
  endDate: Date,
  resourceIds: number[],
  setEvents: (events: Event[]) => void,
) => {
  const startOfDay = dayjs(startDate)
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  const endOfDay = dayjs(endDate).endOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]");

  const response = await fetch(
    `/api/reservations?start_time=${startOfDay}&end_time=${endOfDay}&room_ids=${resourceIds}`,
    {
      method: "GET",
    },
  );

  const data = await response.json();
  console.log(data);

  if (data.data != undefined) {
    setEvents(
      data.data.map((reservation: any) => ({
        id: reservation.code,
        title: reservation.purpose,
        start: new Date(reservation.start_time.replace("Z", "")),
        end: new Date(reservation.end_time.replace("Z", "")),
        resourceId: reservation.room_id,
        priority: reservation.priority,
        users: reservation.users,
      })),
    );
  } else {
    setEvents([]);
  }
};

const Resource = (props: any) => {
  const views = ["day"];

  const { data: studyrooms, isLoading } = useGetList("studyrooms", {
    pagination: { page: 1, perPage: 100 },
  });

  const resources =
    studyrooms?.map((room: any) => ({
      resourceId: room.id,
      resourceTitle: room.name,
    })) || [];

  const [myEvents, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { modalOpen, selectedSlot, openModal, closeModal } =
    useCreateReservationModal();

  // 새로고침 함수
  const refreshReservations = useCallback(
    async (date?: Date) => {
      if (!studyrooms || studyrooms.length === 0) return;
      const resourceIds = resources.map((res) => res.resourceId);
      const targetDate = date || currentDate;
      await getReservations(targetDate, targetDate, resourceIds, setEvents);
    },
    [studyrooms, resources, currentDate],
  );

  useEffect(() => {
    refreshReservations();
  }, [studyrooms]);

  const handleNavigate = useCallback(
    (newDate: Date) => {
      setCurrentDate(newDate);
      refreshReservations(newDate);
    },
    [refreshReservations],
  );

  const handleSelectSlot = useCallback(
    ({
      start,
      end,
      resourceId,
    }: {
      start: Date;
      end: Date;
      resourceId: number;
    }) => {
      openModal({ start, end, resourceId });
    },
    [openModal],
  );

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setUpdateModalOpen(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const moveEvent = useCallback(
    async ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }: {
      event: Event;
      start: Date;
      end: Date;
      resourceId: number;
      isAllDay?: boolean;
    }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      try {
        await updateReservation(event.id, start, end, resourceId, event.title);
        refreshReservations();
      } catch (error) {
        console.error("Failed to move event:", error);
      }
    },
    [refreshReservations],
  );

  const resizeEvent = useCallback(
    async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      try {
        await updateReservation(
          event.id,
          start,
          end,
          event.resourceId,
          event.title,
        );
        refreshReservations();
      } catch (error) {
        console.error("Failed to resize event:", error);
      }
    },
    [refreshReservations],
  );

  if (isLoading) {
    return <div>Loading studyrooms...</div>;
  }

  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "2%",
        }}
      >
        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={myEvents}
          style={{ height: "96%", width: "96%" }}
          resources={resources}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          defaultView={Views.DAY}
          views={views}
          step={15}
          date={currentDate}
          scrollToTime={new Date(1970, 1, 1, 9, 0, 0)}
          onNavigate={handleNavigate}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>

      <CreateResourceModal
        open={modalOpen}
        onClose={closeModal}
        onSuccess={refreshReservations}
        start={selectedSlot.start}
        end={selectedSlot.end}
        resourceId={selectedSlot.resourceId}
      />

      <UpdateReservationModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        onSuccess={refreshReservations}
        event={selectedEvent}
      />
    </>
  );
};

export default Resource;
