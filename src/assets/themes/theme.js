import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#151515",
      dark : "#575757",
      light : "#A9A9A9",
      white : "#ffffff"
    },
    secondary: {  
      main: "#6A983C",
      light: "#92C064",
      lighter: "#C8DEB3",
      dark: "#46760A",
    },

    adittional: {
      main : "#FFC42A"
    },
    white : {
     main: "#ffffff"},

     grey : {
      main: "#D1D1D1"
     },

  },
    typography: {
      h1: {
        fontFamily: 'cursive',
        fontSize: '32px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: '140%',
      },
      h2: {
        fontFamily: 'cursive',
        fontSize: '26px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
      },


      h3: {
        fontFamily: 'cursive',
        fontSize: '22px',
        fontStyle: 'normal',
       
        lineHeight: 'normal',
      },
     
      h4: {
        fontFamily: 'cursive',
        fontSize: '17px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
      },

      h5: {
        fontFamily: 'cursive',
        fontSize: '15px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
      },

      h6: {
        fontFamily: 'cursive',
        fontSize: '12px',
        fontStyle: 'normal',
        lineHeight: 'normal',
      },

      button : {
        fontFamily: 'cursive',
        fontSize: "13px"
      }
     
  },
});

export default theme;
