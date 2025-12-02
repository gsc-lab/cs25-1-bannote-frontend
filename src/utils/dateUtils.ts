import dayjs from "dayjs";

/**
 * Firestore Timestamp를 한국 날짜/시간 형식으로 변환합니다.
 * @param timestamp - Firestore Timestamp 객체 { seconds: number, nanos: number }
 * @returns 포맷된 날짜 문자열 (예: "2024. 01. 15. 14:35") 또는 "-"
 */
export const formatFirestoreTimestamp = (timestamp?: {
  seconds: number;
  nanos: number;
}): string => {
  if (!timestamp?.seconds) {
    return "-";
  }

  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * 캘린더에 표시되는 실제 날짜 범위 계산
 * @param date - 현재 캘린더의 기준이 되는 날짜
 * @param view - 현재 캘린더의 보기 방식
 * @returns - 첫 날짜와 끝 날짜 Date 형식으로 반환
 */
export const getVisibleDateRange = (date: Date, view: string) => {
  const d = dayjs(date);

  switch (view) {
    case "month": {
      // 월 뷰: 해당 월의 첫날이 속한 주의 일요일 ~ 마지막날이 속한 주의 토요일
      const startOfMonth = d.startOf("month");
      const endOfMonth = d.endOf("month");
      const startDate = startOfMonth.startOf("week"); // 일요일
      const endDate = endOfMonth.endOf("week"); // 토요일
      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
      };
    }
    case "week": {
      // 주 뷰: 해당 주의 일요일 ~ 토요일
      const startDate = d.startOf("week"); // 일요일
      const endDate = d.endOf("week"); // 토요일
      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
      };
    }
    case "day": {
      // 일 뷰: 해당 날짜의 시작 ~ 끝
      const startDate = d.startOf("day");
      const endDate = d.endOf("day");
      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
      };
    }
    case "agenda": {
      // 일정 뷰: 현재 날짜부터 1개월
      const startDate = d.startOf("day");
      const endDate = d.add(1, "month").endOf("day");
      return {
        start: startDate.toDate(),
        end: endDate.toDate(),
      };
    }
    default:
      return {
        start: d.startOf("week").toDate(),
        end: d.endOf("week").toDate(),
      };
  }
};
