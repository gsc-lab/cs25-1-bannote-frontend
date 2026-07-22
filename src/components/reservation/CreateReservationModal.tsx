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
import { UserSearch } from "../common/UserSearch";

interface CreateResourceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
  start: Date | null;
  end: Date | null;
  resourceId: number | null;
}

const CreateReservationModal = ({
  open,
  onClose,
  onSuccess,
  start,
  end,
  resourceId,
}: CreateResourceModalProps) => {
  const notify = useNotify();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_time: dayjs(data.start_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          end_time: dayjs(data.end_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          room_id: data.room_id,
          purpose: data.purpose,
          user_codes: data.user_codes || [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      notify("예약이 생성되었습니다", { type: "success" });
      await onSuccess?.();
      onClose();
    } catch (error) {
      notify("예약 생성 실패", { type: "error" });
    }
  };

  const defaultValues = {
    start_time: start,
    end_time: end,
    room_id: resourceId,
    purpose: "",
    user_codes: [],
  };

  const CustomToolbar = () => (
    <Toolbar>
      <SaveButton label="생성" />
      <Button onClick={onClose}>취소</Button>
    </Toolbar>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>새 예약 만들기</DialogTitle>
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
            // TODO slotProps={{ htmlInput: { step: 1000 } }}  15분 단위로 선택하도록 설정
          />
          <DateTimeInput
            source="end_time"
            label="종료 시간"
            validate={required()}
            fullWidth
          />
          <TextInput source="room_id" label="스터디룸 ID" readOnly fullWidth />
          <UserSearch source="user_codes" label="참가자 선택" />
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReservationModal;
