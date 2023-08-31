import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { userActions } from "../../store/user-slice";
import { logoutUserLocal, patchProfilePicture } from "../../store/user-actions";
import { Order } from "../../util/type-definitions";

import ChangeUserData from "./ChangeUserData";
import UserOrderItem from "./UserOrderItem";

import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  styled,
  Stack,
  Tabs,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import DefaultProfilePicture from "../../assets/default-user-profile-picture.png";
import CameraIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Cancel";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
};

const ProfilePicture = styled("img")(({ theme }) => ({
  position: "relative",
  height: 200,
  width: 500,
  objectFit: "cover",

  [theme.breakpoints.down("sm")]: {
    width: 350,
  },
}));

const ProfilePictureButton = styled(Avatar)({
  position: "absolute",
  top: 145,
  right: 20,
  cursor: "pointer",
  backgroundColor: "lightgrey",
  boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
});

const CloseModalButton = styled(IconButton)({
  position: "absolute",
  top: -23,
  right: -23,
  color: "#f4f4f494",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const UserInfo = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const LogoutButton = styled(IconButton)({
  position: "absolute",
  right: 13,
  top: 347,
  width: 60,
  height: 40,
  borderRadius: 8,
  backgroundColor: "indianred",
  color: "white",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#ca3737",
  },
});

const OrdersTab = styled(Tab)({
  fontSize: 13,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab content
function OrderList({ children, index, value }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orders-tabpanel-${index}`}
      aria-labelledby={`orders-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

interface ModalData {
  userModalOpen: boolean;
  handleClose: () => void;
  currentOrders: Order[];
}

const emptyUserData = {
  loggedIn: false,
  allowExtraEmails: true,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profilePicture: "",
  orders: [],
};

function UserModal({ userModalOpen, handleClose, currentOrders }: ModalData) {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        const dataURL = e.target?.result as string; // dataURL = base64 img

        dispatch(userActions.changeProfilePicture(dataURL));
        appDispatch(patchProfilePicture({ userData, dataURL }));

        // Neophodno samo radi updatea trenutnog sessiona, fetch request prilikom logina updatea u protivnom
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, profilePicture: dataURL })
        );
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, profilePicture: dataURL })
        );
      });
      // Reads file content and converts it to a dataURL (base64 string). Fires load event when read successfully.
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("userData", JSON.stringify(emptyUserData));
    sessionStorage.setItem("userData", JSON.stringify(emptyUserData));
    appDispatch(logoutUserLocal());
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="user-modal-window"
      disableAutoFocus
      open={userModalOpen}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <ProfilePicture
          alt="profile-picture"
          src={userData.profilePicture || DefaultProfilePicture}
          sx={{ objectPosition: userData.profilePicture ? "middle" : "top" }}
        />
        <Box component="div" id="change-picture">
          <label htmlFor="picture-input">
            <Tooltip title="Change picture" placement="left">
              <ProfilePictureButton>
                <CameraIcon />
              </ProfilePictureButton>
            </Tooltip>
          </label>
          <input
            id="picture-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePictureUpload}
            style={{ display: "none" }}
          />
        </Box>
        <Grid
          container
          rowSpacing={3.7}
          columnSpacing={window.innerWidth < 900 ? 2 : 3}
          m={0}
          mb={6}
        >
          <CloseModalButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </CloseModalButton>
          <Grid item xs={6} position="relative">
            <UserInfo variant="body1">
              <strong style={{ marginRight: 5 }}>First name:</strong>
              {userData.firstName}
            </UserInfo>
            <ChangeUserData dataType="firstName" />
          </Grid>
          <Grid item xs={6} position="relative">
            <UserInfo variant="body1">
              <strong style={{ marginRight: 5 }}>Last name:</strong>
              {userData.lastName}
            </UserInfo>
            <ChangeUserData dataType="lastName" />
          </Grid>
          <Grid item xs={6} position="relative">
            <UserInfo variant="body1">
              <strong style={{ marginRight: 5 }}>E-mail:</strong>
              {userData.email}
            </UserInfo>
            <ChangeUserData dataType="email" />
          </Grid>
          <Grid item xs={6} position="relative">
            <UserInfo variant="body1">
              <strong style={{ marginRight: 5 }}>Password:</strong>
              {userData.password.replace(/./g, "*")}
            </UserInfo>
            <ChangeUserData dataType="password" />
          </Grid>
        </Grid>
        <Tooltip title="Logout" placement="top">
          <LogoutButton onClick={handleLogout}>
            <LogoutIcon />
          </LogoutButton>
        </Tooltip>
        <Typography variant="body1" textAlign="center" fontWeight={700} mb={1}>
          My orders
        </Typography>
        <Divider />
        <Box p={1.5} pt={0} pb={0.5}>
          <Tabs
            aria-label="Order tabs"
            value={currentTab}
            sx={{ marginBottom: 0.5 }}
            onChange={(_, newValue: number) => setCurrentTab(newValue)}
          >
            <OrdersTab label="Current" />
            <OrdersTab label="Delivered" />
          </Tabs>
          <OrderList value={currentTab} index={0}>
            <Stack
              direction="row"
              spacing={1.5}
              pb={2}
              sx={{ overflowX: "auto" }}
            >
              {currentOrders.length > 0
                ? currentOrders.map((order, i) => (
                    <UserOrderItem
                      key={order.id || "" + i}
                      keyId={order.id || "" + i}
                      index={i}
                      userOrder={order.cart}
                      orderDate={order.date || "01/01/2023"}
                      deliveryMethod={order.deliveryMethod || 0}
                    />
                  ))
                : "No orders have been placed yet."}
            </Stack>
          </OrderList>
          <OrderList value={currentTab} index={1}>
            No products have been delivered yet.
          </OrderList>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserModal;
