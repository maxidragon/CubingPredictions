import React from 'react';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./Pages/Main/Main";
import PodiumPredictions from "./Pages/Predictions/PodiumPredictions";

const router = createBrowserRouter([
  // {
  //     path: "*",
  //     element: <>,
  // },
  // {
  //   path: "/auth/login",
  //   element: <Login/>,
  // },
  // {
  //   path: "/auth/register",
  //   element: <Register/>,
  // },
  {
    path: "/",
    element: <Layout children={<Main />} />,
  },
  {
    path: "/podium",
    element: <Layout children={<PodiumPredictions />} />,
  },
]);
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
function App() {
  return (
      <ThemeProvider theme={lightTheme}>
          <RouterProvider router={router}/>
      </ThemeProvider>
  );
}

export default App;
