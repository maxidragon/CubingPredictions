import Navbar from "./Navbar";
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