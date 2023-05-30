import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LoginPartial from "./LoginPartial";
import InfoIcon from '@mui/icons-material/Info';

const Navbar = (props: any) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: 1}}  component={Link}
                            to={`/`} sx={{textDecoration: 'none'}}>
                    {props.title ? props.title : "Cubing predictions"}
                </Typography>
                <LoginPartial />
                <IconButton component={Link} to="/about" rel="noopener noreferrer">
                    <InfoIcon sx={{color: "#fff"}} fontSize="large"/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;