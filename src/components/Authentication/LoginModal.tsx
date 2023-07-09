import LoginForm from "./LoginForm";
import { Box, Button, Modal, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalData {
  loginOpen: boolean;
  handleClose: () => void;
}

export default function BasicModal({ loginOpen, handleClose }: ModalData) {
  return (
    <Modal
      disableAutoFocus
      open={loginOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <LoginForm handleClose={handleClose} />
      </Box>
    </Modal>
  );
}
