import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

type User = {
  code: string;
  name: string;
};

type Event = {
  id: string; // 예약 코드 code
  title: string; // 예약 목적 purpose
  start: Date; // 예약 시작 시간 start_time
  end: Date; // 예약 종료 시간 end_time
  resourceId: number; // room_id
  priority: number; // 우선순위
  users: User[]; // 예약한 사용자 목록
};

const localizer = dayjsLocalizer(dayjs);
const resources = [
  { resourceId: 1, resourceTitle: "Room A" },
  { resourceId: 2, resourceTitle: "Room B" },
  { resourceId: 3, resourceTitle: "Room C" },
];

const DragAndDropCalendar = withDragAndDrop(Calendar);

let eventId = 0;
const today = new Date();
const events = Array.from({ length: 20 }, (_, k) => k).flatMap((i) => {
  const currentResource = resources[i % resources.length];
  const dayDiff = i % 7;

  return Array.from({ length: 5 }, (_, j) => ({
    id: eventId++,
    title: `Event ${i + j} _ ${currentResource.resourceTitle}`,
    start: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayDiff,
      9 + (j % 4),
      0,
      0,
    ),
    end: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayDiff,
      11 + (j % 4),
      0,
      0,
    ),
    resourceId: currentResource.resourceId,
  }));
});

const Resource = (props: any) => {
  const views = ["day"];

  const [myEvents, setEvents] = useState(events);

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title, resourceId }]);
      }
    },
    [setEvents],
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    [],
  );
  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      console.log(event);
      console.log("start: ", start);
      console.log("end: ", end);
      console.log("resourceId: ", resourceId);

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, resourceId, allDay }];
      });
    },
    [setEvents],
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents],
  );

  return (
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
      />
    </div>
  );
};

export default Resource;
