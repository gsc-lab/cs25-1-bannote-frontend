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
