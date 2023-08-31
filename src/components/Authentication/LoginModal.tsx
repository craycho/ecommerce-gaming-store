import LoginForm from "./LoginForm";
import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
};

interface ModalData {
  loginOpen: boolean;
  handleClose: () => void;
}

function LoginModal({ loginOpen, handleClose }: ModalData) {
  return (
    <Modal
      disableAutoFocus
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={loginOpen}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <LoginForm handleClose={handleClose} />
      </Box>
    </Modal>
  );
}

export default LoginModal;
