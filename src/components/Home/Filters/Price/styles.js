import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

export const StyledSlider = styled(Slider)`
  .MuiSlider-rail {
    background-color: #bdbdbd;
  }
  .MuiSlider-track {
    background-color: #6a983c;
  }

  .MuiSlider-thumb {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      borderBottom: "none",
      backgroundColor: "transparent",
      paddingTop: "12px",
    },

    width: "7rem",
    border: "1px solid #d1d1d1",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    paddingTop: 0,
  }));

export const StyledTextFieldContainer = styled("div")({
  "& .MuiInputBase-root.MuiFilledInput-root::before": {
    borderBottom: "none",
    backgroundColor: "transparent",
  },
  "& .MuiInputBase-root.MuiFilledInput-root:hover::before": {
    borderBottom: "none",
  },

  "& .MuiInputBase-root.MuiFilledInput-root::after": {
    borderBottom: "none",
    backgroundColor: "transparent",
  },
});
