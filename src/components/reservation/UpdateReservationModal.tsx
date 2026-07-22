import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
  useNotify,
  Toolbar,
  SaveButton,
} from "react-admin";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Event } from "./Resource";
import { UserSearch } from "../common/UserSearch";

interface UpdateReservationModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
  event: Event | null;
}

const UpdateReservationModal = ({
  open,
  onClose,
  onSuccess,
  event,
}: UpdateReservationModalProps) => {
  const notify = useNotify();
  const handleSubmit = async (data: any) => {
    if (!event) return;

    try {
      const response = await fetch(`/api/reservations/${event.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_time: dayjs(data.start_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          end_time: dayjs(data.end_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          room_id: data.room_id,
          purpose: data.purpose,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      notify("예약이 수정되었습니다", { type: "success" });
      await onSuccess?.();
      onClose();
    } catch (error) {
      notify("예약 수정 실패", { type: "error" });
    }
  };

  const handleDelete = async () => {
    if (!event) return;

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/reservations/${event.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }

      notify("예약이 삭제되었습니다", { type: "success" });
      await onSuccess?.();
      onClose();
    } catch (error) {
      notify("예약 삭제 실패", { type: "error" });
    }
  };

  const defaultValues = {
    start_time: event?.start,
    end_time: event?.end,
    room_id: event?.resourceId,
    purpose: event?.title,
    user_codes: event?.extendedProps?.user_codes || [],
  };

  const CustomToolbar = () => (
    <Toolbar>
      <SaveButton label="수정" />
      <Button onClick={onClose}>취소</Button>
      <Button onClick={handleDelete} color="error" sx={{ marginLeft: "auto" }}>
        삭제
      </Button>
    </Toolbar>
  );

  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>예약 수정</DialogTitle>
      <DialogContent>
        <SimpleForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          toolbar={<CustomToolbar />}
        >
          <TextInput
            source="purpose"
            label="예약 목적"
            validate={required()}
            fullWidth
            multiline
            rows={1}
          />
          <DateTimeInput
            source="start_time"
            label="시작 시간"
            validate={required()}
            fullWidth
            slotProps={{ htmlInput: { step: 900 } }}
          />
          <DateTimeInput
            source="end_time"
            label="종료 시간"
            validate={required()}
            fullWidth
            slotProps={{ htmlInput: { step: 900 } }}
          />
          <TextInput source="room_id" label="스터디룸 ID" readOnly fullWidth />
          <UserSearch
            source="user_codes"
            label="참가자 선택"
            initialUsers={event?.extendedProps?.users || []}
          />
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReservationModal;
