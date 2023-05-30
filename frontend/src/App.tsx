import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import PodiumPredictions from "./Pages/Predictions/PodiumPredictions";
import Competition from "./Pages/Competition/Competition";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import {SnackbarProvider} from "notistack";

const router = createBrowserRouter([
  // {
  //     path: "*",
  //     element: <>,
  // },
  {
    path: "/auth/login",
    element: <Login/>,
  },
  {
    path: "/auth/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <Layout children={<Main />} />,
  },
  {
    path: "/podium",
    element: <Layout children={<PodiumPredictions />} />,
  },
  {
    path: "/competitions/:competitionId",
    element: <Competition />,
  }
]);
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
function App() {
  return (
      <ThemeProvider theme={lightTheme}>
        <SnackbarProvider>
          <RouterProvider router={router}/>
        </SnackbarProvider>
      </ThemeProvider>
  );
}

export default App;
