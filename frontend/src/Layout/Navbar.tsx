import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from "react-router-dom";


const Navbar = (props: any) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: 1}}  component={Link}
                            to={`/`} sx={{textDecoration: 'none'}}>
                    {props.title ? props.title : "Cubing Predictions"}
                </Typography>
                <IconButton href="https://github.com/maxidragon/CubingPredictions" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon sx={{color: "#fff"}} fontSize="large"/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;