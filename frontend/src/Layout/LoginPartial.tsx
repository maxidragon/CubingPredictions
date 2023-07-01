import {useEffect, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {getUserInfo, logout} from "../logic/auth";
import PersonIcon from '@mui/icons-material/Person';

const LoginPartial = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const user = getUserInfo();
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 800) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {user && user.id ? (<>
                    {isMobile ? null : (
                    <Typography>Hello {user.username}</Typography>
                        )}
                    <IconButton color="inherit" onClick={(event: any) => {
                        event.preventDefault();
                        logout();
                        window.location.reload();
                    }}><LogoutIcon fontSize="medium"/></IconButton>
                    <IconButton component={Link} to={`/profile/${user.id}`} rel="noopener noreferrer">
                        <PersonIcon sx={{color: "#fff"}} fontSize="medium"/>
                    </IconButton>
                </>) :
                <IconButton color="inherit" component={Link} to={"/auth/login"}><LoginIcon fontSize="medium"/></IconButton>
            }
        </>
    )
};

export default LoginPartial;