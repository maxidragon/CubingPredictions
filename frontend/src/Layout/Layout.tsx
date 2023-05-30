import Navbar from "./Navbar";
import React from "react";
import Copyright from "./Copyright";

const Layout = (props: any) => {
    return (
        <>
            <Navbar/>
            {props.children}
            <Copyright />
        </>
    )
}

export default Layout;