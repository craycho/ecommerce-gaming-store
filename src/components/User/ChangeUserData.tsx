import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { userActions } from "../../store/user-slice";
import { patchUserData } from "../../store/user-actions";

import validateInput from "../../util/validate-input";

import {
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

function ChangeUserData({ dataType }: { dataType: string }) {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [changeDataVisible, setChangeDataVisible] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [currentInput, setCurrentInput] = useState<string>("");

  const handleChangeUserData = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const validInput = validateInput(dataType, currentInput);

    if (validInput) {
      dispatch(userActions.changeUserData({ dataType, currentInput }));
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, [dataType]: currentInput })
      );
      sessionStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, [dataType]: currentInput })
      );
      appDispatch(
        patchUserData({ userData, dataType, newValue: currentInput })
      );
      setChangeDataVisible(false);
      console.log(dataType, currentInput);
    } else {
      setCurrentInput("");
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 1500);
    }
  };

  return (
    <>
      {changeDataVisible ? (
        <Box sx={{ marginTop: 0.2, position: "absolute", zIndex: 1 }}>
          <form noValidate autoComplete="off" onSubmit={handleChangeUserData}>
            <TextField
              autoFocus
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              size="small"
              error={inputError}
              helperText={inputError && "Invalid value."}
              sx={{
                width: 130,
                ".MuiFormHelperText-root": {
                  position: "absolute",
                  left: -2,
                  whiteSpace: "nowrap",
                  fontSize: 11,
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    sx={{ padding: 0 }}
                    onClick={handleChangeUserData}
                  >
                    <CheckBoxIcon sx={{ fontSize: 25 }} />
                  </IconButton>
                ),
              }}
              inputProps={{
                style: {
                  height: 8,
                  paddingLeft: 7,
                  fontSize: 14,
                },
              }}
            />
          </form>
        </Box>
      ) : (
        <ChangeSpan
          variant="caption"
          onClick={() => setChangeDataVisible(true)}
        >
          Change
        </ChangeSpan>
      )}
    </>
  );
}

export default ChangeUserData;
