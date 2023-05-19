
import {
  ColorModeContext, useMode
} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Topbar } from "./scenes/global/Topbar";
import { Outlet } from "react-router-dom"
import Sidebar from "./scenes/global/Sidebar";
import { AlertNotification } from "./components/ui/AlertNotification";


function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" >
          <Sidebar />
          <main className="content">
            <Topbar />
            <Outlet />
            <AlertNotification />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >

  )
}

export default App
