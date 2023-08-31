import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/index";
import { userActions } from "../../store/user-slice";
import { patchUserData } from "../../store/user-actions";
import validateInput from "../../util/validate-input";

import { Box, IconButton, styled, TextField, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ChangeSpan = styled(Typography)({
  position: "absolute",
  left: 25,
  top: 50,
  zIndex: 1,
  textOverflow: "visible",
  color: "grey",

  "&:hover": {
    cursor: "pointer",
    color: "#ca3737",
  },
});

const changeSpanStyle = {
  width: 130,
  ".MuiFormHelperText-root": {
    position: "absolute",
    left: -2,
    whiteSpace: "nowrap",
    fontSize: 11,
  },
};

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
        <Box position="absolute" zIndex={1} mt={0.2}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleChangeUserData}
          >
            <TextField
              autoFocus
              size="small"
              value={currentInput}
              error={inputError}
              onChange={(e) => setCurrentInput(e.target.value)}
              helperText={inputError && "Invalid value."}
              sx={changeSpanStyle}
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
          </Box>
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
