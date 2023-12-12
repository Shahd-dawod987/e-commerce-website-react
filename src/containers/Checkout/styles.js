import styled from '@emotion/styled';
import {TextField,FormControlLabel} from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      borderBottom: "none",
      height : "1rem",
      paddingTop: "12px",
    },
    // width: "19rem",
    border: "1px solid #d1d1d1",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    paddingTop: 0,
    
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        borderRadius: "7px",
      },
   
  }));


  export const NotesTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      borderBottom: "none",
      height : "6rem",
      paddingTop: "12px",
    },

    // width: "46rem",
    border: "1px solid #d1d1d1",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    paddingTop: 0,
    
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        borderRadius: "7px",
      },
   
  }));

  export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    padding: "5px 2px",
    
  }));

  export const styles = {
    completeOrder :{
        borderRadius: "12px",
        textTransform: "none",
        padding: "17px 48px",
        border: "2px solid #46760A",
        fontSize: "large",
        alignSelf : "flex-start"

    }
  }