import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./assets/themes/theme";
import RouterRoutes from "./router/RouterRoutes";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <RouterRoutes/>
    
    
    </ThemeProvider>
  )
}

export default App;
