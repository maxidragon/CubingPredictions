import { ReactElement } from "react";
import Navbar from "./Navbar";
import Copyright from "./Copyright";

const Layout = (props: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Copyright />
    </>
  );
};

export default Layout;
