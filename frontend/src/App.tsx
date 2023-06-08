import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import PodiumPredictions from "./Pages/Predictions/PodiumPredictions";
import Competition from "./Pages/Competition/Competition";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import {SnackbarProvider} from "notistack";
import About from "./Pages/About/About";
import Ranking from "./Pages/Predictions/Ranking/PodiumPredictionsRanking";

const router = createHashRouter([
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
    path: '/about',
    element: <Layout children={<About />} />,
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
    element: <Layout children={<Competition />} />,
  },
  {
    path: "/podium/ranking",
    element: <Layout children={<Ranking />} />,
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
