import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {getUser, logout} from "../logic/auth";

const LoginPartial = () => {
    const user = getUser();
    console.log(user);
    return (
        <>
            {user.id ? (<>
                    <Typography>Hello {user.username}</Typography>
                    <IconButton color="inherit" onClick={(event: any) => {
                        event.preventDefault();
                        logout();
                        window.location.reload();
                    }}><LogoutIcon/></IconButton></>) :
                <IconButton color="inherit" component={Link} to={"/auth/login"}><LoginIcon/></IconButton>}
        </>
    )
};

export default LoginPartial;