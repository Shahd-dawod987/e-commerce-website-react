import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const StyledAvatar = styled("img")({
  width: "128px",
  height: "128px",
  flexShrink: 0,
});

export const StyledTextField = styled(TextField)({
  width: "22rem",
  "& input": {
    color: "#FFC42A",
  },
});

export const StyledPerson = styled("img")({
  width: "258px",
  height: "279px",
  flexShrink: 0,
  position: "absolute",
  top: "9rem",
  right: "9rem",
  zIndex :1
});

export const StyledLambImage = styled("img")({
  width: "93px",
  height: "159px",
  flexShrink: 0,
  top: "-1.9rem",
  right: "20rem",
  position: "absolute",


});

export const StyledRectangleImage = styled("img")({
  width: "32.4rem",
  height: "35.8rem",
  flexShrink: 0,
  position: "absolute",
  right: 0,
  bottom: 0,
  top : "-11px"
});
