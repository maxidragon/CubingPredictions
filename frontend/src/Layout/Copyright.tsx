import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

function Copyright(props: any) {
    return (
        <div>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                <Link
                    component={RouterLink}
                    to={'/'}
                    rel="noopener noreferrer"
                >
                Cubing Predictions
                </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                Made with <FavoriteIcon sx={{color: 'red',verticalAlign: 'middle',}} /> by{' '}
                <Link
                    href="https://github.com/maxidragon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Maksymilian Gala
                </Link>
            </Typography>
            <Typography align="center">
                <IconButton aria-label="GitHubIcon" href="https://github.com/maxidragon/CubingPredictions" target="_blank">
                    <GitHubIcon sx={{color: "#000"}} fontSize="large"/>
                </IconButton>
            </Typography>

        </div>

    );
}

export default Copyright;