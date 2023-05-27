import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';


const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                    Cubing predictions
                </Typography>
                <IconButton href="https://github.com/maxidragon/CubingPredictions" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon sx={{color: "#fff"}} fontSize="large"/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;