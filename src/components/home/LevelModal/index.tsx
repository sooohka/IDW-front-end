import { useModalContext } from "@Contexts/ModalContextProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";

function LevelModal() {
  const { isModalOpened, closeModal, handleModalSubmit, worldCupId } = useModalContext();
  const [level, setLevel] = useState(4);
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(parseInt(e.target.value, 10));
  };
  if (!isModalOpened) return null;
  return (
    <Dialog fullWidth maxWidth='xs' open={isModalOpened} onClose={closeModal}>
      <DialogTitle>강수를 고르세요</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          aria-label='ringtone'
          name='ringtone'
          value={level}
          onChange={handleLevelChange}
        >
          {[4, 8, 16, 32].map((v) => (
            <FormControlLabel value={v} key={v} control={<Radio />} label={v} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={handleModalSubmit(level, worldCupId!)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LevelModal;
