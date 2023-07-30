import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { userActions } from "../../store/user-slice";
import { patchProfilePicture } from "../../store/user-actions";

import ChangeUserData from "./ChangeUserData";
import UserOrderItem from "./UserOrderItem";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  styled,
  Stack,
  Tabs,
  Tab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DefaultProfilePicture from "../../assets/default-user-profile-picture.png";
import CameraIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const ProfilePicture = styled("img")({
  position: "relative",
  height: 200,
  width: 500,
  objectFit: "cover",
});

const ProfilePictureButton = styled(Avatar)({
  position: "absolute",
  top: 145,
  right: 20,
  cursor: "pointer",
  backgroundColor: "lightgrey",
  boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.75)",
});

const UserInfo = styled(Typography)({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

const ChangeSpan = styled(Typography)({
  position: "absolute",
  left: 25,
  top: 50,
  textOverflow: "visible",
  zIndex: 1,
  color: "grey",

  "&:hover": {
    cursor: "pointer",
    color: "#ca3737",
  },
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

interface Order {
  selectedCountry: string;
  firstName: string;
  lastName: string;
  address: string;
  postcode: string;
  email: string;
  allowExtraEmails: boolean;
  cart: string[];
  id: string;
}

interface ModalData {
  userModalOpen: boolean;
  handleClose: () => void;
  currentOrders: Order[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Modal
      disableAutoFocus
      open={userModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <ProfilePicture
          src={userData.profilePicture || DefaultProfilePicture}
          alt="profile-picture"
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
        {/* <Box p={0} sx={{ display: "flex", justifyContent: "center" }}> */}
        <Grid container rowSpacing={3.7} columnSpacing={3} m={0} mb={6}>
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
        {/* </Box> */}
        <Tooltip title="Logout" placement="top">
          <LogoutButton
            onClick={() => {
              localStorage.setItem("userData", JSON.stringify(emptyUserData));
              sessionStorage.setItem("userData", JSON.stringify(emptyUserData));
              dispatch(userActions.logoutUser());
              handleClose();
            }}
          >
            <LogoutIcon />
          </LogoutButton>
        </Tooltip>
        <Typography variant="body1" textAlign="center" fontWeight={700} mb={1}>
          My orders
        </Typography>
        <Divider />
        <Box p={1.5} pt={0} pb={0.5}>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="Order tabs"
            sx={{ marginBottom: 0.5 }}
          >
            <OrdersTab label="Current" />
            <OrdersTab label="Delivered" />
          </Tabs>
          <OrderList value={currentTab} index={0}>
            <Stack direction="row" spacing={2.5} sx={{ overflowX: "auto" }}>
              {currentOrders.length > 0
                ? currentOrders.map((order, i) => (
                    <UserOrderItem
                      userOrder={order.cart}
                      index={i}
                      key={order.id + i}
                      keyId={order.id + i}
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

/* <Typography variant="body1" key={order.id}>
                      {order.cart}
                    </Typography> */

export default UserModal;

/* <Stack
            pt={2}
            pl={3}
            pb={2}
            spacing={2.5}
            width="fit-content"
            overflow="hidden"
          >
            <Typography variant="body1">
              <strong style={{ marginRight: 5 }}>First name:</strong>
              {userData.firstName}
            </Typography>
            <Typography variant="body1" display="inline">
              <strong style={{ marginRight: 5 }}>Last name:</strong>
              {userData.lastName}
            </Typography>
            <Typography variant="body1">
              <strong style={{ marginRight: 5 }}>E-mail:</strong>
              {userData.email}
            </Typography>
            <Typography variant="body1">
              <strong style={{ marginRight: 5 }}>Password:</strong>
              {userData.password.replace(/./g, "*")}
            </Typography>
          </Stack>

           <Stack p={2} pb={1} mr={1} spacing={1.5} width="20%">
            <ChangeButton variant="contained" size="small">
              Change
            </ChangeButton>
            <ChangeButton variant="contained" size="small">
              Change
            </ChangeButton>
            <ChangeButton variant="contained" size="small">
              Change
            </ChangeButton>
            <ChangeButton variant="contained" size="small">
              Change
            </ChangeButton>
          </Stack> 
          <Stack p={2} pb={1} mr={1} spacing={3} width="20%">
            <Typography variant="caption" color="grey">
              Change
            </Typography>
            <Typography variant="caption">Change</Typography>
            <Typography variant="caption">Change</Typography>
            <Typography variant="caption">Change</Typography>
          </Stack> */
