import Navbar from "./Navbar";
import React from "react";

const Layout = (props: any) => {
    return (
        <>
            <Navbar/>
            {props.children}
        </>
    )
}

export default Layout;