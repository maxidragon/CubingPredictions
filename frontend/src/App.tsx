import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import PodiumPredictions from "./Pages/Predictions/PodiumPredictions";
import Competition from "./Pages/Competition/Competition";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import { SnackbarProvider } from "notistack";
import About from "./Pages/About/About";
import Ranking from "./Pages/Predictions/Ranking/PodiumPredictionsRanking";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import ErrorElement from "./Pages/ErrorElement/ErrorElement";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import { ConfirmProvider } from 'material-ui-confirm';

const router = createHashRouter([
  {
    path: "*",
    element: <Layout children={<ErrorElement message={'404 not found'} />} />,
  },
  {
    path: "/404",
    element: <Layout children={<ErrorElement message={'404 not found'} />} />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/password/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/password/reset/:resetId",
    element: <ResetPassword />,
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
  },
  {
    path: "/profile/:userId",
    element: <Layout children={<Profile />} />,
  },
  {
    path: "/settings",
    element: <Layout children={<Settings />} />,
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
        <ConfirmProvider>
          <RouterProvider router={router} />
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
